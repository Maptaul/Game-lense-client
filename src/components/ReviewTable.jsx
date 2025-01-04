import React from "react";

const ReviewTable = ({ reviews, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full max-w-4xl mx-auto bg-white text-black shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Genre</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className="border-t">
              <td className="px-4 py-2">{review.title}</td>
              <td className="px-4 py-2">{review.genre}</td>
              <td className="px-4 py-2">{review.rating}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onEdit(review._id)}
                  className="btn btn-primary btn-sm mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(review._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
