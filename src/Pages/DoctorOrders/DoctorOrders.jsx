import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { createClient } from "@supabase/supabase-js";

const getRowColor = (urgency) => {
	switch (urgency) {
		case 1:
			return "bg-green-100"; // Low urgency
		case 2:
			return "bg-yellow-100"; // Medium urgency
		case 3:
			return "bg-orange-100"; // High urgency
		case 4:
			return "bg-red-200"; // Very high urgency
		case 5:
			return "bg-red-300"; // Critical urgency
		default:
			return "";
	}
};

const supabase = createClient(
	"https://folxeipnfjiyraszjjod.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHhlaXBuZmppeXJhc3pqam9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4OTQ1MTUsImV4cCI6MjA0MjQ3MDUxNX0.bsyItI4bs1iykdZY0wrsRPpHLgwfFBP2zEvU8ahnP2I"
);

const sortData = (data) => {
	return data
		.filter((item) => item.approved === false)
		.sort((a, b) => {
			// Sort by urgency (descending order)
			if (b.urgency !== a.urgency) {
				return b.urgency - a.urgency;
			}
			// If urgency is the same, sort by created_at (latest first)
			return moment(a.created_at).valueOf() - moment(b.created_at).valueOf();
		});
};

export function DoctorOrders() {
	const [showApprovalModal, setShowApprovalModal] = useState(false);
	const [showReasonModal, setShowReasonModal] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [selectedReason, setSelectedReason] = useState("");
	const [sortedData, setSortedData] = useState([]);

	// Function to fetch data from Supabase
	const fetchData = async () => {
		const { data, error } = await supabase
			.from("DoctorsOrders")
			.select("*")
			.eq("approved", false); // Fetch only non-approved records
		if (error) {
			console.error("Error fetching data: ", error);
		} else {
			setSortedData(sortData(data));
		}
	};

	// Fetch the data when the component mounts
	useEffect(() => {
		fetchData();
	}, []);

	// Re-fetch data whenever the approval modal closes
	useEffect(() => {
		if (!showApprovalModal) {
			fetchData(); // Re-fetch and sort data when modal is closed
		}
	}, [showApprovalModal]);

	const handleApproveClick = (request) => {
		setSelectedRequest(request);
		setShowApprovalModal(true);
	};

	async function approveRequest(request) {
		const { error } = await supabase
			.from("DoctorsOrders")
			.update({ approved: true })
			.eq("id", request.id);

		if (!error) {
			// After approval, close the modal and trigger data fetch
			setShowApprovalModal(false);
		} else {
			console.error("Error approving request: ", error);
		}
	}

	const handleViewReason = (reason) => {
		setSelectedReason(reason);
		setShowReasonModal(true);
	};

	const convertToCentralTime = (timestamp) => {
		return moment
			.utc(timestamp)
			.tz("America/Chicago")
			.format("YYYY-MM-DD HH:mm:ss");
	};

	return (
		<div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
			<h1 className="text-2xl font-bold text-center mb-6">Doctor Orders</h1>
			<table className="min-w-full bg-white border border-gray-300">
				<thead>
					<tr>
						<th className="border px-4 py-2">Approve</th>
						<th className="border px-4 py-2">Patient Name</th>
						<th className="border px-4 py-2">Item Requested</th>
						<th className="border px-4 py-2">Room Number</th>
						<th className="border px-4 py-2">Urgency</th>
						<th className="border px-4 py-2">Time Requested</th>
						<th className="border px-4 py-2">Reason</th>
					</tr>
				</thead>
				<tbody>
					{sortedData.map((request) => (
						<tr key={request.id} className={getRowColor(request.urgency)}>
							<td className="border px-4 py-2">
								<button
									className="bg-blue-500 text-white font-medium py-1 px-2 rounded hover:bg-blue-600"
									onClick={() => handleApproveClick(request)}
								>
									Actions ➡️
								</button>
							</td>
							<td className="border px-4 py-2">{request.patientName}</td>
							<td className="border px-4 py-2">{request.itemRequested}</td>
							<td className="border px-4 py-2">{request.roomNo}</td>
							<td className="border px-4 py-2 font-bold">{request.urgency}</td>
							<td className="border px-4 py-2">
								{convertToCentralTime(request.created_at)}
							</td>
							<td className="border px-4 py-2">
								<span
									className="relative cursor-pointer text-blue-500 hover:underline"
									onClick={() => handleViewReason(request.reason)}
								>
									View
									<span className="absolute left-0 bottom-full mb-1 bg-gray-700 text-white text-xs rounded py-1 px-2 invisible group-hover:visible">
										{request.reason}
									</span>
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{showApprovalModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg">
						<h2 className="text-lg font-bold mb-4">Actions</h2>
						<p>
							Would you like to approve the request made by{" "}
							{selectedRequest.patientName} for a{" "}
							{selectedRequest.itemRequested}?
						</p>
						<div className="mt-4">
							<button
								className="bg-green-500 text-white py-1 px-4 rounded mr-2"
								onClick={() => approveRequest(selectedRequest)}
							>
								Approve
							</button>
							<button
								className="bg-red-500 text-white py-1 px-4 rounded mr-2"
								onClick={() => setShowApprovalModal(false)}
							>
								Deny
							</button>
							<button
								className="bg-yellow-500 text-white py-1 px-4 rounded"
								onClick={() => setShowApprovalModal(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{showReasonModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg">
						<h2 className="text-lg font-bold mb-4">Reason for Request</h2>
						<p>{selectedReason}</p>
						<button
							className="bg-blue-500 text-white py-1 px-4 rounded mt-4"
							onClick={() => setShowReasonModal(false)}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
