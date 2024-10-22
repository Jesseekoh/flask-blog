import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { Blog } from '../dataStructures';
const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const resp = await fetch('http://localhost:8000/posts/');
                if (resp.ok) {
                    let data = await resp.json();
                    data = data.data;
                    console.log(data);
                    setBlogs(data);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return <h1 className="text-center">Loading...</h1>;
    }
    return (
        <>
            <div className="blogs-container w-full max-w-5xl mx-auto my-2 px-4 flex flex-col gap-2">
                {blogs.length > 0 ? (
                    blogs.map((blog: Blog) => (
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
