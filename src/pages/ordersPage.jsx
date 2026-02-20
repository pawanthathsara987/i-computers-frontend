
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";



function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/orders/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log(response.data);
                    setOrders(response.data);
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
                        <thead className="bg-accent text-white sticky top-0">
                            <tr className="text-left text-sm uppercase tracking-wider">
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer Email</th>
                                <th className="p-4">Customer Name</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Total Amount</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                orders.map((order, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className="border-b border-secondary/10 hover:bg-primary transition"
                                        >
                                            <td className="p-4 text-sm text-secondary">
                                                {order.orderId}
                                            </td>
                                            <td className="p-4 text-sm text-secondary">
                                                {order.email}
                                            </td>
                                            <td className="p-4 text-sm text-secondary">
                                                {order.name}
                                            </td>
                                            <td className="p-4 text-sm text-secondary">
                                                {new Date(order.date).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-sm text-secondary">
                                                {order.status}
                                            </td>
                                            <td className="p-4 text-sm text-secondary">
                                                LKR. {order.total.toFixed(2)}
                                            </td>
                                            <td className="p-4 text-sm text-secondary">
                                                <ViewOrderInfoCustomer order={order} />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table> : <Loader />}
                </div>
            </div>
        </div>
    );

}

export default OrdersPage;