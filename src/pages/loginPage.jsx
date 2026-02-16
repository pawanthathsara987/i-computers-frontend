import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-removebg.png';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function login() {
        console.log("Login button clicked");
        console.log("Email:", email);
        console.log("Password:", password);

        setIsLoading(true);

        try {

            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                email: email,
                password: password
            });

            localStorage.setItem("token", res.data.token);

            if (res.data.role === 'admin') {
                
                navigate('/admin');
            } else {
                
                navigate('/');
            }

            console.log("Response from server:", res.data);
            toast.success("Login successful!");
            setIsLoading(false);

        } catch (error) {
            toast.error("Login failed. Please check your credentials and try again.");
            console.error("Error during login:", error);
            setIsLoading(false);
        }

    }

    return (
        <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex">
            <div className="w-[50%] h-full flex justify-center items-center flex-col p-[50px]">
                <img src={logo} alt="Logo" className="w-[150px] h-[150px] mb-[20px] object-cover" />
                <h1 className="text-[50px] text-gold text-center text-shadow-accent text-shadow-2xs font-bold">
                    Plug in. Power Up. Play Hard.
                </h1>
                <p className="text-[30px] text-white italic text-center">
                    Your Ultimate Destination for Gaming Gear
                </p>
            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col items-center justify-center">
                    <h1 className='text-[40px] font-bold mb-[20px] text-white text-shadow-white'>Login</h1>
                    <input
                        onChange={
                            (e) => {
                                setEmail(e.target.value);
                            }
                        } type='email' placeholder='your email' className='w-[85%] h-[50px] mb-[20px] rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-1 focus:ring-gold' />

                    <input
                        onChange={
                            (e) => {
                                setPassword(e.target.value);
                            }
                        } type='password' placeholder='your password' className='w-[85%] h-[50px] mb-[20px] rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-1 focus:ring-gold' />
                    <p className='text-white w-[85%] text-right mb-[10px]'>
                        Forget your password? <Link to="/reset-password" className='text-gold font-bold cursor-pointer'>Reset it here</Link>
                    </p>

                    <button onClick={login} className='w-[85%] h-[50px] bg-gold text-accent mt-[10px] font-bold text-[20px] rounded-lg hover:bg-accent hover:text-gold transition duration-300'>Login</button>

                    <p className='text-white mt-[10px]'>
                        Don't have an account? <Link to="/register" className='text-gold font-bold cursor-pointer'>Sign Up</Link>
                    </p>
                </div>
            </div>
             {isLoading && <Loader />}
        </div>
    );
}
export default LoginPage;