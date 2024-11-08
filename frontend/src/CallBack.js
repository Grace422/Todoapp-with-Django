import React, { useEffect } from 'react';
import axios from 'axios';

const CallbackPage = () => {
    const redirectUri = process.env.REACT_APP_CASDOOR_REDIRECT_URI;
    const clientId = process.env.REACT_APP_CASDOOR_CLIENT_ID;
    const endpoint = process.env.REACT_APP_CASDOOR_ENDPOINT;
    const clientSecret = process.env.REACT_APP_CASDOOR_CLIENT_SECRET;

    useEffect(() => {
        const getToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            
            if (code) {
                try {
                    // Exchange the authorization code for a token
                    const response = await axios.post(`${endpoint}`, {
                        code: code,
                        client_id: `${clientId}`,
                        client_secret: `${clientSecret}`,
                        redirect_uri: `${redirectUri}`,
                    });

                    // Save the JWT token to localStorage or state
                    localStorage.setItem('token', response.data.token);

                    // Optionally, redirect the user to a protected route
                    window.location.href = '/dashboard';  // Or wherever you want to redirect
                } catch (error) {
                    console.error('Error fetching token from Casdoor:', error);
                }
            }
        };

        getToken();
    }, []);

    return <div>Processing login...</div>;
};

export default CallbackPage;
