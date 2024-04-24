import React, { useState } from 'react';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() !== '') {
      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
      setNewPost('');
    }
  };

  return (
    <div>
      <h1>Forum</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your post here..."
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <h2>Recent Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </div>
  );
}

export default Forum;
