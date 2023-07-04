/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

type Props = {
  options: string[],
  setOpen: (param: boolean) => void,
  setIsSelected: (param: boolean) => void,
  setValue: (param: string) => void,
  onChange: (param: string) => void,
};

export const DropdownList: React.FC<Props> = ({
  options,
  setOpen,
  setIsSelected,
  setValue,
  onChange,
}) => {
  const handleItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: string,
  ) => {
    event.preventDefault();
    setOpen(false);
    setIsSelected(true);
    setValue(item);
    onChange(item);
  };

  return (
    <ul
      className="dropdown__list"
    >
      {options.map((option: string) => (
        <li
          key={option}
          className="dropdown__list-item"
        >
          <a
            href="#/"
            className="dropdown__list-item-link"
            onClick={(event) => handleItemClick(event, option)}
          >
            {option}
          </a>
        </li>
      ))}
    </ul>
  );
};
