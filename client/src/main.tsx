import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Auth0Provider
    domain="dev-lqnqnxi15ialiyks.us.auth0.com"
    clientId="nQwNWFFEVlAbv0xvr26yZ6sS10SDwAY5"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/callback", 
      audience: "https://dev-lqnqnxi15ialiyks.us.auth0.com/api/v2/", 
      scope: "openid profile email", 
    }}
  >
    <App />
  </Auth0Provider>
);

