import { Module } from "@nestjs/common";
import { SupplierAAdapter } from "./adapters/supplier-a.adapter";

@Module({
  providers: [SupplierAAdapter],
  exports: [SupplierAAdapter],
})
export class SuppliersModule {}
