import "./style.scss";
import LoginForm from "./LoginForm";
import ChooseLanguage from "./ChooseLanguage";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ChooseFactory from "./ChooseFactory";
export const year = new Date().getFullYear()
const LoginScreen = () => {
  const { t } = useTranslation();
  return (
    <section id={"login-screen"}>
      <div className="marquee-container">
        <div className="marquee-content">
          <Typography variant="subtitle2" sx={{ color: 'white', opacity: 0.8, width: '100%', textAlign: 'left' }}>{t("msgHelp")}: H.Vân (0788968791)</Typography>
        </div>
      </div>
      <div className={"blur-backdrop"}></div>
      <ChooseLanguage />
      <ChooseFactory />
      <LoginForm />
      <Typography variant="caption" sx={{ position: 'absolute', bottom: 1, color: 'white', opacity: 0.5, width: '100%', textAlign: 'center' }}> Powered by IT-Software LHG<br /> © {year} LACTY CO II.,LTD. All rights reserved. </Typography>
    </section>
  );
};

export default LoginScreen;
