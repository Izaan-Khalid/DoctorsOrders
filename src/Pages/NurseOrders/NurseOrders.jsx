import React from "react"

export const NurseOrders = ({ data }) => {
	return (
		<div className="flex justify-center p-10">
			{/* Left List: Sent */}
			<div className="w-1/2 mr-4">
				<h2 className="text-2xl font-bold mb-4 text-center">Sent</h2>
				<ul className="bg-gray-100 p-4 rounded-lg shadow-lg">
					<li className="mb-2 p-2 bg-white rounded-lg shadow">Sent Item 1</li>
					<li className="mb-2 p-2 bg-white rounded-lg shadow">Sent Item 2</li>
					<li className="mb-2 p-2 bg-white rounded-lg shadow">Sent Item 3</li>
				</ul>
			</div>

			{/* Right List: Approved */}
			<div className="w-1/2 ml-4">
				<h2 className="text-2xl font-bold mb-4 text-center">Approved</h2>
				<ul className="bg-gray-100 p-4 rounded-lg shadow-lg">
					<li className="mb-2 p-2 bg-white rounded-lg shadow">
						Approved Item 1
					</li>
					<li className="mb-2 p-2 bg-white rounded-lg shadow">
						Approved Item 2
					</li>
					<li className="mb-2 p-2 bg-white rounded-lg shadow">
						Approved Item 3
					</li>
				</ul>
			</div>
		</div>
	)
}
