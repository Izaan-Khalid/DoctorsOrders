import React, { useState } from "react"

const getRowColor = (urgency) => {
	switch (urgency) {
		case 1:
			return "bg-green-100" // Low urgency
		case 2:
			return "bg-yellow-100" // Medium urgency
		case 3:
			return "bg-orange-100" // High urgency
		case 4:
			return "bg-red-100" // Very high urgency
		case 5:
			return "bg-red-200" // Critical urgency
		default:
			return ""
	}
}

export function DoctorOrders({ data }) {
	const [showApprovalModal, setShowApprovalModal] = useState(false)
	const [showReasonModal, setShowReasonModal] = useState(false)
	const [selectedRequest, setSelectedRequest] = useState(null)
	const [selectedReason, setSelectedReason] = useState("")

	const handleApproveClick = (request) => {
		setSelectedRequest(request)
		setShowApprovalModal(true)
	}

	const handleConfirm = () => {
		alert(`${selectedRequest.patientName}'s request approved!`)
		setShowApprovalModal(false)
	}

	const handleViewReason = (reason) => {
		setSelectedReason(reason)
		setShowReasonModal(true)
	}

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
					{data.map((request) => (
						<tr key={request.id} className={getRowColor(request.urgency)}>
							<td className="border px-4 py-2">
								<button
									className="bg-blue-500 text-white font-medium py-1 px-2 rounded hover:bg-blue-600"
									onClick={() => handleApproveClick(request)}
								>
									Approve
								</button>
							</td>
							<td className="border px-4 py-2">{request.patientName}</td>
							<td className="border px-4 py-2">{request.itemRequested}</td>
							<td className="border px-4 py-2">{request.roomNo}</td>
							<td className="border px-4 py-2 font-bold">{request.urgency}</td>
							<td className="border px-4 py-2">{request.created_at}</td>
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
						<h2 className="text-lg font-bold mb-4">Confirm Approval</h2>
						<p>
							Are you sure you want to approve the request for{" "}
							{selectedRequest.patientName}?
						</p>
						<div className="mt-4">
							<button
								className="bg-green-500 text-white py-1 px-4 rounded mr-2"
								onClick={handleConfirm}
							>
								Yes
							</button>
							<button
								className="bg-red-500 text-white py-1 px-4 rounded"
								onClick={() => setShowApprovalModal(false)}
							>
								No
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
	)
}
