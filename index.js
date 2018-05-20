const app = {
    init(selectors) {
      this.max = 0
      this.array = []
      this.list = document.querySelector(selectors.listSelector)
      this.template = document.querySelector(selectors.templateSelector)
  
      document
        .querySelector(selectors.formSelector)
        .addEventListener('submit', ev => {
          ev.preventDefault()
          this.handleSubmit(ev)
        })

        
    },

    
  
    renderListItem(rec) {
        
      const item = this.template.cloneNode(true)
      item.querySelector('.title').textContent = rec.Title
      item.dataset.id = rec.id
      
      item
        .querySelector('.warning')
        .addEventListener('click', ev => {
            ev.preventDefault()
            debugger
            this.handleFav(rec, ev)
        })

      item
        .querySelector('.alert')
        .addEventListener('click', ev => {
            ev.preventDefault()
            debugger
            this.handleDelete(rec, ev)
        })
      //item.dataset.genre = rec.Genre
      item.classList.remove('template')
      return item
    },
  
    handleSubmit(ev) {
      const f = ev.target
      const rec = {
        id: ++this.max,
        Title: f.title.value,
        Genre: "",
        fav: false,
      }
  
      this.array.unshift(rec)
      const item = this.renderListItem(rec)
      this.list.insertBefore(item, this.list.firstElementChild)
  
      f.reset()
      f.title.focus()
    },

    handleDelete(movie, ev){
        //console.log('delete Method')
        let i
        for(i =0; i < this.array.length; i++){
            if(this.array[i].id === movie.id){
              this.array.splice(i, 1);
              break
            }
        }
        //removeFromArray(thing)
  
        ev.target.parentElement.parentElement.remove()
    },

    handleFav(movie, ev){

        if( movie.fav == true){
            ev.target.parentElement.parentElement.style.color = 'black'
            movie.fav = false
            return
        }

        movie.fav = true
        ev.target.parentElement.parentElement.style.color = 'red';
    },
  }
  
  app.init({
    formSelector: '#newRecommendation',
    listSelector: '#recommendationList',
    templateSelector: '.recommendation.template',
    deleteSelector: '.alert',
    favoriteSelector: '.warning',
  })

  
