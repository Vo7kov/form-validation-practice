import React, { useState } from 'react';

import './App.scss';

import postsFromServer from './api/posts';

import { Post } from './types/Post';

import { PostForm } from './components/PostForm/PostForm';
import { PostList } from './components/PostList/PostList';

import { getUser } from './services/user';

const initialPosts: Post[] = postsFromServer.map(post => ({
  ...post,
  user: getUser(post.userId),
}));

export const App: React.FC = () => {
  const [renderedPosts, setRenderedPosts] = useState<Post[]>(initialPosts);

  return (
    <div className="section">
      <h1 className="title">
        Create a post
      </h1>

      <PostForm
        onSubmit={(post: Post) => setRenderedPosts([...renderedPosts, post])}
        length={renderedPosts.length}
      />

      <PostList
        posts={renderedPosts}
      />
    </div>
  );
};
