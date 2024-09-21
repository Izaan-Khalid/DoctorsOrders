import React from "react";

// Format the time for both "time requested" and "time approved"
const formatTime = (timeString) => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
  return new Date(timeString).toLocaleString(undefined, options);
};

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
  // Assuming `data` is an array of orders from Supabase
  const sentOrders = data.filter(order => !order.approved); // Adjust based on your actual status field
  const approvedOrders = data.filter(order => order.approved); // Adjust based on your actual status field
  console.log(data)
  return (
    <div className="max-w-8xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Sent Orders */}
      <div className="lg:col-span-2">
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
                <tr key={order.nurseId} className={getRowColor(order.urgency)}>
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

      {/* Right Column: Approved Orders */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Approved Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border px-2 py-2 text-xs lg:text-base">Patient Name</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Item Requested</th>
                <th className="border px-2 py-2 text-xs lg:text-base">Time Approved</th>
              </tr>
            </thead>
            <tbody>
              {approvedOrders.map((order) => (
                <tr key={order.nurseId} className="bg-green-100">
                  <td className="border px-2 py-2 text-xs lg:text-base">{order.patientName}</td>
                  <td className="border px-2 py-2 text-xs lg:text-base">{order.itemRequested}</td>
                  <td className="border px-2 py-2 text-xs lg:text-base">{formatTime(order.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
