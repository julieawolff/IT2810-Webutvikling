import './ListOption.css';

interface ListOptionProps {
  changedCountryName: string;
  changeCountry: (changedCountryName: string) => void;
}

export default function ListOption({ changedCountryName, changeCountry }: ListOptionProps) {
  return (
    <button className="listOption" onClick={() => changeCountry(changedCountryName)}>
      <span className="listOptionLabel">{changedCountryName}</span>
    </button>
  );
}
