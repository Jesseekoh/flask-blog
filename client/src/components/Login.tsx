import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useContext, useState } from 'react';
import {
    CurrentUserContext,
    CurrentUserContextType,
    ICurrentUser,
} from '../contexts/CurrentuserContext';
import { toast } from 'react-toastify';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useContext(
        CurrentUserContext
    ) as CurrentUserContextType;
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_API_URL;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resp = await fetch(BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (resp.ok) {
            const data = await resp.json();
            const username: string = data.data.username;
            const userId: string = data.data.id;
            const userEmail: string = data.data.email;

            setCurrentUser((prev: ICurrentUser) => ({
                ...prev,
                username,
                isLoggedIn: true,
                userId,
                userEmail,
            }));

            toast.success(data.message);

            navigate('/');
        }
    };
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-full max-w-md mx-auto mt-32"
            >
                <div className="form-row flex flex-col">
                    <label htmlFor="email" id="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="johndoe@blah.com"
                    />
                </div>
                <div className="form-row flex flex-col">
                    <label htmlFor="password" id="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="password"
                    />
                </div>
                <span className="text-sm">
                    Don't have an Account?{' '}
                    <Link to={'/register'}>Register</Link>
                </span>
                <button
                    type="submit"
                    className="text-white bg-gray-900 rounded-lg px-3 py-2"
                >
                    Log In
                </button>
            </form>
        </>
    );
};

export default Login;
