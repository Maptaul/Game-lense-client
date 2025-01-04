import axios from "axios";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Loading from "./Loading";

const TrendingGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingGames = async () => {
      try {
        const response = await axios.get(
          "https://gamelens-server.vercel.app/addreview"
        );
        setGames(response.data);
      } catch (error) {
        // console.error("Error fetching trending games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingGames();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="my-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Trending Games</h2>
      <Marquee speed={50} gradient={false} className="py-4">
        {games.map((game) => (
          <div key={game._id} className="mx-4 flex flex-col items-center">
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-32 h-32  rounded-md"
            />
            <h3 className="text-lg font-bold mt-2 text-center">{game.title}</h3>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default TrendingGames;
