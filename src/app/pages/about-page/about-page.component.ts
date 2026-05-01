import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { splitCoordinate } from '../../shared/utils/coordinates';

@Component({
  selector: 'app-about-page',
  imports: [RouterLink],
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent {
  protected readonly siteTitle = 'KOPIO OFFICE';
  protected readonly about = {
    coordinates: {
      latitude: '00.000000',
      longitude: '00.000000',
    },
    introduction:
      'Kopio Office is a multidisciplinary studio based in Italy, moving between architecture, interiors, temporary installations, and research-led spatial direction.',
    body:
      'This about page uses mock copy to reproduce the rhythm of the reference layout: a compact block of contacts, then a denser editorial paragraph set in a serif voice. The aim is not to finalize the content today, but to lock the structure and proportions of the page so the final writing can be swapped in later by editing this TypeScript object. The studio description can therefore grow, shrink, or change language without touching templates or component logic.',
    email: 'info@kopiooffice.com',
    cities: ['Milano', 'Vicenza'],
    countryCode: 'IT',
    contacts: [
      {
        name: 'Arch. Riccardo Modolo',
        email: 'riccardo@kopiooffice.com',
        phone: '+39 346 713 6711',
      },
      {
        name: 'Arch. Giacomo Schiesaro',
        email: 'giacomo@kopiooffice.com',
        phone: '+39 351 610 6882',
      },
    ],
  };
  protected readonly splitCoordinate = splitCoordinate;
}
