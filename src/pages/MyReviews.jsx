import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../components/Loading";
import ReviewTable from "../components/ReviewTable";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`https://gamelens-server.vercel.app/addreview?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyReviews(data);
          setLoading(false);
        })
        .catch((err) => {
          // console.error("Error fetching my reviews:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gamelens-server.vercel.app/addreview/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your review has been deleted.", "success");
              setMyReviews((prevReviews) =>
                prevReviews.filter((review) => review._id !== id)
              );
            } else {
              toast.error("Failed to delete the review.");
            }
          })
          .catch((err) => {
            // console.error("Error deleting review:", err);
            toast.error("An error occurred while deleting the review.");
          });
      }
    });
  };

  const handleEdit = (id) => navigate(`/updateReview/${id}`);

  if (loading) return <Loading />;
  if (myReviews.length === 0) return <div>No reviews found.</div>;

  return (
    <div className="min-h-screen py-8">
      <h1 className="text-3xl font-bold text-center mb-6">My Reviews</h1>
      <ReviewTable
        reviews={myReviews}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default MyReviews;
