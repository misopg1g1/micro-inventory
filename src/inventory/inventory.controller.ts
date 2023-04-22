import { Body, Controller, Get, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { InventoryDto } from './inventory.dto';
import { InventoryEntity } from './inventory.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptors';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('inventories')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}
  @ApiBody({})
  @Get()
  async findAll() {
    return await this.inventoryService.findAll();
  }

  @ApiBody({})
  @Get(':productId')
  async findOne(@Param('productId') productId: string) {
    return await this.inventoryService.findOne(productId);
  }

  @ApiBody({})
  @Post()
  async create(@Body() inventoryDto: InventoryDto) {
    const inventory: InventoryEntity = plainToInstance(InventoryEntity, inventoryDto);
    return this.inventoryService.create(inventory);
  }

  @ApiBody({})
  @Put(':productId')
  async update(@Param('productId') productId: string, @Body() inventoryDto: InventoryDto) {
    const inventory: InventoryEntity = plainToInstance(InventoryEntity, inventoryDto)
    return this.inventoryService.update(productId, inventory);
  }

  // @ApiBody({})
  // @Patch()
  // async inventory_patch(@Body() body: any) {
  //   return this.inventoryService.mockLogic(body);
  // }
}
