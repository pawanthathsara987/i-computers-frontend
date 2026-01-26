import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

function AdminProductPage(){
    return(
        <div className="w-full h-full flex items-center justify-center relative">
            Admin Products Page
            <Link to="/admin/add-product" className=" w-[50px] h-[50px] flex justify-center items-center text-7xl border-[2px] rounded-full absolute right-[20px] bottom-[20px] hover:text-white hover:bg-accent text-accent border-accent"><FaPlus /></Link>
        </div>
    );
}

export default AdminProductPage;