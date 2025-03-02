import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error("Type mismatch");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ error, isLoading, currentCity, cities }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const resp = await fetch(`${BASE_URL}/cities`);
        const data = await resp.json();
        dispatch({ payload: data, type: "cities/loaded" });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There is error while fetching cities...",
        });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const resp = await fetch(`${BASE_URL}/cities/${id}`);

      const data = await resp.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There is error while fetching city...",
      });
    }
  }

  async function createCity(city) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "city/created", payload: city });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There is error while adding a new city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There is error while deleting a city...",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const cityContext = useContext(CitiesContext);
  if (cityContext === undefined)
    throw new Error("Cities context used at wrong level");
  return cityContext;
};

export { CitiesProvider, useCities };
