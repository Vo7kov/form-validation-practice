import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

type Props = {
  isSelected: boolean,
  value: string,
  placeholder: string,
  disabled: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DropdownButton: React.FC<Props> = ({
  isSelected,
  value,
  placeholder,
  disabled,
  setOpen,
}) => {
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const [isDropdownFocused, setDropdownFocused] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOpen]);

  const handleBlur = () => {
    setTimeout(() => {
      if (!isDropdownFocused) {
        setOpen(false);
      }
    }, 100);
  };

  return (
    <button
      ref={dropdownRef}
      type="button"
      className={classNames('dropdown__button', {
        'dropdown__button--selected': isSelected,
        'dropdown__button--disabled': disabled,
      })}
      onClick={() => setOpen((prevOpen: boolean) => !prevOpen)}
      onBlur={handleBlur}
      onFocus={() => setDropdownFocused(true)}
      disabled={disabled}
    >
      {value.length === 0 ? placeholder : value}
    </button>
  );
};
