import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { Blog } from '../dataStructures';
const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
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
            }
        };
        fetchBlogs();
    }, []);
    return (
        <>
            <div className="blogs-container w-full max-w-5xl mx-auto my-2 px-4 flex flex-col gap-2">
                {blogs ? (
                    blogs.map((blog: Blog) => (
                        <BlogCard blog={blog} key={blog.id} />
                    ))
                ) : (
                    <h3>There are no posts</h3>
                )}
            </div>
        </>
    );
};

export default Blogs;
