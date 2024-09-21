import React, { useState } from "react";
import "./Home.css";

export const Home = () => {
	const [isNurseDropdownOpen, setIsNurseDropdownOpen] = useState(false);

	const handleNurseClick = () => {
		setIsNurseDropdownOpen(!isNurseDropdownOpen);
	};

	return (
		<div className="container">
			<div className="modal">
				<h2 className="modal-title">Which view would you like to enter?</h2>
				<div className="modal-buttons">
					<a href="/doctor-orders">
						<button className="learn-more mb-5">
							<span className="circle" aria-hidden="true">
								<span className="icon arrow"></span>
							</span>
							<span className="button-text">Doctor</span>
						</button>
					</a>
					<div className="nurse-section">
						<button className="learn-more" onClick={handleNurseClick}>
							<span className="circle" aria-hidden="true">
								<span className="icon arrow"></span>
							</span>
							<span className="button-text">Nurse</span>
						</button>
						{isNurseDropdownOpen && (
							<div className="dropdown">
								<a href="/nurse-orders" className="dropdown-item">
									Orders
								</a>
								<a href="/nurse-form" className="dropdown-item">
									Form
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
