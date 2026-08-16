import { Module } from '@nestjs/common';
import { SuppliersModule } from './suppliers/suppliers.module';
import { SearchModule } from './search/search.module';

/**
 * Este módulo está vazio de propósito.
 *
 * A forma como você organiza o código — em quantos módulos, onde mora a
 * normalização dos fornecedores, onde mora a regra de idempotência — é parte
 * do que está sendo avaliado. Não existe estrutura "certa" esperada aqui.
 */
@Module({
  imports: [SuppliersModule, SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
