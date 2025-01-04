import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AddReviewPage = () => {
  const handleAddReview = (event) => {
    event.preventDefault();

    const form = event.target;
    const coverImage = form.coverImage.value;
    const title = form.title.value;
    const description = form.description.value;
    const rating = form.rating.value;
    const year = form.year.value;
    const genre = form.genre.value;
    const userName = form.userName.value;
    const email = form.email.value;

    const newReview = {
      coverImage,
      title,
      description,
      rating,
      year,
      genre,
      userName,
      email,
    };
    // console.log(newReview);

    fetch("https://gamelens-server.vercel.app/addreview", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Review Added Successfully ",
            icon: "success",
            confirmButtonText: "Close",
          });
        }
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white text-black shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Add New Review</h2>
      <form onSubmit={handleAddReview} className="space-y-4">
        {/* Game Cover Image */}
        <div>
          <label htmlFor="coverImage" className="block font-medium">
            Game Cover Image (URL)
          </label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            className="input input-bordered w-full"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Game Title */}
        <div>
          <label htmlFor="title" className="block font-medium">
            Game Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="input input-bordered w-full"
            placeholder="Enter game title"
            required
          />
        </div>

        {/* Review Description */}
        <div>
          <label htmlFor="description" className="block font-medium">
            Review Description
          </label>
          <textarea
            id="description"
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Write your review"
            required
          ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block font-medium">
            Rating (1-10)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="input input-bordered w-full"
            min="1"
            max="10"
            placeholder="Enter rating"
            required
          />
        </div>

        {/* Publishing Year */}
        <div>
          <label htmlFor="year" className="block font-medium">
            Publishing Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            className="input input-bordered w-full"
            placeholder="Enter year (e.g., 2023)"
            required
          />
        </div>

        {/* Genres */}
        <div>
          <label htmlFor="genre" className="block font-medium">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            className="select select-bordered w-full"
            required
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

        {/* User Info */}
        <div className="grid gap-4">
          <div>
            <label className="block font-medium">User Name</label>
            <input
              name="userName"
              readOnly
              type="text"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-medium">User Email</label>
            <input
              type="email"
              readOnly
              name="email"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReviewPage;
