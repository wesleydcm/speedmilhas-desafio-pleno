import { Body, Controller, Post, HttpCode } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create({
      quoteId: dto.quoteId,
      passageiro: dto.passageiro,
      idempotencyKey: dto.idempotencyKey,
    });
  }
}
