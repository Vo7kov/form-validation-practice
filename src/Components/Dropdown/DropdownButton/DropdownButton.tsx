import React from 'react';
import classNames from 'classnames';

type Props = {
  isSelected: boolean;
  setOpen: (param: any) => void;
  value: string;
  el: any,
};

export const DropdownButton: React.FC<Props> = ({
  isSelected,
  setOpen,
  value,
  el,
}) => (
  <button
    ref={el}
    type="button"
    className={classNames(
      'dropdown__button',
      {
        'dropdown__button--selected': isSelected,
      },
    )}
    onClick={() => setOpen((prevOpen: boolean) => !prevOpen)}
  >
    {value.length === 0 ? 'Select country' : value}
  </button>
);
