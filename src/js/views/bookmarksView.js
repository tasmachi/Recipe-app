import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './view';

class BookmarksView extends View {
  parentElement = document.querySelector('.bookmarks__list');
  successmessage = '';
  errormessage = 'No bookmarks yet!';

  addHandlerRender(handler){
    window.addEventListener('load',handler)
  }

  _generateMarkup() {
    
    return this.data
    .map(bookmarks=>previewView.render(bookmarks, false)).join('');
  }
}

  
  export default new BookmarksView();
  