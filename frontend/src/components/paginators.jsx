import * as utils from "../components/utils";

export function Paginator1({ page, setPage, count, limit }) {
    return (
      <nav aria-label="Page navigation example">
        <ul class="pagination pagination-lg">
          {page > 1 && (
            <li class="page-item">
              <button
                onClick={() => setPage(page - 1)}
                class="page-link"
                href="#"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
          )}
  
          {utils.CreateArrayFromInt(count, limit).map((item) => (
            <li class={
              page === item ? "page-item active" : "page-item"
            }>
              <button
                type="button"
                onClick={() => setPage(item)}
                class={
                  page === item ? "page-link fw-bold lead" : "page-link"
                }
              >
                {item}
              </button>
            </li>
          ))}
  
          {page < utils.CreateArrayFromInt(count, limit).length && (
            <li class="page-item">
              <button
                onClick={() => setPage(page + 1)}
                class="page-link"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }