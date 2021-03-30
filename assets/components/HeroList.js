import React, { useState, useEffect } from "react";

const HeroList = (props) => {
    const apiURL = "https://localhost:8000/api/heroes";
    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => setHeroes(data["hydra:member"]));
    }, []);

    console.log(heroes);

    let mappedHeroes = heroes.map((hero) => {
        return (
            <li key={hero.id}>
                {hero.name} <strong>ID:</strong> {hero.id}
            </li>
        );
    });

    return (
        <div>
            <ul>{mappedHeroes}</ul>
        </div>
    );
};

export default HeroList;
