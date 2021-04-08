import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
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

    const deleteHero = (heroId) => {
        fetch(apiURL + '/' + heroId, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                fetchHeroes();
            });
    };

    return (
        <div>
            <HeroForm onAddHero={addHero} />
            <HeroList heroes={heroes} onDeleteHero={deleteHero} />
        </div>
    );
};

const apiURL = "https://localhost:8000/api/heroes";

export default Main;
