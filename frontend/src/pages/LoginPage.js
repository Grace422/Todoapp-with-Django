import React, { useEffect } from "react"
import FirstPage from "./FirstPage";
import { useTranslation } from 'react-i18next';


export default function LoginPage() {
    const redirectUri = process.env.REACT_APP_CASDOOR_REDIRECT_URI;
    const clientId = process.env.REACT_APP_CASDOOR_CLIENT_ID;
    const endpoint = process.env.REACT_APP_CASDOOR_AUTHORIZATION_ENDPOINT;

    const { t } = useTranslation();
  


    const handleLogin = () => {
        window.location.href = `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=application_todo_app`;
    };

    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
            localStorage.removeItem("accessToken");
        }
    }, []);

    return (
        <div>
            <FirstPage/>
            <button onClick={handleLogin} className="loginbtn">{t('login')}</button>
        </div>
    )
}

