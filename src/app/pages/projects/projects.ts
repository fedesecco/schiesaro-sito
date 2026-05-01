import { afterNextRender, Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { projectsData } from '../../content/projects-data';
import { splitCoordinate } from '../../shared/utils/coordinates';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
})
export class ProjectsComponent {
  private readonly router = inject(Router);
  private readonly scrollerRef = viewChild.required<ElementRef<HTMLElement>>('scroller');
  private readonly loopCopiesCount = 3;

  protected readonly loopCopies = Array.from({ length: this.loopCopiesCount }, (_, index) => index);
  protected readonly siteTitle = 'KOPIO OFFICE';
  protected readonly home = {
    coordinates: {
      latitude: '45.793591',
      longitude: '12.391915',
    },
    heroPoster: '/mock/media/home-video-still.svg',
    heroLabel: 'Mock hero still for the fullscreen video area',
    heroEyebrow: 'Mock video loop',
  };
  protected readonly projects = projectsData;
  protected readonly splitCoordinate = splitCoordinate;

  constructor() {
    afterNextRender(() => {
      requestAnimationFrame(() => this.resetLoop());
    });
  }

  protected handleScroll(): void {
    const scroller = this.scrollerRef().nativeElement;
    const cycleHeight = this.getCycleHeight(scroller);

    if (!cycleHeight) {
      return;
    }

    if (scroller.scrollTop < cycleHeight * 0.35) {
      scroller.scrollTop += cycleHeight;
      return;
    }

    if (scroller.scrollTop > cycleHeight * 1.65) {
      scroller.scrollTop -= cycleHeight;
    }
  }

  protected openProject(slug: string, imageIndex?: number): void {
    const queryParams = imageIndex === undefined ? {} : { slide: imageIndex + 1 };
    void this.router.navigate(['/projects', slug], { queryParams });
  }

  private resetLoop(): void {
    const scroller = this.scrollerRef().nativeElement;
    const cycleHeight = this.getCycleHeight(scroller);

    if (cycleHeight > 0) {
      scroller.scrollTop = cycleHeight;
    }
  }

  private getCycleHeight(scroller: HTMLElement): number {
    return scroller.scrollHeight / this.loopCopies.length;
  }
}
