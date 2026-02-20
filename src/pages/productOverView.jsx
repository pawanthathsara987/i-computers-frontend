import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";
import { addToCart } from "../utils/cart";

function ProductOverView() {

    const navigate = useNavigate();
    const params = useParams();
    console.log(params.productID);

    const [product, setProducts] = useState(null);
    const [status, setStatus] = useState("loading"); //loading, error, success

    useEffect(() => {
        if (status == "loading") {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
                .then((response) => {
                    setProducts(response.data);
                    setStatus("success");
                })
                .catch((error) => {
                    toast.error("Product Not Found");
                    setStatus(error);
                })
        }
    }, []);

    return (
        <>
            {
                status == "loading" && <Loader />
            }
            {
                status == "error" && <h1 className="text-center mt-10 text-2xl">Error loading product.</h1>
            }
            {
                status == "success" &&
                <div className="w-full h-[calc(100vh-100px)] flex flex-col lg:flex-row">
                    <h1 className="text-4xl font-semibold lg:hidden text-center sticky top-0 bg-white pt-5">{product.productName}</h1>
                    <div className=" w-full lg:w-1/2 h-full flex justify-center items-center">
                        <ImageSlider images={product.images} />
                    </div>
                    <div className="w-full lg:w-1/2 h-full p-10 flex flex-col gap-6">
                        <h1 className="text-4xl font-semibold hidden lg:block">{product.productName}</h1>
                        <h2 className="text-lg text-secondary/80">{product.productID}</h2>
                        <h3 className="text-lg text-secondary/80 flex items-center"><CgChevronRight />{product.category}</h3>
                        {product.altNames && product.altNames.length > 0 && (
                            <h3 className="text-md text-secondary/80">
                                {product.altNames.join(" | ")}
                            </h3>
                        )}
                        <p className="text-md text-justify text-secondary/90 h-32 overflow-y-auto">{product.description}</p>
                        <div className="w-full">
                            {
                                product.labelPrice > product.price && (
                                    <h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-xl">
                                        LKR. {product.labelPrice.toFixed(2)}
                                    </h2>
                                )
                            }
                            <h2 className="text-accent font-semibold text-3xl">
                                LKR. {product.price.toFixed(2)}
                            </h2>
                        </div>
                        <div className="w-full flex flex-row gap-4 mt-4">
                            <button
                            onClick={() => {
                                addToCart(product, 1);
                            }} className="border-2 border-accent bg-accent text-white px-6 py-3 rounded hover:bg-white/90 hover:text-accent transition">
                                Add to Cart
                            </button>
                            <button
                            onClick={() => {
                                navigate("/checkout", {state: [{
                                    productID:product.productID,
                                    name:product.productName,
                                    price:product.price,
                                    labelPrice:product.labelPrice,
                                    image:product.images[0],
                                    quantity:1
                                }]})
                            }} className="border-2 border-accent text-accent px-6 py-3 rounded hover:bg-accent hover:text-white transition">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ProductOverView;