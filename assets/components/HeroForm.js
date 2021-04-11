import React, { useState } from "react";

const HeroForm = (props) => {
    const [heroName, setHeroName] = useState("");
    const [heroLevel, setHeroLevel] = useState("");

    const formHandler = (event) => {
        event.preventDefault();
        props.onAddHero({ name: heroName, level: heroLevel });
    };

    return (
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
                    Add Hero
                </button>
            </form>
        </section>
    );
};

export default HeroForm;
