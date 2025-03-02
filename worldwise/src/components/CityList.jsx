import React from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./CityItem";
const CityList = ({ isLoading, cities }) => {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add a City by clicking on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem city={city} key={city.id}/>;
      })}
    </ul>
  );
};

export default CityList;
