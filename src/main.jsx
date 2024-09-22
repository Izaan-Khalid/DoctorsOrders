import { createRoot } from "react-dom/client"
import { Auth0Provider } from "@auth0/auth0-react"
import App from "./App.jsx"
import "./index.css"

const root = createRoot(document.getElementById("root"))

root.render(
	<Auth0Provider
		domain="dev-inajzmrpodbvxcy4.us.auth0.com"
		clientId="gZYDkajG6jhVfRns4b8Hk688CVB0AwZv"
		authorizationParams={{
			redirect_uri: window.location.origin,
		}}
		onRedirectCallback={() => {
			window.location.href = window.location.origin // Handle redirection after login/logout
		}}
	>
		<App />
	</Auth0Provider>
)
