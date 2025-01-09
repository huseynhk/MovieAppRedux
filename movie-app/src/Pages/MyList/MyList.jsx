import React, { useState } from "react";
import { useSelector } from "react-redux";
import MovieCard from "../../components/movieCard/movieCard";
import "./MyList.css";
import ReactPaginate from "react-paginate";
import { GrPrevious, GrNext } from "react-icons/gr";

const MyList = () => {
  const { movies } = useSelector((store) => store.favorite);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = movies.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(movies.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % movies.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="my-list">
      <ul>
        {currentItems &&
          currentItems.map((movie, index) => (
            <MovieCard key={movie.id + index} movie={movie} />
          ))}
      </ul>
      <div className="pagination-component">
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel={<GrNext />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          pageCount={pageCount}
          previousLabel={<GrPrevious />}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default MyList;
