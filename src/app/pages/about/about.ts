import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly siteTitle = 'KOPIO OFFICE';
  protected readonly about = {
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
}
