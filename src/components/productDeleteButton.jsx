import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

function ProductDeleteButton(props) {

    const productID = props.productID;
    const reload = props.reload;
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const token = localStorage.getItem("token");

    async function handleDelete() {
        setIsDeleting(true);

        axios.delete(import.meta.env.VITE_BACKEND_URL + "/products/" + productID, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                toast.success("Product deleted successfully!");
                setIsDeleting(false);
                setIsMessageOpen(false);
                reload();
            })
            .catch((err) => {
                console.log("FULL ERROR:", err);
                console.log("RESPONSE DATA:", err.response?.data);
                console.log("STATUS:", err.response?.status);
                toast.error("Error deleting product. Please try again.");
                setIsDeleting(false);
            })


    }

    return (
        <>
            <button onClick={() => { setIsMessageOpen(true) }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
            </button>
            {isMessageOpen && <div className="w-[100vw] h-screen z-[999] fixed top-0 left-0 bg-black/55 flex items-center justify-center">
                <div className="w-[600px] h-[300px] bg-primary rounded-2xl relative flex ">
                    <button onClick={() => { setIsMessageOpen(false) }} className="w-[40px] h-[40px] bg-red-600 rounded-full text-white text-xl font-bold cursor-pointer hover:bg-red-800 absolute right-[-35px] top-[-35px]">
                        X
                    </button>
                    
                    <div className=" flex justify-center items-center flex-col w-full h-full">
                        <h1 className="text-2xl text-center mb-6">Are you sure you want to delete this product {productID} ?</h1>
                        <button disabled={isDeleting} onClick={handleDelete} className="bg-red-500 text-white my-1.5 px-4 py-2 rounded  hover:bg-red-600 transition">
                            Delete
                        </button>
                        <button onClick={() => { setIsMessageOpen(false) }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>}
        </>

    );
}

export default ProductDeleteButton;

/*<button onClick={
                                                    () => {
                                                        const token = localStorage.getItem("token");

                                                        axios.delete(import.meta.env.VITE_BACKEND_URL + "/products/" + item.productID, {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`
                                                            }
                                                        })
                                                            .then(() => {
                                                                toast.success("Product deleted successfully!");
                                                                setLoaded(false);
                                                            })
                                                            .catch((err) => {
                                                                toast.error("Error deleting product. Please try again.");
                                                                console.log(err);
                                                            })
                                                    }
                                                } className="w-[100px] bg-red-500 flex justify-center items-center text-white p-2 rounded-xl cursor-pointer hover:bg-red-700">
                                                    Delete
                                                </button> */