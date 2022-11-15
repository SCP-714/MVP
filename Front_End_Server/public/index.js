/* eslint-disable no-undef */
const ENV = 'dev';

let apiUrl =
    ENV == 'dev' ? 'http://localhost:2016/' : 'https://mvp-backend.onrender.com';
console.log('API', apiUrl);

const $results = $('#results');
const $displayButton = $('#display-scp');
const $searchButton = $('#searchButton');
const $searchBar = $('#searchBar'); 

$displayButton.on('click', displayAllSCP);
console.log('helloWorld');

function displayAllSCP() {
    $.get(`${apiUrl}api/scp`).done(generateSCP);
    clearResults();
    console.log('display all scp');
}


function generateSCP(data) {
    for (let i = 0; i < data.length; i++) {
        // eslint-disable-next-line no-unused-vars
        let $result = $(
            `<div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="WIP SCP Image">
                        <div class="card-body">
                            <h5 class="card-title">${data[i].item_number}</h5>
                            <p class="card-text">${data[i].name}</p>
                            <p class="card-text">${data[i].class}</p>
                            <p class="card-text">${data[i].series}</p>
                            <a href="https://scp-wiki.wikidot.com/scp-series" class="btn btn-primary</a>
                        </div>
                </div>`);

        $results.append($result);
    }
}


function searchAllSCP() {
    $.get(`${apiUrl}api/scp/`).done(generateSCP);
    clearResults();
    console.log('display all scp');
}









function clearResults() {
    $('#results').empty();
}
