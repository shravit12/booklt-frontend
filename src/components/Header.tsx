import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();

  
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      
      navigate(`/?search=${encodeURIComponent(trimmedQuery)}`);
    } else {
      
      navigate("/");
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between bg-white px-6 sm:px-10 py-4 [box-shadow:0_4px_12px_rgba(0,0,0,0.15)] z-50 relative">
    
      <Link to="/">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="BookIt" className="h-9" />
        </div>
      </Link>

      
      <form
        onSubmit={handleSearch}
        className="flex items-center mt-3 sm:mt-0 border border-yellow-400 rounded-lg overflow-hidden w-full sm:w-1/3"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search experiences"
          className="flex-grow px-4 py-2 outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-400 px-5 py-2 text-sm sm:text-base font-medium text-gray-800 hover:bg-yellow-500 transition"
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
