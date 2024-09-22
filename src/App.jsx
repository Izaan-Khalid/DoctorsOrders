import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { DoctorOrders, Home, Login, NurseForm, NurseOrders } from "./Pages"
import PrivateRoute from "./PrivateRoute"

const supabase = createClient(
	"https://folxeipnfjiyraszjjod.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHhlaXBuZmppeXJhc3pqam9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4OTQ1MTUsImV4cCI6MjA0MjQ3MDUxNX0.bsyItI4bs1iykdZY0wrsRPpHLgwfFBP2zEvU8ahnP2I"
)

function App() {
	const [docOrders, setdocOrders] = useState([])

	useEffect(() => {
		const interval = setInterval(getDocOrders, 1000)
		return () => clearInterval(interval)
	}, [])

	async function getDocOrders() {
		const { data } = await supabase.from("DoctorsOrders").select()
		setdocOrders(data)
	}

	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/auth/callback" element={<Home />} />
					{/* <Route path="/login" element={<Login />} /> */}
					<Route
						path="/nurse-form"
						element={
							<PrivateRoute>
								<NurseForm />
							</PrivateRoute>
						}
					/>
					<Route
						path="/nurse-orders"
						element={
							<PrivateRoute>
								<NurseOrders data={docOrders} />
							</PrivateRoute>
						}
					/>
					<Route
						path="/doctor-orders"
						element={
							<PrivateRoute>
								<DoctorOrders data={docOrders} />
							</PrivateRoute>
						}
					/>
				</Routes>
			</div>
		</Router>
	)
}

export default App
