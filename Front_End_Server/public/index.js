/* eslint-disable no-undef */
const ENV = 'dev';
const apiUrl = ENV == 'dev' ? 'http://localhost:2016/' : 'https://mvp-backend.onrender.com/';
console.log('API', apiUrl);

const $results = $('#results');
const $displayButton = $('#display-scp');
const $searchButton = $('#searchButton');
const $input = $('#input');
const $createButton = $('#create-scp');
const $updateButton = $('#delete-scp');
//Generating all SCP's//
$displayButton.on('click', displayAllSCP);

function displayAllSCP() {
    $.get('http://localhost:2016/api/scp').done(generateSCP);
    clearResults();
    console.log('display all scp');
}

function generateSCP(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let $result = $(`
         <div class="card" style="width: 18rem;">
                <img src=${data[i].img} class="card-img-top" alt="WIP SCP Image">
                    <div class="card-body" id="card">
                        <h5 class="card-title">${data[i].item_number}</h5>
                        <p class="card-text">${data[i].name}</p>
                        <p class="card-text">${data[i].class}</p>
                        <p class="card-text">${data[i].series}</p>
                        <a href="https://scp-wiki.wikidot.com/scp-series" class="btn btn-primary">More information</a>
                    </div>
            </div>
                `);

        $results.append($result);
    
    }
}

//Searching SCP's//
$searchButton.on('click', searchAllSCP);


function searchAllSCP() {
    $.get(`${apiUrl}api/scp/` + $input.val()).done(generateOneSCP);
    clearResults();
    console.log('search scp');
}


function generateOneSCP(data) {
    let $result = $(`
         <div class="card" style="width: 18rem;">
                <img src="$data[0].img" class="card-img-top" alt="WIP SCP Image">
                    <div class="card-body" id="card">
                        <h5 class="card-title">${data[0].item_number}</h5>
                        <p class="card-text">${data[0].name}</p>
                        <p class="card-text">${data[0].class}</p>
                        <p class="card-text">${data[0].series}</p>
                        <a href="https://scp-wiki.wikidot.com/scp-series" class="btn btn-primary">More information</a>
                    </div>
            </div>
                `);

    $results.append($result);
}


$createButton.on('click', createSCP);

function createSCP() {
    $.get(`${apiUrl}api/scp`).done(makeSCP);
    clearResults();
    console.log('create scp');
}


function makeSCP() {
    
    $div=$('<div class="card" style="width: 18rem;"></div>');
    $item=$('<input type="search" placeholder="SCP Item Number" aria-label="Search" id="input">');
    $name=$('<input type="search" placeholder="Name" aria-label="Search" id="input">');
    $class=$('<input type="search" placeholder="Class" aria-label="Search" id="input">');
    $series=$('<input type="search" placeholder="Series" aria-label="Search" id="input">');
    $button=$('<button class="btn btn-primary" id="addButton">Add SCP</button>');
    
    
    $results.append($div);
    $div.append($item,$name,$class,$series,$button);
    
    $button.on('click',function(){
        fetch('http://localhost:2016/api/scp',{
            method:'POST',
            body: JSON.stringify({
                item_number: $item.val(),
                name: $name.val(),
                class: $class.val(),
                series: $series.val()
            }),
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(data=>console.log(data))
            .then(clearResults);
    });
    
}

//delete
$updateButton.on('click', deleteSCP);


function deleteSCP() {
    $.get('http://localhost:2016/api/scp/' + $input.val()).done(destroySCP);
    clearResults();
}


function destroySCP() {
    
    $div=$('<div class="card" style="width: 18rem;"></div>');
    $item=$('<input type="search" placeholder="SCP Item Number" aria-label="Search" id="input">');
    $button=$('<button class="btn btn-danger" id="addButton">WARNING THIS WILL DELETE SCP</button>');
    
    
    $results.append($div);
    $div.append($item,$button);
    
    $button.on('click',function(){
        fetch('http://localhost:2016/api/scp/' + $input.val(),{
            method:'DELETE',
            body: JSON.stringify({
                item_number: $item.val(),
                
            }),
            headers:{
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(data=>console.log(data))
            .then(clearResults);
    });
    
}


function clearResults() {
    $('#results').empty();
}
