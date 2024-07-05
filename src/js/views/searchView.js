
class SearchView{
    #parentEl=document.querySelector('.search');
    #clearOutput(){
         this.#parentEl.querySelector('.search__field').value='';
    }
    getQuery(){
        const q= this.#parentEl.querySelector('.search__field').value;
        this.#clearOutput();
        return q;
    }

    addHandlerSearch(handler){
        this.#parentEl.addEventListener('submit',function(e){
            e.preventDefault();
            handler();
        })
    }
}

export default new SearchView();