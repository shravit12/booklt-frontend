import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

interface Slot {
  date: string;
  time: string;
  available: boolean;
}

interface Experience {
  _id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  shortDesc: string;
}

const Checkout = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  const { selectedSlot } = (location.state || {}) as { selectedSlot?: Slot };

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [refId, setRefId] = useState("");

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await api.get(`/experiences/${id}`);
        setExperience(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  const generateRefId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const handleConfirm = () => {
    const newRef = generateRefId();
    setRefId(newRef);
    setConfirmed(true);
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500">Loading booking...</div>
    );

  if (!experience)
    return (
      <div className="text-center mt-10 text-red-600">
        Experience not found.
      </div>
    );

  
  if (confirmed) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-green-100 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">
            Booking Confirmed
          </h2>
          <p className="text-gray-500">Ref ID: {refId}</p>

          <Link
            to="/"
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="w-full sm:w-48 h-40 object-cover rounded-md"
          />
          <div>
            <h2 className="text-xl font-semibold">{experience.title}</h2>
            <p className="text-gray-600">{experience.location}</p>
            <p className="text-gray-500 text-sm mt-1">{experience.shortDesc}</p>
          </div>
        </div>

        <div className="border-t pt-4 text-sm">
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {selectedSlot?.date || "Not selected"}
          </p>
          <p>
            <span className="font-semibold">Time:</span>{" "}
            {selectedSlot?.time || "Not selected"}
          </p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <p className="font-semibold text-lg">Total: ₹{experience.price}</p>
          <button
            onClick={handleConfirm}
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-md text-black font-semibold"
          >
            Confirm Booking
          </button>
        </div>
      </div>

      <Link
        to={`/details/${id}`}
        className="inline-block mt-6 text-yellow-600 hover:text-yellow-700"
      >
        ← Back to Details
      </Link>
    </main>
  );
};

export default Checkout;
