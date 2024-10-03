//JSON beautifier
"use client";

import { useState } from 'react';

export default function JsonTools() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(input);
      const beautified = JSON.stringify(parsed, null, 2); // Beautifies JSON
      setOutput(beautified);
      setError(''); // Clear error if successful
    } catch (e) {
      setError('Invalid JSON'); // Set error if JSON is invalid
      setOutput('');
    }
  };

  const handleValidate = () => {
    try {
      JSON.parse(input);
      setError(''); // Clear error if successful
    } catch (e) {
      setError('Invalid JSON');
      setOutput('');
    }
  }
  const handleInputChange = (e: any) => {
    setInput(e.target.value);
    handleValidate(); // Beautify JSON on every input change
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>JSON Beautifier</h1>
      
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Paste your JSON here..."
        style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
      />
      
      <button onClick={handleBeautify} style={{ marginBottom: '1rem', background: '#04AA6D', color: '#fff', padding: '6px 18px' }}>
        Beautify JSON
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <textarea
        value={output}
        readOnly
        placeholder="Formatted JSON will appear here..."
        style={{ width: '100%', height: '200px' }}
      />
    </div>
  );
}