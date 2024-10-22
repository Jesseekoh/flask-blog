import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { Blog } from '../dataStructures';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBlogs } from '../utils';
import { toast } from 'react-toastify';
const Blogs = () => {
    const queryClient = useQueryClient();
    const { isPending, error, data } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // fetchBlogs();
    }, []);

    if (isPending) {
        return <h1 className="text-center">Loading...</h1>;
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
