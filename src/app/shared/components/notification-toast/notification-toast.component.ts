import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification-toast',
  templateUrl: './notification-toast.component.html',
  styleUrls: ['./notification-toast.component.css']
})
export class NotificationToastComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() title?: string;
  @Input() message = '';
  @Input() visible = true;
  @Input() closable = true;
  @Input() autoClose = true;
  @Input() duration = 5000;
  
  @Output() closed = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.autoClose) {
      setTimeout(() => this.close(), this.duration);
    }
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
  }
}