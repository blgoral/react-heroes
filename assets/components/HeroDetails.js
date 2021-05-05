import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Spinner from "./Spinner";

const HeroDetails = (props) => {
    let { id } = useParams();
    const [heroName, setHeroName] = useState("");
    const [heroLevel, setHeroLevel] = useState("");
    const [heroAbilities, setHeroAbilities] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [selectedAbility, setSelectedAbility] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetchHero(id);
        fetchAbilities();
        props.clearHeroes();
    }, []);

    const fetchHero = (id) => {
        setIsLoading(true);
        fetch(props.apiURL + "heroes/" + id)
            .then((response) => response.json())
            .then((data) => {
                setHeroName(data.name);
                setHeroLevel(data.level);
                setHeroAbilities(data.abilities);
            })
            .then(() => setIsLoading(false));
    };

    const updateHero = (hero) => {
        fetch(props.apiURL + "heroes/" + id, {
            method: "PUT",
            body: JSON.stringify(hero),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then(() => history.push("/"));
    };

    const fetchAbilities = () => {
        fetch(props.apiURL + "hero_abilities/")
            .then((response) => response.json())
            .then((data) => setAbilities(data["hydra:member"]));
    };

    let mappedAbilities = heroAbilities.map((ability) => {
        return <li key={ability["@id"]}>{ability.abilityName}</li>;
    });

    let selectAbilities = abilities.map((ability) => {
        return (
            <option key={ability["@id"]} value={ability["@id"]}>
                {ability.abilityName}
            </option>
        );
    });

    const findAbility = (term) => {
        const result = abilities.find((ability) => ability["@id"] === term);
        const check = heroAbilities.find((ability) => ability["@id"] === term);
        if (result && !check) {
            setHeroAbilities([...heroAbilities, result]);
        }
    };

    const formHandler = (event) => {
        event.preventDefault();
        let abilityList = [];
        heroAbilities.forEach((item) => {
            abilityList.push(item["@id"]);
        });
        updateHero({
            name: heroName,
            level: heroLevel,
            abilities: abilityList,
        });
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
                    <div className="form-control">
                        <label htmlFor="hero-abilities">Hero Abilities</label>
                        <select
                            name="hero-abilities"
                            id="abilities-select"
                            onChange={(event) => {
                                setSelectedAbility(event.target.value);
                            }}
                        >
                            <option value="">Choose Ability</option>
                            {selectAbilities}
                        </select>
                    </div>
                    <button
                        onClick={() => {
                            findAbility(selectedAbility);
                        }}
                        className="btn"
                        type="button"
                    >
                        Add Ability
                    </button>
                    <button className="btn" type="submit">
                        Update Hero
                    </button>
                    <Link to={"/"} className="btn">
                        Return To List
                    </Link>
                </form>
            </section>
            <section className="hero-details bg">
                {isLoading && <Spinner />}
                {!isLoading && (
                    <React.Fragment>
                        <h2>{heroName}</h2>
                        <h3>{heroLevel}</h3>
                        <ul>{mappedAbilities}</ul>
                    </React.Fragment>
                )}
            </section>
        </React.Fragment>
    );
};

export default HeroDetails;
