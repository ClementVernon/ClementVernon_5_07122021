// Récupération des produits du LocalStorage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
// Récupération du/des éléments produit
const positionEmptyCart = document.querySelector("#cart__items");
// Gestion des erreurs dans le formulaire 
var invalid = false;

// Gestion du/des produits
// Vérifie s'il y a des produits à afficher
function getCart(){
if (produitLocalStorage === null || produitLocalStorage == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
} else {
for (let produit in produitLocalStorage){
    // Insertion de l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);

    // Insertion de l'élément "div"
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Insertion de l'image
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = produitLocalStorage[produit].imgProduit;
    productImg.alt = produitLocalStorage[produit].altImgProduit;
    
    // Insertion de l'élément "div"
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";
    
    // Insertion du titre h2
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = produitLocalStorage[produit].nomProduit;

    // Insertion de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
    productColor.style.fontSize = "20px";

    // Insertion du prix
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    
    // Insertion de "Qté : "
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

    // Insertion de la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = produitLocalStorage[produit].quantiteProduit;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Insertion de "p" supprimer
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
}
}}
getCart();

// Gestion du total
function getTotals(){

    // Récupération du total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Récupération du prix total
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();


// Gestion de la modification de quantité
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            // Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            // Correction 1 : dans le cas ou une valeur inférieur à 1 ou supérieur à 100 est renseigné
            if(qttModifValue > 0 && qttModifValue <= 100){
                const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);

                resultFind.quantiteProduit = qttModifValue;
                produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            
                //refresh
                location.reload();
            } else {
                window.alert("Veuillez selectionner une valeur comprise entre 1 et 100");
            }
        })
    }
}
modifyQtt();

// Gestion de la suppréssion d'un produit
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++){
        btn_supprimer[j].addEventListener("click" , (event) => {
            event.preventDefault();

            // Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = produitLocalStorage[j].idProduit;
            let colorDelete = produitLocalStorage[j].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            // Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

// Gestion du formulaire
function getForm() {
    
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    // Création des expressions régulières
    let charRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç -]{2,20}$");
    let emailRegExp = new RegExp('^[a-zA-Z.,-_]+[@]{1}[a-zA-Z-_]+[.]{1}[a-z]{2,10}$');

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification de l'adresse
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification de la ville
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification de l'adresse mail
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    // Validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre Prénom.';
            invalid = true;
        }
    };

    // Validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre Nom.';
            invalid = true;
        }
    };

    // Validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (charRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner votre Adresse';
            invalid = true;
        }
    };

    // Validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner votre Ville.';
            invalid = true;
        }
    };

    // Validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre adresse mail.';
            invalid = true;
        }
    };
    }
getForm();

// Gestion de la commande
function postForm(){
    const btn_commander = document.getElementById("order");

    // Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{

        if (invalid == false){
        // Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        // Test : condition que tous les champs sont renseignés
        // Récupération des valeurs du formulaire client
        let inputNameValue = inputName.value;
        let inputLastNameValue = inputLastName.value;
        let inputAdressValue = inputAdress.value;
        let inputCityValue = inputCity.value;
        let inputMailValue = inputMail.value;
        // Correction 2 : dans le cas ou l'on envoi d'un formulaire de contact vide
        if (inputNameValue == 0 || inputLastNameValue == 0 || inputAdressValue == 0 || inputCityValue == 0 || inputMailValue == 0){
            window.alert("Veuillez renseigner vos coordonées");
        } else {
            // Correction 3 : problème de redirection
            event.preventDefault();
            // Construction d'un array depuis le local storage
            let idProducts = [];
            for (let i = 0; i<produitLocalStorage.length;i++) {
                idProducts.push(produitLocalStorage[i].idProduit);
            }
            console.log(idProducts);
            
            // Construction des données attendu par l'API
            const order = {
                contact : {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: idProducts,
            } 

            const options = {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json', 
                    "Content-Type": "application/json" 
                },
            };

            // Requete au serveur 
            fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);
                location.href = "confirmation.html";
            })
            .catch((err) => {
                alert ("Problème avec fetch : " + err.message);
            });
        }} else {
            window.alert("Coordonnées invalides. Veuillez renseigner des coordonées valides");
            // Réinitialisation pour la gestion des erreurs dans le formulaire 
            invalid = false;
        }
    })
}
postForm();