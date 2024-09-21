import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import "./App.css"
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom"
import { DoctorOrders, Home, Login, NurseForm, NurseOrders } from "./Pages"

const supabase = createClient(
	"https://folxeipnfjiyraszjjod.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHhlaXBuZmppeXJhc3pqam9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4OTQ1MTUsImV4cCI6MjA0MjQ3MDUxNX0.bsyItI4bs1iykdZY0wrsRPpHLgwfFBP2zEvU8ahnP2I"
)

function App() {
	const [docOrders, setdocOrders] = useState([])

	useEffect(() => {
		getDocOrders()
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
					<Route path="/login" element={<Login />} /> {/* Add Login route */}
					<Route path="/nurse-form" element={<NurseForm />} />
					<Route
						path="/nurse-orders"
						element={<NurseOrders data={docOrders} />}
					/>
					<Route
						path="/doctor-orders"
						element={<DoctorOrders data={docOrders} />}
					/>
				</Routes>
			</div>
		</Router>
	)
}

export default App
