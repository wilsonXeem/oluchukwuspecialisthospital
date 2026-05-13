import { Component, Input } from '@angular/core';

interface ReceiptItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface PatientInfo {
  name: string;
  id: string;
}

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {
  @Input() receiptNumber: string = '';
  @Input() receiptDate: Date = new Date();
  @Input() patientInfo?: PatientInfo;
  @Input() items: ReceiptItem[] = [];
  @Input() totalAmount: number = 0;

  print(): void {
    window.print();
  }
}