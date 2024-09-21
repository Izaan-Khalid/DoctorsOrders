import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const supabase = createClient(
  "https://folxeipnfjiyraszjjod.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHhlaXBuZmppeXJhc3pqam9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4OTQ1MTUsImV4cCI6MjA0MjQ3MDUxNX0.bsyItI4bs1iykdZY0wrsRPpHLgwfFBP2zEvU8ahnP2I"
);

export function NurseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [urgencyValue, setUrgencyValue] = useState(3);
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [isLoading, setisLoading] = useState(false)


  async function addData(data) {
	try{
		setisLoading(true)
		const { error } = await supabase.from("DoctorsOrders").insert({
		nurseId: data.nurseId,
		patientName: data.patientName,
		roomNo: data.roomNum,
		itemRequested: data.itemRequested,
		urgency: urgencyValue,
		reason: data.reason,
    });
	}
	catch{
		console.log("Error")
	}
	finally{
		// Generate a random delay between 200 and 1200 milliseconds
		const delay = Math.floor(Math.random() * (1200 - 200 + 1)) + 200;
		setTimeout(() => {
		  navigate("/nurse-orders"); // Redirect to /nurse-orders after the delay
		}, delay);
	  }
  }

  if(isLoading){
	return(
		<div className="flex justify-center items-center h-screen">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
		</div>
	)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate("/nurse-orders")} // Back button to navigate to /nurse-orders
        className="mb-4 text-blue-500 hover:underline"
      >
        Back to Nurse Orders
      </button>
      <h1 className="text-2xl font-bold text-center mb-6">Request Form</h1>
      <form
        onSubmit={handleSubmit((data) => addData(data))}
        className="space-y-6"
      >
        {/* Nurse ID Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nurse ID</label>
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
          <label className="block text-gray-700 font-medium mb-2">Patient Name</label>
          <input
            {...register("patientName", { required: true })}
            placeholder="Patient Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.patientName && (
            <span className="text-red-500 text-sm">Patient Name is required</span>
          )}
        </div>

        {/* Room Number Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Room Number</label>
          <input
            {...register("roomNum", { required: true })}
            placeholder="Room Number"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.roomNum && (
            <span className="text-red-500 text-sm">Room Number is required</span>
          )}
        </div>

        {/* Item Requested Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Item Requested</label>
          <input
            {...register("itemRequested", { required: true })}
            placeholder="Item Requested"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.itemRequested && (
            <span className="text-red-500 text-sm">Item Requested is required</span>
          )}
        </div>

        {/* Urgency Field with Tooltip and Circle Icon */}
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-2 flex items-center group">
            Urgency
            <span className="ml-2 relative flex items-center">
              <span
                className="w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center text-white font-bold text-sm cursor-pointer"
                style={{ backgroundColor: "#A0A0A0" }}
              >
                ?
              </span>
              {/* Tooltip */}
              <div className="absolute left-5 bottom-5 hidden group-hover:block z-10 w-64 p-2 text-xs text-white bg-gray-700 rounded shadow-lg">
                <strong>Urgency Levels Guide</strong>
                <br />
                <strong style={{ color: "#4CAF50" }}>Level 1: Low Urgency</strong>
                <br />
                Non-critical patient needs (e.g., extra blanket, pillow adjustment).
                <br />
                Response: 2-4 hours.
                <br />
                <strong style={{ color: "#FFC107" }}>Level 2: Mild Urgency</strong>
                <br />
                Timely but non-urgent (e.g., assistance with food or medication reminders).
                <br />
                Response: 1-2 hours.
                <br />
                <strong style={{ color: "#FF9800" }}>Level 3: Moderate Urgency</strong>
                <br />
                Affects care, but not life-threatening (e.g., IV bag replacement).
                <br />
                Response: 30-60 mins.
                <br />
                <strong style={{ color: "#F44336" }}>Level 4: High Urgency</strong>
                <br />
                Immediate attention needed to avoid complications (e.g., pain medication).
                <br />
                Response: 15-30 mins.
                <br />
                <strong style={{ color: "#D32F2F" }}>Level 5: Critical Urgency</strong>
                <br />
                Urgent care required (e.g., severe pain or equipment malfunction).
                <br />
                Response: 5-15 mins.
              </div>
            </span>
          </label>
          <input
            {...register("urgency")}
            type="range"
            min="1"
            max="5"
            value={urgencyValue}
            onChange={(e) => setUrgencyValue(e.target.value)}
            className="w-full"
          />
          <div className="text-center text-sm font-bold">{urgencyValue}</div>
        </div>

        {/* Reason Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Reason</label>
          <textarea
            {...register("reason", { required: true })}
            placeholder="Explain the request"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.reason && (
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
  );
}
