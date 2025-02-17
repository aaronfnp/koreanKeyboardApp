import React from "react";

const ListSidebar = ({ storedListInfo }) => {
  return (
    <aside className="list-sidebar">
      <div className="list-info">
      {storedListInfo.image ? (
  <div>
    <img
      src={storedListInfo.image}
      style={{ width: "200px" }}
      alt="Book Cover"
    />
  </div>
) : (
  <div>No Thumbnail</div>
)}

        <h2>
          {storedListInfo.title_en}
          {storedListInfo.title_kr ? ` / ${storedListInfo.title_kr}` : ""}
        </h2>
        <p className="text-black">Author(s): {storedListInfo.author}</p>
        <p className="text-black">Published: {storedListInfo.publishedDate}</p>
        <button>Want to Study</button>
        <div className="rating">⭐⭐⭐⭐☆</div>
        <a href={storedListInfo.url} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      </div>
    </aside>
  );
};

export default ListSidebar;
