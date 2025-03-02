import React, { useContext } from "react";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";
const CityList = () => {
  const { isLoading, cities } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={"Please add some data after clicking on the map"} />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem key={city.id} city={city} />;
      })}
    </ul>
  );
};

export default CityList;
