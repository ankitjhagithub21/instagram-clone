import { useState } from 'react';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_SERVER_URL}/api/auth/forgot-password`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            const data = await res.json()
            if (data.success) {
                toast.success(data.message)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Error sending reset email');
        } finally {
            setLoading(false)
        }
    };

    return (
        <section className='h-screen w-full flex items-center justify-center p-5'>
            <div className='lg:w-1/3 md:w-1/2 w-full rounded-lg p-5 custom-shadow bg-white' x>
                <h2 className='mb-5 font-bold text-center text-2xl font-serif '>Forgot Password</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className='border-2 rounded-lg p-2'
                        required
                    />
                    <button type="submit" disabled={loading} className='bg-indigo-500 text-white rounded-lg p-2'>{
                        loading ? 'Sending...' : 'Send otp'}</button>
                </form>
            </div>
        </section>
    );
};

export default ForgotPassword;
