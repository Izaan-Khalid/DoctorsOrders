import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Format the time for both "time requested" and "time approved"
const formatTime = (timeString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(timeString).toLocaleString(undefined, options);
};

const supabase = createClient(
  "https://folxeipnfjiyraszjjod.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHhlaXBuZmppeXJhc3pqam9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4OTQ1MTUsImV4cCI6MjA0MjQ3MDUxNX0.bsyItI4bs1iykdZY0wrsRPpHLgwfFBP2zEvU8ahnP2I"
);

// Get row color based on urgency level
const getRowColor = (urgency) => {
  switch (urgency) {
    case 1:
      return "bg-green-50"; // Low urgency
    case 2:
      return "bg-yellow-100"; // Medium urgency
    case 3:
      return "bg-orange-100"; // High urgency
    case 4:
      return "bg-red-100"; // Very high urgency
    case 5:
      return "bg-red-200"; // Critical urgency
    default:
      return "";
  }
};

export const NurseOrders = ({ data }) => {
  const navigate = useNavigate(); // For navigation
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Assuming `data` is an array of orders from Supabase
  const sentOrders = data.filter((order) => !order.approved); // Sent orders
  const approvedOrders = data.filter((order) => order.approved); // Approved orders

  const handleCompleteClick = (order) => {
    setSelectedOrder(order);
    setShowCompleteModal(true);
  };

  const completeOrder = async (order) => {
    const { error } = await supabase
      .from("DoctorsOrders") // Use the correct table name
      .delete()
      .eq("id", order.id);

    if (error) {
      console.error("Error deleting order: ", error);
    } else {
      console.log("Order completed:", order);
      window.location.reload();
    }

    setShowCompleteModal(false);
  };

  return (
    <div className="max-w-8xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Button to navigate back to nurse form */}
      <div className="text-right mb-4">
        <button
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => navigate("/nurse-form")}
        >
          Create New Request
        </button>
      </div>

      {/* Approved Orders Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Approved Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border px-2 py-2 text-xs lg:text-base">Complete</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Patient Name</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Item Requested</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Room Number</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Urgency</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Time Approved</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Reason</th>
              </tr>
            </thead>
            <tbody>
              {approvedOrders.map((order) => (
                <tr key={order.id} className="bg-green-100">
                  <td className="border px-2 py-2 text-xs lg:text-base">
                    <button
                      className="bg-blue-500 text-white font-medium py-1 px-2 rounded hover:bg-blue-600"
                      onClick={() => handleCompleteClick(order)}
                    >
                      Complete
                    </button>
                  </td>
                  <td className="border px-2 py-2 text-xs lg:text-base">
                    {order.patientName}
                  </td>
                  <td className="border px-2 py-2 text-xs lg:text-base">
                    {order.itemRequested}
                  </td>
                  <td className="border px-2 py-2 text-xs lg:text-base">{order.roomNo}</td>
                  <td className="border px-2 py-2 font-bold text-xs lg:text-base">
                    {order.urgency}
                  </td>
                  <td className="border px-2 py-2 text-xs lg:text-base">
                    {formatTime(order.created_at)}
                  </td>
                  <td className="border px-2 py-2 text-xs lg:text-base">{order.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sent Orders Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Sent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border px-2 py-2 text-xs lg:text-base">Patient Name</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Item Requested</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Room Number</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Urgency</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Time Requested</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Reason</th>
              </tr>
            </thead>
            <tbody>
              {sentOrders.map((order) => (
                <tr key={order.id} className={getRowColor(order.urgency)}>
                  <td className="border px-2 py-2 text-xs lg:text-base">{order.patientName}</td>
                  <td className="border px-2 py-2 text-xs lg:text-base">{order.itemRequested}</td>
                  <td className="border px-2 py-2 text-xs lg:text-base">{order.roomNo}</td>
                  <td className="border px-2 py-2 font-bold text-xs lg:text-base">{order.urgency}</td>
                  <td className="border px-2 py-2 text-xs lg:text-base">{formatTime(order.created_at)}</td>
                  <td className="border px-2 py-2 text-xs lg:text-base">{order.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCompleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Complete Order</h2>
            <p>
              Would you like to mark the request made by{" "}
              {selectedOrder.patientName} for a{" "}
              {selectedOrder.itemRequested} as completed?
            </p>
            <div className="mt-4">
              <button
                className="bg-green-500 text-white py-1 px-4 rounded mr-2"
                onClick={() => completeOrder(selectedOrder)} // Call the async function
              >
                Complete
              </button>
              <button
                className="bg-yellow-500 text-white py-1 px-4 rounded"
                onClick={() => setShowCompleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
