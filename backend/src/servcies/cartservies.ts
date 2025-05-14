import { IOrderitem } from './../models/ordermodel';

import Cartmodel, { statusenum } from "../models/cartmodel";
import Ordermodel from "../models/ordermodel";
import Productmodel, { IProduct } from "../models/proudctmodel";

const createnewcart = async (userid: string) => {
  const createdCart = await Cartmodel.create({ userid });
  return createdCart;
};

interface UserActiveCart {
  userid: string;
}

export const getuseractivecard = async ({ userid }: UserActiveCart) => {
  let existuser = await Cartmodel.findOne({ userid, status: 'active' })
    .populate({
      path: 'items.item',
      model: 'Products',
      select: 'name price image stock'
    });

  if (!existuser) {
    existuser = await createnewcart(userid);
  }

  return existuser;
};

export interface newproudct{
  userid:string,
  proudctid:String,
  quantity:number
}

export const addnewproudct = async ({ userid,proudctid, quantity }: newproudct) => {
  const cart = await getuseractivecard({userid})
  const exiestpro= cart.items.find(p => p.item._id.toString()===proudctid)
  if(exiestpro){
    return {
      data:'the proudct alredy exiest',
      statuscode:400
    }
  }
  const proudct= await Productmodel.findById(proudctid)
  if(!proudct){
    return {
      data:'the proudct isnot there',
      statuscode:400
    }
  }
  if(proudct.stock<quantity){
    return {
      data:'item over stock',
      statuscode:400
    }
  }
  cart.totalprice+= quantity*proudct.price
  cart.items.push({
    item: proudct._id,
    quantity: quantity,
    unitprice: proudct.price
  });
  const updtedcart = await cart.save()
  const populatedCart = await Cartmodel.findById(updtedcart._id)
  .populate({
    path: 'items.item',
    model: 'Products',
    select: 'name price image stock'
  });
  return{
    data:populatedCart,
    statuscode:201
  }
};

export const updatecart=async({userid,proudctid,quantity}:newproudct)=>{
  const cart= await getuseractivecard({userid})
  const exiestpro= cart.items.find(p => p.item._id.toString()===proudctid)
  if(!exiestpro){
    return {
      data:'the proudct isnot there',
      statuscode:400
    }
  }
  const proudct= await Productmodel.findById(proudctid)
  if(!proudct){
    return {
      data:'the proudct isnot there',
      statuscode:400
    }
  }
  if(proudct. stock<quantity){
    return {
      data:'item over stock',
      statuscode:400
    }
  }
  cart.totalprice+= quantity*exiestpro.unitprice-exiestpro.unitprice*exiestpro.quantity
  exiestpro.quantity=quantity

  const updtedcart = await cart.save()
  const populatedCart = await Cartmodel.findById(updtedcart._id)
  .populate({
    path: 'items.item',
    model: 'Products',
    select: 'name price image stock'
  });
  return{
    data:populatedCart,
    statuscode:201
  }

}

export interface newproudctdelte{
  userid:string,
  proudctid:String,

}


export const deleteitem=async({userid,proudctid}:newproudctdelte)=>{
  const cart= await getuseractivecard({userid})
  const exiestpro= cart.items.find(p => p.item._id.toString()===proudctid)
  if(!exiestpro){
    return {
      data:'the proudct isnot there',
      statuscode:400
    }
  }
  cart.items = cart.items.filter(p => p.item._id.toString() == proudctid);
  cart.totalprice = cart.items.reduce(
    (acc, p) => acc + p.quantity * p.unitprice,
    0
  );

  const updtedcart = await cart.save()
  const populatedCart = await Cartmodel.findById(updtedcart._id)
  .populate({
    path: 'items.item',
    model: 'Products',
    select: 'name price image stock'
  });
  

  return{
    data:populatedCart,
    statuscode:201
  }

}

interface DeleteAllInput {
  userid: string;
}

export const deleteAll = async ({ userid }: DeleteAllInput) => {
  const cart = await getuseractivecard({ userid });

  // Clear the items and reset total
  cart.items = [];
  cart.totalprice = 0;

  const updatedCart = await cart.save();

  return {
    data: {
      items: [],
      totalprice: 0
    },
    statuscode: 200
  };
};

interface completeorder{
  userid:string
  address:string
}

export const completeorder = async ({ userid, address }: completeorder) => {
  const cart = await getuseractivecard({ userid });

  if (!cart) {
    return {
      data: 'Cart not found',
      statuscode: 404
    };
  }

  const orderitem: IOrderitem[] = [];

  // 👇 تحقق من توفر المنتجات وخصم الكمية بشكل ذري
  for (const item of cart.items) {
    const productUpdate = await Productmodel.updateOne(
      { _id: item.item, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } }
    );

    if (productUpdate.modifiedCount === 0) {
      return {
        data: `Product with ID ${item.item} is out of stock`,
        statuscode: 400
      };
    }

    const proudct = await Productmodel.findById(item.item); // فقط لجلب اسم المنتج والسعر
    if (!proudct) {
      return {
        data: 'Product not found',
        statuscode: 404
      };
    }

    orderitem.push({
      itemname: proudct.name,
      quantity: item.quantity,
      price: item.unitprice
    });
  }

  // 🧾 إنشاء الطلب بعد التأكد من توفر كل المنتجات
  const order = await Ordermodel.create({
    userid,
    totalprice: cart.totalprice,
    address,
    items: orderitem
  });

  // ✅ تحديث حالة السلة
  cart.status = statusenum.completd;
  await cart.save();

  return {
    data: order,
    statuscode: 201
  };
};





export const getallcompletedorders=async({userid}:{userid:string})=>{
  const orders=await Ordermodel.find({userid})
  return orders

}