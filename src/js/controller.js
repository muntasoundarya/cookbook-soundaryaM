
import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';
const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if(module.hot){
  module.hot.accept();
}
const controlRecipe=async function(){
  try{
    const id=window.location.hash.slice(1);
   
    if(!id) return;
    //highlighting the selected page
    resultView.render(model.getSearchResultsPage());
    //loading recipe
    await model.loadRecipe(id);

    // rendering recipe
    recipeView.render(model.state.recipe);

    bookmarkView.render(model.state.bookmark);
   
  }catch(err){
    alert(err);
    recipeView.renderError();
    console.error(err);
  }
  //sending a funtion to a event handler
  
 
};
const controlSearch=async function(){
  try{
    //getting the query
    const query=searchView.getQuery();

    if(!query) return ;
    //loading the query
   resultView._renderSpinner();
   await model.loadSearchResults(query);
   //rendering the result
   console.log(model.state.search.result);
   resultView.render(model.getSearchResultsPage());

   //render initial pagination
   paginationView.render(model.state.search)
  }catch(err){
    console.log(err);
  }
}
const controlPagination=function(goToPage){
  console.log(goToPage);
  //render new results
  resultView.render(model.getSearchResultsPage(goToPage));

   //render new pagination
   paginationView.render(model.state.search)
}

const controlServings=function(newServings){
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
}
const controlAddBook=function(){
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  }
  else{
    model.deleteBookmark(model.state.recipe.id);
  }
 
  
  recipeView.render(model.state.recipe);
console.log(model.state.bookmark);
  bookmarkView.render(model.state.bookmark);

}
const controlBookmarks=function(){
  bookmarkView.render(model.state.bookmark)
}
const init=function(){
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addhandlerAddBookmark(controlAddBook);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
}
init();
console.log('checkin');
console.log('checkin again');