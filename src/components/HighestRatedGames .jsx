import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const HighestRatedGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHighestRatedGames = async () => {
      try {
        const response = await axios.get(
          "https://gamelens-server.vercel.app/highestRatedGames"
        );
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching highest-rated games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighestRatedGames();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!games.length) {
    return <p className="text-center text-gray-500">No games found.</p>;
  }

  return (
    <section className="my-10 px-6">
      <Fade direction="down" triggerOnce>
        <h2 className="text-4xl font-bold text-center mb-6">
          Highest Rated Games
        </h2>
      </Fade>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <Slide
            key={game._id}
            direction={index % 2 === 0 ? "left" : "right"}
            triggerOnce
          >
            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-48 rounded-md"
              />
              <h3 className="text-lg text-gray-800 font-bold mt-4">
                {game.title}
              </h3>
              <p className="text-gray-600">Rating: {game.rating}/10</p>
              <p className="text-gray-500 mt-2">Genre: {game.genre}</p>
              <p className="text-gray-500 mt-2">Year: {game.year}</p>
              <button
                onClick={() => navigate(`/review/${game._id}`)}
                className="btn btn-primary mt-4 w-full"
              >
                Explore Details
              </button>
            </div>
          </Slide>
        ))}
      </div>
    </section>
  );
};

export default HighestRatedGames;
