import React from 'react';

const Main = props => {
    return <h1>Test</h1>;
}

fetch('https://localhost:8000/api/heroes')
    .then(response => response.json())
    .then(data => console.log(data));

export default Main;
