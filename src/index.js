import React from "react";
import ReactDOM from "react-dom";
import   "./index.css";
import App from "./App";
import { AuthProvider } from "./store/Auth-context";
import ChatProvider from "./store/Chat-context";

ReactDOM.render(
  <AuthProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </AuthProvider>,
  document.getElementById("root")
);
