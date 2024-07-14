import React from "react";

export default function BlogCard({ blog }) {
  function formatDate(dateString) {
    var date = new Date(dateString);
    var options = { year: "numeric", month: "short", day: "numeric" };
    var formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div style={{ cursor: "pointer" }}>
      <img className="img-fluid rounded-4" src={`images/blog/${blog.cover_image}`}></img>
      <div className="px-2 mt-2">
        <h5>{blog.title}</h5>
        <p>
          by <span style={{ fontWeight: "567" }}>{blog.author}</span> on{" "}
          <span style={{ fontWeight: "567" }}>{formatDate(blog.date)}</span>
        </p>
      </div>
    </div>
  );
}
