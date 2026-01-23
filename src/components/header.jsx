import { Link } from "react-router-dom";
import logo from "../assets/logo-removebg.png";

function Header(){
    return(
        <header className="w-full h-[100px] bg-accent flex">
            <img src={logo} alt="Logo" className="h-full"/>
            <div className="w-full h-full text-primary text-xl gap-[20px] flex justify-center items-center">
                <Link to="/" >Home</Link>
                <Link to="/products" >Products</Link>
                <Link to="/about" >About</Link>
                <Link to="/contact" >Contact</Link>
            </div>
        </header>
    );
}

export default Header;