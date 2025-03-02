import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
const CountryList = ({ isLoading, cities }) => {
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add a Country by clicking on the map" />;
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} key={country.country} />;
      })}
    </ul>
  );
};

export default CountryList;
