import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { siteData } from '../../content/site.data';
import { CoordinateParts } from '../../shared/utils/coordinates';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {
  private readonly pointerX = signal(0.5);
  private readonly pointerY = signal(0.5);

  protected readonly siteTitle = siteData.siteTitle;
  protected readonly landing = siteData.landing;
  protected readonly latitude = computed(() =>
    this.buildCoordinateParts(this.landing.latitude, this.pointerY(), this.pointerX(), 0.032, 0.284),
  );
  protected readonly longitude = computed(() =>
    this.buildCoordinateParts(
      this.landing.longitude,
      1 - this.pointerX(),
      this.pointerY(),
      0.028,
      0.216,
    ),
  );
  protected readonly accentTransform = computed(() => {
    const xOffset = (this.pointerX() - 0.5) * 5.2;
    const yOffset = (this.pointerY() - 0.5) * 3.6;

    return `translate3d(${xOffset.toFixed(2)}rem, ${yOffset.toFixed(2)}rem, 0)`;
  });

  protected trackPointer(event: MouseEvent): void {
    this.pointerX.set(clamp(event.clientX / window.innerWidth));
    this.pointerY.set(clamp(event.clientY / window.innerHeight));
  }

  private buildCoordinate(
    baseValue: string,
    primaryRatio: number,
    secondaryRatio: number,
    range: number,
  ): string {
    const baseNumber = Number.parseFloat(baseValue);
    const offset = (primaryRatio - 0.5) * range + (secondaryRatio - 0.5) * range * 0.38;

    return (baseNumber + offset).toFixed(6);
  }

  private buildCoordinateParts(
    baseValue: string,
    primaryRatio: number,
    secondaryRatio: number,
    majorRange: number,
    minorRange: number,
  ): CoordinateParts {
    const slowValue = this.buildCoordinate(baseValue, primaryRatio, secondaryRatio, majorRange);
    const fastValue = this.buildCoordinate(baseValue, primaryRatio, secondaryRatio, minorRange);
    const [slowWhole = '00', slowFraction = '000'] = slowValue.split('.');
    const [, fastFraction = '000000'] = fastValue.split('.');

    return {
      major: `${slowWhole}.${slowFraction.slice(0, 3)}`,
      minor: fastFraction.slice(3, 6),
    };
  }
}

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}
