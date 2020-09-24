// Envoi de la commande au serveur
const sendOrder = (objPrm) => {request("http://localhost:3000/api/teddies/order", objPrm, "POST")
.then(data => validation(data))
.catch(error => xhrErr(error))
}

countProduits();
generateTable();

let formElt = document.querySelector('form')
let sectionElt = document.querySelector('section');
let orderElt = document.getElementById('numOrder');

if (contenuPanier.length == 0) {
	// Cas du paier vide
	document.querySelector('section h2').innerHTML = "Votre panier est vide";
	document.querySelector('p').innerHTML = "Votre panier est vide. Sélectionnez un produit de la page d'accueil afin de l'ajouter à votre panier.";
	mainElt.removeChild(formElt);
	// Retour à la page d'accueil
	let btnEndElt = document.querySelector('button[name="buttonEnd"]');
	btnEndElt.addEventListener('click', function() {
		location.assign('index.html');
	});

} else {
	mainElt.removeChild(sectionElt);

	// Retour à la page d'accueil si on utilise le bouton "Retour"
	let btnCancelElt = document.querySelector('button[name="buttonCancel"]');
	btnCancelElt.addEventListener('click', function() {
		location.assign('index.html');
	});

	// Gestion de l'event de validation du panier
	//   - Crée l'objet paramètre pour la création de commande
	//   - 
	let btnValidElt = document.querySelector('button[name="buttonValid"]');
	btnValidElt.addEventListener('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (formElt.reportValidity() == false) {
			return;
		}
		let listeProduits = [];

		for (i = 0; i < contenuPanier.length; i++) {
			listeProduits.push(contenuPanier[i][0]);
		}
		let obj = {
			contact: {
				firstName: document.getElementById('prenom').value,
				lastName: document.getElementById('nom').value,
				address: document.getElementById('adresse').value,
				city: document.getElementById('ville').value,
				email: document.getElementById('email').value
			},
			products: listeProduits
		}

		let jsonObj = JSON.stringify(obj);
		sendOrder(jsonObj);
		}
	);
}

// Remplissage de la table récapitulative du contenu du panier
function generateTable() {

	// Si le panier est vide, on n'affiche que l'entête et le pied de la table
	//     (suppression de la ligne)
	if (contenuPanier.length == 0) {
		document.querySelector('tbody').remove();
		return;
	}

	let trElt = document.querySelector('tbody > tr');
	let totalPanier = 0;

	// Bouble de remplissage de la table
	//    Dans le cas de plusieurs produits dans le panier, ajoute des lignes
	//    clonées à partir de la première ligne provenant du HTML
	for (i = 0; i < contenuPanier.length; i++) {
		if (i > 0) {
			trElt = trElt.cloneNode(true);
		}

		let numLigneCell = trElt.querySelector('td');
		numLigneCell.textContent = i + 1;

		let produitCell = trElt.querySelector('td.text-left');
		produitCell.textContent = contenuPanier[i][1];

		let prixCell = trElt.querySelector('td.text-right');
		prixCell.textContent = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(contenuPanier[i][2] / 100);

		totalPanier += contenuPanier[i][2];

		document.querySelector('tbody').appendChild(trElt);
	}
	document.querySelector('tfoot th.text-right').textContent = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPanier / 100);
}

// Fonction d'affichage de la page de copnfirmation de commande à partir de la page panier :
//   1) On vide le localStorage qui n'a plus de raison d'être
//   2) On enlève le formulaire
//   3) On affiche un message de remerciements
function validation(data) {

	resetProduits();
	countProduits();

	// Remplacement du formulaire par le message de validation
	//  avec modification du titre H1 et du premier H2 de la page
	mainElt.removeChild(formElt);
	mainElt.appendChild(sectionElt);
	orderElt.textContent = data.orderId;
	document.querySelector('h1').textContent = "Commande validée";
	document.querySelector('h2').textContent = "Rappel de votre commande";

	// Retour à la page d'accueil
	let btnEndElt = document.querySelector('button[name="buttonEnd"]');
	btnEndElt.addEventListener('click', function() {
		location.assign('index.html');
	});
}
