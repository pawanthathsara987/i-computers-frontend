import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverView from "./productOverView";

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
                    <Route path="/*" element={<h1>Page Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
}
export default HomePage;