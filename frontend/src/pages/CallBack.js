import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CallBack = () => {
    const navigate = useNavigate();
    const redirectUriRef = useRef(process.env.REACT_APP_CASDOOR_REDIRECT_URI);
    const clientIdRef = useRef(process.env.REACT_APP_CASDOOR_CLIENT_ID);
    const clientSecretRef = useRef(process.env.REACT_APP_CASDOOR_CLIENT_SECRET);
    const endpointRef = useRef(process.env.REACT_APP_CASDOOR_TOKEN_ENDPOINT);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

            const getToken = async () => {
                try {
                    const response = await axios.post(endpointRef.current, new URLSearchParams({
                        client_id: clientIdRef.current,
                        client_secret: clientSecretRef.current,
                        code,
                        redirect_uri: redirectUriRef.current,
                        grant_type: 'authorization_code',
                    }).toString(), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });

                    const { access_token } = response.data;
                    localStorage.setItem('accessToken', access_token);

                    navigate("/todos");
                } catch (error) {
                    console.error('Error exchanging code for token:', error.response ? error.response.data : error.message);
                }
            };

            getToken();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default CallBack;