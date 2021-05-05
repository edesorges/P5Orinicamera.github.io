// --------------- recuperation de la chaine de requete contenant l id dans l url ---------------

const queryString_url_id = window.location.search;
//console.log(queryString_url_id);

//selection du bouton ajout au panier
const btnAchat = document.querySelector("#achat");

//selection des options pour les recuperer
let optionLentille = document.querySelector(".optionL");
let optionQuantite = document.querySelector(".optionQuantite");
const choixClientLentille = optionLentille.value;
const choixClientQuantite = optionQuantite.value;

//pour extraire l ID sans le point ?
const idProduit = queryString_url_id.slice(1);
//console.log(idProduit);

const nouvUrl = `http://localhost:3000/api/cameras/${idProduit} `;
//const nouvUrl = ` https://oc-p5-api.herokuapp.com/api/cameras/${idProduit} `;
//console.log(nouvUrl);

fetch(nouvUrl)
  .then((response) => response.json())
  .then((produits) => {
    let focales = produits.lenses;
    ajoutArticle(produits);
    ajoutOption(focales);
    envoiPanier(produits);
    //console.log(produits);
  })
  .catch((erreur) => console.log("erreur :" + erreur));

// --------------- recuperer et afficher l article par son id ---------------
function ajoutArticle(produits) {
  let carteArticle = document.querySelector(".carteArticle");
  let imageArticle = document.querySelector(".carteImage");
  let nomArticle = document.querySelector(".articleNom");
  let descriptionArticle = document.querySelector(".articleTexte");
  let prixArticle = document.querySelector(".articlePrix");

  carteArticle.id = produits._id;
  imageArticle.src = produits.imageUrl;
  imageArticle.alt = "photo de la camera";
  nomArticle.textContent = produits.name;
  descriptionArticle.textContent = produits.description;
  prixArticle.textContent = "Prix : " + produits.price / 100 + " euros";
}

// --------------- recuperer et afficher les options de l article ---------------

function ajoutOption(focales) {
  for (var i = 0; i < focales.length; i++) {
    let optionLentille = document.querySelector(".optionL");
    let option = document.createElement("option");
    option.textContent = focales[i];
    optionLentille.appendChild(option);
  }
}

//--------------- fonction ecouter le bouton et envoyer la commande ---------------

function envoiPanier(produits) {
  btnAchat.addEventListener("click", (event) => {
    event.preventDefault();
    let achatClient = {
      refProduit: produits._id,
      nomProduit: produits.name,
      optProduit: optionLentille.value,
      quantProduit: optionQuantite.value,
      prixProduit: produits.price / 100,
      prixTotal: (produits.price / 100) * optionQuantite.value,
    };
    //console.log("achat client", achatClient);

    //factorisation du code  (verifier si il y a deja des produits dans le local storage)
    const ajoutProduitLocalSt = () => {
      produitLocalSt.push(achatClient);
      localStorage.setItem("produit", JSON.stringify(produitLocalSt));
    };

    // -----------------local storage -----------------

    // convertir les données au format javascript : parse
    let produitLocalSt = JSON.parse(localStorage.getItem("produit"));

    // verifier si il y a deja des produits dans le local storage
    if (produitLocalSt) {
      ajoutProduitLocalSt();
    } else {
      produitLocalSt = [];
      ajoutProduitLocalSt();
    }
  });
}
