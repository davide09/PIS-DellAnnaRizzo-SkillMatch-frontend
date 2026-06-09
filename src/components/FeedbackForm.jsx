
import { useState } from "react";
import { createFeedback } from "../services/feedbackService";

export default function FeedbackForm({ professionalId, contractId, onDone }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  async function submit() {

    if (!rating || rating < 1 || rating > 5) {
      alert("Inserisci un voto valido da 1 a 5.");
      return;
    }

    if (!comment.trim()) {
      alert("Inserisci un commento prima di inviare il feedback.");
      return;
    }

    const payload = {
      professionalId,
      contractId,
      rating,
      comment
    };

    try {
      await createFeedback(payload);
      alert("Feedback inviato!");
      setComment("");
      if (onDone) onDone();
    } catch (err) {
      console.error(err);
      alert("Errore durante l'invio del feedback.");
    }
  }

  return (
    <div className="border p-4 rounded bg-white shadow-sm mt-4">
      <h3 className="font-semibold mb-2">Lascia una valutazione</h3>

      <label className="block text-sm mb-1">Voto (1-5):</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded p-1 mb-3"
      >
        <option value={1}>1 ⭐</option>
        <option value={2}>2 ⭐⭐</option>
        <option value={3}>3 ⭐⭐⭐</option>
        <option value={4}>4 ⭐⭐⭐⭐</option>
        <option value={5}>5 ⭐⭐⭐⭐⭐</option>
      </select>

      <label className="block text-sm mb-1">Commento:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border rounded p-2 w-full mb-3"
        rows={3}
        placeholder="Lascia un commento..."
      />

      <button
        onClick={submit}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        Invia feedback
      </button>
    </div>
  );
}