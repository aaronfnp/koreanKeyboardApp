import React from "react";

const ListSidebar = ({ storedListInfo }) => {
  return (
    <aside className="list-sidebar">
      <div className="list-info">
        <img
          src="https://m.media-amazon.com/images/I/715xryOoPSL._AC_UF1000,1000_QL80_.jpg"
          style={{ width: "200px" }}
          alt="Book Cover"
        />
        <h2>
          {storedListInfo.title_en}
          {storedListInfo.title_kr ? ` / ${storedListInfo.title_kr}` : ""}
        </h2>
        <p className="text-black">Created by: {storedListInfo.user}</p>
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
