import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appAccessibility]'
})
export class AccessibilityDirective implements OnInit {
  @Input() ariaLabel?: string;
  @Input() role?: string;
  @Input() tabIndex?: number;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;
    
    if (this.ariaLabel) {
      element.setAttribute('aria-label', this.ariaLabel);
    }
    
    if (this.role) {
      element.setAttribute('role', this.role);
    }
    
    if (this.tabIndex !== undefined) {
      element.setAttribute('tabindex', this.tabIndex.toString());
    }
    
    if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
      this.addKeyboardSupport(element);
    }
    
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid #007bff';
      element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
      element.style.outline = 'none';
    });
  }

  private addKeyboardSupport(element: HTMLElement): void {
    element.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        element.click();
      }
    });
  }
}