import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

const products = [];

function AdminProductPage() {

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products/")
                .then((response) => {
                    console.log(response.data);
                    setProducts(response.data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [loaded]);

    return (
        <div className="w-full min-h-screen bg-primary p-10 flex justify-center">
            <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-6 relative">

                <h1 className="text-2xl font-semibold text-accent mb-6">
                    Product Management
                </h1>

                <div className="overflow-auto rounded-xl border border-secondary/20">
                    {loaded ? <table className="w-full border-collapse">
                        <thead className="bg-accent text-white sticky top-0 z-10">
                            <tr className="text-left text-sm uppercase tracking-wider">
                                <th className="p-4">Image</th>
                                <th className="p-4">Product ID</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Label Price</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Brand</th>
                                <th className="p-4">Model</th>
                                <th className="p-4 text-center">Stock</th>
                                <th className="p-4 text-center">Available</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map((item, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="border-b border-secondary/10 hover:bg-primary transition"
                                        >
                                            <td className="p-4">
                                                <img
                                                    src={item.images[0]}
                                                    className="w-[40px] h-[40px] object-cover rounded-lg border"
                                                />
                                            </td>

                                            <td className="p-4 text-sm text-secondary">
                                                {item.productID}
                                            </td>

                                            <td className="p-4 font-medium text-accent">
                                                {item.productName}
                                            </td>

                                            <td className="p-4 text-gold font-semibold">
                                                ${item.price}
                                            </td>

                                            <td className="p-4 text-secondary line-through">
                                                ${item.labelPrice}
                                            </td>

                                            <td className="p-4">
                                                <span className="px-3 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
                                                    {item.category}
                                                </span>
                                            </td>

                                            <td className="p-4">{item.brand}</td>
                                            <td className="p-4">{item.model}</td>

                                            <td className="p-4 text-center font-semibold">
                                                {item.stock}
                                            </td>

                                            <td className="p-4 text-center">
                                                {
                                                    item.isAvailable ? (
                                                        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                                            Yes
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">
                                                            No
                                                        </span>
                                                    )
                                                }
                                            </td>
                                            <td className="p-4 text-sm text-center">
                                                <ProductDeleteButton productID = {item.productID} reload={ () => {setLoaded(false)}} />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table> : <Loader />}
                </div>

                {/* Floating Add Button */}
                <Link
                    to="/admin/add-product"
                    className="w-[60px] h-[60px] flex justify-center items-center text-2xl rounded-full fixed right-[30px] bottom-[30px] bg-accent text-white shadow-lg hover:scale-110 hover:bg-gold hover:text-black transition-all"
                >
                    <FaPlus />
                </Link>

            </div>
        </div>
    );

}

export default AdminProductPage;