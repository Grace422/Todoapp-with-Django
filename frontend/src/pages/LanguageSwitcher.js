import React from "react";
import { useTranslation } from 'react-i18next';


const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const handleChangeLanguage = (event) => {
      const lng = event.target.value;
      i18n.changeLanguage(lng);
    };
    return (
      <div className="language-div">
        <label htmlFor="language-select">{t('choose')}:</label>
        <select id="language-select" onChange={handleChangeLanguage}>
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
      </div>
    );
  };
  export default LanguageSwitcher;