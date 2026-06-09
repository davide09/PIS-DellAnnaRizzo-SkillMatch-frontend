
// src/components/wallet/TransactionRow.jsx

export default function TransactionRow({ tx }) {
  const color =
    tx.type === "CREDIT"
      ? "text-green-600"
      : tx.type === "COMMISSION_FEE"
      ? "text-red-600"
      : "text-gray-700";

  return (
    <tr>
      <td className="p-2 border">{tx.id}</td>

      <td className={`p-2 border font-semibold ${color}`}>
        {tx.amount} €
      </td>

      <td className="p-2 border">{tx.type}</td>
      <td className="p-2 border">{tx.createdAt}</td>
    </tr>
  );
}