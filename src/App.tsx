import React, {
  useMemo,
  useState,
  useCallback,
} from 'react';

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

function debounce(callback: Function, delay: number) {
  let timerId = 0;

  return (...args: any) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const App: React.FC = () => {
  const [renderedPosts, setRenderedPosts] = useState<Post[]>(initialPosts);

  const [count, setCount] = useState(0);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const deletePost = useCallback((postId: number) => {
    setRenderedPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
  }, []);

  const updatePost = useCallback((updatedPost: Post) => {
    setRenderedPosts(currentPosts => {
      const newPosts = [...currentPosts];
      const index = newPosts.findIndex(post => post.id === updatedPost.id);

      newPosts.splice(index, 1, updatedPost);

      return newPosts;
    });
  }, []);

  // const deletePost = useMemo(() => {
  //   return (postId: number) => {
  //     setRenderedPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
  //   };
  // }, []);

  const filteredPosts = useMemo(() => {
    return renderedPosts.filter(post => post.title.includes(appliedQuery));
  }, [appliedQuery, renderedPosts]);

  return (
    <div className="section py-5">
      <button
        type="button"
        onClick={() => setCount(x => x + 1)}
      >
        {count}
      </button>

      <div className="columns is-mobile">
        <div className="column">
          <h1 className="title">Posts</h1>
        </div>

        <div className="column">
          <input
            type="text"
            className="input is-rounded"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
      </div>

      <PostList
        posts={filteredPosts}
        onDelete={deletePost}
        onSelect={setSelectedPost}
        selectedPostId={selectedPost?.id}
      />

      {selectedPost ? (
        <PostForm
          onSubmit={updatePost}
          length={renderedPosts.length}
          post={selectedPost}
          onReset={() => setSelectedPost(null)}
        />
      ) : (
        <PostForm
          onSubmit={(post: Post) => setRenderedPosts([...renderedPosts, post])}
          length={renderedPosts.length}
        />
      )}
    </div>
  );
};
