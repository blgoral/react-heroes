import React, { useState, useEffect } from "react";
import HeroForm from "./components/HeroForm";
import HeroList from "./components/HeroList";

const Main = () => {
    const [error, setError] = useState(null);
    const [heroes, setHeroes] = useState([]);

    function fetchHeroes() {
        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => setHeroes(data["hydra:member"]));
    }

    useEffect(() => {
        fetchHeroes();
    }, []);

    const addHero = (hero) => {
        fetch(apiURL, {
            method: "POST",
            body: JSON.stringify(hero),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(() => {
                fetchHeroes();
            });
    };

    return (
        <div>
            <HeroForm onAddHero={addHero} />
            <HeroList heroes={heroes} />
        </div>
    );
};

const apiURL = "https://localhost:8000/api/heroes";

export default Main;
