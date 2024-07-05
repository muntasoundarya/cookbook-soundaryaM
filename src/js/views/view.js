import icons from 'url:../../img/icons.svg'

export default class View{
    _data;
    render(data,render=true){
      //  if(!data || (Array.isArray(data) && data.length===0))return this.renderError();
        this._data=data;  
        const markup=this._generateMarkup();
        if(!render) return markup;
        this._clear();
       this._parentElement.insertAdjacentHTML("afterbegin",markup);

   }
   _clear(){
       this._parentElement.innerHTML='';
   }

   renderError(msg=this._errormsg){
     const markup=`<div class="error">
           <div>
             <svg>
               <use href="${icons}#icon-alert-triangle"></use>
             </svg>
           </div>
           <p>${msg}</p>
         </div>`
         this._clear();
       this._parentElement.insertAdjacentHTML("afterbegin",markup);
   }
   renderMessage(msg=this._message){
     const markup=`<div class="message">
           <div>
             <svg>
               <use href="${icons}#icon-alert-smile"></use>
             </svg>
           </div>
           <p>${message}</p>
         </div>`
         this._clear();
       this._parentElement.insertAdjacentHTML("afterbegin",markup);
   }
   addHandlerRender(handler){
     ['hashchange','load'].forEach(ev=>
       window.addEventListener(ev,handler)
     );
   }
   _renderSpinner(){
    const markup=`<div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._parentElement.innerHTML='';
    this._parentElement.insertAdjacentHTML("beforeend",markup);
  }

}