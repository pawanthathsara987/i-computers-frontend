import { useState } from "react";

import Modal from "react-modal";

export default function ViewOrderInfo(props) {
    const order = props.order;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
        <Modal isOpen={isModalOpen} onRequestClose={ () => setIsModalOpen(false)}>
            <div className="">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <p><strong>Order ID: </strong>{order.orderId}</p>
                <p><strong>Customer Name</strong>{order.name}</p>
            </div>
        </Modal>

            <button
            onClick={() => {
                setIsModalOpen(true);
            }}
            className="bg-accent/70 hover:bg-accent p-2 rounded-lg text-white cursor-pointer">
            View Info
        </button></>
    );
}