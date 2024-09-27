import FilterOption from './FilterOption';
import './FilterOptionOverview.css';
import ListOption from './ListOption';

interface FilterOptionOverviewProps {
  changeCountry: (changedCountryName : string) => void; //en funksjon i DisplayCountriesPage som endrer hvilket land som vises på kortet
  handleOptionChange: (currentOption: string, checked: boolean) => void;
  selectedOptions: string[];
  currentContries: string[];
}
const filterOptions = [
  'Favorites',
  'Europe',
  'Africa',
  'Asia',
  'Oceania',
  'North America',
  'South America',
  'Antarctica',
];

export default function FilterOptionOverview({
  changeCountry,
  handleOptionChange,
  selectedOptions,
  currentContries,
}: FilterOptionOverviewProps) {
  function isSelectedFilterOption(filterOption: string) {
    return selectedOptions.includes(filterOption);
  }

  return (
    <>
      <div className="filterOptionOverviewBox">
        <h2> Filter on: </h2>
        <div>
          {/* Viser frem alle mulige filtreringer i FilterOptionOverview basert på listen filterOption */}
          {filterOptions.map((filterOption, index) => (
            <FilterOption
              key={index}
              label={filterOption}
              onChange={(checked) => handleOptionChange(filterOption, checked)}
              checked={isSelectedFilterOption(filterOption)}
            />
          ))}
        </div>

        <h2> Filtered countries: </h2>
        <div>
          {currentContries.map((name, index) => (
            <ListOption
              key={index} 
              changedCountryName={name} 
              changeCountry={changeCountry}></ListOption>
          ))}
        </div>
      </div>
    </>
  );
}
