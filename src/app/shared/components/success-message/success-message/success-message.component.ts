import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {
  @Input() message: string = '';
  @Input() autoDismiss: boolean = true;
  @Input() dismissTime: number = 5000;
  @Output() dismissed = new EventEmitter<void>();
  
  show = true;

  ngOnInit(): void {
    if (this.autoDismiss) {
      setTimeout(() => this.dismiss(), this.dismissTime);
    }
  }

  dismiss(): void {
    this.show = false;
    this.dismissed.emit();
  }
}