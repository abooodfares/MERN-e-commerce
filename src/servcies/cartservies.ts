import Cartmodel from "../models/cartmodel";

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
