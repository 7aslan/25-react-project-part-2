import "./style.css"
function Pagination({ currentPage, totalPage = 10, pageOnChange }) {
  function noOfPages() {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  return (
    <div className="pagination">
      <button
        onClick={() => pageOnChange(currentPage - 1)}
        className="pagination-btn"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {noOfPages().map((pageNo) => (
        <button
          className={`pagination-btn ${currentPage === pageNo ? 'active': '' }`}
          key={pageNo}
          onClick={() => pageOnChange(pageNo)}
        >
          {pageNo}
        </button>
      ))}
      <button
        onClick={() => pageOnChange(currentPage + 1)}
        className="pagination-btn"
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
