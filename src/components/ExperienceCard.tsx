import { Link } from "react-router-dom";

interface ExperienceProps {
  experience: {
    _id: string;
    title: string;
    location: string;
    price: number;
    imageUrl: string;
    shortDesc: string;
  };
}

const ExperienceCard = ({ experience }: ExperienceProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition border border-gray-200 overflow-hidden">
      <img
        src={experience.imageUrl}
        alt={experience.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {experience.title}
        </h2>
        <p className="text-sm text-gray-500 mb-1">{experience.shortDesc}</p>
        <p className="text-xs text-gray-400">{experience.location}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-gray-900 text-sm">
            From ₹{experience.price}
          </span>

          <Link
            to={`/details/${experience._id}`}
            className="bg-yellow-400 text-gray-900 text-sm font-medium px-4 py-1.5 rounded-md hover:bg-yellow-500 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
