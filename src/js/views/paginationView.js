import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
    parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this.parentElement.addEventListener('click', function (e) {
          const btn = e.target.closest('.btn--inline');
          if(!btn) return;
          
          const goToPage = Number(btn.dataset.goto);
          
          handler(goToPage);
        });
    }

    _generateMarkup() {
        const numPages = Math.ceil(this.data.results.length / this.data.resultsPerPage);
        const currentPage=this.data.page;
        console.log('Number of Pages:', numPages);
        console.log('Current Page:', currentPage);

        if (currentPage === 1 && numPages > 1) {
            return `
            <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
        }

        if (currentPage === numPages && numPages > 1) {
            return `
            <button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>
            `;
        }

        if (currentPage < numPages) {
            return `
            <button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>
          <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
        }

        return '';
    }
}

export default new PaginationView();
