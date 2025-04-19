import Cartmodel from "../models/cartmodel";
import Productmodel, { IProduct } from "../models/proudctmodel";

const createnewcart = async (userid: string) => {
  const createdCart = await Cartmodel.create({ userid });
  return createdCart;
};

interface UserActiveCart {
  userid: string;
}

export const getuseractivecard = async ({ userid }: UserActiveCart) => {
  let existuser = await Cartmodel.findOne({ userid, status: 'active' });

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
  if(proudct. stock<quantity){
    return {
      data:'item over stock',
      statuscode:400
    }
  }
  cart.totalprice+= quantity*proudct.price
cart.items.push({
item: proudct._id ,
  quantity:quantity,
unitprice: proudct.price
});
  const updtedcart = await cart.save()
  return{
    data:updtedcart,
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
  return{
    data:updtedcart,
    statuscode:201
  }

}