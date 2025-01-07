import React from "react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";

export default function FirstPage(){
    const { t } = useTranslation();
    return(
        <div className="welcome-container">
            <h1 className="welcome">{t('welcome')}</h1>
            <p className="text">{t('text')}</p>
            <LanguageSwitcher/>
        </div>
    )
}