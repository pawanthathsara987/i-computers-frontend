import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="w-full bg-accent text-primary/60 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h4 className="text-white font-bold text-lg mb-4">iComputers</h4>
                    <p className="text-sm leading-relaxed">
                        Your trusted partner for premium technology products and accessories since 2020.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/products" className="hover:text-gold transition-colors">Products</Link></li>
                        <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
                        <li><Link to="/orders" className="hover:text-gold transition-colors">My Orders</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg mb-4">Customer Service</h4>
                    <ul className="space-y-2 text-sm">
                        <li><span className="hover:text-gold transition-colors cursor-pointer">FAQs</span></li>
                        <li><span className="hover:text-gold transition-colors cursor-pointer">Returns Policy</span></li>
                        <li><span className="hover:text-gold transition-colors cursor-pointer">Shipping Info</span></li>
                        <li><span className="hover:text-gold transition-colors cursor-pointer">Privacy Policy</span></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg mb-4">Newsletter</h4>
                    <p className="text-sm mb-3">Subscribe for the latest deals and updates.</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold flex-1 min-w-0"
                        />
                        <button className="bg-gold hover:bg-gold/90 text-accent font-semibold px-4 py-2 rounded-r-lg text-sm transition-colors">
                            Join
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-xs text-primary/40">
                © {new Date().getFullYear()} iComputers. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
