import { useState } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { DoctorOrders, Home, NurseForm, NurseOrders } from "./Pages";

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/nurse-form" element={<NurseForm />} />
					<Route path="/nurse-orders" element={<NurseOrders />} />
					<Route path="/doctor-orders" element={<DoctorOrders />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
