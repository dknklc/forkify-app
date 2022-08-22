import View from './View.js';

import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline'); // Event delegation
      if (!btn) return;

      const goToPage = +btn.dataset.goto; // we need to connect ui and the code again by using data property.
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numOfPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numOfPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
    // Last page
    if (curPage === numOfPages && numOfPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
        
      `;
    }
    // Other page
    if (curPage < numOfPages) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
