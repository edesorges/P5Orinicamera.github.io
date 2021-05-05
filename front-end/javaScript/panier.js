let produitTotal;
let prixTotalPanier = [];

// variable sur page produit js ,convertir les données au format javascript : parse
let produitLocalSt = JSON.parse(localStorage.getItem("produit"));
//console.log(produitLocalSt);

// pour afficher dans la page
function ajtProduit(produitLocalSt) {
  const pagePanier = document.querySelector("#pagePanier");
  let panierCont = document.querySelector("#contenuPanier");

  produitLocalSt.forEach((item) => {
    let panierLigne = document.createElement("tr");

    let produitNom = document.createElement("td");
    let produitOption = document.createElement("td");
    let produitPrix = document.createElement("td");
    let produitQuantite = document.createElement("td");
    let produitBouton = document.createElement("button");
    let produitTotal = document.createElement("td");

    panierLigne.id = item.refProduit;

    produitNom.textContent = item.nomProduit;
    produitOption.textContent = item.optProduit;
    produitPrix.textContent = item.prixProduit;
    produitQuantite.textContent = item.quantProduit;
    produitQuantite.classList.add("text-center");
    produitBouton.textContent = "-";
    produitBouton.id = "produitSup";
    produitBouton.classList.add("btn", "btn-sm", "ml-4", "mt-1");
    produitBouton.style = "border: 1px solid #c47868;";
    produitTotal.textContent = item.prixProduit * item.quantProduit; // calculer le prix  par la quantité
    produitTotal.classList.add("text-center");

    panierCont.appendChild(panierLigne);
    panierLigne.appendChild(produitNom);
    panierLigne.appendChild(produitOption);
    panierLigne.appendChild(produitPrix);
    panierLigne.appendChild(produitQuantite);
    panierLigne.appendChild(produitBouton);
    panierLigne.appendChild(produitTotal);
  });
}
//-------------creation du formulaire ------------

// gestion du panier (si panier vide ou panier plein)

if (produitLocalSt == null || produitLocalSt.length === 0) {
  const panierVide = `
    <a href="/front-end/html/index.html">
    <div class="container-pV mx-auto">
     <p class="text-PV text-center font-weight-bold "> votre panier est vide </p>
     <img class="logoPv" src="/images/15675819263013_image1.png" alt=" logo">
     </div>
     </a>
    `;
  pagePanier.innerHTML = panierVide;
} else {
  ajtProduit(produitLocalSt);

  //---------------supprimer un article -----------
  let boutonSupArticle = document.querySelectorAll("#produitSup");

  for (let j = 0; j < boutonSupArticle.length; j++) {
    boutonSupArticle[j].addEventListener("click", (event) => {
      event.preventDefault();
      let id = produitLocalSt[j].refProduit;

      produitLocalSt.splice(id, 1);
      localStorage.setItem("produit", JSON.stringify(produitLocalSt));
      JSON.parse(localStorage.getItem("produit"));
      window.location.href = "/front-end/html/panier.html";
    });
  }

  //--------------- vider le panier ---------------

  const ViderPanier = document.querySelector("#vidPanier");

  ViderPanier.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("produit");
    localStorage.removeItem("product");
    localStorage.removeItem("prixTotalFacture");
    window.location.href = "/front-end/html/panier.html";
  });

  //--------------- calculer la somme total du panier ---------------
  let prixTotalCommande = [];
  for (let k = 0; k < produitLocalSt.length; k++) {
    prixTotalCommande.push(produitLocalSt[k].prixTotal);
  }

  // addition des prix avec reduce() pour les tableaux

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const prixTotalFacture = prixTotalCommande.reduce(reducer, 0);

  // affricher le prix total de la commande dans la page
  let totalCommande = document.querySelector("#totalC");
  totalCommande.textContent = prixTotalFacture;
  localStorage.setItem("prixTotalFacture", JSON.stringify(prixTotalFacture));

  let products = [];
  produitLocalSt.forEach((item) => {
    products.push(item.refProduit);
  });

  //--------------------Formulaire -----------------
  //selection bouton achat final

  const btnCommande = document.querySelector("#achatFinal");

  btnCommande.addEventListener("click", function (event) {
    event.preventDefault();

    class Formulaire {
      constructor(nom, prenom, adresse, ville, code, email) {
        this.nom = document.querySelector("#nom").value;
        this.prenom = document.querySelector("#prenom").value;
        this.adresse = document.querySelector("#adresse").value;
        this.ville = document.querySelector("#ville").value;
        this.code = document.querySelector("#code").value;
        this.email = document.querySelector("#email").value;
      }
    }
    // appel de l instance de classe Formulaire pour creer l objet formulaireValeur
    const formulaireValeur = new Formulaire();
    // mettre le formulaire dans le local storage
    localStorage.setItem("formulaireValeur", JSON.stringify(formulaireValeur));

    //verification des champs du formulaires (regEx) expression reguliere

    const regExNomPrenomVille = /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/;
    const regExAdresse = /^[A-Z-a-z-0-9\s]{5,80}$/;
    const regExCodePostal = /^[0-9]{5}$/;
    const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    function verifInput(input, regex) {
      const valeurRegex = regex.test(input.value);
      if (valeurRegex === true) {
        input.style.borderColor = "green";
        return true;
      } else {
        input.style.borderColor = "red";
        return false;
      }
    }

    const idNom = verifInput(
      document.querySelector("#nom"),
      regExNomPrenomVille
    );
    const idPrenom = verifInput(
      document.querySelector("#prenom"),
      regExNomPrenomVille
    );
    const idVille = verifInput(
      document.querySelector("#ville"),
      regExNomPrenomVille
    );
    const idCodePostal = verifInput(
      document.querySelector("#code"),
      regExCodePostal
    );
    const idAdresse = verifInput(
      document.querySelector("#adresse"),
      regExAdresse
    );
    const idEmail = verifInput(document.querySelector("#email"), regExEmail);

    if (
      idNom == true &&
      idPrenom == true &&
      idAdresse == true &&
      idVille == true &&
      idCodePostal == true &&
      idEmail == true
    ) {
      // recuperation du formulaire
      const formClient = JSON.parse(localStorage.getItem("formulaireValeur"));
      //creation de l objet contact
      let contact = {
        firstName: formClient.nom,
        lastName: formClient.prenom,
        address: formClient.adresse,
        city: formClient.ville + formulaireValeur.code,
        email: formClient.email,
      };
      const objet = {
        contact,
        products,
      };
      //"http://localhost:3000/api/cameras/order",
      //------------------ envoi des données au serveur-----------------------
      fetch("http://localhost:3000/api/cameras/order ", {
        method: "POST",
        body: JSON.stringify(objet),
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((r) => {
          localStorage.setItem("contact", JSON.stringify(r.contact));
          localStorage.setItem("orderId", JSON.stringify(r.orderId));

          //Redirection vers Accueil potentiel index.html + temps de chargement
          window.location.href = "/front-end/html/confirmation.html";
          // Efface localStorage
          //localStorage.clear()
        })
        .catch((err) => console.log(err));
    } else {
      alert("Merci de bien remplir le formulaire");
      console.log("ko");
    }
  });
}
