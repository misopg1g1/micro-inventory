import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryEntity } from './inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService],
  imports: [TypeOrmModule.forFeature([InventoryEntity])],
})
export class InventoryModule {}
