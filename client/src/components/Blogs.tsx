import { useContext } from 'react';
import BlogCard from './BlogCard';
import { Blog } from '../dataStructures';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs } from '../utils';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
    CurrentUserContext,
    CurrentUserContextType,
} from '../contexts/CurrentuserContext';
const Blogs = () => {
    const { currentUser } = useContext(
        CurrentUserContext
    ) as CurrentUserContextType;
    // const queryClient = useQueryClient();
    const { isPending, error, data } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    if (isPending) {
        // return <h1 className="text-center">Loading...</h1>;
        return (
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    if (error) {
        toast.error(error.message);
        return (
            <p className="text-center">
                {'An error has occurred: ' + error.message}
            </p>
        );
    }
    return (
        <>
            {currentUser.isLoggedIn ? (
                <Link to={'blogs/create'}>Create Post</Link>
            ) : (
                ''
            )}
            <div className="blogs-container w-full max-w-5xl mx-auto my-2 px-4 flex flex-col gap-2">
                {data.length > 0 ? (
                    data.map((blog: Blog) => (
                        <BlogCard blog={blog} key={blog.id} />
                    ))
                ) : (
                    <p className="text-center">There are no posts</p>
                )}
            </div>
        </>
    );
};

export default Blogs;
