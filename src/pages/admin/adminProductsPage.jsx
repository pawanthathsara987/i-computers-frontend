import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";

const products = [
    {
        productID: "KB-LOGI-G213",
        productName: "Logitech G213 RGB Gaming Keyboard",
        altNames: ["G213", "Logitech RGB Keyboard", "Logitech G Keyboard"],
        description: "Logitech G213 RGB gaming keyboard with LIGHTSYNC RGB lighting, dedicated media controls, and spill-resistant design.",
        price: 59.99,
        labelPrice: 79.99,
        images: [
            "https://example.com/images/logitech-g213-1.jpg",
            "https://example.com/images/logitech-g213-2.jpg"
        ],
        category: "Keyboard",
        model: "G213",
        brand: "Logitech",
        stock: 45,
        isAvailable: true
    },

    {
        productID: "MS-RAZER-DEATHADDER-V2",
        productName: "Razer DeathAdder V2 Gaming Mouse",
        altNames: ["DeathAdder V2", "Razer Gaming Mouse"],
        description: "Razer DeathAdder V2 ergonomic gaming mouse with optical switches, 20K DPI sensor, and ultra-lightweight design.",
        price: 49.99,
        labelPrice: 69.99,
        images: [
            "https://example.com/images/razer-deathadder-v2-1.jpg",
            "https://example.com/images/razer-deathadder-v2-2.jpg"
        ],
        category: "Mouse",
        model: "DeathAdder V2",
        brand: "Razer",
        stock: 60,
        isAvailable: true
    },

    {
        productID: "HP-HYPERX-CLOUD-II",
        productName: "HyperX Cloud II Gaming Headset",
        altNames: ["Cloud II", "HyperX Gaming Headset"],
        description: "HyperX Cloud II gaming headset with 7.1 virtual surround sound, memory foam ear cushions, and detachable noise-cancelling microphone.",
        price: 79.99,
        labelPrice: 99.99,
        images: [
            "https://example.com/images/hyperx-cloud-ii-1.jpg",
            "https://example.com/images/hyperx-cloud-ii-2.jpg"
        ],
        category: "Headset",
        model: "Cloud II",
        brand: "HyperX",
        stock: 30,
        isAvailable: true
    }
];

function AdminProductPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/products/")
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div className="w-full min-h-screen bg-primary p-10 flex justify-center">
            <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-6 relative">

                <h1 className="text-2xl font-semibold text-accent mb-6">
                    Product Management
                </h1>

                <div className="overflow-auto rounded-xl border border-secondary/20">
                    <table className="w-full border-collapse">
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
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
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