import React, { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

const AuthButtons = ({ role }) => {
	let navigate = useNavigate()
	const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

	useEffect(() => {
		console.log("Role:", role)
		if (role === "nurse") {
			navigate("/nurse-orders")
		} else if (role === "doctor") {
			navigate("/doctor-orders")
		} else {
			console.log("Invalid role")
		}
	}, [isAuthenticated, role])

	const handleLogin = () => {
		loginWithRedirect()
			.then(() => {
				console.log("Login successful")
			})
			.catch((error) => {
				console.error("Login failed", error)
			})
	}

	return (
		<div className="flex justify-center">
			{!isAuthenticated ? (
				<button
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
					onClick={handleLogin}
				>
					Log In
				</button>
			) : (
				<button
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
					onClick={() => logout({ returnTo: window.location.origin })}
				>
					Log Out
				</button>
			)}
		</div>
	)
}

export default AuthButtons
