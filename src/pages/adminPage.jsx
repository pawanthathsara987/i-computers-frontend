import { Link, Route, Routes } from "react-router-dom";
import logo from "../assets/logo-removebg.png";
import { TbClipboardList } from "react-icons/tb";
import { LuBoxes, LuUsers } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";

function AdminPage() {
    return (
        <div className="w-full h-full flex bg-accent">
            <div className="w-[300px] bg-accent h-full">
                <div className="w-full h-[100px] text-primary flex items-center">
                    <img src={logo} alt="Logo" className="h-full "/>
                    <h1 className="text-2xl">Admin</h1>
                </div>
                <div className="w-full h-[400px] flex flex-col text-2xl text-white">
                    <Link to="/admin" className="w-full flex items-center h-[50px] gap-[10px]"><TbClipboardList />Orders</Link>
                    <Link to="/admin/products" className="w-full flex items-center h-[50px] gap-[10px]"><LuBoxes />Products</Link>
                    <Link to="/admin/users" className="w-full flex items-center h-[50px] gap-[10px]"><LuUsers />Users</Link>
                    <Link to="/admin/reviews" className="w-full flex items-center h-[50px] gap-[10px]"><MdOutlineRateReview />Reviews</Link>
                </div>
            </div>
            <div className="w-[calc(100%-300px)] max-h-full h-full bg-primary rounded-3xl border-accent border-[2px] overflow-y-auto text-2xl">
                <Routes>
                    <Route path="/" element={<h1>Orders</h1>} />
                    <Route path="/products" element={<h1>Products</h1>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/reviews" element={<h1>Reviews</h1>} />
                </Routes>
            </div>
        </div>
    );
}
export default AdminPage;