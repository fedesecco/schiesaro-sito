import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { siteData } from '../../content/site.data';
import { splitCoordinate } from '../../shared/utils/coordinates';

@Component({
  selector: 'app-about-page',
  imports: [RouterLink],
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent {
  protected readonly siteTitle = siteData.siteTitle;
  protected readonly about = siteData.about;
  protected readonly splitCoordinate = splitCoordinate;
}
