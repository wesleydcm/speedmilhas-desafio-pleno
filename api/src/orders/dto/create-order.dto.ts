import { IsString, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  quoteId: string;

  @IsString()
  @IsNotEmpty()
  passageiro: string;

  @IsString()
  @IsNotEmpty()
  idempotencyKey: string;
}
