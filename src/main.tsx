import "normalize.css/normalize.css";
import "./i18n";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./utils/themes.ts";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onRegistered(r) {
    if (r) {
      r.onupdatefound = () => {
        const newWorker = r.installing;
        if (newWorker) {
          newWorker.onstatechange = () => {
            if (newWorker.state === 'installed') {
              alert("Cập nhật phiên bản mới thành công - The new version has been installed successfully");
            }
          };
        }
      };
    }
  }
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>

);
