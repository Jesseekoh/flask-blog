import { Link } from 'react-router-dom';
const Register = () => {
    return (
        <>
            <div className="flex flex-col gap-4 w-full max-w-md mx-auto mt-32">
                <div className="form-row flex flex-col">
                    <label htmlFor="username" id="username">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        required
                        placeholder="johndoe@blah.com"
                    />
                </div>
                <div className="form-row flex flex-col">
                    <label htmlFor="email" id="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
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
                        required
                        placeholder="password"
                    />
                </div>
                <span className="text-sm">
                    Don't have an Account? <Link to={'/login'}>Log In</Link>
                </span>
                <button
                    type="submit"
                    className="text-white bg-gray-900 rounded-lg px-3 py-2"
                >
                    Log In
                </button>
            </div>
        </>
    );
};

export default Register;
