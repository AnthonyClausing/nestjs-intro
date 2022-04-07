import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    // add private so the argument is stored in an equally named property
    // readonly makes clear you can't change the value of the property (productsService)
    constructor(private readonly productsService: ProductsService){}
    @Get()
    async getAllProducts() {
        return await this.productsService.getProducts();
    }
    // since there are two Get requests, you must include a path parameter
    // otherwise the top one will be used ALWAYS
    @Get('/:productId')
    async getProduct(@Param('productId') prodId: string) {
        return await this.productsService.getSingleProduct(prodId); 
    }

    @Post()
    async addProduct(@Body('title') prodTitle:string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        return await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
    }

    @Patch('/:productId')
    async updateProduct(@Param('productId') prodId: string, @Body('title') prodTitle?: string, @Body('description') prodDesc?: string, @Body('price') prodPrice?: number) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null
    }
    
    @Delete('/:productId')
    async deleteProduct(@Param('productId') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null
    }
}