import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "./Loading";

const GameDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for button disabling

  useEffect(() => {
    fetch(`https://gamelens-server.vercel.app/addreview/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setReview(data);
        } else {
          toast.error("No review found for this game.");
        }
        setLoading(false);
      })
      .catch((err) => {
        // console.error("Error fetching review:", err);
        setLoading(false);
        toast.error("Failed to load review data.");
      });
  }, [id]);

  const handleAddToWatchlist = () => {
    if (!user) {
      toast.warning("Please log in to add to your watchlist.");
      return;
    }

    setIsSubmitting(true);

    const watchlistItem = {
      reviewId: id,
      gameTitle: review.title,
      reviewDescription: review.description,
      rating: review.rating,
      genre: review.genre,
      coverImage: review.coverImage,
      reviewerName: review.reviewerName,
      reviewerEmail: review.reviewerEmail,
      userEmail: user.email,
      userName: user.displayName,
    };

    fetch("https://gamelens-server.vercel.app/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watchlistItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Added to Watchlist!");
        } else {
          toast.error("Failed to add to Watchlist.");
        }
      })
      .catch((err) => {
        // console.error("Error adding to watchlist:", err);
        toast.error("An error occurred while adding to watchlist.");
      })
      .finally(() => setIsSubmitting(false)); // Reset the button state
  };

  if (loading) {
    return <Loading />;
  }

  if (!review) {
    return <div>No review found for this game.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl text-black">
        <div className="card-body">
          <img
            src={review.coverImage}
            alt={review.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-semibold">{review.title}</h2>
          <p className="text-sm text-gray-500">Genre: {review.genre}</p>
          <p className="mt-2">{review.description}</p>
          <div className="mt-4">
            <p className="font-semibold">Rating: {review.rating}</p>
            <p className="font-semibold">Reviewed by: {review.reviewerName}</p>
            <p className="text-sm text-gray-600">
              Email: {review.reviewerEmail}
            </p>
          </div>
          <div className="mt-6">
            {user ? (
              <button
                onClick={handleAddToWatchlist}
                className="btn btn-primary w-full"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Adding..." : "Add to Watchlist"}
              </button>
            ) : (
              <button className="btn btn-secondary w-full" disabled>
                Log in to Add to Watchlist
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GameDetails;
