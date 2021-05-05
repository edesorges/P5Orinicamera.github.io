//---------- recuperation des données du localstorage pour l afficher dans la page ----------

//recuperation de id confirmation commande
let idConf = JSON.parse(localStorage.getItem("orderId"));

//recuperation du prix total de la commande
let prixCom = JSON.parse(localStorage.getItem("prixTotalFacture"));

// recuperation du contact
let contactCom = JSON.parse(localStorage.getItem("contact"));

//afichage de la confirmation commande
let confCom = document.querySelector("#confirm");
let container = document.createElement("div");
let titreCom = document.createElement("h1");
let divCom = document.createElement("div");
let idCom = document.createElement("p");
let prix = document.createElement("p");
let h2Com = document.createElement("h2");

container.classList.add("jumbotron", "jumbotron-fluid","m-4");
container.style="height: 80vh";
titreCom.textContent =
  "merci pour votre commande " +
  contactCom.lastName +
  " " +
  contactCom.firstName;
titreCom.classList.add("text-center");
h2Com.textContent = "Orinico vous remercie de votre confiance ";
h2Com.classList.add("text-center");
idCom.textContent = "Reference de votre commande : " + idConf;
idCom.classList.add("text-center");
prix.textContent = "Prix total de votre Commande : " + prixCom + " €";
prix.classList.add("text-center");

confCom.appendChild(container);
container.appendChild(titreCom);
container.appendChild(divCom);
divCom.appendChild(idCom);
divCom.appendChild(prix);
divCom.appendChild(h2Com);
