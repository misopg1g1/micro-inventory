import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import {
  InventoryDto,
  InventoryModifyDto,
  InventoryCreateDto,
} from './inventory.dto';
import { InventoryEntity } from './inventory.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptors';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller()
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get('inventories')
  async findAll() {
    return await this.inventoryService.findAll();
  }

  @Get('products/:productId/inventory')
  async findOne(@Param('productId') productId: string) {
    return await this.inventoryService.findOne(productId);
  }

  @ApiBody({})
  @Post('inventories')
  async create(@Body() inventoryCreateDto: InventoryCreateDto) {
    const inventoryDto: InventoryDto = {
      product_id: inventoryCreateDto.product_id,
      stock: inventoryCreateDto.stock,
      warehouse_id: '1',
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
    };
    const inventory: InventoryEntity = plainToInstance(
      InventoryEntity,
      inventoryDto,
    );
    return this.inventoryService.create(inventory);
  }

  @ApiBody({})
  @Put('products/:productId/inventory')
  async update(
    @Param('productId') productId: string,
    @Body() inventoryModifyDto: InventoryModifyDto,
  ) {
    const storedInventory: InventoryEntity =
      await this.inventoryService.findOne(productId);
    const inventoryDto: InventoryDto = {
      product_id: 'productId',
      stock: storedInventory.stock + inventoryModifyDto.stock,
      warehouse_id: storedInventory.warehouse_id,
      created_at: storedInventory.created_at,
      update_at: new Date().toISOString(),
    };
    const inventory: InventoryEntity = plainToInstance(
      InventoryEntity,
      inventoryDto,
    );
    inventory.product_id = productId;
    return this.inventoryService.update(productId, inventory);
  }
}
