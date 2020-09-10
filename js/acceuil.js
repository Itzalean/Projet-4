function generateAccueil(produits) {
	window.scroll(top);

	let articleElt = document.querySelector('article');
	let i = 0;

	for (produit of produits) {
		if (i > 0) {
			articleElt = articleElt.cloneNode(true);
		}
		i++;

		console.log(produit.name);

		let aElt = articleElt.querySelector('a');
		let figureElt = articleElt.querySelector('figure');
		let ImageElt = articleElt.querySelector('img');
		let figcaptionElt = articleElt.querySelector('figcaption');

		aElt.dataset.id = produit._id;
		// aElt.addEventListener('click', function() {
		// 	pageDetail(this.dataset.id);
		// });
		aElt.addEventListener('click', function() {
			location.assign('produit.html?' + this.dataset.id);
		});

		ImageElt.src = produit.imageUrl;
		ImageElt.alt = produit.name;
		ImageElt.title = produit.name;
		figcaptionElt.textContent = produit.name + " - " + Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(produit.price / 100);

//		figureElt.appendChild(ImageElt);
//		figureElt.appendChild(figcaptionCardElt);
//		aElt.appendChild(figureElt);
//		cardElt.appendChild(aElt);
//		deckElt.appendChild(cardElt);
		if (i > 0) {
			mainElt.appendChild(articleElt);
		}
//		document.getElementById('main').appendChild(deckElt);
	}
}
