var request = new XMLHttpRequest();
var params = null;
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && (this.status == 200 || this.status == 0)) {
        var response = JSON.parse(this.responseText);
        console.log(response.length, response);
        generateCards(response);
    }
};

request.open("GET", "http://localhost:4000/api/teddies");
//request.open("GET", "http://localhost:4000/api/cameras");
//request.open("GET", "http://localhost:4000/api/furniture");
request.send(params);

function generateCards(produits) {

	for (produit of produits) {
		console.log(produit.name);
		let deckElt = document.createElement('section');
		let cardElt = document.createElement('article');
		let aElt = document.createElement('a');
		let figureElt = document.createElement('figure');
		let cardImageElt = document.createElement('img');
		let figcaptionCardElt = document.createElement('figcaption');

//		deckElt.classList.add("card-group");
		cardElt.classList.add("card", "col-md-6");
		aElt.href = "produit.html";
		aElt.classList.add("stretched-link");
		figureElt.classList.add("card-body");
		cardImageElt.src = produit.imageUrl;
		cardImageElt.alt = produit.name;
		cardImageElt.title = produit.name;
		cardImageElt.classList.add("mx-auto", "img-thumbnail");
		figcaptionCardElt.textContent = produit.name + " - " + Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(produit.price / 100);
		figcaptionCardElt.classList.add("text-center", "font-weight-bold");

		figureElt.appendChild(cardImageElt);
		figureElt.appendChild(figcaptionCardElt);
		aElt.appendChild(figureElt);
		cardElt.appendChild(aElt);
//		deckElt.appendChild(cardElt);
		document.getElementById('main').appendChild(cardElt);
//		document.getElementById('main').appendChild(deckElt);
	}
}

function err(e) {
	let errorElt = document.createElement("div");
	let messageElt = document.createElement("p");
	messageElt.textContent = "Problème de connexion avec le serveur !";
	errorElt.classList.add("col-12", "h1", "text-center", "bg-danger");
	errorElt.appendChild(messageElt);
	document.getElementById('main').appendChild(errorElt);

}