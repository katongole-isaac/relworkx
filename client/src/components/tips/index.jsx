import React from "react";

const TipsTable = ({ tips }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">Bill Amount</th>
            <th className="py-2 px-4 border-b">Tip Percentage</th>
            <th className="py-2 px-4 border-b">Tip Amount</th>
            <th className="py-2 px-4 border-b">Total Bill</th>
            <th className="py-2 px-4 border-b">Number of People</th>
            <th className="py-2 px-4 border-b">Per-Person Amount</th>
            <th className="py-2 px-4 border-b">Created At</th>
          </tr>
        </thead>
        <tbody>
          {tips.map((tip) => (
            <tr key={tip.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{tip.bill_amount}</td>
              <td className="py-2 px-4 border-b">{tip.tip_percentage}%</td>
              <td className="py-2 px-4 border-b">{tip.tip_amount}</td>
              <td className="py-2 px-4 border-b">{tip.total_bill}</td>
              <td className="py-2 px-4 border-b">{tip.num_of_people}</td>
              <td className="py-2 px-4 border-b">{tip.per_person_amount}</td>
              <td className="py-2 px-4 border-b">
                {new Date(tip.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TipsTable;
