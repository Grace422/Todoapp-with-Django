import React from "react"

export default function LoginPage(){
        const redirectUri = process.env.REACT_APP_CASDOOR_REDIRECT_URI;
        const clientId = process.env.REACT_APP_CASDOOR_CLIENT_ID;
        const endpoint = process.env.REACT_APP_CASDOOR_ENDPOINT;
    
        const handleLogin = () => {
            window.location.href = `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
        };
    return(
        <div>
            <button onClick={handleLogin}>Login with Casdoor</button>
        </div>
    )
}

