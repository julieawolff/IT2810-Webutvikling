import { useState } from 'react';
import './FilterOption.css';

interface FilterOptionProps {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

export default function FilterOption({ label, checked, onChange }: FilterOptionProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <label className="filterOption">
      <input
        className="filterOptionCheckbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="filterOptionLabel">{label}</span>
    </label>
  );
}
