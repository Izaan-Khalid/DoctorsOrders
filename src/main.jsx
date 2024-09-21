import { createRoot } from "react-dom/client"
import { Auth0Provider } from "@auth0/auth0-react"
import App from "./App.jsx"
import "./index.css"

const root = createRoot(document.getElementById("root"))

root.render(
	<Auth0Provider
		domain="dev-4xvtpqba5ze8jbkg.us.auth0.com"
		clientId="fwOw7XTBAWnoxm3I6hciV00Hbou2geKQ"
		authorizationParams={{
			redirect_uri: window.location.origin,
		}}
	>
		<App />
	</Auth0Provider>
)
