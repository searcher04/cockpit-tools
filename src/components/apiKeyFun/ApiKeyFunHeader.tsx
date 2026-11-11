import { useTranslation } from 'react-i18next';
import apiKeyFunIcon from '../../assets/icons/apikey-fun.png';

export function ApiKeyFunHeader() {
  const { t } = useTranslation();

  return (
    <header className="apikey-fun-header-brand">
      <div className="apikey-fun-brand-main">
        <img src={apiKeyFunIcon} alt="" className="apikey-fun-brand-logo" />
        <div className="apikey-fun-brand-text">
          <div className="apikey-fun-eyebrow-container">
            <span className="apikey-fun-eyebrow">{t('apiKeyFun.eyebrow')}</span>
          </div>
          <h1>{t('apiKeyFun.title')}</h1>
          <p>{t('apiKeyFun.description')}</p>
        </div>
      </div>
    </header>
  );
}
