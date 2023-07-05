import React, { useState } from 'react';

import { DropdownButton } from './DropdownButton/DropdownButton';
import { DropdownList } from './DropdownList/DropdownList';

import './Dropdown.scss';

type Props = {
  options: string[],
  placeholder: string,
  disabled?: boolean,
  onChange: (item: string) => void,
};

export const Dropdown: React.FC<Props> = ({
  options,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isOpened, setOpen] = useState(false);
  const [dropdownValue, setValue] = useState('');

  return (
    <div className="dropdown">
      <DropdownButton
        isSelected={isSelected}
        setOpen={setOpen}
        value={dropdownValue}
        placeholder={placeholder}
        disabled={disabled}
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
