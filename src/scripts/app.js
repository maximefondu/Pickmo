'use strict';

const header = document.querySelector(".header");
const genresCache = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Aventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comédie"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentaire"
    },
    {
      "id": 18,
      "name": "Drame"
    },
    {
      "id": 10751,
      "name": "Familial"
    },
    {
      "id": 14,
      "name": "Fantastique"
    },
    {
      "id": 36,
      "name": "Histoire"
    },
    {
      "id": 27,
      "name": "Horreur"
    },
    {
      "id": 10402,
      "name": "Musique"
    },
    {
      "id": 9648,
      "name": "Mystère"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science-Fiction"
    },
    {
      "id": 10770,
      "name": "Téléfilm"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "Guerre"
    },
    {
      "id": 37,
      "name": "Western"
    }
];

//classer les genres
function genresList(ul, genresId, nameParent){
    for (let i = 0; i < 3; i++) {
       let result = genresCache.find((value) => genresId[i] == value.id);
       const li  = document.createElement("li");

        if(result != undefined){
            li.innerHTML=result.name;
            ul.appendChild(li);
            li.classList.add(nameParent+'__genres');
        }
    }
 }

//HEADER
fetch("https://garith.be/b2/tmdb/api/trending/movie/day&language=fr-FR")
.then((response) => {
   return response.json();
})
.then((data) =>{
    header.style.backgroundImage="url(http://image.tmdb.org/t/p/original"+data.results[0].backdrop_path+")";


    let titleMovie = document.createElement("h3");
    let div = document.createElement("div");
    let note = document.createElement("li");
    let linkMovie = document.createElement("a");
    let list = document.createElement("ul");

    titleMovie.innerHTML = data.results[0].title;
    note.innerHTML = data.results[0].vote_average;

    div.setAttribute("data-id", data.results[0].id);
    linkMovie.href="#";
    linkMovie.setAttribute('data-parent', 'one');

    titleMovie.classList.add('title', 'title--big', 'title--light','title--uppercase');
    div.classList.add('infos');
    note.classList.add('note');
    list.classList.add('infos__el');

    header.appendChild(div);
    div.appendChild(linkMovie);
    linkMovie.appendChild(titleMovie);
    linkMovie.appendChild(list);
    list.appendChild(note);

    let genres = data.results[0].genre_ids;
    genresList(list, genres, 'infos');

    movieDisplay(linkMovie);
});



//A L'AFFICHE
fetch("https://garith.be/b2/tmdb/api/movie/upcoming&language=fr-FR")
.then((data) => {
   return data.json();
})
.then((data) =>{
    const ul = document.querySelector(".affiche");
    for (let i = 0; i < data.results.length; i++) {
        let elMovie = document.createElement("li");
        let divMovie = document.createElement("div");
        let linkMovie = document.createElement("a");
        let titleMovie = document.createElement("h3");
        let list = document.createElement("ul");
        let note = document.createElement("li");
        let btn = document.createElement("button");

        elMovie.setAttribute("data-id", data.results[i].id);

        titleMovie.innerHTML = data.results[i].title;
        linkMovie.href="#";
        note.innerHTML = data.results[i].vote_average;
        elMovie.style.backgroundImage="url(http://image.tmdb.org/t/p/original"+data.results[i].backdrop_path+")";
        btn.innerHTML="bouton favoris";

        ul.appendChild(elMovie);
        elMovie.appendChild(divMovie);
        divMovie.appendChild(linkMovie);
        linkMovie.appendChild(titleMovie);
        list.appendChild(note);
        linkMovie.appendChild(list);
        elMovie.appendChild(btn);

        elMovie.classList.add('affiche__el');
        divMovie.classList.add('affiche__content');
        note.classList.add('note');
        titleMovie.classList.add('title', 'title--meduim', 'title--light');
        btn.classList.add('affiche__btn');
        list.classList.add('affiche__list');
        linkMovie.classList.add('affiche__link');

       let genres = data.results[i].genre_ids;
        genresList(list, genres, 'affiche');

        movieDisplay(linkMovie)
        wishlist(btn)
        movieLoad(elMovie);
   }
});

