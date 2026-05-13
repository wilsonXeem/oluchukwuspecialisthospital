import { Component, OnInit } from '@angular/core';
import { ToastService, Toast } from '../../../../shared/components/toast/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.css']
})
export class ToastContainerComponent implements OnInit {
  toasts$: Observable<Toast[]>;

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.toasts$;
  }

  ngOnInit(): void {}

  removeToast(id: string): void {
    this.toastService.remove(id);
  }
}