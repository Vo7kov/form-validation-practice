/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import usersFromServer from '../../api/users';

import { Post } from '../../types/Post';
import { getUser } from '../../services/user';

type Props = {
  onSubmit: (post: Post) => void,
  onReset?: () => void,
  length: number,
  post?: Post,
};

export const PostForm: React.FC<Props> = ({
  onSubmit,
  onReset = () => {},
  length,
  post,
}) => {
  const [title, setTitle] = useState(post?.title || '');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(post?.userId || 0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [body, setBody] = useState(post?.body || '');
  const [hasBodyError, setHasBodyError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setHasBodyError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setBody('');

    setHasTitleError(false);
    setHasUserIdError(false);
    setHasBodyError(false);

    onReset();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);
    setHasBodyError(!body);

    if (!title || !userId || !body) {
      return;
    }

    onSubmit({
      title,
      id: length + 1,
      body,
      userId,
      user: getUser(userId),
    });

    reset();
  };

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && post) {
      titleField.current.focus();
    }
  }, [post?.id]);

  return (
    <>
      <h1 className="title">
        Create a post
      </h1>

      <form
        action="/api/posts"
        method="POST"
        className="box"
        onSubmit={handleSubmit}
        onReset={reset}
      >
        <div className="field">
          <label className="label" htmlFor="post-title">Title</label>

          <div
            className={classNames(
              'control',
              {
                'has-icons-right': hasTitleError,
              },
            )}
          >
            <input
              className={classNames(
                'input',
                {
                  'is-danger': hasTitleError,
                },
              )}
              type="text"
              placeholder="Email input"
              id="post-title"
              value={title}
              onChange={handleTitleChange}
              ref={titleField}
            />

            {hasTitleError && (
              <span
                className="
                icon
                is-small
                is-right
              "
              >
                <i
                  className="
                  fas
                  fa-exclamation-triangle
                  has-text-danger
                "
                >
                </i>
              </span>
            )}
          </div>

          {hasTitleError && (
            <p
              className="
              help
              is-danger
            "
            >
              Title is required
            </p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="post-user-id">
            Subject
          </label>

          <div className="control has-icons-left">
            <div
              className={classNames(
                'select',
                {
                  'is-danger': hasUserIdError,
                },
              )}
            >
              <select
                id="post-user-id"
                value={userId}
                onChange={handleUserIdChange}
              >
                <option value="0">Select user</option>

                {usersFromServer.map(user => {
                  const { id, name } = user;

                  return (
                    <option
                      value={id}
                      key={id}
                    >
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            <span
              className="
              icon
              is-small
              is-left
            "
            >
              <i
                className="
                fas
                fa-user
              "
              >
              </i>
            </span>
          </div>

          {hasUserIdError && (
            <p className="help is-danger">
              Please, select a user
            </p>
          )}
        </div>

        <div className="field">
          <label className="label">Message</label>

          <div className="control">
            <textarea
              className={classNames(
                'textarea',
                {
                  'is-danger': hasBodyError,
                },
              )}
              placeholder="Enter a value"
              value={body}
              onChange={handleBodyChange}
            >
            </textarea>
          </div>

          {hasBodyError && (
            <p className="help is-danger">
              Please, enter some message
            </p>
          )}
        </div>

        <div className="buttons">
          <button
            className="
            button
            is-link
          "
            type="submit"
          >
            Submit
          </button>

          <button
            className="
            button
            is-link
            is-light
          "
            type="reset"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
