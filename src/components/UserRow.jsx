
// src/components/admin/UserRow.jsx

export default function UserRow({ u, onApprove, onSuspend, onUnsuspend }) {

  return (
    <tr>
      <td className="p-2 border">{u.id}</td>
      <td className="p-2 border">{u.name}</td>
      <td className="p-2 border">{u.email}</td>
      <td className="p-2 border">{u.role}</td>
      <td className="p-2 border">{u.enabled ? "✔" : "❌"}</td>
      <td className="p-2 border">{u.suspended ? "⛔" : "—"}</td>

      <td className="p-2 border space-x-2">

        {!u.enabled && (
          <button
            className="px-2 py-1 bg-green-600 text-white rounded"
            onClick={() => onApprove(u.id)}
          >
            Approva
          </button>
        )}

        {!u.suspended && u.enabled && (
          <button
            className="px-2 py-1 bg-red-600 text-white rounded"
            onClick={() => onSuspend(u.id)}
          >
            Sospendi
          </button>
        )}

        {u.suspended && (
          <button
            className="px-2 py-1 bg-yellow-500 text-white rounded"
            onClick={() => onUnsuspend(u.id)}
          >
            Riattiva
          </button>
        )}

      </td>
    </tr>
  );
}