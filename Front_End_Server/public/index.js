/* eslint-disable no-undef */
const ENV = 'dev';

let apiUrl =
    ENV == 'dev' ? 'http://localhost:2016/' : 'https://api-serverwuqr.onrender.com/';
console.log('API', apiUrl);

console.log('helloWorld');
const $displayButton = $('#display-scp');
//const $results = $('#results');
$displayButton.on('click', displayAllSCP());

function displayAllSCP(){
    $.get(`${apiUrl}scp`).done(generateSCP);
    clearResults();
    console.log('working');
}

function generateSCP(data) {
    for (let i = 0; i < result.length; i++) {
        `<div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="WIP SCP Image">
                        <div class="card-body">
                            <h5 class="card-title">${data[0]}</h5>
                            <p class="card-text"></p>
                            <p class="card-text"></p>
                            <p class="card-text"></p>
                            <a href="https://scp-wiki.wikidot.com/scp-series" class="btn btn-primary</a>
                        </div>
                </div>`;
    }
}

function clearResults() {
    $('#results').empty();
}
