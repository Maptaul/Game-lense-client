import axios from "axios";
import React, { useEffect, useState } from "react";

const NewReleases = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await axios.get(
          "https://gamelens-server.vercel.app/addreview"
        );
        setGames(response.data);
      } catch (error) {
        // console.error("Error fetching new releases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewReleases();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="my-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">New Releases</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <div key={game._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-full h-48  rounded-md"
            />
            <h3 className="text-lg text-gray-700 font-bold mt-4">
              {game.title}
            </h3>
            <p className="text-gray-500 mt-2">Year: {game.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewReleases;
