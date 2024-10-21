import { Link } from 'react-router-dom';
import { FC, useContext } from 'react';
import { Blog } from '../dataStructures';
import { formatRelativeTime } from '../utils';
import {
    CurrentUserContext,
    currentUserContextType,
} from '../contexts/CurrentuserContext';
// import React from 'react';

interface Props {
    blog: Blog;
}

const BlogCard: FC<Props> = ({ blog }) => {
    const { currentUser, setCurrentUser } = useContext(
        CurrentUserContext
    ) as currentUserContextType;
    return (
        <div className="bg-white rounded-md px-4 py-4 border-solid border-[1px]">
            <Link to={`/blogs/${blog.id}`}>
                <h2 className="text-2xl font-black">{blog.title}</h2>
            </Link>

            <div className="blog-info flex items-center justify-between">
                <Link
                    to={`/profile/${blog.author_id}`}
                    className="inline-block font-bold"
                >
                    {blog.author}
                </Link>
                <span className="inline-block text-sm">
                    {formatRelativeTime(blog.created_at)}
                </span>
            </div>
            <p>{blog.content.slice(0, 200)}...</p>

            {currentUser.userId === blog.author_id ? (
                <Link to={`/blogs/${blog.id}/edit`}>Edit</Link>
            ) : (
                ''
            )}
        </div>
    );
};

export default BlogCard;
