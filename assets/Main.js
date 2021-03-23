import React, {useState} from 'react';
import HeroForm from './components/HeroForm';

const Main = () => {
    const [error, setError] = useState(null);
    const [heroes, setHeroes] = useState([]);

    const addHero = (hero) => {
        console.log(JSON.stringify(hero));
        fetch(
            apiURL,
            {
                method: "POST",
                body: JSON.stringify(hero),
                headers: { "Content-Type": "application/json" },
            }
        )
            .then(response => response.json())
            .then(data => console.log(data));
    };

    return(
      <HeroForm onAddHero={addHero} />
    );
}

const apiURL = 'https://localhost:8000/api/heroes';

fetch(apiURL)
    .then(response => response.json())
    .then(data => console.log(data));

export default Main;
