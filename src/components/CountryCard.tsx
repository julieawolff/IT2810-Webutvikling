import './CountryCard.css';
import FavoriteButton from './FavoriteButton';

interface CountryCardProps {
  country: string;
  continent: string;
  currency: string;
  capital: string;
  language: string;
  flag: string;
  onLeft: () => void;
  onRight: () => void;
  isCountryFavorite: boolean;
  handleFavorite: () => void;
}

export default function CountryCard({
  country,
  continent,
  currency,
  capital,
  language,
  flag,
  onLeft,
  onRight,
  isCountryFavorite,
  handleFavorite,
}: CountryCardProps) {
  return (
    <article className="countryCard">
      <h2 className="title">{country}</h2>
      <p className="paragraph"> Continent: {continent}</p>
      <p className="paragraph"> Currency: {currency}</p>
      <p className="paragraph"> Capital: {capital}</p>
      <p className="paragraph"> Language: {language}</p>
      <img className="flagPicture" src={flag}></img>
      <button className="leftButton" onClick={onLeft}>
        {'\u276E'}
      </button>
      <button className="rightButton" onClick={onRight}>
        {'\u276F'}
      </button>
      <div className="favoriteButton">
        <FavoriteButton handleFavorite={handleFavorite} initialFavoriteStatus={isCountryFavorite}></FavoriteButton>
      </div>
    </article>
  );
}
