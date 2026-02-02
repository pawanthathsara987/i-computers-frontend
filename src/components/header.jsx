import { Link } from "react-router-dom";
import logo from "../assets/logo-removebg.png";
import { BiShoppingBag } from "react-icons/bi";

function Header() {
    return (
        <header className="w-full h-[100px] bg-accent flex relative">
            <img src={logo} alt="Logo" className="h-full" />
            <div className="w-full h-full text-primary text-xl gap-[20px] flex justify-center items-center">
                <Link to="/" >Home</Link>
                <Link to="/products" >Products</Link>
                <Link to="/about" >About</Link>
                <Link to="/contact" >Contact</Link>
            </div>
            <Link to="/cart" className="absolute right-4 top=1/2 translate-y-1/2 text-primary text-2xl">
                <BiShoppingBag />
            </Link>
        </header>
    );
}

export default Header;