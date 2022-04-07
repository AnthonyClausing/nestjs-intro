require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule, 
    MongooseModule.forRoot(
      `mongodb+srv://AnthonyClausing:${process.env.DATABASE_PASSWORD}@cluster0.yhqgy.mongodb.net/nestjs-intro?retryWrites=true&w=majority`
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
