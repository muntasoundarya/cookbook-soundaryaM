import { API_URL } from "./config";
import { getJason } from "./helper";
export const state={
    recipe:{},
    search:{
        query:'',
        result:[],
        resultperpage:10,
        page:1
    },
    bookmark:[],
}
export const loadRecipe =async function(id){
    try{
       const data=await getJason(`${API_URL}${id}`);
    
        let {recipe}=data.data;
        state.recipe={
          id: recipe.id,
          title:recipe.title,
          publisher:recipe.publisher,
          sourceUrl:recipe.source_url,
          image:recipe.image_url,
          servings:recipe.servings,
          cookingTime:recipe.cooking_time,
          ingredients:recipe.ingredients
        };
        if(state.bookmark.some(bookmark=>bookmark.id===id)){
            state.recipe.bookmarked=true;
        }
        else{
            state.recipe.bookmarked=false;
        }
        console.log(recipe);

    }
    catch(err){
        alert(err);
        throw err;
    }
};
export const loadSearchResults=async function(query){
    try{
        state.search.query=query;
        const data=await getJason(`${API_URL}?search=${query}`);
        console.log(data);

      state.search.result=  data.data.recipes.map(rec =>{
            return {
                id: rec.id,
                title:rec.title,
                publisher:rec.publisher,
                image:rec.image_url,
                
            }
        })
    }catch(err){
console.log(err);
throw err;
    }
    state.search.page=1;
}
export const getSearchResultsPage=function(page=state.search.page){
    state.search.page=page;
    const start=(page-1)*state.search.resultperpage;
    const end=(page)*state.search.resultperpage;
   
    return state.search.result.slice(start,end);
}
export const updateServings=function(newServing){
    state.recipe.ingredients.forEach(ing=>{
        ing.quantity=(ing.quantity*newServing) / state.recipe.servings;
    })
    state.recipe.servings=newServing;
}
const persistBookmark=function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmark));
}
export const addBookmark=function(recipe){
    state.bookmark.push(recipe);

    if(recipe.id=== state.recipe.id){
        //adding a new property.
        state.recipe.bookmarked=true;
    }
persistBookmark();
}
export const deleteBookmark=function(id){
    const index=state.bookmark.findIndex(el=> el.id===id)
    state.bookmark.splice(index,1);
    
    if(id=== state.recipe.id){
       
        state.recipe.bookmarked=false;
    }
persistBookmark();
}

const init=function(){
   const storage= localStorage.getItem('bookmarks');
    if(storage) state.bookmark=JSON.parse(storage);
};
init();