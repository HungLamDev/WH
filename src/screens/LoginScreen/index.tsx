import "./style.scss";
import LoginForm from "./LoginForm";
import ChooseLanguage from "./ChooseLanguage";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ChooseFactory from "./ChooseFactory";
import { Fireworks } from 'fireworks-js'
import { useEffect } from "react";


export const year = new Date().getFullYear()
const LoginScreen = () => {

  useEffect(() => {
    const container = document.querySelector('#login-screen');

    if (container instanceof Element) {
      const fireworks = new Fireworks(container, { autoresize: true });
      fireworks.start();
    } else {
      console.error('Container element not found!');
    }
  }, []); // Empty dependency array means this effect runs once after the initial render


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
      <Typography variant="caption" sx={{
        position: 'absolute',
        bottom: 1,
        color: '#FDE767',
        //opacity: 0.5,
        fontWeight: '700',
        width: '100%',
        textAlign: 'center'
      }}> Powered by IT-Software LHG<br /> © {year} LACTY CO II.,LTD. All rights reserved. </Typography>
    </section>
  );
};

export default LoginScreen;
