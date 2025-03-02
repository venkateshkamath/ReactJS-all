// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useURLPosition } from "../hooks/useURLPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../Contexts/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoLocationError, setGeoLocationError] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isGeoLocationLoading, setIsGeoLocationLoading] = useState(false);

  //MAP LAT AND LONG
  const [mapLat, mapLng] = useURLPosition();

  //context
  const { isLoading, createCity } = useCities();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName && !date) return;

    const newCity = {
      country,
      cityName,
      notes: notes.trim(),
      date,
      emoji,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
    };
    await createCity(newCity);
    navigate("/app");
    //OR navigate('/app/cities') => but above, there is redirection
  };

  useEffect(() => {
    if (!mapLng && !mapLat) return;
    setIsGeoLocationLoading(true);
    setGeoLocationError("");

    async function fetchData() {
      //remember this
      try {
        setIsGeoLocationLoading(true);
        setGeoLocationError("");
        const response = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await response.json();
        if (!data.countryCode) {
          throw new Error(
            "Selected wrong place on the map. Please choose wisely 😊"
          );
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoLocationError(err.message);
      } finally {
        setIsGeoLocationLoading(false);
      }
    }
    fetchData();
  }, [mapLat, mapLng]);

  if (isGeoLocationLoading) return <Spinner />;
  if (geoLocationError) return <Message message={geoLocationError} />;
  if (!mapLat && !mapLng)
    return <Message message={"Please click somewhere on the map to start"} />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          dateFormat="dd/MM/yyyy"
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={handleSubmit}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
