import mongoose from "mongoose";


// Product Schema 
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  taxes: { type: Number, required: true },
  ads: { type: Number, required: true },
  discount: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  count: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Number, required: true }
});

// Product Model
const ProductModel = mongoose.models.product || mongoose.model("Product", productSchema);

export default ProductModel;