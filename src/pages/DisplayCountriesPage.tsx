import { useState, useEffect } from 'react';
import CountryCard from '../components/CountryCard';
import './DisplayCountriesPage.css';
import { useQuery } from '@tanstack/react-query';
import FilterOptionOverview from '../components/FilterOptionOverview';

//Henter alle landene fra REST Countries API-et
const fetchCountries = async () => {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,continents,capital,flags,languages,currencies',
  );
  const data = await response.json();
  return data.slice(0, 60); //Kan endre her for å endre hvilke/hvor mange land vi henter ut
};

export default function DisplayCountriesPage() {
  const { data, error, isLoading } = useQuery({ queryKey: ['countries'], queryFn: fetchCountries });
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);

  //Henter de favorittlandene som er lagret i local storage
  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteCountries') || '[]');
      setFavoriteCountries(storedFavorites);
    } catch (error) {
      console.error('Failed to parse favorite countries from local storage:', error);
      setFavoriteCountries([]);
    }
  }, []);

  //Henter de filtreringsvalgene som er lagret i session storage
  useEffect(() => {
    try {
      const storedSelectedOptions = JSON.parse(sessionStorage.getItem('selectedOptions') || '[]');
      setSelectedOptions(storedSelectedOptions);
    } catch (error) {
      console.error('Failed to parse selected options from session storage:', error);
      setSelectedOptions([]);
    }
  }, []);

  if (isLoading) return <p>Laster...</p>;
  if (error) return <p>En feil oppsto: {error.message}</p>;

  //Alle landene som hentes fra REST countries
  const allCountryData = data;

  // Dymaisk liste som endrer seg basert på hva som filtrers på (dersom ingen filtreringer er gitt har man bare hele allCountryData)
  let currentCountries = [];
  if (selectedOptions.length === 0) {
    currentCountries = allCountryData;
  } else if (selectedOptions.includes('Favorites') && favoriteCountries.length === 0 && selectedOptions.length === 1) {
    currentCountries = allCountryData;
  } else {
    currentCountries = allCountryData.filter(
      (country: { continents: string[]; name: { common: string } }) =>
        selectedOptions.includes(country.continents[0]) ||
        (selectedOptions.includes('Favorites') && favoriteCountries.includes(country.name.common)),
    );
  }

  //Landet som skal vises i CardComponent
  const currentCountry = currentCountries[currentCountryIndex];

  //Formatering på dataen som blir hentet via API-et
  const continent = currentCountry.continents[0] ?? 'None';

  const name = currentCountry.name.common ?? 'None';

  const capital = currentCountry.capital ?? 'None';

  const flag = currentCountry.flags.png ?? 'None';

  //Languages og currencies hentes som dictionaries
  //Antartica har eksempelvis verken capital, languages eller currencies og disse vil derfor bli hentet ut som tomme objekt aka ha lengde 0
  const languages =
    currentCountry.languages && Object.keys(currentCountry.languages).length > 0
      ? Object.values(currentCountry.languages).slice(0, 2).join(', ')
      : 'None';

  const currencies =
    currentCountry.currencies && Object.keys(currentCountry.currencies).length > 0
      ? (Object.values(currentCountry.currencies)[0] as { name: string })?.name
      : 'None';

  //To funksjoner for hva som skal skje dersom hendholsvis pil venstre og pil høyre trykkes på
  //Kalles på fra CountryCardComponent
  const handleLeft = () => {
    if (currentCountryIndex == 0) {
      setCurrentCountryIndex(currentCountries.length - 1);
    } else {
      setCurrentCountryIndex(currentCountryIndex - 1);
    }
  };

  const handleRight = () => {
    if (currentCountryIndex == currentCountries.length - 1) {
      setCurrentCountryIndex(0);
    } else {
      setCurrentCountryIndex(currentCountryIndex + 1);
    }
  };

  //Funskjon som håndterer endring av valgte kontinenter
  const handleOptionChange = (currentOption: string, checked: boolean) => {
    let updatedSelectedOptions: string[] = [];

    if (checked) {
      updatedSelectedOptions = [...selectedOptions, currentOption];
    } else {
      updatedSelectedOptions = selectedOptions.filter((option) => option !== currentOption);
    }
    setSelectedOptions(updatedSelectedOptions);
    sessionStorage.setItem('selectedOptions', JSON.stringify(updatedSelectedOptions));
    setCurrentCountryIndex(0);
  };

  // Kalles når brukeren trykker på favorittknappen -> Oppdaterer favoriteCountries og lagrer i local storage
  const handleFavorite = (countryName: string) => {
    let updatedFavorites: string[] = [];
    if (favoriteCountries.includes(countryName)) {
      updatedFavorites = favoriteCountries.filter((country) => country !== countryName);
      window.location.reload();
    } else {
      updatedFavorites = [...favoriteCountries, countryName];
    }
    setFavoriteCountries(updatedFavorites);
    localStorage.setItem('favoriteCountries', JSON.stringify(updatedFavorites));
  };

  const handleChangeCountry = (changedCountryName: string) => {
    //Finne index til landet vi ønsker å vise i CountryCardComponent
    const countryIndex = currentCountries.findIndex(
      (country: { name: { common: string } }) => country.name.common === changedCountryName,
    );
    //Sette CurrentCountryIndex til navnet på den ListOption-en som er blitt trykket på
    if (countryIndex !== -1) {
      setCurrentCountryIndex(countryIndex);
    } else {
      console.log(`Country with the name "${name}" not found.`);
    }
  };

  return (
    <div className="outerDiv">
      <FilterOptionOverview
        changeCountry={handleChangeCountry}
        handleOptionChange={handleOptionChange}
        selectedOptions={selectedOptions}
        currentContries={currentCountries.map((country: { name: { common: string } }) => country.name.common)}
      />
      <CountryCard
        country={name}
        continent={continent}
        currency={currencies}
        capital={capital}
        language={languages}
        flag={flag}
        onLeft={handleLeft}
        onRight={handleRight}
        handleFavorite={() => handleFavorite(currentCountry.name.common)}
        isCountryFavorite={favoriteCountries.includes(currentCountry.name.common)}
      ></CountryCard>
    </div>
  );
}
