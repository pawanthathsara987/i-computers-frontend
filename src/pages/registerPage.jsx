import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-removebg.png';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from "../components/loader";

function RegisterPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function register() {
        
        if(firstName.trim() == ""){
            toast.error("First Name is required");
            return;
        }
        if(lastName.trim() == ""){
            toast.error("Last Name is required");
            return;
        }
        if(email.trim() == ""){
            toast.error("Email is required");
            return;
        }
        if(password.trim() == ""){
            toast.error("Password is required");
            return;
        }
        if(confirmPassword.trim() == ""){
            toast.error("Confirm Password is required");
            return;
        }
        if(password != confirmPassword){
            toast.error("password do not match");
            return;
        }

        setIsLoading(true);



        try {

            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/", {
                email: email.trim(),
                password: password.trim(),
                firstName: firstName.trim(),
                lastName: lastName.trim()
            });

            navigate("/login");

            toast.success("Register successful! Welcome to I-Computers");
            setIsLoading(false);

        } catch (error) {
            toast.error("Register failed. Please check your credentials and try again.");
            console.error("Error during register:", error);
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
                    <h1 className='text-[20px] font-semibold mb-[20px] text-white text-shadow-white'>Register</h1>
                    <input
                        onChange={
                            (e) => {
                                setFirstName(e.target.value);
                            }
                        } type='text' placeholder='your first name' className='w-[85%] h-[50px] mb-[20px] rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-1 focus:ring-gold' />
                    <input
                        onChange={
                            (e) => {
                                setLastName(e.target.value);
                            }
                        } type='text' placeholder='your last name' className='w-[85%] h-[50px] mb-[20px] rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-1 focus:ring-gold' />
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

                    <input
                        onChange={
                            (e) => {
                                setConfirmPassword(e.target.value);
                            }
                        } type='password' placeholder='confirm your password' className='w-[85%] h-[50px] mb-[20px] rounded-lg border border-accent p-[10px] text-[20px] focus:outline-none focus:ring-1 focus:ring-gold' />


                    <button onClick={register} className='w-[85%] h-[50px] bg-gold text-accent mt-[10px] font-bold text-[20px] rounded-lg hover:bg-accent hover:text-gold transition duration-300'>
                        Register Now
                    </button>

                    <p className='text-white mt-[10px]'>
                        Already have an account? <Link to="/login" className='text-gold font-bold cursor-pointer'>Login here</Link>
                    </p>
                </div>
            </div>
            {isLoading && <Loader />}
        </div>
    );
}
export default RegisterPage;