import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appKeyboardNavigation]'
})
export class KeyboardNavigationDirective implements OnInit, OnDestroy {
  @Input() navigationGroup?: string;
  @Input() skipOnFocus = false;

  private keydownListener?: (event: KeyboardEvent) => void;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setupKeyboardNavigation();
  }

  ngOnDestroy(): void {
    if (this.keydownListener) {
      document.removeEventListener('keydown', this.keydownListener);
    }
  }

  private setupKeyboardNavigation(): void {
    const element = this.el.nativeElement;
    
    // Make element focusable if not already
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }

    this.keydownListener = (event: KeyboardEvent) => {
      if (document.activeElement !== element && !element.contains(document.activeElement)) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.navigateToSibling('previous');
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.navigateToSibling('next');
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.navigateToSibling('previous');
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.navigateToSibling('next');
          break;
        case 'Home':
          event.preventDefault();
          this.navigateToFirst();
          break;
        case 'End':
          event.preventDefault();
          this.navigateToLast();
          break;
        case 'Enter':
        case ' ':
          if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
            event.preventDefault();
            element.click();
          }
          break;
        case 'Escape':
          element.blur();
          break;
      }
    };

    document.addEventListener('keydown', this.keydownListener);

    // Add focus styles
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid #007bff';
      element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
      element.style.outline = 'none';
    });
  }

  private navigateToSibling(direction: 'next' | 'previous'): void {
    const focusableElements = this.getFocusableElements();
    const currentIndex = focusableElements.indexOf(this.el.nativeElement);
    
    if (currentIndex === -1) return;

    let targetIndex: number;
    if (direction === 'next') {
      targetIndex = (currentIndex + 1) % focusableElements.length;
    } else {
      targetIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
    }

    focusableElements[targetIndex]?.focus();
  }

  private navigateToFirst(): void {
    const focusableElements = this.getFocusableElements();
    focusableElements[0]?.focus();
  }

  private navigateToLast(): void {
    const focusableElements = this.getFocusableElements();
    focusableElements[focusableElements.length - 1]?.focus();
  }

  private getFocusableElements(): HTMLElement[] {
    const selector = this.navigationGroup 
      ? `[appKeyboardNavigation="${this.navigationGroup}"]`
      : '[appKeyboardNavigation]';
    
    return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  }
}