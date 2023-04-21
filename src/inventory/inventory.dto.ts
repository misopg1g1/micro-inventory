import { IsDateString, IsNotEmpty, IsNumber, isNotEmpty } from "class-validator";

export class InventoryDto {
    @IsNotEmpty()
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