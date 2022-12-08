import "./Pagination.css";

const Pagination = ({ page, totalPages, previewClick, advanceClick }) => {
  return (
    <div className="pagination-container">
      <button onClick={previewClick}>
        <div>⏪</div>
      </button>
      <div>
        {page} de {totalPages}
      </div>
      <button onClick={advanceClick}>
        <div>⏩</div>
      </button>
    </div>
  );
};

export default Pagination;
