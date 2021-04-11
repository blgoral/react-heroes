import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

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
        <React.Fragment>
            <div className="hero-list bg">
                {props.isLoading ? <Spinner /> : <ul>{mappedHeroes}</ul>}
            </div>
        </React.Fragment>
    );
};

export default HeroList;
