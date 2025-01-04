import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const MyWatchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`https://gamelens-server.vercel.app/watchlist/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setWatchlist(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching watchlist:", error);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="container mx-auto p-6 bg-white text-black rounded-md">
      <h1 className="text-2xl text-center font-semibold">Your Watchlist</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full mt-4">
          <thead>
            <tr className="bg-gray-200 rounded-md">
              <th className="px-4 py-2">Game Title</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.length > 0 ? (
              watchlist.map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.gameTitle}</td>
                  <td className="border px-4 py-2">{item.genre}</td>
                  <td className="border px-4 py-2">{item.rating}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center px-4 py-2">
                  No games in your watchlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyWatchlist;
