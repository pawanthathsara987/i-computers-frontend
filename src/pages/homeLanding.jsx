import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { FiMonitor, FiCpu, FiHeadphones } from "react-icons/fi";
import { MdOutlineLocalShipping, MdSupportAgent, MdPayment, MdSecurity } from "react-icons/md";
import Footer from "../components/footer";

function HomeLanding() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative w-full h-[calc(100vh-100px)] min-h-125 overflow-hidden">
                {/* Background Image */}
                <img
                    src="/HomePageImage.jpg"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12 lg:px-24 max-w-3xl">
                    <span className="text-gold font-semibold tracking-widest uppercase text-sm mb-4 animate-pulse">
                        New Arrivals 2026
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
                        Upgrade Your
                        <span className="text-gold"> Tech</span> Experience
                    </h1>
                    <p className="mt-4 text-primary/80 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed">
                        Discover premium computers, accessories, and cutting-edge technology at unbeatable prices. Your one-stop tech destination.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link
                            to="/products"
                            className="bg-gold hover:bg-gold/90 text-accent font-bold py-3 px-8 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/30"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/contact"
                            className="border-2 border-white/30 hover:border-gold text-white font-bold py-3 px-8 rounded-lg text-center transition-all duration-300 hover:text-gold"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
                    <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="w-full bg-accent py-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
                    {[
                        { icon: <MdOutlineLocalShipping className="text-3xl" />, title: "Free Shipping", desc: "On orders over $50" },
                        { icon: <MdSupportAgent className="text-3xl" />, title: "24/7 Support", desc: "Expert assistance" },
                        { icon: <MdPayment className="text-3xl" />, title: "Secure Payment", desc: "100% protected" },
                        { icon: <MdSecurity className="text-3xl" />, title: "Warranty", desc: "1 year guarantee" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-white group cursor-default">
                            <div className="text-gold group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-sm lg:text-base">{item.title}</p>
                                <p className="text-primary/50 text-xs lg:text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="w-full py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-accent">
                            Browse by <span className="text-gold">Category</span>
                        </h2>
                        <p className="text-secondary mt-3 max-w-lg mx-auto">
                            Find exactly what you need from our wide range of technology products
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { icon: <FiMonitor className="text-5xl" />, name: "Computers", desc: "Desktops, laptops & all-in-ones" },
                            { icon: <FiCpu className="text-5xl" />, name: "Components", desc: "CPUs, GPUs, RAM & storage" },
                            { icon: <FiHeadphones className="text-5xl" />, name: "Accessories", desc: "Peripherals & audio gear" },
                        ].map((cat, i) => (
                            <Link
                                to="/products"
                                key={i}
                                className="group relative bg-gray-50 hover:bg-accent rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="text-accent group-hover:text-gold transition-colors duration-300 mb-4">
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-accent group-hover:text-white transition-colors duration-300">
                                    {cat.name}
                                </h3>
                                <p className="text-secondary group-hover:text-primary/60 mt-2 text-sm transition-colors duration-300">
                                    {cat.desc}
                                </p>
                                <span className="mt-4 text-gold font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Explore →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="relative w-full py-20 overflow-hidden">
                <img
                    src="/HomePageImage.jpg"
                    alt="CTA Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-accent/90" />
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                        Ready to Level Up Your <span className="text-gold">Setup</span>?
                    </h2>
                    <p className="mt-4 text-primary/70 text-lg max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust us for their technology needs. Shop the latest products today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-accent font-bold py-4 px-10 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/30"
                        >
                            <BiShoppingBag className="text-xl" />
                            Browse Products
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default HomeLanding;
