
// src/components/wallet/TransactionList.jsx

import TransactionRow from "./TransactionRow";

export default function TransactionList({ transactions }) {
  return (
    <table className="table-auto w-full border shadow text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Importo</th>
          <th className="p-2 border">Tipo</th>
          <th className="p-2 border">Data</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} />
        ))}
      </tbody>
    </table>
  );
}