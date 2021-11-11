let data = {};

function xhr( url ) {
    return new Promise(r,r1) {
        // make call here

    }
}

element.addEventListener('click', startData );

// the manual way 
function startData() {
    
    let pageNum = 1;
    url = "https://xxx/" + pageNum;
    xhr (url) 
        .then( function() {

            // load data into var
            data += response.data.results;

            pageNum++;
            url = "https://xxx/" + pageNum;

            return xhr(url);

        })
        .then (function() {

            // load data into var
            data += response.data.results;

            pageNum++;
            url = "https://xxx/" + pageNum;

            return xhr(url);

        } )
        .then ( function() {

            // load data into var
            data += response.data.results;

            pageNum++;
            url = "https://xxx/" + pageNum;

            return xhr(url);

        } )

}

// recursive function approach
let pageNum = 1;
url = "https://xxx/" + pageNum;

function startData(url) {

    xhr (url) 
        .then( function() {

            // load data into var
            data += response.data.results;

            pageNum++;
            url1 = "https://xxx/" + pageNum;

            if (pageNum <= 261 ) {
                startData(url1);
            }
        })

}