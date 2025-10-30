import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExperienceCard from "../components/ExperienceCard";
import api from "../services/api";

interface Experience {
  _id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  shortDesc: string;
}

const Home = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();


  const query = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

    
        const res = await api.get("/experiences", {
          params: query ? { query } : {},
        });

        setExperiences(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load experiences. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading experiences...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-lg">
        {error}
      </div>
    );

  if (experiences.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        No experiences found for “{query}”.
      </div>
    );

  return (
    <main className="bg-gray-50 min-h-screen px-6 sm:px-12 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {experiences.map((exp) => (
          <ExperienceCard key={exp._id} experience={exp} />
        ))}
      </div>
    </main>
  );
};

export default Home;
