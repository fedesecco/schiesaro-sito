import { afterNextRender, Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { projectsData, siteData } from '../../content/site.data';
import { splitCoordinate } from '../../shared/utils/coordinates';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private readonly router = inject(Router);
  private readonly scrollerRef = viewChild.required<ElementRef<HTMLElement>>('scroller');

  protected readonly cycleCopies = [0, 1, 2] as const;
  protected readonly siteTitle = siteData.siteTitle;
  protected readonly home = siteData.home;
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
    return scroller.scrollHeight / this.cycleCopies.length;
  }
}
