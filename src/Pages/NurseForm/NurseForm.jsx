import React from "react"
import { createClient } from "@supabase/supabase-js"
import { useForm } from "react-hook-form"

const supabase = createClient(
	"https://folxeipnfjiyraszjjod.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHhlaXBuZmppeXJhc3pqam9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4OTQ1MTUsImV4cCI6MjA0MjQ3MDUxNX0.bsyItI4bs1iykdZY0wrsRPpHLgwfFBP2zEvU8ahnP2I"
)

export function NurseForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	async function addData(data) {
		const { error } = await supabase.from("DoctorsOrders").insert({
			nurseId: data.nurseId,
			patientName: data.patientName,
			roomNo: data.roomNum,
			itemRequested: data.itemRequested,
			urgency: data.urgency,
			reason: data.reason,
		})
		console.log(error)
	}

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
			<h1 className="text-2xl font-bold text-center mb-6">Request Form</h1>
			<form
				onSubmit={(e) => {
					addData({
						nurseId: e.target.nurseId.value,
						patientName: e.target.patientName.value,
						roomNum: e.target.roomNum.value,
						itemRequested: e.target.itemRequested.value,
						urgency: e.target.urgency.value,
						reason: e.target.explanation.value,
					})
				}}
				className="space-y-6"
			>
				{/* Nurse ID Field */}
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Nurse ID
					</label>
					<input
						{...register("nurseId", { required: true })}
						placeholder="Nurse ID"
						type="number"
						className="w-full p-2 border border-gray-300 rounded"
					/>
					{errors.nurseId && (
						<span className="text-red-500 text-sm">Nurse ID is required</span>
					)}
				</div>

				{/* Patient Name Field */}
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Patient Name
					</label>
					<input
						{...register("patientName", { required: true })}
						placeholder="Patient Name"
						className="w-full p-2 border border-gray-300 rounded"
					/>
					{errors.patientName && (
						<span className="text-red-500 text-sm">
							Patient Name is required
						</span>
					)}
				</div>

				{/* Room Number Field */}
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Room Number
					</label>
					<input
						{...register("roomNum", { required: true })}
						placeholder="Room Number"
						className="w-full p-2 border border-gray-300 rounded"
					/>
					{errors.roomNum && (
						<span className="text-red-500 text-sm">
							Room Number is required
						</span>
					)}
				</div>

				{/* Item Requested Field */}
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Item Requested
					</label>
					<input
						{...register("itemRequested", { required: true })}
						placeholder="Item Requested"
						className="w-full p-2 border border-gray-300 rounded"
					/>
					{errors.itemRequested && (
						<span className="text-red-500 text-sm">
							Item Requested is required
						</span>
					)}
				</div>

				{/* Urgency Field */}
				<div>
					<label className="block text-gray-700 font-medium mb-2">
						Urgency (1-5)
					</label>
					<input
						{...register("urgency", {
							pattern: {
								value: /^(1|2|3|4|5)$/,
								message: "Urgency must be a number between 1 and 5",
							},
							required: true,
						})}
						placeholder="Urgency"
						type="number"
						className="w-full p-2 border border-gray-300 rounded"
					/>
					{errors.urgency && (
						<span className="text-red-500 text-sm">
							{errors.urgency.message}
						</span>
					)}
				</div>

				{/* Explanation Field */}
				<div>
					<label className="block text-gray-700 font-medium mb-2">Reason</label>
					<textarea
						{...register("explanation", { required: true })}
						placeholder="Explain the request"
						className="w-full p-2 border border-gray-300 rounded"
					/>
					{errors.explanation && (
						<span className="text-red-500 text-sm">Reason is required</span>
					)}
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-blue-500 text-white font-medium p-2 rounded hover:bg-blue-600"
				>
					Submit
				</button>
			</form>
		</div>
	)
}
