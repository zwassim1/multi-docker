import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Fib() {
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');
    const [seenIndexes, setSeenIndexes] = useState([]);

    const fetchValues = async () => {
        const values = await axios.get('/api/values/current');
        setValues(values.data);
    };

    const fetchIndexes = async () => {
        const seenIndexes = await axios.get('/api/values/all');
        setSeenIndexes(seenIndexes.data);
    };

    const renderSeenIndexes = () => {
        return seenIndexes.map(({ number }) => number).join(', ');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index,
        });
        setIndex('');
    };

    const renderValues = () => {
        const entries = [];

        for (let key in values) {
            entries.push(
                <div key={key}>
                    For index {key} I Calculated {values[key]}
                </div>
            );
        }

        return entries;
    };

    useEffect(() => {
        fetchValues;
        fetchIndexes();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                />
                <button>Submit</button>
            </form>

            <h3>Index I have seen:</h3>
            {renderSeenIndexes}

            <h3>Calculated values</h3>
            {renderValues}
        </div>
    );
}
