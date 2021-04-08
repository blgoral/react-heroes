import React from "react";

const HeroList = (props) => {


    let mappedHeroes = props.heroes.map((hero) => {
        return (
            <li key={hero.id}>
                {hero.name} <button onClick={() => props.onDeleteHero(hero.id)} className="delete">X</button>
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
