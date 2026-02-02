import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverView from "./productOverView";
import CartPage from "./cart";
import CheckoutPage from "./checkout";

function HomePage() {
    return (
        <div className="w-full h-full">
            <Header/>
            <div className="w-full min-h-[calc(100%-100px)]">
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/about" element={<h1>About Page</h1>} />
                    <Route path="/contact" element={<h1>Contact Page</h1>} />
                    <Route path="/overview/:productID" element={<ProductOverView/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout"element={<CheckoutPage />} />
                    <Route path="/*" element={<h1>Page Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
}
export default HomePage;