import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Spinner from "./Spinner";

const HeroDetails = (props) => {
    let { id } = useParams();
    const [heroName, setHeroName] = useState("");
    const [heroLevel, setHeroLevel] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetchHero(id);
    }, []);

    const fetchHero = (id) => {
        setIsLoading(true);
        fetch(props.apiURL + "/" + id)
            .then((response) => response.json())
            .then((data) => {
                setHeroName(data.name);
                setHeroLevel(data.level);
            })
            .then(() => setIsLoading(false));
    };

    const updateHero = (hero) => {
        fetch(props.apiURL + "/" + id, {
            method: "PUT",
            body: JSON.stringify(hero),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then(() => history.push("/"));
    };

    const formHandler = (event) => {
        event.preventDefault();
        updateHero({ name: heroName, level: heroLevel });
    };

    return (
        <React.Fragment>
            <section className="hero-form bg">
                <form onSubmit={formHandler}>
                    <div className="form-control">
                        <label htmlFor="hero-name">Hero Name</label>
                        <input
                            type="text"
                            id="hero-name"
                            value={heroName}
                            onChange={(event) => {
                                setHeroName(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="hero-level">Hero Level</label>
                        <input
                            type="number"
                            id="hero-level"
                            value={heroLevel}
                            onChange={(event) => {
                                setHeroLevel(+event.target.value);
                            }}
                        />
                    </div>
                    <button className="btn" type="submit">
                        Update Hero
                    </button>
                    <button
                        onClick={() => history.push("/")}
                        className="btn"
                        type="button"
                    >
                        Return To List
                    </button>
                </form>
            </section>
            <section className="hero-details bg">
                {isLoading && <Spinner />}
                {!isLoading && (
                    <React.Fragment>
                        <h2>{heroName}</h2>
                        <h3>{heroLevel}</h3>
                    </React.Fragment>
                )}
            </section>
        </React.Fragment>
    );
};

export default HeroDetails;
