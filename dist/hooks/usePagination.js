import { useState } from 'react';
// custom hook for pagination with pagination controls, like next, prev, go to page, etc..
var usePagination = function (data, itemsPerPage) {
    var _a = useState(1), currentPage = _a[0], setCurrentPage = _a[1];
    var totalPages = Math.ceil(data.length / itemsPerPage);
    // go to a specific page number. It requires a number as an argument.
    var goToPage = function (pageNumber) {
        setCurrentPage(pageNumber);
    };
    // the next and prev functions are used to navigate to the next 
    var nextPage = function () {
        setCurrentPage(function (prevPage) { return Math.min(prevPage + 1, totalPages); });
    };
    // .. or previous page
    var prevPage = function () {
        setCurrentPage(function (prevPage) { return Math.max(prevPage - 1, 1); });
    };
    // .. or to the first
    var goToFirstPage = function () {
        setCurrentPage(1);
    };
    // .. or to the last page
    var goToLastPage = function () {
        setCurrentPage(totalPages);
    };
    // slice the data array to show only the items for the current page
    var paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return {
        currentPage: currentPage,
        totalPages: totalPages,
        goToPage: goToPage,
        nextPage: nextPage,
        prevPage: prevPage,
        goToFirstPage: goToFirstPage,
        goToLastPage: goToLastPage,
        paginatedData: paginatedData,
    };
};
export default usePagination;
