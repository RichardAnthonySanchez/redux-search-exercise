import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, filterPosts, sortPostsById, sortPostsByTitle, reversePosts } from './postsSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortById, setSortById] = useState(false);
  const [sortByTitle, setSortByTitle] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm === '') {
      dispatch(fetchPosts());
    } else {
      dispatch(filterPosts(searchTerm));
    }
  }; 
  
  const handleSortById = () => {
    setSortById(!sortById);
    dispatch(sortPostsById());
    if (!sortById) {
      dispatch(reversePosts());
    }
  };

  const handleSortByTitle = () => {
    setSortByTitle(!sortByTitle);
    dispatch(sortPostsByTitle());
    if (!sortByTitle) {
      dispatch(reversePosts());
    }
  };

return (
  <div>
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
    <div>
        <button onClick={handleSortById}>
          Toggle Sort by ID ({sortById ? 'Descending' : 'Ascending'})
        </button>
        <button onClick={handleSortByTitle}>
          Toggle Sort by Title ({sortByTitle ? 'Descending' : 'Ascending'})
        </button>
      </div>
    {posts.map((post) => (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    ))}
  </div>
)};


export default Posts;
