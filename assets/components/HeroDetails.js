import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HeroDetails = (props) => {
    let { id } = useParams();
    const [heroName, setHeroName] = useState("");

    useEffect(() => {
        fetchHero(id);
    }, []);

    const fetchHero = (id) => {
        fetch(props.apiURL + "/" + id)
            .then((response) => response.json())
            .then((data) => setHeroName(data.name));
    };

    return <h2>{heroName}</h2>;
};

export default HeroDetails;
