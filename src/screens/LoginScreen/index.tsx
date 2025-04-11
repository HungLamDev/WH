import "./style.scss";
import LoginForm from "./LoginForm";
import ChooseLanguage from "./ChooseLanguage";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ChooseFactory from "./ChooseFactory";
import { Fireworks } from 'fireworks-js'
import { useEffect } from "react";
import FlagConfetti from "../../components/Flags Firework";


const LoginScreen = () => {

  // useEffect(() => {
  //   const container = document.querySelector('#login-screen');

  //   if (container instanceof Element) {
  //     const fireworks = new Fireworks(container, { autoresize: true });
  //     fireworks.start();
  //   } else {
  //     console.error('Container element not found!');
  //   }
  // }, []); // Empty dependency array means this effect runs once after the initial render


  const { t } = useTranslation();
  return (
    <section id={"login-screen"}>
      <FlagConfetti />

      <div className="marquee-container">
        <div className="marquee-content">
          <Typography variant="subtitle2" sx={{ color: 'white', opacity: 0.8, width: '100%', textAlign: 'left' }}>{t("msgHelp")}: H.Vân (0788968791)</Typography>
        </div>
      </div>
      <div className={"blur-backdrop"}></div>
      <div className="chooseContainer">
        <ChooseFactory />
        <ChooseLanguage />
      </div>
      <LoginForm />
      <Typography className="textsizemini" variant="caption" sx={{
        position: 'absolute',
        bottom: 1,
        color: '#FDE767',
        opacity: 0.5,
        fontWeight: '700',
        width: '100%',
        textAlign: 'center',
        "@media screen and (max-height: 450px)": {
          display: 'none'
        },
      }}>Powered by IT-Software LHG<br /> © 2024 LACTY CO II.,LTD. All rights reserved. </Typography>

      <Typography className="textsizemini" variant="caption" sx={{
        top: 1,
        position: 'absolute',
        color: '#FDE767',
        opacity: 0.5,
        fontWeight: '700',
        width: '100%',
        textAlign: 'left',
        "@media screen and (max-height: 450px)": {
          display: 'none'
        },
      }}>  Version: {import.meta.env.VITE_APP_VERSION} </Typography>
    </section>
  );
};

export default LoginScreen;
