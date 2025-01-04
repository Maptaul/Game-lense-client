import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../components/Loading";

const UpdateReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch(`https://gamelens-server.vercel.app/addreview/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) {
          setReview(data);
        } else {
          toast.error("Review not found.");
          navigate("/myReviews");
        }
      })
      .catch((err) => {
        // console.error("Error fetching review:", err);
        toast.error("Failed to load review details.");
      });
  }, [id, navigate]);

  const handleUpdate = () => {
    if (
      !review.title ||
      !review.description ||
      !review.genre ||
      !review.rating
    ) {
      toast.error("All fields are required.");
      return;
    }

    setIsSaving(true);
    fetch(`https://gamelens-server.vercel.app/addreview/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSaving(false);
        if (data.success) {
          toast.success("Review updated successfully!");
          navigate("/myReviews");
        } else {
          toast.error(data.message || "Failed to update review.");
        }
      })
      .catch((err) => {
        setIsSaving(false);
        // console.error("Error updating review:", err);
        toast.error("An error occurred while updating the review.");
      });
  };

  if (!review) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Review</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Game Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={review.title}
            onChange={(e) => setReview({ ...review, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={review.description}
            onChange={(e) =>
              setReview({ ...review, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-medium">Genre</label>
          <select
            value={review.genre}
            onChange={(e) => setReview({ ...review, genre: e.target.value })}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select Genre
            </option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Adventure">Adventure</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Rating (1-10)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={review.rating}
            onChange={(e) =>
              setReview({ ...review, rating: Number(e.target.value) })
            }
            min="1"
            max="10"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">User Email</label>
          <input
            type="email"
            className="input input-bordered w-full bg-gray-200"
            value={user.email}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">User Name</label>
          <input
            type="text"
            className="input input-bordered w-full bg-gray-200"
            value={user.displayName}
            readOnly
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="btn btn-primary mr-2"
            disabled={isSaving} // Disable button when saving
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => navigate("/myReviews")}
            className="btn btn-secondary"
            disabled={isSaving} // Disable button when saving
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateReview;
