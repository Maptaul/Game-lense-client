import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genreFilter, setGenreFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("https://gamelens-server.vercel.app/addreview")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setFilteredReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, []);

  const handleGenreFilter = (e) => {
    const selectedGenre = e.target.value;
    setGenreFilter(selectedGenre);

    if (selectedGenre === "") {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(
        reviews.filter((review) => review.genre === selectedGenre)
      );
    }
  };

  const handleSort = (e) => {
    const sortBy = e.target.value;
    setSortOption(sortBy);

    const sortedReviews = [...filteredReviews];
    if (sortBy === "rating-asc") {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "rating-desc") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "year-asc") {
      sortedReviews.sort((a, b) => new Date(a.year) - new Date(b.year));
    } else if (sortBy === "year-desc") {
      sortedReviews.sort((a, b) => new Date(b.year) - new Date(a.year));
    }

    setFilteredReviews(sortedReviews);
  };

  if (loading) {
    return <Loading />;
  }

  if (filteredReviews.length === 0) {
    return <div className="text-center py-10">No reviews available.</div>;
  }

  const genres = [...new Set(reviews.map((review) => review.genre))];

  return (
    <div className="min-h-screen py-8 text-black">
      <h1 className="text-3xl text-white font-bold text-center mb-6">
        All Reviews
      </h1>
      {/* Filter and Sort Dropdowns */}
      <div className="flex justify-center mb-6 gap-4">
        <select
          className="p-2 border rounded"
          value={genreFilter}
          onChange={handleGenreFilter}
        >
          <option value="">Filter by Genre</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={sortOption}
          onChange={handleSort}
        >
          <option value="">Sort by</option>
          <option value="rating-asc">Rating (Low to High)</option>
          <option value="rating-desc">Rating (High to Low)</option>
          <option value="year-asc">Year (Oldest to Newest)</option>
          <option value="year-desc">Year (Newest to Oldest)</option>
        </select>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
        {filteredReviews.map((review) => (
          <div
            key={review._id}
            className="card bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={review.coverImage}
              alt={review.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{review.title}</h2>
              <p className="text-sm text-gray-600">Genre: {review.genre}</p>
              <p className="text-sm text-gray-600">Rating: {review.rating}</p>
              <p className="text-sm text-gray-600">Year: {review.year}</p>
              <div className="mt-4">
                <Link
                  to={`/review/${review._id}`}
                  className="btn btn-primary w-full text-center"
                >
                  Explore Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
