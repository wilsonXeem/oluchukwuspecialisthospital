export interface Payment {
  id: string;
  patientId: string;
  department?: string;
  referenceCode: string;
  amount: number;
  method: 'cash' | 'transfer';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  approvedBy?: string;
  refundAmount?: number;
  refundReason?: string;
  refundedBy?: string;
  refundedAt?: Date;
  createdAt: Date;
}

export interface CreatePaymentRequest {
  patientId: string;
  department?: string;
  amount: number;
  method: 'cash' | 'transfer';
  transactionId?: string;
}

export interface PaymentRefundRequest {
  refundAmount: number;
  refundReason: string;
}