import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../dataStructures';
import { formatRelativeTime } from '../utils';
const BlogPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isPending, setPending] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:8000/posts/${id}`).then((resp) =>
            resp.json().then((data) => {
                setBlog(data.data);
                setPending(false);
                // console.log(data);
            })
        );
    }, [id]);

    if (isPending) {
        return (
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="px-4 w-full max-w-5xl mx-auto bg-white mt-2 py-4">
            <h1 className="text-3xl font-black pb-2">{blog?.title}</h1>
            <span className="text-sm pb-2 inline-block font-bold">
                {blog ? formatRelativeTime(blog?.created_at) : ''}
            </span>
            <span className="text-sm pb-2 inline-block font-bold">
                {blog ? blog?.author : ''}
            </span>
            <p className="text-xl leading-6">{blog?.content}</p>
        </div>
    );
};

export default BlogPage;
