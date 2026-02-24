import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";

const products = [];

function AdminUsersPage() {

    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
            }
            )
                .then((response) => {
                    console.log(response.data);
                    setUsers(response.data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }, [loaded]);

    return (
        <div className="w-full min-h-screen bg-primary p-10 flex justify-center">
            <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-6 relative">

                <h1 className="text-2xl font-semibold text-accent mb-6">
                    Product Management
                </h1>

                <div className="overflow-auto rounded-xl border border-secondary/20">
                    {loaded ? <table className="w-full border-collapse">
                        <thead className="bg-accent text-white sticky top-0 z-10">
                            <tr className="text-left text-sm uppercase tracking-wider">
                                <th className="p-4">Image</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">First Name</th>
                                <th className="p-4">Last Name</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map((item, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="border-b border-secondary/10 hover:bg-primary transition"
                                        >
                                            <td className="p-4">
                                                <img
                                                    src={item.profileImage}
                                                    className="w-[40px] h-[40px] object-cover rounded-lg border"
                                                />
                                            </td>

                                            <td className="p-4 text-sm text-secondary">
                                                {item.email} {item.isEmailVerified && <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Verified</span>}
                                            </td>

                                            <td className="p-4 font-medium text-accent">
                                                {item.firstName}
                                            </td>

                                            <td className="p-4 text-accent font-semibold">
                                                {item.lastName}
                                            </td>

                                            <td className="p-4 text-secondary">
                                                {item.role}
                                            </td>

                                            <td className="p-4">
                                                <span className="px-3 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
                                                    {item.category}
                                                </span>
                                            </td>

                                            <td className="p-4"></td>
                                            <td className="p-4">
                                                <button className="px-3 py-1 bg-accent text-primary rounded-lg"
                                                onClick={
                                                    async ()=> {
                                                        await axios.put(import.meta.env.VITE_BACKEND_URL + `/users/toggle-block/${item.email}`,{
                                                            isBlocked: !item.isBlocked
                                                        },{
                                                            headers: {
                                                                Authorization: `Bearer ${localStorage.getItem("token")}`
                                                            }
                                                        });
                                                        setLoaded(false);
                                                    }
                                                }>
                                                    {
                                                        item.isBlocked?"Unblock":"Block"
                                                    }
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table> : <Loader />}
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

export default AdminUsersPage;