import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
    CurrentUserContext,
    CurrentUserContextType,
} from '../contexts/CurrentuserContext';
const Layout = () => {
    const { currentUser } = useContext(
        CurrentUserContext
    ) as CurrentUserContextType;
    return (
        <>
            <nav className="bg-white fixed top-0 left-0 right-0">
                <div className="nav-container flex justify-between items-center w-full max-w-5xl mx-auto px-4 py-2">
                    <Link
                        to={'/'}
                        className="logo inline-block font-black text-2xl"
                    >
                        BLOG
                    </Link>

                    <ul className="flex gap-3">
                        {currentUser.isLoggedIn ? (
                            <>
                                <li>{currentUser.username}</li>
                                <li>
                                    <Link to={'/logout'}>Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to={'/login'}>Log In</Link>
                                </li>
                                <li>
                                    <Link to={'/register'}>Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <main className="w-full mt-14">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
