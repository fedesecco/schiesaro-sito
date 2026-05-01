import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { getProjectBySlug } from '../../content/projects-data';
import { ProjectMedia } from '../../models/site-content.model';
import { splitCoordinate } from '../../shared/utils/coordinates';

type DetailSlide = { kind: 'text'; id: 'text' } | { kind: 'image'; id: string; image: ProjectMedia };

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.html',
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });
  private readonly requestedSlide = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => Number.parseInt(params.get('slide') ?? '0', 10)),
    ),
    {
      initialValue: Number.parseInt(this.route.snapshot.queryParamMap.get('slide') ?? '0', 10),
    },
  );
  private readonly currentSlideIndex = signal(0);

  protected readonly siteTitle = 'KOPIO OFFICE';
  protected readonly project = computed(() => getProjectBySlug(this.slug()));
  protected readonly slides = computed<DetailSlide[]>(() => {
    const project = this.project();

    if (!project) {
      return [];
    }

    return [
      { kind: 'text', id: 'text' },
      ...project.images.map((image) => ({
        kind: 'image' as const,
        id: image.id,
        image,
      })),
    ];
  });
  protected readonly currentSlide = computed(() => this.slides()[this.currentSlideIndex()] ?? null);
  protected readonly currentImageSlide = computed(() => {
    const slide = this.currentSlide();
    return slide?.kind === 'image' ? slide : null;
  });
  protected readonly currentSlideNumber = computed(() => {
    const slides = this.slides();

    if (!slides.length) {
      return '0/0';
    }

    return `${this.currentSlideIndex() + 1}/${slides.length}`;
  });
  protected readonly railBackground = computed(() => {
    const slides = this.slides();

    if (!slides.length) {
      return 'none';
    }

    const nextSlide = slides[(this.currentSlideIndex() + 1) % slides.length];

    if (nextSlide.kind === 'image') {
      return `url("${nextSlide.image.src}")`;
    }

    return 'none';
  });
  protected readonly splitCoordinate = splitCoordinate;

  constructor() {
    effect(() => {
      const maxIndex = Math.max(0, this.slides().length - 1);
      const requestedIndex = Number.isFinite(this.requestedSlide()) ? this.requestedSlide() : 0;

      this.currentSlideIndex.set(clampIndex(requestedIndex, maxIndex));
    });
  }

  protected handleSurfaceClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.closest('button, a')) {
      return;
    }

    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const isPreviousHit = event.clientX - bounds.left < bounds.width / 2;

    if (isPreviousHit) {
      this.previousSlide();
      return;
    }

    this.nextSlide();
  }

  protected previousSlide(): void {
    const slides = this.slides();

    if (!slides.length) {
      return;
    }

    const nextIndex = (this.currentSlideIndex() - 1 + slides.length) % slides.length;
    this.setSlide(nextIndex);
  }

  protected nextSlide(): void {
    const slides = this.slides();

    if (!slides.length) {
      return;
    }

    const nextIndex = (this.currentSlideIndex() + 1) % slides.length;
    this.setSlide(nextIndex);
  }

  private setSlide(index: number): void {
    this.currentSlideIndex.set(index);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { slide: index },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}

function clampIndex(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}
