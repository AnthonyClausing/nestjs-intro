import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Product } from "./products.model";

@Injectable()
export class ProductsService {
    // add private so products array is only available to the service
    // and service methods are the only thing that can interact with it
    private products: Product[] = [];
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {
        // this.products = [
        //     new Product('1', 'First Product', 'This is the first product', 100),
        //     new Product('2', 'Second Product', 'This is the second product', 200),
        //     new Product('3', 'Third Product', 'This is the third product', 300),
        // ];
    }
    private transformProduct(product: Product): Product {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        } as Product;
    }
    private async findProduct(productId:string): Promise<Product> {
        const product = await this.productModel.findById(productId).exec();
        return product;
    }

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find().exec();
        return products.map(prod => this.transformProduct(prod));
    }
    async getSingleProduct(productId: string): Promise<Product> {
        try {
            const product = await this.findProduct(productId);
            return this.transformProduct(product);
        } catch(e:any){
            throw new NotFoundException('Could not find product');
        }
    }
    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({title, description, price});
        const result = await newProduct.save();
        return this.transformProduct(result);
    }
    async updateProduct(productId: string, title?: string, description?: string, price?: number) {
        const updatedProduct= await this.findProduct(productId);
        if(title) {
            updatedProduct.title = title;
        }
        if(description) {
            updatedProduct.description = description;
        }
        if(price) {
            updatedProduct.price = price;
        }
        updatedProduct.save()
    }
    async deleteProduct(productId: string) {
        const result = await this.productModel.deleteOne({_id: productId}).exec();
        console.log(result)
        if(result.deletedCount === 0) {
            throw new NotFoundException('Could not find product');
        }
    }
}