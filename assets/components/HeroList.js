import React from "react";

const HeroList = (props) => {
    let mappedHeroes = props.heroes.map((hero) => {
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
