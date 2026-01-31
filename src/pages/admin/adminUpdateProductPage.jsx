import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import uploadFile from "../../utils/mediaUpload";

function AdminUpdateProductPage() {
    const location = useLocation();
    console.log(location.state);

    const [productID, setProductID] = useState(location.state.productID);
    const [productName, setProductName] = useState(location.state.productName);
    const [altNames, setAltNames] = useState(location.state.altNames.join(", "));
    const [description, setDescription] = useState(location.state.description);
    const [price, setPrice] = useState(location.state.price);
    const [labelPrice, setLabelPrice] = useState(location.state.labelPrice);
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState(location.state.category);
    const [brand, setBrand] = useState(location.state.brand);
    const [model, setModel] = useState(location.state.model);
    const [stock, setStock] = useState(location.state.stock);
    const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
    const navigate = useNavigate();

    if(!location.state){
        window.location.href = "/admin/products";
    }

    async function updateProduct() {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("You must be logged in as admin to update a product.");
            navigate("/login");
            return;
        }

        const imagesPromises = [];

        for (let i = 0; i < files.length; i++) {
            const promise = uploadFile(files[i]);
            imagesPromises.push(promise);
        }

        let images = await Promise.all(imagesPromises).catch((err) => {
            toast.error("Error uploading images. Please try again.");
            console.log("Error uploading images:");
            console.log(err);
            return;
        })

        if(!images.length){
            images = location.state.images;
        }

        if (productID == "" || productName == "" || description == "" || category == "" || brand == "" || model == "") {
            toast.error("Please fill in all fields.");
            return;
        }

        try {

            const altNamesInArray = altNames.split(",");

            await axios.put(import.meta.env.VITE_BACKEND_URL + "/products/"+productID, {
                productName: productName,
                altNames: altNamesInArray,
                description: description,
                price: price,
                labelPrice: labelPrice,
                images: images,
                category: category,
                brand: brand,
                model: model,
                stock: stock,
                isAvailable: isAvailable
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            toast.success("Product updated successfully!");
            navigate("/admin/products");

        } catch (err) {
            toast.error("Error updating product. Please try again.");
            console.log("Error updating product:");
            console.log(err);
        }

    }

    return (
        <div className="w-full h-full flex justify-center p-[50px] items-start overflow-y-scroll">
            <div className="w-[800px] bg-accent/50 rounded-2xl p-[40px]">
                <h1 className="w-full text-xl text-primary mb-[20px] flex items-center gap-[5px]"><AiOutlineProduct />Update Product</h1>
                <div className="w-full bg-white p-[20px] flex flex-row flex-wrap justify-between rounded-xl">
                    <div className="my-[10px] w-[50%]">
                        <label>Product ID</label>
                        <input disabled={true} type="text" value={productID} onChange={(e) => setProductID(e.target.value)} className="w-full h-[40px] rounded-2xl focus:ring-2 focus:ring-accent  border border-accent shadow-2xl px-[20px]" />
                    </div>
                    <div className="my-[10px] w-[40%]">
                        <label>Name</label>
                        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full h-[40px] rounded-2xl focus:ring-2 focus:ring-accent  border border-accent shadow-2xl px-[20px]" />
                    </div>
                    <div className="my-[10px] w-full">
                        <label>Alternative Names</label>
                        <input type="text" value={altNames} onChange={(e) => setAltNames(e.target.value)} className="w-full h-[40px] rounded-2xl focus:ring-2 focus:ring-accent  border border-accent shadow-2xl px-[20px]" />
                        <p className="text-sm text-gray-500 w-full text-right">Separate multiple names with commas.</p>
                    </div>
                    <div className="my-[10px] w-full">
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full min-h-[60px] rounded-2xl focus:ring-2 focus:ring-accent  border border-accent shadow-2xl px-[20px]" />
                    </div>
                    <div className="my-[10px] w-[40%]">
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full h-[40px] rounded-2xl focus:ring-2 focus:ring-accent  border border-accent shadow-2xl px-[20px]" />
                    </div>
                    <div className="my-[10px] w-[40%]">
                        <label>Label Price</label>
                        <input type="number" value={labelPrice} onChange={(e) => setLabelPrice(e.target.value)} className="w-full h-[40px] rounded-2xl focus:ring-2 focus:ring-accent  border border-accent shadow-2xl px-[20px]" />
                    </div>
                    <div className="my-[10px] w-full">
                        <label>Images</label>
                        <input type="file" multiple={true} onChange={(e) => setFiles(e.target.files)} className="w-full h-[40px] rounded-2xl focus:ring-2 focus:ring-accent  border border-accent shadow-2xl px-[20px]" />
                    </div>
                    <div className="my-[10px] flex flex-col w-[30%]">
                        <label>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border">
                            <option value="">Select Category</option>
                            <option value="keyboards">Keyboards</option>
                            <option value="mice">Mice</option>
                            <option value="headphones">Headphones</option>
                            <option value="speakers">Speakers</option>
                            <option value="monitors">Monitors</option>
                            <option value="laptops">Laptops</option>
                            <option value="desktops">Desktops</option>
                            <option value="smartphones">Smartphones</option>
                            <option value="tablets">Tablets</option>
                            <option value="cables">Cables</option>
                            <option value="Mouse">Mouse</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="my-[10px] w-[30%]">
                        <label>Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full h-[40px] rounded-2xl focus:ring-2 focus:ring-accent  border border-accent shadow-2xl px-[20px]" />
                    </div>
                    <div className="my-[10px] w-[30%]">
                        <label>Model</label>
                        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="w-full h-[40px] rounded-2xl focus:ring-2 focus:ring-accent  border border-accent shadow-2xl px-[20px]" />
                    </div>
                    <div className="my-[10px] w-[40%]">
                        <label>Stock Quantity</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full h-[40px] rounded-2xl focus:ring-2 focus:ring-accent  border border-accent shadow-2xl px-[20px]" />
                    </div>
                    <div className="my-[10px] w-[40%]">
                        <label>Available</label>
                        <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value === "true")} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>
                    <div className="my-[10px] w-full flex flex-row flex-wrap justify-between">
                        <button onClick={updateProduct} type="submit" className=" w-[49%] h-[50px] bg-accent text-white px-[40px] py-[10px] border rounded-2xl hover:bg-white hover:text-accent hover:border transition duration-300">
                            Update Product
                        </button>
                        <Link to="/admin/products" className="w-[49%] h-[50px] bg-red-500 text-white font-bold rounded-2xl flex justify-center items-center hover:bg-red-700 " >
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminUpdateProductPage;