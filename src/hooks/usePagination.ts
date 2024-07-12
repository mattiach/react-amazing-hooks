import { useState } from 'react';
import { PaginationResult } from '../interfaces/const';

// custom hook for pagination with pagination controls, like next, prev, go to page, etc..
const usePagination = <T>(data: T[], itemsPerPage: number): PaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // go to a specific page number. It requires a number as an argument.
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // the next and prev functions are used to navigate to the next 
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // .. or previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // .. or to the first
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // .. or to the last page
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // slice the data array to show only the items for the current page
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    paginatedData,
  };
}

export default usePagination;
