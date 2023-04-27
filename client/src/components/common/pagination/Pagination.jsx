import React from "react";
import PropTypes from "prop-types";

import { usePagination, DOTS } from "../../../hooks";

const Pagination = ({
  totalCount,
  pageSize,
  onPageChange,
  currentPage,
  siblingCount,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // Если в диапазоне разбиения на страницы меньше 2, мы не будем отображать компонент
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex justify-center">
      <ul className="list-style-none flex font-miama">
        {/* Левая кнопка пагинации "Назад" */}
        <li className="hidden px-1 sm:block">
          <button
            className={`relative rounded border-0 bg-transparent px-3 py-1.5 outline-none transition-all duration-300 focus:shadow-none  ${
              currentPage === 1
                ? "pointer-events-none text-gray-9"
                : "text-graphite hover:bg-green-1 hover:text-main-white dark:text-main-white dark:hover:text-graphite"
            }`}
            onClick={onPrevious}
          >
            Назад
          </button>
        </li>
        {paginationRange.map((pageNum, idx) => {
          // Если элемент страницы представляет собой ТОЧКИ, отобразите ТОЧКИ символом юникод
          if (pageNum === DOTS) {
            return (
              <li
                key={`page_${idx}`}
                className="relative top-[6px] bg-transparent px-1 text-graphite dark:text-main-white"
              >
                &#8230;
              </li>
            );
          }
          // Визуализация нашей страницы.
          return (
            <li key={`page_${idx}`} className="px-1">
              <button
                className={`relative rounded border-0 px-3 py-1.5 text-graphite outline-none transition-all duration-300 focus:shadow-none dark:text-main-white 2xl:hover:bg-green-1 2xl:hover:text-main-white 2xl:dark:hover:text-graphite ${
                  currentPage === pageNum ? "bg-green-1" : ""
                }`}
                // to={"/#"}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </button>
            </li>
          );
        })}
        {/* Правая кнопка пагинации "Вперёд" */}
        <li className="hidden px-1 sm:block">
          <button
            className={`relative rounded border-0 bg-transparent px-3 py-1.5 outline-none transition-all duration-300 focus:shadow-none  ${
              currentPage === lastPage
                ? "pointer-events-none text-gray-9"
                : "text-graphite hover:bg-green-1 hover:text-main-white dark:text-main-white dark:hover:text-graphite"
            }`}
            onClick={onNext}
          >
            Вперёд
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
  siblingCount: PropTypes.number,
};

Pagination.defaultProps = {
  siblingCount: 1,
};

export default Pagination;
