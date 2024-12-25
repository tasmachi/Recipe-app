import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';


const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage())

    // update bookmarks
    bookmarksView.update(model.state.bookmarks)
    
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
    console.error(err)

  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    // reset search page back to 1
    model.state.search.page=1
    
    await model.loadSearchResults(query);
    
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err); // Log the error for more information
    resultsView.renderError();
  }
};

const controlPagination=function(goToPage){
  //Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings= function(newServings){
  // Update the recipe servings in state
  model.updateServings(newServings);

  // recipeView.update(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark=function(){
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  }else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //Update recipe view
  recipeView.update(model.state.recipe)

  //Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks=function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe=async function(newRecipe){
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    //Change id in URL
    window.history.pushState(null,'',`#${model.state.recipe.id}`)

    //close form window
    setTimeout(function(){
      addRecipeView.toggleWindow()
    },MODAL_CLOSE_SEC*1000)

  }catch(err){
    // console.error(err)
    addRecipeView.renderError(err.message)
  }
  
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe)
};
init();

// if (module.hot) {
//   module.hot.accept();
// }
