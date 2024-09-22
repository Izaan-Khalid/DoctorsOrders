import React, { useEffect, useState } from "react";
import "./Home.css";
import AuthButtons from "../AuthButtons";
import Logo from "../../assets/HospiTalkLogo.png";
import medicalStaff from "../../assets/medical-staff.jpeg";
import { useAuth0 } from "@auth0/auth0-react";

export const Home = () => {
	const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
		useAuth0();
	const [role, setrole] = useState("");

	const fetchRoles = async () => {
		if (isAuthenticated && user) {
			try {
				const response = await fetch(
					`https://dev-4xvtpqba5ze8jbkg.us.auth0.com/api/v2/users/${user.sub}/roles`,
					{
						method: "GET",
						headers: {
							Authorization:
								"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBQUjlOSTNQYkowd2Itbzhac0NqOCJ9.eyJpc3MiOiJodHRwczovL2Rldi00eHZ0cHFiYTV6ZThqYmtnLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ3cjM3TU9QSmJrYmxxSUtlaVRyZ3U5bVZEQ3dvSXI2ZEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtNHh2dHBxYmE1emU4amJrZy51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcyNjk1ODQzMiwiZXhwIjoxNzI3MDQ0ODMyLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6YXV0aGVudGljYXRpb25fbWV0aG9kcyB1cGRhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyBkZWxldGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpzY2ltX2NvbmZpZyBjcmVhdGU6c2NpbV9jb25maWcgdXBkYXRlOnNjaW1fY29uZmlnIGRlbGV0ZTpzY2ltX2NvbmZpZyBjcmVhdGU6c2NpbV90b2tlbiByZWFkOnNjaW1fdG9rZW4gZGVsZXRlOnNjaW1fdG9rZW4gZGVsZXRlOnBob25lX3Byb3ZpZGVycyBjcmVhdGU6cGhvbmVfcHJvdmlkZXJzIHJlYWQ6cGhvbmVfcHJvdmlkZXJzIHVwZGF0ZTpwaG9uZV9wcm92aWRlcnMgZGVsZXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6cGhvbmVfdGVtcGxhdGVzIHJlYWQ6cGhvbmVfdGVtcGxhdGVzIHVwZGF0ZTpwaG9uZV90ZW1wbGF0ZXMgY3JlYXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOmVuY3J5cHRpb25fa2V5cyB1cGRhdGU6ZW5jcnlwdGlvbl9rZXlzIGRlbGV0ZTplbmNyeXB0aW9uX2tleXMgcmVhZDpzZXNzaW9ucyBkZWxldGU6c2Vzc2lvbnMgcmVhZDpyZWZyZXNoX3Rva2VucyBkZWxldGU6cmVmcmVzaF90b2tlbnMgY3JlYXRlOnNlbGZfc2VydmljZV9wcm9maWxlcyByZWFkOnNlbGZfc2VydmljZV9wcm9maWxlcyB1cGRhdGU6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVzIGRlbGV0ZTpzZWxmX3NlcnZpY2VfcHJvZmlsZXMgY3JlYXRlOnNzb19hY2Nlc3NfdGlja2V0cyByZWFkOmZvcm1zIHVwZGF0ZTpmb3JtcyBkZWxldGU6Zm9ybXMgY3JlYXRlOmZvcm1zIHJlYWQ6Zmxvd3MgdXBkYXRlOmZsb3dzIGRlbGV0ZTpmbG93cyBjcmVhdGU6Zmxvd3MgcmVhZDpmbG93c192YXVsdCByZWFkOmZsb3dzX3ZhdWx0X2Nvbm5lY3Rpb25zIHVwZGF0ZTpmbG93c192YXVsdF9jb25uZWN0aW9ucyBkZWxldGU6Zmxvd3NfdmF1bHRfY29ubmVjdGlvbnMgY3JlYXRlOmZsb3dzX3ZhdWx0X2Nvbm5lY3Rpb25zIHJlYWQ6Zmxvd3NfZXhlY3V0aW9ucyBkZWxldGU6Zmxvd3NfZXhlY3V0aW9ucyByZWFkOmNvbm5lY3Rpb25zX29wdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zX29wdGlvbnMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJ3cjM3TU9QSmJrYmxxSUtlaVRyZ3U5bVZEQ3dvSXI2ZCJ9.gOQpAaVEoV86d3i_JrG48W_ZzSuiGCf4qvl-U5LS1JDK6wyAOJrgOS3fN2S-PrnpEs4vRVXipNiPvOPlql9nb6mIhA0bIf3dqwf0UsL1sqkjTe18qssVVDNAnt8f-pUy_uUyvpep3M2S8gELY9ir71WwpK6JKJ9bEyBeFMcrHprEjmOo4Oecyo8jLFmFOBYXpcdBk8JxxfI0-McmrPC_6vkJ9sfWNbFRKhQkxe211goq3joxL7-xf0dQBZd6rS7v-lt5j8M8TQTIrVHLl43vgWaTTWe1KUpLovNpKwntU6dNysYKhWjjgaYxHW7oND9rxW3dqg-UbYTWoG2Md-n5Ew",
							"Content-Type": "application/json",
						},
					}
				);
				const data = await response.json();
				setrole(data[0].name);
			} catch (error) {
				console.error("Error fetching roles:", error);
			}
		}
	};

	useEffect(() => {
		fetchRoles();
	});
	//

	// <button className="learn-more mb-5">
	// 						<span className="circle" aria-hidden="true">
	// 							<span className="icon arrow"></span>
	// 						</span>
	// 						<span className="button-text">Doctor</span>
	// 					</button>
	const [isNurseDropdownOpen, setIsNurseDropdownOpen] = useState(false);

	const handleNurseClick = () => {
		setIsNurseDropdownOpen(!isNurseDropdownOpen);
	};

	return (
		<div>
			{/* Navbar */}
			<nav className="bg-logo-blue p-1 shadow-md">
				<div className="container mx-auto flex justify-between items-center">
					<img
						src={Logo}
						alt="logo"
						className="w-auto h-40 object-contain ml-8"
					/>
					<ul className="flex space-x-24 text-black transition-all mr-5">
						<li>
							<a href="#home" className="hover:underline">
								Home
							</a>
						</li>
						<li>
							<a href="#purpose" className="hover:underline">
								Purpose
							</a>
						</li>
						<li>
							<a href="#about" className="hover:underline">
								About Us
							</a>
						</li>
						<li>
							<AuthButtons role={role} />
						</li>
					</ul>
				</div>
			</nav>

			{/* Home Section */}
			<section id="home" className="bg-white py-20">
				<div className="container flex flex-col mx-auto text-center">
					<img
						src={medicalStaff}
						alt="Medical Staff"
						className="w-auto h-80 object-cover mb-6 self-center justify-center"
					/>
					<h1 className="text-3xl font-bold text-gray-800 mb-4">
						Streamlining Communication Between Nurses and Doctors
					</h1>
					<p className="text-lg text-gray-600">
						Improving healthcare collaboration for better patient outcomes.
					</p>
				</div>
			</section>

			{/* Purpose Section */}
			<section id="purpose" className="bg-white py-20">
				<div className="container mx-auto text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-8">Our Purpose</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="p-6 bg-gray-100 rounded-lg shadow-md">
							<div className="text-4xl mb-4">🔗</div>
							<p className="text-lg text-gray-700">
								Enhancing communication between nurses and doctors for efficient
								collaboration.
							</p>
						</div>
						<div className="p-6 bg-gray-100 rounded-lg shadow-md">
							<div className="text-4xl mb-4">⚡</div>
							<p className="text-lg text-gray-700">
								Accelerating response times to better meet patient needs swiftly
								and effectively.
							</p>
						</div>
						<div className="p-6 bg-gray-100 rounded-lg shadow-md">
							<div className="text-4xl mb-4">💼</div>
							<p className="text-lg text-gray-700">
								Improving doctors’ efficiency and overall quality of life
								through optimized workflows.
							</p>
						</div>
						<div className="p-6 bg-gray-100 rounded-lg shadow-md">
							<div className="text-4xl mb-4">🩺</div>
							<p className="text-lg text-gray-700">
								Easing the workload of nurses to allow more focus on patient
								care and well-being.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* About Us Section */}
			<section id="about" className="bg-gray-50 py-20">
				<div className="container mx-auto text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-6">About Us</h2>
					<p className="text-lg text-gray-700 max-w-2xl mx-auto">
						We are a dedicated team of four students — Usman, Izaan, Emilio, and
						Hung — committed to revolutionizing the healthcare field by
						improving communication within hospitals. Our goal is to foster
						better collaboration between medical staff, enhancing patient
						outcomes and the overall efficiency of healthcare systems.
					</p>
				</div>
			</section>
		</div>
	);
};

export default Home;
