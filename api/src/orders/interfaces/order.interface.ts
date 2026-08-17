export interface CreateOrderInput {
  quoteId: string;
  passageiro: string;
  idempotencyKey: string;
}

export interface OrderResponse {
  ok: boolean;
  reservation: {
    id: string;
    quoteId: string;
    passengerName: string;
    idempotencyKey: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  duplicate?: boolean;
}
