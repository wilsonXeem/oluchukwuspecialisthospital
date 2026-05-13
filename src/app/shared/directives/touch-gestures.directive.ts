import { Directive, ElementRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTouchGestures]'
})
export class TouchGesturesDirective implements OnInit, OnDestroy {
  @Output() swipeLeft = new EventEmitter<void>();
  @Output() swipeRight = new EventEmitter<void>();
  @Output() swipeUp = new EventEmitter<void>();
  @Output() swipeDown = new EventEmitter<void>();
  @Output() tap = new EventEmitter<void>();
  @Output() doubleTap = new EventEmitter<void>();

  private startX = 0;
  private startY = 0;
  private lastTap = 0;
  private threshold = 50;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
    this.el.nativeElement.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: true });
  }

  ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener('touchstart', this.onTouchStart);
    this.el.nativeElement.removeEventListener('touchend', this.onTouchEnd);
  }

  private onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }

  private onTouchEnd(event: TouchEvent): void {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;

    if (Math.abs(deltaX) < this.threshold && Math.abs(deltaY) < this.threshold) {
      this.handleTap();
      return;
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > this.threshold) {
        this.swipeRight.emit();
      } else if (deltaX < -this.threshold) {
        this.swipeLeft.emit();
      }
    } else {
      if (deltaY > this.threshold) {
        this.swipeDown.emit();
      } else if (deltaY < -this.threshold) {
        this.swipeUp.emit();
      }
    }
  }

  private handleTap(): void {
    const now = Date.now();
    if (now - this.lastTap < 300) {
      this.doubleTap.emit();
    } else {
      setTimeout(() => {
        if (Date.now() - this.lastTap >= 300) {
          this.tap.emit();
        }
      }, 300);
    }
    this.lastTap = now;
  }
}