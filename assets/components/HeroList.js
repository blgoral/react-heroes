import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HeroList = (props) => {
    useEffect(() => {
        props.fetchHeroes();
    }, []);

    let mappedHeroes = props.heroes.map((hero) => {
        return (
            <li key={hero.id}>
                <Link to={`/hero/${hero.id}`}>{hero.name}</Link>
                <button
                    onClick={() => props.onDeleteHero(hero.id)}
                    className="delete"
                >
                    X
                </button>
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
