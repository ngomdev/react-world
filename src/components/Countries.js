import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'


const Countries = () => {

    const [data, setdata] = useState([]);
    const [rangeValue, setrangeValue] = useState(36);
    const [selectedRadio, setSelectedRadio] = useState("");

    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];


    //le use effect se joue lorsque le composant est monté
    useEffect(() => {
        return () => {
            axios
                .get("https://restcountries.com/v3.1/all")
                .then((res) => setdata(res.data));
        };
    }, [])



    return (
        <div className='countries'>
            <ul className='radio-container'>
                <input type="range" min="1" max="250" defaultValue={rangeValue}
                    onChange={(e) => setrangeValue(e.target.value)} />
                {
                    radios.map((continent) => (
                        <li>
                            <input type='radio' id={continent} name="continentRadio"
                              checked={continent === selectedRadio}
                                onChange={(e) => setSelectedRadio(e.target.id)} />
                            <label htmlFor={continent}>{continent}</label>
                        </li>
                    ))
                }

            </ul>
            {selectedRadio && (<button
                onClick={() => setSelectedRadio("")}>Annuler la recherche</button>)}
            <ul>
                {
                    data
                        //il fitre les continents
                        .filter((country) => country.continents[0].includes(selectedRadio))
                        // il trie
                        .sort((a, b) => b.population - a.population)
                        //il coupe limite
                        .slice(0, rangeValue)
                        //il affiche
                        .map((country, index) => (
                            <Card key={index} country={country} />
                        ))
                }
            </ul>

        </div>
    );
};

export default Countries;