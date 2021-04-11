import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HeroForm from "./components/HeroForm";
import HeroList from "./components/HeroList";
import HeroDetails from "./components/HeroDetails";

const Main = () => {
    const [error, setError] = useState(null);
    const [heroes, setHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function fetchHeroes() {
        setIsLoading(true);
        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => setHeroes(data["hydra:member"]))
            .then(() => setIsLoading(false));
    }

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
        fetch(apiURL + "/" + heroId, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            fetchHeroes();
        });
    };

    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <HeroForm onAddHero={addHero} />
                        <HeroList
                            heroes={heroes}
                            isLoading={isLoading}
                            onDeleteHero={deleteHero}
                            fetchHeroes={fetchHeroes}
                        />
                    </Route>
                    <Route
                        path="/hero/:id"
                        children={<HeroDetails apiURL={apiURL} />}
                    />
                </Switch>
            </div>
        </Router>
    );
};

const apiURL = "https://localhost:8000/api/heroes";

export default Main;
