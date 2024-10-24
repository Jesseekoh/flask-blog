import { lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
// import Login from './components/Login';
// import Register from './components/Register';
import Blogs from './components/Blogs';
import BlogPage from './pages/BlogPage';
import ProfilePage from './components/ProfilePage';
import CreatePost from './pages/CreatePost';
import Loader from './components/Loader';

const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));

function App() {
    return (
        <>
            <Routes>
                <Route path="/" Component={Layout}>
                    <Route index Component={Blogs} />
                    <Route
                        path="/profile/:profileId"
                        element={<ProfilePage />}
                    />

                    <Route path="/blogs/:id" Component={BlogPage} />
                    <Route path="/blogs/:id/edit" Component={BlogPage} />
                    <Route path="/blogs/create" Component={CreatePost} />

                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={<Loader />}>
                                <Login />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Suspense fallback={<Loader />}>
                                <Register />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
