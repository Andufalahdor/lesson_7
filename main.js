const key = "http://www.omdbapi.com/?apikey=d77337bc"

document.querySelector('.search-btn').addEventListener("click", () => {
    let search = document.querySelector('.search-input').value
    getData(search);
})

async function getData(search) {
    let url = `${key}&s=${search}`;
    let response = await fetch(url).catch(err => console.log(err));
    let data = await response.json();
    render(data);
}

function render(data) {
    document.querySelector('.main-content').innerHTML = '';
    let result = ``;
    if (data.Search) {
        data.Search.forEach((elem) => {
            let div = `<div class="elem">`
            let img = `<div class="image"> <img width="200px" height="300px" src="${elem.Poster}"/> </div>`
            let title = `<div class="poster"> ${elem.Title} </div>`
            let type = `<div class="type"> ${elem.Type} </div>`
            let year = `<div class="year"> ${elem.Year} </div>`
            let button = `<input type="button" onclick="more()" data-id="${elem.imdbID}" value="More details" class="more-btn">`
            let close = `</div>`
            result += div + img + title + type + year + button + close;
        })
    } else {
        result = `Укажите, пожалуйста, корректное название фильма`
    }
    document.querySelector('.main-content').innerHTML = result;
}

async function more() {
    let id = event.target.dataset.id;
    let url = `${key}&i=${id}&plot=full`;
    let response = await fetch(url);
    let data = await response.json();
    show(data)
}

function show(data) {
    document.querySelector('.morebox').style.display = 'block';
    document.querySelector('.left').style.backgroundImage = `url(${data.Poster})`;
    document.querySelector('.film-name').innerHTML = `${data.Title}`;
    document.querySelector('.film-description').innerHTML = `${data.Genre}`;
    document.querySelector('.film-plot').innerHTML = `${data.Plot}`;
    document.querySelector('.film-written').innerHTML = `<b>Written by: </b>${data.Writer}`;
    document.querySelector('.film-directed').innerHTML = `<b>Directed by: </b>${data.Director}`;
    document.querySelector('.film-starring').innerHTML = `<b>Starring: </b>${data.Actors}`;
    document.querySelector('.film-boxoffice').innerHTML = `<b>BoxOffice: </b>${data.BoxOffice}`;
    document.querySelector('.film-awards').innerHTML = `<b>Awards: </b>${data.Awards}`;
    document.querySelector('.film-rattings').innerHTML = `<b>Ratings: </b>${data.imdbRating}`;

}

document.querySelector('.morebox').addEventListener("click", () => {
    if (event.target == document.querySelector('.morebox')) {
        document.querySelector('.morebox').style.display = 'none';
    }
})