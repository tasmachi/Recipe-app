import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './view';

class ResultsView extends View {
  parentElement = document.querySelector('.results');
  successmessage = '';
  errormessage = 'No recipes found for your query. Please try again!';

  _generateMarkup() {
    
    return this.data
    .map(result=>previewView.render(result, false)).join('');
  }
}

  
  export default new ResultsView();
  