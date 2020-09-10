const pageDetail = (id) => {request("http://localhost:4000/api/teddies" + "/" + id)
	.then(data => displayProduct(data))
	.catch(error => xhrErr(error))
}

let paramId = location.search.split('?');
console.log(paramId[1]);
countProduits();
pageDetail(paramId[1]);

function displayProduct(produit){
	console.log(produit);

	let h1Elt = document.querySelector('h1');
	h1Elt.textContent = produit.name;

	let imgElt = document.querySelector('img');
	imgElt.src = produit.imageUrl;
	imgElt.title = imgElt.alt = produit.name;

	let pElt = document.querySelectorAll('p');
	let descriptionElt = pElt[0];
	descriptionElt.textContent += produit.description;

	let prixElt = pElt[1];
	let valPrixElt = document.createTextNode(Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(produit.price / 100));
	prixElt.appendChild(valPrixElt);

	let selectElt = document.querySelector('select');
		for (color of produit.colors) {
		let optionElt = document.createElement('option');
		optionElt.text = color;
		selectElt.options.add(optionElt);
	}

	let btnValidElt = document.querySelector('button[name="buttonValid"]');
	btnValidElt.addEventListener('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		addProduit(produit._id, produit.name, produit.price);
		location.assign('index.html');
	});

	let btnCancelElt = document.querySelector('button[name="buttonCancel"]');
	btnCancelElt.addEventListener('click', function() {
		location.assign('index.html');
	});
}
