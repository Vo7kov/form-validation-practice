import React from 'react';

import { Post } from '../../types/Post';

type Props = {
  posts: Post[],
};

export const PostList: React.FC<Props> = ({ posts }) => (
  <table
    className="box table is-striped is-narrow"
  >
    <thead>
      <tr className="has-background-link-light">
        <th>#</th>
        <th>Title</th>
        <th>User</th>
      </tr>
    </thead>

    <tbody>
      {posts.map(post => {
        const { id, title, user } = post;

        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{title}</td>
            <td>{user?.name}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
