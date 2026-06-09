
// src/components/ProfessionalMatchCard.jsx

export default function ProfessionalMatchCard({ item }) {
  // item: { professional, score, skillsMatched, ... }
  const { professional, score, skillsMatched } = item;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{professional.name}</h3>
        <span className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-700">
          Match: {(score * 100).toFixed(0)}%
        </span>
      </div>
      <p className="text-sm text-slate-600">
        Ruolo: {professional.role || "Professional"}
      </p>
      {skillsMatched && (
        <div className="flex flex-wrap gap-1 mt-2">
          {skillsMatched.map((s, idx) => (
            <span
              key={idx}
              className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}