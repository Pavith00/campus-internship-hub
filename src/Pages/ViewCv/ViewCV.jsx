import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewCV() {
    const [cvUrl, setCVUrl] = useState('');

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cv/65f3f11fecd1157526c75ef2', {
                    responseType: 'arraybuffer',
                });
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                setCVUrl(url);
            } catch (error) {
                console.error('Error fetching CV:', error);
            }
        };

        fetchCV();
    }, []);

    return (
        <div>
            <h2>View CV</h2>
            {cvUrl ? (
                <iframe src={cvUrl} style={{ width: '100%', height: '600px', border: 'none' }}></iframe>
            ) : (
                <p>Loading CV...</p>
            )}
        </div>
    );
}

export default ViewCV;
