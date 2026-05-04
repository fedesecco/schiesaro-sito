import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import packageJson from '../../package.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  host: {
    '[attr.app-version]': 'appVersion',
  },
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly appVersion = packageJson.version;
}
