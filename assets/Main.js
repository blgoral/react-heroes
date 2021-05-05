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
        fetch(apiURL + "heroes/")
            .then((response) => response.json())
            .then((data) => setHeroes(data["hydra:member"]))
            .then(() => setIsLoading(false));
    }

    const addHero = (hero) => {
        fetch(apiURL + "heroes", {
            method: "POST",
            body: JSON.stringify(hero),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then(() => {
                fetchHeroes();
            });
    };

    const deleteHero = (heroId) => {
        fetch(apiURL + "heroes/" + heroId, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            fetchHeroes();
        });
    };

    const clearHeroes = () => {
        setHeroes([]);
    };

    return (
        <Router>
            <div className="container">
                <h1>
                    <span>🛡</span>React Heroes <span>🗡</span>
                </h1>
                <Switch>
                    <Route exact path="/">
                        <HeroForm onAddHero={addHero} />
                        <HeroList
                            heroes={heroes}
                            isLoading={isLoading}
                            onDeleteHero={deleteHero}
                            fetchHeroes={fetchHeroes}
                            setHeroes={setHeroes}
                        />
                    </Route>
                    <Route
                        path="/hero/:id"
                        children={
                            <HeroDetails
                                apiURL={apiURL}
                                clearHeroes={clearHeroes}
                            />
                        }
                    />
                </Switch>
            </div>
        </Router>
    );
};

const apiURL = "https://localhost:8000/api/";

export default Main;
