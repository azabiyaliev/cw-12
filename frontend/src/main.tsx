import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.ts";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { addInterceptors } from "./axiosAPI.ts";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./globalConstants.ts";
import { ToastContainer } from "react-toastify";

addInterceptors(store);

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: '"Lora", serif',
  },
});

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <CssBaseline />
            <ToastContainer />
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </GoogleOAuthProvider>,
);
