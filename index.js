class App{
    constructor(selectors) {
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

        
    }

    
  
    renderListItem(rec) {
        
      const item = this.template.cloneNode(true)
      item.querySelector('.title').textContent = rec.Title
      item.dataset.id = rec.id

      item
        .querySelector('.edit')
        .addEventListener('click', ev => {
            ev.preventDefault()
            this.handleEdit(rec, ev)
        })

      item
        .querySelector('.up')
        .addEventListener('click', ev => {
            ev.preventDefault()
            this.handleUp(item, ev)
        })

        item
        .querySelector('.down')
        .addEventListener('click', ev => {
            ev.preventDefault()
            this.handleDown(item, ev)
        })
      
      item
        .querySelector('.warning')
        .addEventListener('click', ev => {
            ev.preventDefault()
            this.handleFav(rec, ev)
        })

      item
        .querySelector('.alert')
        .addEventListener('click', ev => {
            ev.preventDefault()
            this.handleDelete(rec, ev)
        })
      //item.dataset.genre = rec.Genre
      item.classList.remove('template')
      return item
    }
  
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
    }

    handleDelete(movie, ev){

        let i = this.array.indexOf(movie)
        this.array.splice(i, 1);
        ev.target.parentElement.parentElement.remove()
    }

    handleFav(movie, ev){

        if( movie.fav == true){
            ev.target.parentElement.parentElement.style.backgroundColor = "white"
            ev.target.parentElement.parentElement.style.color = "rgb(185, 10, 10)"
            movie.fav = false
            return
        }

        movie.fav = true
        ev.target.parentElement.parentElement.style.backgroundColor = "rgb(185, 10, 10)"
        ev.target.parentElement.parentElement.style.color = "white"
    }

    handleUp(movie, ev){

        //debugger
        const oneBefore = movie.previousSibling

        movie.remove
        this.list.insertBefore(movie, oneBefore)
        //ev.target.parentElement.parentElement.remove()
        
    }

    handleDown(movie, ev){

        const oneAfter = movie.nextSibling.nextSibling

        movie.remove
        this.list.insertBefore(movie, oneAfter)

        //nextSibling

        
    }

    handleEdit(movie, ev){
        const btn = ev.target
        const item = btn.parentElement.parentElement
        const nameF = item.querySelector('.title')

        if(nameF.isContentEditable){
            //make it no longer editable
            nameF.contentEditable = false
            btn.textContent = 'Edit'

            //save the changes
            movie.name = nameF.textContent
        }else{
            nameF.contentEditable = true
            btn.textContent = 'Save'
            nameF.focus()
        }
        
    }
  }
  
  new App({
    formSelector: '#newRecommendation',
    listSelector: '#recommendationList',
    templateSelector: '.recommendation.template',
    deleteSelector: '.alert',
    favoriteSelector: '.warning',
  })

  
