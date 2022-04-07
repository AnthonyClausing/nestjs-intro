import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    // add private so the argument is stored in an equally named property
    // readonly makes clear you can't change the value of the property (productsService)
    constructor(private readonly productsService: ProductsService){}
    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }
    // since there are two Get requests, you must include a path parameter
    // otherwise the top one will be used ALWAYS
    @Get('/:productId')
    getProduct(@Param('productId') prodId: string) {
        return this.productsService.getSingleProduct(prodId); 
    }

    @Post()
    addProduct(@Body('title') prodTitle:string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        return this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
    }

    @Patch('/:productId')
    updateProduct(@Param('productId') prodId: string, @Body('title') prodTitle?: string, @Body('description') prodDesc?: string, @Body('price') prodPrice?: number) {
        return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    }
    
    @Delete('/:productId')
    deleteProduct(@Param('productId') prodId: string) {
        return this.productsService.deleteProduct(prodId);
    }
}