import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/main.css";
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<Router>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Router>
);
