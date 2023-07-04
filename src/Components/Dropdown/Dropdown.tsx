import React, { useState, useEffect, useRef } from 'react';

import { DropdownButton } from './DropdownButton/DropdownButton';
import { DropdownList } from './DropdownList/DropdownList';

import './Dropdown.scss';

type Props = {
  options: string[],
  onChange: (item: string) => void,
};

export const Dropdown: React.FC<Props> = ({ options, onChange }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isOpened, setOpen] = useState(false);
  const [dropdownValue, setValue] = useState('');

  const dropdownButton = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.target !== dropdownButton.current) {
        setOpen(false);
      }
    });
  }, []);

  return (
    <div className="dropdown">
      <DropdownButton
        isSelected={isSelected}
        setOpen={setOpen}
        value={dropdownValue}
        el={dropdownButton}
      />

      {isOpened && (
        <DropdownList
          options={options}
          setOpen={setOpen}
          setIsSelected={setIsSelected}
          setValue={setValue}
          onChange={onChange}
        />
      )}
    </div>
  );
};
