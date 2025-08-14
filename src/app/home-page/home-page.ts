import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage implements AfterViewInit, OnDestroy {
  protected readonly COLORS = [
    '#ff5555',
    '#55ff55',
    '#5555ff',
    '#ffaa00',
    '#00aaff',
    '#aa00ff',
    '#ff00aa',
  ];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  private contentHeight = 0;
  private isResetting = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupInfiniteScroll();
    }, 100);
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  private setupInfiniteScroll() {
    const container = this.scrollContainer.nativeElement;
    const content = container.querySelector('.content') as HTMLElement;

    if (!content) return;

    // Clone the content to create seamless loop
    const clone = content.cloneNode(true) as HTMLElement;
    container.appendChild(clone);

    // Get height after clone is added
    this.contentHeight = content.offsetHeight;
  }

  onContainerScroll() {
    if (this.isResetting) return;

    const container = this.scrollContainer.nativeElement;
    const scrollTop = container.scrollTop;
    const maxScroll = container.scrollHeight - container.clientHeight;

    // If we've scrolled to the end, reset to beginning
    if (scrollTop >= maxScroll) {
      this.isResetting = true;
      container.scrollTop = 0;
      setTimeout(() => {
        this.isResetting = false;
      }, 10);
    }

    // If somehow we scroll past our content height, reset
    if (scrollTop >= this.contentHeight && !this.isResetting) {
      this.isResetting = true;
      container.scrollTop = scrollTop - this.contentHeight;
      setTimeout(() => {
        this.isResetting = false;
      }, 10);
    }
  }
}
