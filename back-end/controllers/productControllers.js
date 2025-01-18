import ProductModel from "../model/productModel.js";
import { z } from "zod";

/*
** @Method Post
** @Route http://localhost:8000/api/products/add
** @Desc Add New Product
** @Access Private
*/
const addProduct = async (req, res) => {

  try {
    const data = await req.body;

    const schema = z.object({
      title: z.string({ required_error: "Title Is Requried" }).min(2, { message: "Title Must Be 2 Characters." }).max(300),
      price: z.number({ required_error: "Price Is Required." }),
      taxes: z.number({ required_error: "Taxes Is Required" }),
      ads: z.number({ required_error: "Ads Is Required" }),
      discount: z.number({ required_error: "Discount Is Required" }),
      totalPrice: z.number({ required_error: "totalPrice Is Required" }).min(1, { message: "totalPrice Must Be At Least One Characters." }),
      count: z.number({ required_error: "Count Is Required" }).min(1, { message: "Count Must Be At Least One Characters." }),
      category: z.string({ required_error: "Category Is Required" }).min(2, { message: "Category Must Be At Least 2 Characters." }).max(300),
    });

    const validation = schema.safeParse(data);

    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors[0].message, success: false });
    };

    const productDetails = {
      title: data.title,
      price: Number(data.price),
      taxes: Number(data.taxes),
      ads: Number(data.ads),
      discount: Number(data.discount),
      totalPrice: Number(data.totalPrice),
      count: Number(data.count),
      category: data.category,
      date: Date.now()
    };
    console.log(productDetails);
    const newProduct = new ProductModel(productDetails);
    await newProduct.save();

    return res.status(201).json({ product: newProduct, message: "Product Addedd Successfully!", success: true });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

};

/* ----------------------------------------- */
/*
** @Method get
** @Route http://localhost:8000/api/products/list
** @Desc Get Products List
** @Access public
*/

const getProductsList = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    return res.status(200).json({ products: products, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messgae: error.message });
  }
};
/* ----------------------------------------- */
/*
** @Method Post
** @Route http://localhost:8000/api/products/delete
** @Desc Delete Single Product
** @Access Private
*/
const singleProduct = async (req, res) => {
  try {

    const { id } = await req.body;

    const singleProduct = await ProductModel.findById(id);

    if (!singleProduct) {
      return res.status(404).json({ message: "Product Not Found", success: false });
    }
    return res.status(200).json({ product: singleProduct, success: true });

  }
  catch (error) {

    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};
/* ----------------------------------------- */
/*
** @Method Post
** @Route http://localhost:8000/api/products/delete
** @Desc Delete Single Product
** @Access Private
*/

const deleteProduct = async (req, res) => {

  const { id } = await req.body;

  const findProduct = await ProductModel.findById(id);

  if (!findProduct) {
    return res.status(404).json({ message: "Product Not Found", success: false });
  }
  const deletedProduct = await ProductModel.findByIdAndDelete(id);

  return res.status(200).json({ deletedProduct: deletedProduct, message: "Product Has Been Deleted.", success: true });

};
/* ----------------------------------------- */
/*
** @Method Post
** @Route http://localhost:8000/api/products/delete
** @Desc Delete Single Product
** @Access Private
*/

const updateProduct = async (req, res) => {

  try {
    const data = await req.body;

    const schema = z.object({
      title: z.string({ required_error: "Title Is Requried" }).min(2, { message: "Title Must Be 2 Characters." }).max(300).optional(),
      price: z.number({ required_error: "Price Is Required." }).min(1, { message: "Price Must Be At Least One Characters." }).optional(),
      taxes: z.number({ required_error: "Taxes Is Required" }).optional(),
      ads: z.number({ required_error: "Ads Is Required" }).optional(),
      discount: z.number({ required_error: "Discount Is Required" }).optional(),
      totalPrice: z.number({ required_error: "totalPrice Is Required" }).min(1, { message: "totalPrice Must Be At Least One Characters." }).optional(),
      count: z.number({ required_error: "Count Is Required" }).min(1, { message: "Count Must Be At Least One Characters." }).optional(),
      category: z.string({ required_error: "Category Is Required" }).min(2, { message: "Category Must Be At Least 2 Characters." }).max(300).optional(),
    });

    const validation = schema.safeParse(data);

    if (!validation.success) {
      return res.status(400).json({ message: validation.success.error.errors[0].message, success: false });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(data.id, {
      $set: {
        title: data.title,
        price: data.price,
        taxes: data.taxes,
        ads: data.ads,
        discount: data.discount,
        totalPrice: data.totalPrice,
        count: data.count,
        category: data.category,
        date: Date.now()
      }
    }, { new: true });

    return res.status(200).json({ updatedProduct: updatedProduct, success: true, message: "Product Updated Successfully." });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

};
/* ----------------------------------------- */

export { addProduct, getProductsList, singleProduct, deleteProduct, updateProduct };