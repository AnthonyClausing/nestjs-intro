import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsService {
    // add private so products array is only available to the service
    // and service methods are the only thing that can interact with it
    private products: Product[] = [];
    
    private findProduct(productId:string) {
        return this.products.find(prod => prod.id === productId)
    }
    getProducts(): Product[] {
        return [...this.products];
    }
    getSingleProduct(productId: string): Product {
        const product = this.findProduct(productId);
        if(!product) {
            // can not just throw new Error, for nestsjs need to use the Exception classes
            throw new NotFoundException('Product not found');
        }
        return {...product};
    }
    insertProduct(title: string, description: string, price: number) {
        const prodId = new Date().valueOf().toString(); //not perfect, you could create two products with the same id, but for this demo, a date string is fine
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return newProduct;
    }
    updateProduct(productId: string, title?: string, description?: string, price?: number) {
        const product= this.findProduct(productId);
        const updatedProduct = {...product};
        if(title) {
            updatedProduct.title = title;
        }
        if(description) {
            updatedProduct.description = description;
        }
        if(price) {
            updatedProduct.price = price;
        }
        this.products = this.products.map(prod => prod.id === productId ? updatedProduct : prod);
        return updatedProduct;
    }
    deleteProduct(productId: string) {
        const product = this.findProduct(productId);
        this.products = this.products.filter(prod => prod.id !== productId);
        return {...product};
    }
}