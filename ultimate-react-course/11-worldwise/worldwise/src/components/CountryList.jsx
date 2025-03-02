import React, { useContext } from "react";
import styles from "./CountryList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../Contexts/CitiesContext";
const CountryList = () => {
  const { cities, isLoading } = useCities();
  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) {
      return arr;
    } else {
      return [
        ...arr,
        {
          country: city.country,
          emoji: city.emoji,
        },
      ];
    }
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={"Please add some data after clicking on the map"} />
    );
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} />;
      })}
    </ul>
  );
};

export default CountryList;
