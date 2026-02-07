import { useState } from "react";
import Modal from "react-modal";

// Styles for the React Modal to center it and add the backdrop
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0', // Reset default padding to let Tailwind handle it
    border: 'none',
    borderRadius: '1rem',
    maxWidth: '900px',
    width: '95%',
    maxHeight: '90vh', // Ensure it doesn't overflow screen height
    overflow: 'hidden' // hide default scroll, we will scroll inner div
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dimmed background
    backdropFilter: 'blur(4px)', // Modern frosted glass effect
    zIndex: 50
  }
};

// Bind modal to your app element (optional but recommended to avoid warnings)
// Modal.setAppElement('#root'); 

export default function ViewOrderInfo({ order }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!order) return null;

    // Helper to format currency
    const formatPrice = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Helper to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Status Badge Logic
    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
            case 'delivered':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            default: // pending or others
                return 'bg-gold/20 text-yellow-700 border-gold/40';
        }
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={customStyles}
                contentLabel="Order Details"
            >
                {/* Modal Container */}
                <div className="flex flex-col h-full bg-white text-accent font-sans">
                    
                    {/* Header */}
                    <div className="bg-accent text-white p-6 flex justify-between items-start relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        
                        <div className="z-10">
                            <h2 className="text-3xl font-bold">Order Details</h2>
                            <p className="text-gray-300 text-sm mt-1">Order ID: <span className="font-mono text-gold">{order.orderId}</span></p>
                        </div>
                        
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="z-10 text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto p-6 max-h-[70vh]">
                        
                        {/* Top Meta Data Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-primary">
                            <div>
                                <p className="text-secondary text-xs uppercase tracking-wider font-semibold">Date Placed</p>
                                <p className="font-medium">{formatDate(order.date)}</p>
                            </div>
                            <div>
                                <p className="text-secondary text-xs uppercase tracking-wider font-semibold">Current Status</p>
                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getStatusStyle(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-secondary text-xs uppercase tracking-wider font-semibold">Total Amount</p>
                                <p className="text-2xl font-bold text-accent">{formatPrice(order.total)}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            
                            {/* Left Column: Customer & Shipping Info */}
                            <div className="md:col-span-1 space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold border-l-4 border-gold pl-3 mb-3">Customer</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                                        <p className="font-semibold text-accent text-base">{order.name}</p>
                                        <p className="text-secondary flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                            {order.email}
                                        </p>
                                        {order.phoneNumber && (
                                            <p className="text-secondary flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                                {order.phoneNumber}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold border-l-4 border-gold pl-3 mb-3">Shipping Address</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-secondary italic">
                                        {order.address}
                                    </div>
                                </div>

                                {order.notes && (
                                    <div>
                                        <h3 className="text-lg font-bold border-l-4 border-gray-400 pl-3 mb-3">Order Notes</h3>
                                        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm border border-yellow-100">
                                            "{order.notes}"
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Order Items */}
                            <div className="md:col-span-2">
                                <h3 className="text-lg font-bold border-l-4 border-gold pl-3 mb-4">Items Ordered ({order.items.length})</h3>
                                
                                <div className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 bg-white border border-primary p-3 rounded-xl hover:shadow-md transition-shadow">
                                            {/* Image */}
                                            <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-primary">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {e.target.src = 'https://placehold.co/100?text=No+Img'}} // Fallback
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-accent">{item.name}</h4>
                                                <p className="text-xs text-secondary uppercase">ID: {item.productID}</p>
                                            </div>

                                            {/* Price/Qty */}
                                            <div className="text-right">
                                                <div className="font-bold text-accent">{formatPrice(item.price * item.quantity)}</div>
                                                <div className="text-xs text-secondary">
                                                    {item.quantity} x {formatPrice(item.price)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Summary Footer inside content */}
                                <div className="mt-6 pt-6 border-t border-primary flex flex-col items-end gap-2">
                                    <div className="flex justify-between w-full md:w-1/2 text-secondary text-sm">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(order.total)}</span>
                                    </div>
                                    <div className="flex justify-between w-full md:w-1/2 text-secondary text-sm">
                                        <span>Shipping</span>
                                        <span>Free</span> 
                                    </div>
                                    <div className="flex justify-between w-full md:w-1/2 text-xl font-bold text-accent mt-2 pt-2 border-t border-dashed border-gray-300">
                                        <span>Grand Total</span>
                                        <span className="text-gold">{formatPrice(order.total)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-gray-50 p-4 border-t border-primary flex justify-end gap-3">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-2 rounded-lg text-secondary font-medium hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>
                        <button 
                            onClick={() => window.print()}
                            className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Print Receipt
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Trigger Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-accent/70 hover:bg-accent p-2 px-4 rounded-lg text-white cursor-pointer transition-colors shadow-sm flex items-center gap-2 text-sm font-medium"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                View Info
            </button>
        </>
    );
}