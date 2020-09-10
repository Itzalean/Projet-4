// Récupération du contenu du panier
function getPanier() {
	contenuPanier = localStorage.panier;
	if (contenuPanier === undefined) {
		contenuPanier = [];
	} else {
		contenuPanier = JSON.parse(contenuPanier);
	}
}

let contenuPanier = [];
let mainElt = document.querySelector('main');

// Requêtes avec le serveur
//   url : url à interroger
//   params : paramètres de la requête, '/' par défaut si non renseigné
//   method : GET par défaut
function request(url, params = "/", method = "GET") {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.setRequestHeader( "Content-Type" , 'application/json');
		xhr.onload = (function ()  {
		    if (this.status >= 200 && this.status <= 299 || this.status == 0) {
		    	resolve(JSON.parse(xhr.response));
		    } else {
		    	reject(xhr.status + " - " + xhr.statusText);
		    };
		});
		xhr.send(params);
	});
}

// Gestion des erreurs des requêtes avec le serveur
function xhrErr(e) {
	let errorElt = document.createElement("div");
	let messageElt = document.createElement("p");
	messageElt.innerHTML = "Problème lors de la lecture des données : <br>" + e;
	errorElt.classList.add("col-12", "h1", "text-center", "bg-danger", "mt-5", "pt-4");
	errorElt.appendChild(messageElt);
	mainElt.appendChild(errorElt);
}

// Décompte du nombre de produits dans le panier
function countProduits () {
	getPanier();
	let nombreProduits = document.getElementById('nbProduits');
	nombreProduits.innerHTML = "&nbsp" + contenuPanier.length + "&nbsp";
}

// Ajout d'un produit dans le panier
function addProduit (id, nom, prix) {
	let detailProduit = [id, nom, prix];
	contenuPanier.push(detailProduit);
	localStorage.panier = JSON.stringify(contenuPanier);
	countProduits();
}

// suppression du panier après validation de commande
function resetProduits() {
	window.localStorage.removeItem('panier');
}
