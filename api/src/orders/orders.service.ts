import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderInput, OrderResponse } from "./interfaces/order.interface";

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateOrderInput): Promise<OrderResponse> {
    try {
      const reservation = await this.prisma.reservation.create({
        data: {
          quoteId: input.quoteId,
          passengerName: input.passageiro,
          idempotencyKey: input.idempotencyKey,
        },
      });

      this.logger.log(
        `Nova reserva criada com sucesso: ${reservation.idempotencyKey}`,
      );

      return {
        ok: true,
        reservation: {
          id: reservation.id,
          quoteId: reservation.quoteId,
          passengerName: reservation.passengerName,
          idempotencyKey: reservation.idempotencyKey,
          status: reservation.status,
          createdAt: reservation.createdAt.toISOString(),
          updatedAt: reservation.updatedAt.toISOString(),
        },
      };
    } catch (error: any) {
      // Prisma error code P2002 = unique constraint violation
      if (error?.code === "P2002") {
        const existing = await this.prisma.reservation.findUnique({
          where: { idempotencyKey: input.idempotencyKey },
        });

        if (existing) {
          this.logger.log(
            `Reserva duplicada encontrada: ${existing.idempotencyKey}. Retornando a mesma resposta.`,
          );

          return {
            ok: true,
            reservation: {
              id: existing.id,
              quoteId: existing.quoteId,
              passengerName: existing.passengerName,
              idempotencyKey: existing.idempotencyKey,
              status: existing.status,
              createdAt: existing.createdAt.toISOString(),
              updatedAt: existing.updatedAt.toISOString(),
            },
          };
        }
      }

      throw error;
    }
  }
}
