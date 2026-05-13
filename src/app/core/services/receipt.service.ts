import { Injectable } from '@angular/core';

export interface ReceiptData {
  type: 'consultation' | 'lab' | 'pharmacy';
  patientName: string;
  patientCode: string;
  items: ReceiptItem[];
  totalAmount: number;
  paymentMethod: string;
  referenceNo: string;
  date: Date;
  facilityName: string;
}

export interface ReceiptItem {
  name: string;
  quantity?: number;
  price: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  generateReceipt(data: ReceiptData): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const receiptHtml = this.buildReceiptHtml(data);
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
    printWindow.print();
  }

  private buildReceiptHtml(data: ReceiptData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${data.referenceNo}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
          .details { margin: 20px 0; }
          .items { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .items th, .items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .items th { background-color: #f2f2f2; }
          .total { font-weight: bold; font-size: 18px; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>${data.facilityName}</h2>
          <h3>${data.type.toUpperCase()} RECEIPT</h3>
        </div>
        
        <div class="details">
          <p><strong>Patient:</strong> ${data.patientName} (${data.patientCode})</p>
          <p><strong>Date:</strong> ${data.date.toLocaleDateString()}</p>
          <p><strong>Reference:</strong> ${data.referenceNo}</p>
          <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        </div>

        <table class="items">
          <thead>
            <tr>
              <th>Item</th>
              ${data.type === 'pharmacy' ? '<th>Qty</th>' : ''}
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map(item => `
              <tr>
                <td>${item.name}</td>
                ${data.type === 'pharmacy' ? `<td>${item.quantity || 1}</td>` : ''}
                <td>₦${item.total.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="total">
          <p>Total Amount: ₦${data.totalAmount.toFixed(2)}</p>
        </div>

        <div class="footer">
          <p>Thank you for choosing ${data.facilityName}</p>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `;
  }
}