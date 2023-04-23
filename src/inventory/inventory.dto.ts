import { IsDateString, IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";

export class InventoryDto {
    @IsNotEmpty()
    @IsString()
    readonly product_id: string;
    @IsNumber()
    readonly stock: number;
    @IsNotEmpty()
    readonly warehouse_id: string;
    @IsNotEmpty()
    @IsDateString()
    readonly created_at: string;
    @IsDateString()
    readonly update_at: string;

}

export class InventoryModifyDto {
    @IsNumber()
    @IsNotEmpty()
    readonly stock: number;
}

export class InventoryCreateDto {
    @IsNotEmpty()
    @IsString()
    readonly product_id: string;
    @IsNumber()
    readonly stock: number;
}