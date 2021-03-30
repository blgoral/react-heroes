import React, { useState } from "react";
import HeroForm from "./components/HeroForm";
import HeroList from "./components/HeroList";

const Main = () => {
    const [error, setError] = useState(null);
    const [heroes, setHeroes] = useState([]);

    const addHero = (hero) => {
        console.log(JSON.stringify(hero));
        fetch(apiURL, {
            method: "POST",
            body: JSON.stringify(hero),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    return (
        <div>
            <HeroForm onAddHero={addHero} />
            <HeroList />
        </div>
    );
};

const apiURL = "https://localhost:8000/api/heroes";

export default Main;
