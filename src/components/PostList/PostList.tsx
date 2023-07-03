import React from 'react';

import classNames from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  posts: Post[],
  selectedPostId?: number,
  onDelete?: (id: number) => void,
  onSelect?: (post: Post) => void,
};

export const PostList: React.FC<Props> = React.memo(({
  posts,
  selectedPostId,
  onDelete = () => {},
  onSelect = () => {},
}) => (
  <table
    className="box table is-striped is-narrow"
  >
    <thead>
      <tr className="has-background-link-light">
        <th>#</th>
        <th>Title</th>
        <th colSpan={3}>User</th>
      </tr>
    </thead>

    <tbody>
      {posts.map(post => {
        const { id, title, user } = post;

        return (
          <tr
            key={id}
            className={classNames({
              'has-background-info': selectedPostId === id,
            })}
          >
            <td>{id}</td>
            <td>{title}</td>
            <td>{user?.name}</td>
            <td>
              <button
                type="button"
                className="icon button is-inverted is-info"
                onClick={() => onSelect(post)}
              >
                <i className="fas fa-pen"></i>
              </button>
            </td>
            <td>
              <button
                type="button"
                className="icon button is-inverted is-danger"
                onClick={() => onDelete(post.id)}
              >
                <i className="fas fa-xmark"></i>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
));
