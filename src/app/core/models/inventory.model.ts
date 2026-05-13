export interface InventoryItem {
  id: string;
  facilityId: string;
  name: string;
  category?: string;
  unit?: string;
  minStockLevel: number;
  createdAt: Date;
}

export interface InventoryBatch {
  id: string;
  itemId: string;
  batchNumber: string;
  quantity: number;
  expiryDate: Date;
  receivedDate: Date;
  supplier?: string;
  costPrice?: number;
  sellingPrice?: number;
  createdAt: Date;
}

export interface CreateInventoryItemRequest {
  name: string;
  category?: string;
  unit?: string;
  minStockLevel?: number;
}

export interface CreateBatchRequest {
  itemId: string;
  batchNumber: string;
  quantity: number;
  expiryDate: Date;
  supplier?: string;
  costPrice?: number;
  sellingPrice?: number;
}