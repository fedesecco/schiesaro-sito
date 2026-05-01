import { Component, inject } from '@angular/core';
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

  protected openProject(slug: string, imageIndex?: number): void {
    const queryParams = imageIndex === undefined ? {} : { slide: imageIndex + 1 };
    void this.router.navigate(['/projects', slug], { queryParams });
  }
}
