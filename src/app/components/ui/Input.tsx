// src/app/components/ui/Input.tsx
'use client';

import React, { useState } from 'react';

export default function Input() {

    const [inputValue, setInputValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState<string | null>(null);


    // Handle input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the page from reloading
        setSubmittedValue(inputValue); // Set the submitted value
    };

    return (
        <div>
            <label htmlFor="myInput">Enter Prompt:</label>
            <input
                type="text"
                id="myInput"
                value={inputValue}
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>Submit</button>

            {submittedValue && <p>You entered: {submittedValue}</p>}
        </div>
    );
};