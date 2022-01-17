// Appel de la fonction "fillSection"
fillSection();

// Récupération des articles de l'API
/**
 * définition de la fonction asynchrone "getArticles()"
 * déclaration de la variable "articlesCatch" qui correspondra au résultat venant de l'API via la requête GET
 * @returns une Promise au format JSON
 */
async function getArticles() {
    var articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

// Répartition des données de l'API dans le DOM
/**
 * définition de la fonction asynchrone "fillSection"
 * déclaration de la variable "result" qui attendra le résultat de la fonction "getArticles()"
 * appel de la fonction then() pour récuper les résultat de la requête dans la fonction locale "resultatAPI"
 * déclaration de la constante "articles" correpondant aux valeurs JSON de "resultatAPI"
 * affiche dans la console sous forme de tableau "resultatAPI"
 * initilisation de la boucle parcourant la constante "article"
 */
async function fillSection() {
    var result = await getArticles()
    .then(function (resultatAPI){
        const articles = resultatAPI;
        console.table(articles);
        for (let article in articles) {

            // Insertion de l'élément "a"
            /**
             * création de la variable "productLink" correspondant à "<a href=""><a/>"
             * dans le DOM, selection l'élement html d'id ".items" et ajout un noeud à la fin (plus performant que innerHTML +=)
             * selectionne l'élement du DOM "<a>"."href" pour lui ajouter l'id du produit
             */
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;

            // Insertion de l'élément "article"
            /**
             * création de la variable "productArticle" corrrespondant à "<article></article>"
             * intègre "productArticle" dans le noeud parent "productLink"
             */
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image "img"
            /**
             * création de la variable "productImg" corrrespondant à "<img></img>"
             * intègre "productImg" dans le noeud parent "productArticle"
             * selectionne l'élement du DOM "<img>"."scr" pour lui ajouter l'url de l'image du produit
             * selectionne l'élement du DOM "<img>"."alt" pour lui ajouter le texte descriptif alt text
             */
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.alt = resultatAPI[article].altTxt;

            // Insertion du titre 3 "h3"
            /**
             * création de la variable "productName" corrrespondant à "<h3></h3>"
             * intègre "productName" dans le noeud parent "productArticle"
             * ajoute la classe "productName" à "productName"
             * ajoute le nom du produit à l'intérieur de la balise "<h3></h3>"
             */
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[article].name;

            // Insertion de la description alt text "p"
            /**
             * création de la variable "productDescription" corrrespondant à "<p></p>"
             * intègre "productName" dans le noeud parent "productArticle"
             * ajoute la classe "productName" à "productName"
             * ajoute le nom du produit à l'intérieur de la balise "<p></p>"
             */
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultatAPI[article].description;
        }
    })
    // Fonction d'érreur
    .catch (function(error){
        return error;
    });
}