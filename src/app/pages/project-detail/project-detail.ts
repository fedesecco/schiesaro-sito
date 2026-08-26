import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { getProjectBySlug } from '../../content/projects-data';
import { ProjectMedia } from '../../models/site-content.model';
import { splitCoordinate } from '../../shared/utils/coordinates';

type DetailSlide =
  | { kind: 'text'; id: 'text' }
  | { kind: 'image'; id: string; image: ProjectMedia };

@Component({
  selector: 'app-project-detail',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './project-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly viewportRef = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });
  private readonly requestedSlide = toSignal(
    this.route.queryParamMap.pipe(map((params) => parseRequestedSlide(params.get('slide')))),
    {
      initialValue: parseRequestedSlide(this.route.snapshot.queryParamMap.get('slide')),
    },
  );
  private readonly currentSlideIndex = signal(0);
  private isPointerDown = false;
  private isDragging = false;
  private suppressClick = false;
  private pointerStartX = 0;
  private scrollStartLeft = 0;
  private syncFromRoute = true;
  private allowScrollRouteUpdate = false;
  private syncFrame: number | null = null;

  protected readonly siteTitle = 'KOPIO OFFICE';
  protected readonly project = computed(() => getProjectBySlug(this.slug()));
  protected readonly hasTextSlide = computed(() => Boolean(this.project()?.body?.length));
  protected readonly firstImageSlideIndex = computed(() => (this.hasTextSlide() ? 1 : 0));
  protected readonly slides = computed<DetailSlide[]>(() => {
    const project = this.project();

    if (!project) {
      return [];
    }

    const textSlide: DetailSlide[] = this.hasTextSlide() ? [{ kind: 'text', id: 'text' }] : [];

    return [
      ...textSlide,
      ...project.images.map((image) => ({
        kind: 'image' as const,
        id: image.id,
        image,
      })),
    ];
  });
  protected readonly currentSlide = computed(() => this.slides()[this.currentSlideIndex()] ?? null);
  protected readonly currentSlideNumber = computed(() => {
    const slides = this.slides();

    if (!slides.length) {
      return '0/0';
    }

    return `${this.currentSlideIndex() + 1}/${slides.length}`;
  });
  protected readonly splitCoordinate = splitCoordinate;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.syncFrame !== null) {
        cancelAnimationFrame(this.syncFrame);
      }
    });

    effect(() => {
      const slides = this.slides();
      const maxIndex = Math.max(0, slides.length - 1);
      const nextIndex = clampIndex(this.requestedSlide(), maxIndex);
      this.currentSlideIndex.set(nextIndex);

      if (!this.syncFromRoute || !slides.length || !this.project()) {
        return;
      }

      requestAnimationFrame(() => {
        this.scrollToSlide(nextIndex, 'auto');
      });
    });
  }

  protected isActiveSlide(index: number): boolean {
    return index === this.currentSlideIndex();
  }

  protected slideAriaLabel(index: number): string {
    return `Slide ${index + 1}`;
  }

  protected handleViewportKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      this.previousSlide();
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
      event.preventDefault();
      this.nextSlide();
    }
  }

  protected handleViewportTouchStart(): void {
    this.allowScrollRouteUpdate = true;
  }

  protected handleViewportPointerDown(event: PointerEvent): void {
    if (window.matchMedia('(max-width: 720px)').matches) {
      return;
    }

    this.allowScrollRouteUpdate = true;
    this.isDragging = false;
    this.suppressClick = false;
    this.pointerStartX = event.clientX;
    this.scrollStartLeft = this.viewportRef().nativeElement.scrollLeft;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  protected handleViewportPointerMove(event: PointerEvent): void {
    if (!this.isPointerDown || window.matchMedia('(max-width: 720px)').matches) {
      return;
    }

    const delta = event.clientX - this.pointerStartX;

    if (Math.abs(delta) > 6) {
      this.isDragging = true;
      this.suppressClick = true;
    }

    if (!this.isDragging) {
      return;
    }

    this.viewportRef().nativeElement.scrollLeft = this.scrollStartLeft - delta;
  }

  protected handleViewportPointerUp(event: PointerEvent): void {
    if (!this.isPointerDown) {
      return;
    }

    this.isPointerDown = false;
    const viewport = event.currentTarget as HTMLElement;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    if (this.isDragging) {
      this.snapToNearestSlide();
    }

    this.isDragging = false;
  }

  protected handleViewportScroll(): void {
    if (this.syncFrame !== null) {
      cancelAnimationFrame(this.syncFrame);
    }

    this.syncFrame = requestAnimationFrame(() => {
      this.syncFrame = null;

      if (!this.allowScrollRouteUpdate) {
        return;
      }

      const nearestIndex = this.getNearestSlideIndex();

      if (nearestIndex === this.currentSlideIndex()) {
        return;
      }

      this.currentSlideIndex.set(nearestIndex);

      if (this.syncFromRoute) {
        this.updateRoute(nearestIndex);
      }
    });
  }

  protected handleViewportWheel(event: WheelEvent): void {
    if (window.matchMedia('(max-width: 720px)').matches) {
      return;
    }

    if (this.currentSlide()?.kind === 'text') {
      return;
    }

    const viewport = this.viewportRef().nativeElement;

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }

    this.allowScrollRouteUpdate = true;
    event.preventDefault();
    viewport.scrollLeft += event.deltaY;
  }

  protected handleViewportClick(event: MouseEvent): void {
    if (window.matchMedia('(max-width: 720px)').matches) {
      return;
    }

    if (this.suppressClick) {
      this.suppressClick = false;
      return;
    }

    const target = event.target;

    if (target instanceof HTMLElement && target.closest('button, a')) {
      return;
    }

    const bounds = this.viewportRef().nativeElement.getBoundingClientRect();
    const edgeWidth = bounds.width * 0.18;
    const offsetX = event.clientX - bounds.left;

    if (offsetX < edgeWidth) {
      this.previousSlide();
      return;
    }

    if (offsetX > bounds.width - edgeWidth) {
      this.nextSlide();
      return;
    }

    this.snapToNearestSlide();
  }

  protected previousSlide(): void {
    const slides = this.slides();

    if (!slides.length) {
      return;
    }

    const nextIndex = (this.currentSlideIndex() - 1 + slides.length) % slides.length;
    this.setSlide(nextIndex, 'smooth');
  }

  protected nextSlide(): void {
    const slides = this.slides();

    if (!slides.length) {
      return;
    }

    const nextIndex = (this.currentSlideIndex() + 1) % slides.length;
    this.setSlide(nextIndex, 'smooth');
  }

  protected trackSlide(_: number, slide: DetailSlide): string {
    return slide.id;
  }

  private setSlide(index: number, behavior: ScrollBehavior): void {
    const nextIndex = clampIndex(index, Math.max(0, this.slides().length - 1));
    this.currentSlideIndex.set(nextIndex);
    this.scrollToSlide(nextIndex, behavior);
    this.updateRoute(nextIndex);
  }

  private snapToNearestSlide(): void {
    this.setSlide(this.getNearestSlideIndex(), 'smooth');
  }

  private getNearestSlideIndex(): number {
    const viewport = this.viewportRef().nativeElement;
    const slides = Array.from(viewport.querySelectorAll<HTMLElement>('[data-slide-index]'));

    if (!slides.length) {
      return 0;
    }

    const isMobile = window.matchMedia('(max-width: 720px)').matches;
    const viewportCenter = isMobile
      ? viewport.scrollTop + viewport.clientHeight / 2
      : viewport.scrollLeft + viewport.clientWidth / 2;
    let closestIndex = 0;
    let smallestDistance = Number.POSITIVE_INFINITY;

    for (const slide of slides) {
      const index = Number.parseInt(slide.dataset['slideIndex'] ?? '0', 10);
      const slideCenter = isMobile
        ? slide.offsetTop + slide.offsetHeight / 2
        : slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    }

    return closestIndex;
  }

  private scrollToSlide(index: number, behavior: ScrollBehavior): void {
    const viewport = this.viewportRef().nativeElement;
    const slide = viewport.querySelector<HTMLElement>(`[data-slide-index="${index}"]`);

    if (!slide) {
      return;
    }

    if (window.matchMedia('(max-width: 720px)').matches) {
      viewport.scrollTo({ top: Math.max(0, slide.offsetTop - viewport.offsetTop - 8), behavior });
      return;
    }

    const left = slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2;
    viewport.scrollTo({ left, behavior });
  }

  private updateRoute(index: number): void {
    this.syncFromRoute = false;
    void this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: { slide: index + 1 },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      })
      .finally(() => {
        this.syncFromRoute = true;
      });
  }
}

function parseRequestedSlide(value: string | null): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed - 1 : 0;
}

function clampIndex(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}