//RECENTS
fetch("https://garith.be/b2/tmdb/api/movie/upcoming&language=fr-FR")
.then((data) => {
   return data.json();
})
.then((data) =>{
    const ul = document.querySelector(".recents");
    for (let i = 0; i < data.results.length; i++) {
        let elMovie = document.createElement("li");
        let linkMovie = document.createElement("a");
        let titleMovie = document.createElement("h3");
        let btn = document.createElement("button");
        let img = document.createElement("img");

        elMovie.setAttribute("data-id", data.results[i].id);
        linkMovie.setAttribute('data-parent', 'one');

        titleMovie.innerHTML = data.results[i].title;
        linkMovie.href="#";
        img.src = "http://image.tmdb.org/t/p/w300"+data.results[i].poster_path;
        btn.innerHTML="bouton favoris";

        ul.appendChild(elMovie);
        elMovie.appendChild(linkMovie);
        linkMovie.appendChild(img);
        linkMovie.appendChild(titleMovie);
        elMovie.appendChild(btn);

        elMovie.classList.add('recents__el');
        img.classList.add('recents__img');
        btn.classList.add('recents__btn');
        titleMovie.classList.add('title', 'title--center');
        linkMovie.classList.add('recents__link');

        movieDisplay(linkMovie)
        wishlist(btn)
        movieLoad(elMovie);
   }
});


//Wishlist
const ul = document.querySelector(".myList");
let tabl = [];


movieLoadWishlist();


//PRINCIPAL
function wishlist(btn){
   btn.addEventListener('click', (e)=>{

      let element = e.currentTarget;
      let elementParent = element.parentNode;
      let elementParentId = elementParent.getAttribute('data-id');

      removeAddClass(elementParentId);

      let result = element.classList.contains('movie__wishlist');
      if (result == true) {
         changeWordBtn(elementParent, element);
      }

      let booleanWishlist = elementParent.classList.contains('movieSelected');
      if(booleanWishlist == true){
         movieAdd(elementParentId);
      }else{
         movieRemove(elementParentId);
      }
   });
}
 
//add
function movieAdd(elementParentId){
   tabl = [];
   tabl = localStorage.getItem('wishlist');
   tabl = JSON.parse(tabl);

   if (tabl == null) {
      tabl = [];
      ul.innerHTML='';
   }

   tabl.push(elementParentId);
   localStorage.setItem("wishlist", JSON.stringify(tabl));

   fetch('https://garith.be/b2/tmdb/api/movie/'+elementParentId+"&language=fr-FR")
   .then((data) => {
      return data.json();
   })
   .then((data) =>{
      createWishlist(data);
   });
   wishlistWord();
}

//REMOVE
function movieRemove(elementParentId){
   let elementMaList = document.querySelector(".myList [data-id='"+elementParentId+"']");
   elementMaList.remove();

   tabl=[];
   tabl = localStorage.getItem('wishlist');
   tabl = JSON.parse(tabl);
   if (tabl.length == 1) {
      tabl = [];
      localStorage.removeItem('wishlist');
   }else{
      tabl = [];
      let li = document.querySelectorAll(".myList__el");

      for (let i = 0; i < li.length; i++) {
         let liId = li[i].getAttribute('data-id');
            tabl.push(liId);
            localStorage.setItem("wishlist", JSON.stringify(tabl));
      }
   }

   wishlistWord();
}

//Load
function movieLoad(elements){
   tabl=[];
   tabl = localStorage.getItem('wishlist');
   let tablParse = JSON.parse(tabl);
   let id = elements.getAttribute('data-id');
   
   if (tablParse != null) {
      for (let i = 0; i < tablParse.length; i++) {
         if (tablParse[i] == id) {
            elements.classList.add('movieSelected');
         }
      }
   }
}

function movieLoadWishlist(){
   tabl=[];
   tabl = localStorage.getItem('wishlist');
   let tablParse = JSON.parse(tabl);
   if (tablParse != null) {
      ul.innerHTML='';
      for (let i = 0; i < tablParse.length; i++) {
         fetch("https://garith.be/b2/tmdb/api/movie/"+tablParse[i]+"&language=fr-FR")
         .then((response)=>{
            return response.json();
         })
         .then((data)=>{
            createWishlist(data);
         });
      }
   }
}

//remove Add Class
function removeAddClass(elementParentId){
   let elements = document.querySelectorAll(".body [data-id='"+elementParentId+"']");
   for (let i = 0; i < elements.length; i++) {
       elements[i].classList.toggle('movieSelected');
   }
}

