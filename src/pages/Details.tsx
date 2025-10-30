import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  slots: Slot[];
}

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await api.get(`/experiences/${id}`);
        setExperience(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load experience details.");
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading experience...
      </div>
    );

  if (error || !experience)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-lg">
        {error || "Experience not found."}
      </div>
    );

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime)
      return alert("Please choose date and time before confirming!");
    navigate(`/checkout/${experience._id}`, {
      state: { selectedSlot: { date: selectedDate, time: selectedTime, available: true } },
    });
  };

  const uniqueDates = [...new Set(experience.slots.map((slot) => slot.date))];
  const timesForSelectedDate = experience.slots.filter(
    (slot) => slot.date === selectedDate
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

      <div className="lg:col-span-2 space-y-6">
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full h-80 object-cover rounded-xl shadow-md"
        />

        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            {experience.title}
          </h1>
          <p className="text-gray-500 text-sm mb-3">{experience.shortDesc}</p>
          <p className="text-gray-600 text-sm mb-4">
            {experience.location}
          </p>
        </div>

  
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Choose date</h3>
          <div className="flex flex-wrap gap-3">
            {uniqueDates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 border rounded-md text-sm transition ${
                  selectedDate === date
                    ? "bg-yellow-400 border-yellow-500 text-black font-semibold"
                    : "border-gray-300 hover:bg-yellow-50"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

     
        {selectedDate && (
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Choose time</h3>
            <div className="flex flex-wrap gap-3">
              {timesForSelectedDate.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`px-4 py-2 border rounded-md text-sm transition ${
                    !slot.available
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : selectedTime === slot.time
                      ? "bg-yellow-400 border-yellow-500 text-black font-semibold"
                      : "border-gray-300 hover:bg-yellow-50"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        )}

      
        <div className="mt-6">
          <h3 className="font-medium text-gray-800 mb-2">About</h3>
          <p className="text-sm text-gray-600">
            Curated routes, trained guides, and safety briefing. Minimum age 10+.
          </p>
        </div>
      </div>

    
      <div className="bg-white rounded-xl shadow-lg p-6 h-fit space-y-4 border border-gray-100">
        <div className="text-sm">
          <p className="flex justify-between text-gray-700">
            <span>Starts at</span> <span>₹{experience.price}</span>
          </p>
          <p className="flex justify-between text-gray-700">
            <span>Quantity</span> <span>1</span>
          </p>
          <p className="flex justify-between text-gray-700">
            <span>Subtotal</span> <span>₹{experience.price}</span>
          </p>
          <p className="flex justify-between text-gray-700 border-b pb-2">
            <span>Taxes</span> <span>₹{Math.round(experience.price * 0.05)}</span>
          </p>
          <p className="flex justify-between text-gray-900 font-semibold pt-2">
            <span>Total</span>{" "}
            <span>
              ₹{experience.price + Math.round(experience.price * 0.05)}
            </span>
          </p>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-md transition"
        >
          Confirm
        </button>
      </div>
    </main>
  );
};

export default Details;
