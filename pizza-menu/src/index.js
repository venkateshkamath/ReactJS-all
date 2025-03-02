import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  //creating copy

  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  console.log(numPizzas);
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 ? (
        // Taken as an individual whole component, nothing in DOM
        <>
          <p>We are well known in town for Authentic Pizzas. Come and Enjoy</p>
          <ul className="pizzas">
            {pizzas.map((pizza) => {
              return (
                <Pizza
                  pizzaObj={pizza}
                  // key is imprtant for diffing
                  key={pizza.name}
                />
              );
            })}
          </ul>
        </>
      ) : (
        <p>We are working on our menu. We will be back soon.</p>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  console.log(pizzaObj);

  return (
    <li className={`pizza ${pizzaObj.soldOut && "sold-out"}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        {/* You can render 2 span components too */}
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}
function Footer() {
  //write JS here
  const hours = new Date().getHours();
  const openHours = 12;
  const closeHours = 22;
  const isOpen = hours <= closeHours && hours >= openHours;

  console.log(isOpen);

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHours={closeHours} openHours={openHours} />
      ) : (
        <p>
          We are happy to welcome you between {openHours}:00 and {closeHours}:00
        </p>
      )}
    </footer>
  );
}

function Order({ closeHours, openHours }) {
  return (
    <div className="order">
      <p>
        We are open from {openHours}:00 to {closeHours}:00. Come visit us or
        oder online
      </p>
      <button className="btn">Order online</button>
    </div>
  );
}

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
