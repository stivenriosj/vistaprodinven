export interface InventoryAttributes {
  productId: number;
  quantity: number;
}

export interface InventoryResponse {
  data: {
    type: string;
    id: string;
    attributes: InventoryAttributes;
  };
}
