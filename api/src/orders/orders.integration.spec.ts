import "dotenv/config";
import { Test, TestingModule } from "@nestjs/testing";
import { OrdersService } from "./orders.service";
import { PrismaService } from "../prisma/prisma.service";

describe("OrdersService - Concorrência e Idempotência", () => {
  let service: OrdersService;
  let prisma: PrismaService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [OrdersService, PrismaService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  // Limpa o banco de dados de testes antes de começar
  beforeEach(async () => {
    await prisma.reservation.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await module.close();
  });

  it("deve processar múltiplas requisições simultâneas e criar apenas UMA reserva (Idempotência)", async () => {
    const idempotencyKey = `teste-concorrencia-${Date.now()}`;
    const payload = {
      quoteId: "latam-123",
      passageiro: "Wesley SpeedMilhas",
      idempotencyKey,
    };

    // 1. Dispara 3 requisições simultâneas (Sem usar 'await' ainda)
    const promise1 = service.create(payload);
    const promise2 = service.create(payload);
    const promise3 = service.create(payload);

    // 2. Aguarda todas terminarem de competir no banco de dados
    const [resultado1, resultado2, resultado3] = await Promise.all([
      promise1,
      promise2,
      promise3,
    ]);

    // 3. Verifica se todas receberam sucesso
    expect(resultado1.ok).toBe(true);
    expect(resultado2.ok).toBe(true);
    expect(resultado3.ok).toBe(true);

    // 4. Verifica se as 3 requisições retornaram EXATAMENTE a mesma reserva (mesmo ID)
    expect(resultado1.reservation.id).toEqual(resultado2.reservation.id);
    expect(resultado2.reservation.id).toEqual(resultado3.reservation.id);

    // 5. A PROVA FINAL: Verifica direto no banco de dados se só existe 1 registro
    const countNoBanco = await prisma.reservation.count({
      where: { idempotencyKey },
    });

    expect(countNoBanco).toBe(1);
  });
});
