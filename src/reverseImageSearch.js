function createImage(imgID){
    
    var image = document.createElement("img");
    image.setAttribute("src", "https://www.stjoes.ca/coronavirus/test/web-banner_covid-test-online-booking.png");
    image.setAttribute("id", imgID);
    image.style.height = '768px';
    image.style.width = '1024px';
    document.getElementById("reverseImageSearch").appendChild(image);
}

//array to store the images
var images = new Array();

var table = document.createElement("TABLE");
table.setAttribute("id", "imageTable");
document.body.appendChild(table);
document.getElementById("reverseImageSearch");

var rows = document.createElement("TR");
rows.setAttribute("id", "tableRows");
//document.getElementById("imageTable").appendChild(cells);

var dividers = document.createElement("TD");
var cells = document.createElementNode("cell");
dividers.appendChild(cells);
document.getElementById("tableRows").appendChild(dividers);

for(let i = 0; i < 9; i++) {
    createImage("img" + i);   
}
//document.getElementById("reverseImageSearch.js").innerHTML = images;