function movieLoadMovie(){
   tabl=[];
   tabl = localStorage.getItem('wishlist');
   let tablParse = JSON.parse(tabl);

   if (tablParse != null) {
         let elMovie = document.querySelector('.movie');
         let id = elMovie.getAttribute('data-id');

         for (let i = 0; i < tablParse.length; i++) {
            if (id == tablParse[i]) {
               elMovie.classList.toggle('movieSelected');
            }
         }
   }
}

//createElement Wishlist
function createWishlist(data){
   let elMovie = document.createElement("li");
   let imgMovie = document.createElement("img");
   let linkMovie = document.createElement("a");
   let titleMovie = document.createElement("h3");
   let btn = document.createElement("button");

   movieDisplay(linkMovie);
   wishlist(btn);

   elMovie.setAttribute("data-id", data.id);
   linkMovie.setAttribute("data-parent", 'one');

   titleMovie.innerHTML = data.title;
   linkMovie.href="#";
   imgMovie.src = "http://image.tmdb.org/t/p/w300"+data.poster_path;
   btn.innerHTML="bouton favoris";

   elMovie.classList.add("myList__el", "movieSelected");
   imgMovie.classList.add("myList__img");
   titleMovie.classList.add("title", "title--center");
   btn.classList.add("myList__btn");
   linkMovie.classList.add("myList__link");

   ul.appendChild(elMovie);
   elMovie.appendChild(linkMovie);
   linkMovie.appendChild(imgMovie);
   linkMovie.appendChild(titleMovie);
   elMovie.appendChild(btn);
}




//MOVIE - INFOS
function movieDisplay(linkMovie){
   linkMovie.addEventListener('click', (e)=>{
      e.preventDefault();

      //createSection
      let section = document.createElement("section");
      let div = document.createElement("div");
      let close = document.createElement("button");
      let span = document.createElement("span");

      section.classList.add("section", "section--movie");
      div.classList.add("movie");
      close.classList.add("movie__btn");
      span.classList.add('movie__bar');

      document.body.appendChild(section);
      section.appendChild(div);
      section.appendChild(close);
      section.appendChild(span);

      close.innerHTML='Retour';

      //FETCH
      let element = e.currentTarget;

      let elementParent;
      if (element.getAttribute('data-parent') == 'one') {
         elementParent = element.parentNode;
      }else{
         elementParent = element.parentNode.parentNode;
      }

      let elementParentId = elementParent.getAttribute('data-id');

      fetch("https://garith.be/b2/tmdb/api/movie/"+elementParentId+"&language=fr-FR")
      .then((data) => {
         return data.json();
      })
      .then((data) =>{
         let title = document.createElement("h3");
         let overview = document.createElement("p");
         let list = document.createElement("ul");
         let note = document.createElement("li");
         let btn = document.createElement("button");
         let date = document.createElement("p");
         let budget = document.createElement("p");
         let duree = document.createElement("li");
         let yearsDoc = document.createElement("li");
         let genres = document.createElement("ul");
         wishlist(btn);

         let day = data.release_date.slice(data.release_date.length-2, data.release_date.length);
         let years = data.release_date.slice(0, 4);
         let month = data.release_date.slice(5, 7);

         let time=new Date();
         time.setTime(data.runtime*1000);
         duree.innerHTML=time.getMinutes()+"h"+time.getSeconds();

         date.innerHTML= day+"-"+month+"-"+years;
         yearsDoc.innerHTML=years;
         title.innerHTML = data.title;
         overview.innerHTML = data.overview;
         note.innerHTML = data.vote_average;
         budget.innerHTML= new Intl.NumberFormat('arab', { maximumSignificantDigits: 3 }).format(data.budget) + "$";
         section.style.backgroundImage="url(http://image.tmdb.org/t/p/original"+data.backdrop_path+")";
         btn.innerHTML="bouton favoris";

         div.setAttribute('data-id', data.id);
         movieLoadMovie();

         div.appendChild(title);
         div.appendChild(genres);
         div.appendChild(list);
         list.appendChild(note);
         list.appendChild(duree);
         list.appendChild(yearsDoc);
         div.appendChild(overview);
         div.appendChild(date);
         div.appendChild(budget);
         div.appendChild(btn);


         for (let i = 0; i < data.genres.length; i++) {
            const li  = document.createElement("li");
            li.innerHTML=data.genres[i].name;
            genres.appendChild(li);
            li.classList.add('movie__genresEl');
         }

         title.classList.add('title', 'title--light', 'title--big','title--uppercase');
         list.classList.add('movie__content');
         overview.classList.add('movie__overview');
         note.classList.add('note');
         btn.classList.add('movie__wishlist');
         genres.classList.add('movie__genres');
         yearsDoc.classList.add('movie__years');
         duree.classList.add('movie__time');
         date.classList.add('movie__date');
         budget.classList.add('movie__budget');

         close.addEventListener('click', (e)=>{
               section.remove();
         });

         changeWordBtn(div, btn);
      });
   });
}



