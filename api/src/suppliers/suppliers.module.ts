import { Module } from "@nestjs/common";
import { SupplierAAdapter } from "./adapters/supplier-a.adapter";
import { SupplierBAdapter } from "./adapters/supplier-b.adapter";

@Module({
  providers: [SupplierAAdapter, SupplierBAdapter],
  exports: [SupplierAAdapter, SupplierBAdapter],
})
export class SuppliersModule {}
