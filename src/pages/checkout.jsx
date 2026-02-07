import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { emptyCart } from "../utils/cart.js";

export default function CheckoutPage() {

    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const [cart, setCart] = useState(location.state);

    if (location.state == null) {
        navigate("/products");
    }

    function getCartTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity
        })
        return total;
    }

    async function submitOrder() {
        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("You must logged in to place an order");
            navigate("/login");
            return;
        }

        const orderItems = [];

        cart.forEach((item) => {
            orderItems.push({
                productID: item.productID,
                quantity: item.quantity
            });
        });

        axios.post(import.meta.env.VITE_BACKEND_URL + "/orders",
            {
                name: name,
                address: address,
                phoneNumber: phoneNumber,
                items: orderItems
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(() => {
            emptyCart();        
            setCart([]);
            toast.success("Order placed successfully!");
            navigate("/orders");

        }).catch((error) => {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "Server error");
        });
    }

    return (
        <div className="w-full flex flex-col items-center p-[20px]">
            {
                cart.map(
                    (item, index) => {
                        return (
                            <div className="w-[50%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between">
                                <img src={item.image} className="h-full aspect-square object-cover" />
                                <div className="flex flex-col justify-center pl-4 w-[300px]">
                                    <h1 className="text-2xl font-semibold relative hover:[&_.tooltip]:opacity-100">
                                        <span className="opacity-0 tooltip italic text-sm absolute bottom-[-50px] bg-accent text-white p-2 rounded-lg ">{item.productName}</span>
                                        {
                                            item.productName > 20 ?
                                                item.productName.substring(0, 20) + "..." :
                                                item.productName
                                        }
                                    </h1>
                                    {
                                        item.labelPrice > item.price &&
                                        <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-lg">
                                            LKR. {item.labelPrice.toFixed(2)}
                                        </h2>
                                    }
                                    <h2 className="text-xl text-accent font-semibold mt-2">LKR. {item.price.toFixed(2)}</h2>
                                    <h3 className="text-lg mt-2">{item.productID}</h3>
                                </div>
                                <div className="h-full flex flex-row items-center gap-4">
                                    <div className="h-full flex flex-col justify-center items-center">
                                        <BiChevronUp
                                            onClick={
                                                () => {
                                                    const copiedCart = [...cart]
                                                    copiedCart[index].quantity += 1
                                                    setCart(copiedCart);
                                                }
                                            }
                                            className="text-2xl cursor-pointer hover:text-accent transition" />
                                        <span className="text-lg">{item.quantity}</span>
                                        <BiChevronDown
                                            onClick={
                                                () => {
                                                    const copiedCart = [...cart]
                                                    copiedCart[index].quantity -= 1
                                                    if (copiedCart[index].quantity < 1) {
                                                        copiedCart.splice(index, 1)
                                                    }
                                                    setCart(copiedCart);
                                                }
                                            }
                                            className="text-2xl cursor-pointer hover:text-accent transition" />
                                    </div>
                                    <span className="pr-4 text-xl font-semibold w-[150px] text-right">
                                        LKR. {(item.quantity * item.price).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                )
            }
            <div className="w-[50%] p-4 rounded-xl overflow-hidden shadow-2xl my-1 flex flex-wrap justify-between items-center">
                <div className="flex flex-col w-[50%] ">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        className=" px-6 py-3 rounded border border-secondary/80 focus:border-accent outline-none transition w-[300px]" />
                </div>

                <div className="flex flex-col w-[50%] ">
                    <label>Phone</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => { setPhoneNumber(e.target.value) }}
                        className=" px-6 py-3 rounded border border-secondary/80 focus:border-accent outline-none transition w-[300px]" />
                </div>

                <div className="flex flex-col w-full ">
                    <label>Address</label>
                    <textarea
                        type="text"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        className=" px-6 py-3 rounded border border-secondary/80 focus:border-accent outline-none transition w-full" />
                </div>
            </div>
            <div className="w-[50%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between items-center">
                <button
                    onClick={submitOrder}
                    className="self-center ml-4 px-6 py-3 rounded bg-accent text-white hover:bg-accent/90 transition">
                    Order Now
                </button>
                <span className="pr-4 text-xl font-bold min-w-[150px] text-right">
                    LKR. {getCartTotal().toFixed(2)}
                </span>
            </div>
        </div>
    );
}