//RECHERCHE
let timeout;
const searchBar = document.querySelector(".searchBar__input");
const searchContent = document.querySelector(".searchContent");

searchBar.addEventListener('click', (e)=>{
   document.body.setAttribute('data-page', '2');
   header.classList.add('header--search');
   document.querySelector('.menu').classList.add('menu--none');
});

searchBar.addEventListener('blur', (e)=>{
   let valueSearch = e.currentTarget.value;
   if(!valueSearch){
      document.body.setAttribute('data-page', '1');
      header.classList.remove('header--search');
      document.querySelector('.menu').classList.remove('menu--none');
   }
});

searchBar.addEventListener('input', (e)=>{
   let valueSearch = e.currentTarget.value;
   clearTimeout(timeout);
   timeout = setTimeout(() => {
      if (!valueSearch) {
         searchContent.innerHTML='';
      }else{
         fetch("https://garith.be/b2/tmdb/api/search/movie&query="+valueSearch+"&language=fr-FR")
         .then((response)=>{
            return response.json();
         })
         .then((data)=>{
            searchContent.innerHTML="";
            for (let i = 0; i < data.results.length; i++) {
               let elMovie = document.createElement("li");
               let linkMovie = document.createElement("a");
               let titleMovie = document.createElement("h3");
               let img = document.createElement("img");

               elMovie.setAttribute("data-id", data.results[i].id);
               titleMovie.innerHTML = data.results[i].title;
               linkMovie.href="#";
               img.src = "http://image.tmdb.org/t/p/w300"+data.results[i].poster_path;


               linkMovie.setAttribute('data-id', 'link');
               linkMovie.setAttribute('data-parent', 'one');


               movieDisplay(linkMovie);

               searchContent.appendChild(elMovie);
               elMovie.appendChild(linkMovie);
               linkMovie.appendChild(img);
               linkMovie.appendChild(titleMovie);

               elMovie.classList.add('searchContent__el');
               img.classList.add('searchContent__img');
               titleMovie.classList.add('title', 'title--center', 'title--light');
               }
         });
      }
   }, 250);
});

//enter
searchBar.addEventListener('keypress', function(event) {
   if (event.keyCode == 13) {
       event.preventDefault();
   }
});

//MENU
const menuLinks = document.querySelectorAll(".menu__link");
menuLinks.forEach(element =>{
   element.addEventListener('click', (e)=>{
      let value = element.getAttribute('href');
      document.body.setAttribute('data-page', value.slice(1));

      if (value.slice(1) == 2) {
         header.classList.add('header--search');
      }else{
         header.classList.remove('header--search');
         searchBar.value='';
         searchContent.innerHTML='';
      }
   });
});

//changeWord BTN
function changeWordBtn(div, btn){
   let result = div.classList.contains('movieSelected');
   if (result == true) {
      btn.innerHTML="Retirer de ma liste d'envie";
   }else{
      btn.innerHTML="Ajouter à ma liste d'envie";
   }
}


wishlistWord();


function wishlistWord(){
   tabl=[];
   tabl = localStorage.getItem('wishlist');
   let tablParse = JSON.parse(tabl);

   if (tablParse == null) {
      document.querySelector('.infoList').innerHTML="Vous n'avez pas de film dans votre liste";
   }else if (tablParse.length == 1) {
      document.querySelector('.infoList').innerHTML="Vous avez 1 film dans votre liste.";
   }else{
   document.querySelector('.infoList').innerHTML="Vous avez "+tablParse.length+" films dans votre liste.";
   }
}

