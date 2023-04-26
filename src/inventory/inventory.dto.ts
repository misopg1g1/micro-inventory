import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InventoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly product_id: string;
  @ApiProperty()
  @IsNumber()
  readonly stock: number;
  @ApiProperty()
  @IsNotEmpty()
  readonly warehouse_id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly created_at: string;
  @ApiProperty()
  @IsDateString()
  readonly update_at: string;
}

export class InventoryModifyDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;
}

export class InventoryCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly product_id: string;
  @ApiProperty()
  @IsNumber()
  readonly stock: number;
}
