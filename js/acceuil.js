// Récupération de la liste des produits à afficher
const pageAccueil = () => {request("http://localhost:3000/api/teddies")
	.then(produits => generateAccueil(produits))
	.catch(error => xhrErr(error));
}

countProduits();
pageAccueil();

//   Creation des vignettes pour chaque produit
function generateAccueil(produits) {

	let articleElt = document.querySelector('article');
	let i = 0;

	for (produit of produits) {
		// On ne génère pas une nouvelle vignette pour le premier produit
		if (i > 0) {
			articleElt = articleElt.cloneNode(true);
		}

		// Création du contenu de la vignette
		let aElt = articleElt.querySelector('a');
		let ImageElt = articleElt.querySelector('img');
		let figcaptionElt = articleElt.querySelector('figcaption');

		aElt.dataset.id = produit._id;
		aElt.addEventListener('click', function() {
			// Utilisation du localStorage pour passer le produit en paramètre
			localStorage.produit = this.dataset.id;
			location.assign('produit.html');
		});

		ImageElt.src = produit.imageUrl;
		ImageElt.alt = produit.name;
		ImageElt.title = produit.name;
		figcaptionElt.textContent = produit.name + " - " + Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(produit.price / 100);

		if (i > 0) {
			mainElt.appendChild(articleElt);
		}
		i++;
	}
}
