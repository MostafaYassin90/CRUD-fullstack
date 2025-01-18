import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { backendUrl } from './../App';
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

const Form = () => {
  // Token
  const token = window.localStorage.getItem("Token");
  // State
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [taxes, setTaxes] = useState("");
  const [ads, setAds] = useState("");
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [count, setCount] = useState("");
  const [category, setCategory] = useState("");
  const [proccess, setProccess] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [typeOfBtn, setTypeOfBtn] = useState("create");
  const [updateProductId, setUpdateProductId] = useState("");

  // Get Total Price
  const getTotalPrice = () => {
    const priceCost = Number(taxes) + Number(ads);
    const pricePlusCost = Number(price) + priceCost;
    const finallyPrice = pricePlusCost - Number(discount);
    setTotalPrice(finallyPrice);
  };

  useEffect(() => {
    getTotalPrice();
  }, [price, taxes, ads, discount]);

  // **-------------------- OnSubmit Handler **--------------------
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setProccess(true);
    try {
      const productDetails = {
        title: title,
        price: Number(price),
        taxes: Number(taxes),
        ads: Number(ads),
        discount: Number(discount),
        totalPrice: totalPrice,
        count: Number(count),
        category: category
      };
      if (typeOfBtn === "create") {
        const response = await axios.post(backendUrl + "/api/products/add", productDetails, {
          headers: { authorization: "Bearer " + token }
        });
        if (response.data.success) {
          setTitle("");
          setPrice("");
          setTaxes("");
          setAds("");
          setDiscount("");
          setTotalPrice("");
          setCount("");
          setCategory("");
          toast.success(response.data.message);
          setProccess(false);
          getAllProducts();
        }
      } else {
        const response = await axios.post(backendUrl + "/api/products/update", { id: updateProductId, ...productDetails }, {
          headers: { authorization: "Bearer " + token }
        });
        if (response.data.success) {
          setTitle("");
          setPrice("");
          setTaxes("");
          setAds("");
          setDiscount("");
          setTotalPrice("");
          setCount("");
          setCategory("");
          toast.success(response.data.message);
          setProccess(false);
          getAllProducts();
        }
      }
      setTypeOfBtn("create");
      setUpdateProductId("");
    } catch (error) {
      setProccess(false);
      console.log(error);
      toast.error(error.response.data.message || error.message);
      setTypeOfBtn("create");
      setUpdateProductId("");
    }
  };
  // **-------------------- Get All Products **--------------------
  const getAllProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/products/list");
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  // ** -------------------- Get Products Filter -------------------- **
  const getProductsFilter = async () => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      if (search !== "") {
        productsCopy = productsCopy.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
      }

      setProductsFilter(productsCopy);
    }
  };

  useEffect(() => {
    getProductsFilter();
  }, [search, products]);

  // ** -------------------- Delete Product -------------------- **
  // Detele Product Handler
  const deleteProductHandler = async (productId) => {
    try {
      const response = await axios.post(backendUrl + "/api/products/delete", { id: productId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        getAllProducts();
        toast.success("Product Deleted Successfully.");
      }
    } catch (error) {
      console.log(error);
      toast.error();
    }
  };

  // ** -------------------- Get Single Product Then Update It -------------------- **
  const updateProduct = async (productId) => {
    setTypeOfBtn("update");
    setUpdateProductId(productId);
    try {
      const response = await axios.post(backendUrl + "/api/products/singleProduct", { id: productId }, {
        headers: { authorization: "Bearer " + token }
      });
      const productDetails = response.data.product;
      if (response.data.success) {
        setTitle(productDetails.title);
        setPrice(productDetails.price);
        setTaxes(productDetails.taxes);
        setAds(productDetails.ads);
        setDiscount(productDetails.discount);
        setTotalPrice(productDetails.totalPrice);
        setCount(productDetails.count);
        setCategory(productDetails.category);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="py-20">
      <div className="w-full md:w-[90%]  lg:w-[85%] mx-auto flex flex-col gap-6">
        <form className="flex flex-col gap-6" onSubmit={onSubmitHandler}>
          {/* Title */}
          <input type="text" placeholder="Title" className="block bg-transparent shadow border outline-none border-gray-700 w-full py-2 px-3 rounded" name={"title"} value={title} onChange={(event) => { setTitle(event.target.value); }} required />
          {/* Price */}
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-2">
            <input type="number" placeholder="Price" className="block bg-transparent shadow border outline-none border-gray-700 w-full py-2 px-3 rounded" name={"price"} value={price} onChange={(event) => { setPrice(event.target.value); }} required />
            <input type="number" placeholder="Taxes" className="block bg-transparent shadow border outline-none border-gray-700 w-full py-2 px-3 rounded" name={"taxes"} value={taxes} onChange={(event) => { setTaxes(event.target.value); }} required />
            <input type="number" placeholder="Ads" className="block bg-transparent shadow border outline-none border-gray-700 w-full py-2 px-3 rounded" name={"ads"} value={ads} onChange={(event) => { setAds(event.target.value); }} required />
            <input type="number" placeholder="Discount" className="block bg-transparent shadow border outline-none border-gray-700 w-full py-2 px-3 rounded" name={"discount"} value={discount} onChange={(event) => { setDiscount(event.target.value); }} required />
            <div className="bg-[#673ab7] text-white font-base text-[18px] block bg-transparent shadow border outline-none border-gray-700 w-full py-2 px-3 rounded"><span className="mr-2">Total:</span>{totalPrice}</div>
          </div>
          {/* Count */}
          <input type="number" placeholder="Count" className="block bg-transparent shadow border outline-none border-gray-700 w-full py-2 px-3 rounded" name={"count"} value={count} onChange={(event) => { setCount(event.target.value); }} required />
          {/* Category */}
          <input type="text" placeholder="Category" className="block bg-transparent shadow border outline-none border-gray-700 w-full py-2 px-3 rounded" name={"category"} value={category} onChange={(event) => { setCategory(event.target.value); }} required />
          {/* Button */}
          <button type="submit" className={`block h-[40px] w-full rounded-full transition-all duration-300 hover:bg-blue-800 text-white bg-blue-950 py-2`}>
            {
              proccess
                ?
                <p className="create-spin w-5 h-5 border-4 border-gray-700 border-t-gray-200 mx-auto rounded-full"></p>
                :
                typeOfBtn === "create" ? "Create" : "Update"
            }
          </button>
        </form>
        {/* Search */}
        <input type="text" placeholder="Search" className="block bg-transparent shadow border outline-none border-gray-700 w-full py-2 px-3 rounded" onChange={(event) => { setSearch(event.target.value); }} value={search} />
        {/* Seperator  */}
        <hr className="w-full h-[1px] border-none bg-gray-700" />
        {/* Seperator  */}

        {/* -------------------- Table -------------------- */}
        <div className="w-full flex flex-col gap-2">
          {/* Head */}
          <div className="text-center w-full grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] text-sm border border-gray-700 bg-gray-800">
            <p className="py-2 px-2">ID</p>
            <p className="py-2 px-2">Title</p>
            <p className="py-2 px-2">Category</p>
            <p className="py-2 px-2">Price</p>
            <p className="py-2 px-2">Taxes</p>
            <p className="py-2 px-2">Ads</p>
            <p className="py-2 px-2">Discount</p>
            <p className="py-2 px-2">SubTotal</p>
            <p className="py-2 px-2">Count</p>
            <p className="py-2 px-2">Total</p>
            <p className="py-2 px-2">Action</p>
          </div>
          {/* Body */}
          {
            productsFilter.map((product, index) => (
              <div key={product._id} className="text-center w-full grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]  items-center text-sm border border-gray-700 bg-transparent">
                <p className="py-2 px-2 text-sm">{index + 1}</p>
                <p className="py-2 px-2 text-sm">{product.title}</p>
                <p className="py-2 px-2 text-sm">{product.category}</p>
                <p className="py-2 px-2 text-sm">{product.price}</p>
                <p className="py-2 px-2 text-sm">{product.taxes}</p>
                <p className="py-2 px-2 text-sm">{product.ads}</p>
                <p className="py-2 px-2 text-sm">{product.discount}</p>
                <p className="py-2 px-2 text-sm">{product.totalPrice}</p>
                <p className="py-2 px-2 text-sm">{product.count}</p>
                <p className="py-2 px-2 text-sm">{product.totalPrice * product.count}</p>
                <div className="py-2 px-2 text-sm flex items-center justify-center gap-3">
                  <button className="text-green-700 text-xl flex items-center justify-center">
                    <GrUpdate onClick={() => { updateProduct(product._id); }} />
                  </button>
                  <button className="text-red-700 text-xl flex items-center justify-center">
                    <RiDeleteBin6Line onClick={() => { deleteProductHandler(product._id); }} />
                  </button>
                </div>
              </div>
            ))
          }
          {/* Body */}
        </div>
        {/* -------------------- Table -------------------- */}
      </div>
    </div>
  );
};

export default Form;
