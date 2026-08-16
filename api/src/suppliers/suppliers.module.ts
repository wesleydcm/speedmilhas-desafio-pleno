import { Module } from "@nestjs/common";
import { SupplierAAdapter } from "./adapters/supplier-a.adapter";
import { SupplierBAdapter } from "./adapters/supplier-b.adapter";
import { SupplierCAdapter } from "./adapters/supplier-c.adapter";

@Module({
  providers: [SupplierAAdapter, SupplierBAdapter, SupplierCAdapter],
  exports: [SupplierAAdapter, SupplierBAdapter, SupplierCAdapter],
})
export class SuppliersModule {}
