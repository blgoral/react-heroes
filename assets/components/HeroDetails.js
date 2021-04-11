import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const HeroDetails = (props) => {
    let { id } = useParams();
    const [heroName, setHeroName] = useState("");
    const [heroLevel, setHeroLevel] = useState("");
    const history = useHistory();

    useEffect(() => {
        fetchHero(id);
    }, []);

    const fetchHero = (id) => {
        fetch(props.apiURL + "/" + id)
            .then((response) => response.json())
            .then((data) => {
                setHeroName(data.name);
                setHeroLevel(data.level);
            });
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
        <div>
            <h2>{heroName}</h2>
            <h3>{heroLevel}</h3>
            <section className="hero-form">
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
                    <button type="submit">Update Hero</button>
                </form>
            </section>
        </div>
    );
};

export default HeroDetails;
