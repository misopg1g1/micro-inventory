import { Module } from '@nestjs/common';
// import {TypeOrmModule} from '@nestjs/typeorm';
import { dbCongif } from './shared/config/dbconfig';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(dbCongif),
    HealthcheckModule,
    InventoryModule,
  ],
})
export class AppModule {}
