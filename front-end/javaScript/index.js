//const url = "https://oc-p5-api.herokuapp.com/api/cameras";

//--------------------------recuperation de l url API --------------------------

const url = "http://localhost:3000/api/cameras";

fetch(url)
  .then((response) => response.json())

  .then((produits) => {
    ajoutCartes(produits);
    //console.log(typeof produits);
    //console.log(produits);
  })
  .catch((erreur) => {
    //console.log("erreur :" + erreur);
    const acceuil = document.querySelector("#article");
    const nonConnecte = `
    <div style="border: solid 2px #975FE4 ; width: 50%; margin: 30px 0;">
            <img src="/images/vcam_2.jpg" alt="camera" style="width: 100%; margin-left: auto; margin-right: auto;">
            <p style="text-align: center; font-size: 1em; color: #5f1111 ;">serveur non fonctionnel</p>
            <a href="/front-end/html/index.html" style="display: block; text-align: center; margin: 10px; border: solid 2px #5f1111; background-color:  #f3e9f0; color: black;">Essayer a nouveau</a>

           </div>  
    
    `;
    acceuil.innerHTML = nonConnecte;
  });

  //--------------------------fonction pour ajouter les produits--------------------------
  function ajoutCartes(produits) {
    let artCameras = document.querySelector("#article-produits");

    // boucle forEach pour parcourir le tableau recuperé

    produits.forEach((item) => {
      let carte = document.createElement("article");
      let image = document.createElement("img");
      let divCarte = document.createElement("div");
      let nomCarte = document.createElement("h2");
      let lienCarte = document.createElement("a");

      carte.classList.add("card",  "mx-auto", "m-2");
      carte.style="width: 18rem";

      carte.id = item._id;
      image.classList.add("card-img");
      image.alt = "photo du produit";
      image.src = item.imageUrl;
      divCarte.classList.add("card-body");
      nomCarte.classList.add("card-title", "text-center");
      nomCarte.textContent = item.name;
      lienCarte.classList.add("btn", "stretched-link");
      lienCarte.id = "link";

      //recuperation de  l id du produit

      lienCarte.href = `/front-end/html/produit.html?${item._id}`;
      lienCarte.textContent = " Detail de " + item.name;
      console.log(item._id);
      artCameras.appendChild(carte);
      carte.appendChild(image);
      carte.appendChild(divCarte);
      divCarte.appendChild(nomCarte);
      carte.appendChild(lienCarte);
      
    });
  }