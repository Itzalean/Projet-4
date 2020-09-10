
const pageAccueil = () => {request("http://localhost:4000/api/teddies")
	.then(produits => generateAccueil(produits))
	.catch(error => xhrErr(error));
}

// const pageDetail = (id) => {request("http://localhost:4000/api/teddies" + "/" + id)
// 	.then(data => generateProduct(data))
// 	.catch(error => xhrErr(error))
// }

// const pagePanier = () => {
// 	generateTable();
// 	generateForm();
// }

// document.getElementById('panierLnk').addEventListener('click', function(e) {
// 	e.preventDefault();
// 	e.stopPropagation();
// 	pagePanier();
// });

countProduits();
pageAccueil();
