import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { SuppliersModule } from "src/suppliers/suppliers.module";

@Module({
  imports: [SuppliersModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
