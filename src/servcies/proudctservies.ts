import mongoose from "mongoose";
import Productmodel from "../models/proudctmodel";
export async function getallproduct(){
    return await Productmodel.find()
}
export async function makefakeproduct(){
    const product=
    
        
        [
            {
                name: 'Product 1',
                price: 10,
                stock: 100,
                image: 'https://example.com/product1.jpg',
            },
            {
                name: 'Product 2',
                price: 20,
                stock: 50,
                image: 'https://example.com/product2.jpg',
            },
            {
                name: 'Product 3',
                price: 30,
                stock: 75,
                image: 'https://example.com/product3.jpg',
            },
            {
                name: 'Product 4',
                price: 40,
                stock: 25,
                image: 'https://example.com/product4.jpg',
            },
            {
                name: 'Product 5',
                price: 50,
                stock: 10,
                image: 'https://example.com/product5.jpg',
            },
        
        ];
    
    
if (await Productmodel.countDocuments() > 0) {

    return;
  }
    return await Productmodel.insertMany(product)
 
}