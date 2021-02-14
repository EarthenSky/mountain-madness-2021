//array to store the images
var images = new Array();

function createImage(imgID){
    
    var image = document.createElement("img");
    image.setAttribute("src", "https://www.stjoes.ca/coronavirus/test/web-banner_covid-test-online-booking.png");
    image.setAttribute("id", imgID);
    image.style.height = '768px';
    image.style.width = '1024px';
    document.getElementById("reverseImageSearch").appendChild(image);
}

for(let i = 0; i < 9; i++) {
    createImage("img" + i);
    
}



//document.getElementById("reverseImageSearch.js").innerHTML = images;