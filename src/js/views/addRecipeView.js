import icons from 'url:../../img/icons.svg';
import View from './view';

class addRecipeView extends View {
  parentElement = document.querySelector('.upload');
  successmessage='Recipe added successfully!'

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerCloseWindow(){
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler){
    this.parentElement.addEventListener('submit',function(e){
        e.preventDefault()
        // const btn=e.target.closest('.upload__btn');
        // if(!btn) return;

        const dataArr=[...new FormData(this)]
        const data=Object.fromEntries(dataArr)
        
        handler(data)

    })
  }

  _generateMarkup() {}
}

export default new addRecipeView();
