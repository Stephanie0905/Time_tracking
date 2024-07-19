document.addEventListener("DOMContentLoaded", () => {
const buttons = document.querySelectorAll('.btn__menu');


const contents = document.querySelector('.content');


// Charger les données une seule fois
let jsonData = [];
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        console.log('JSON Data:', jsonData);

        // Simuler un clic sur le bouton "Weekly" au chargement
        const weeklyButton = document.querySelector('[data-period="weekly"]');
        weeklyButton.click();
    })
    .catch(error => console.error('Error loading the file', error));

// Fonction pour afficher les données selon la période
function displayData(period) {
    contents.innerHTML = ''; // Vider le contenu actuel

    jsonData.forEach((element) => {
        let newDiv = document.createElement("div");
        newDiv.className = "cards__item";

        // Construire le contenu pour la période sélectionnée
        newDiv.innerHTML = `
           <div class="card__img">
              
              <div class="card__content">
                <div class="card__content-header">
                  <h4>${element.title}</h4>
                  <a href="#"><img src="./images/icon-ellipsis.svg" alt=""></a>
                </div>
                <div class="card__content-text">
                  <span>${element.timeframes[period].current}hrs</span>
                  <p>Previous - ${element.timeframes[period].previous}hrs</p>
                </div>
              </div>
            </div>`;
            contents.appendChild(newDiv);
            console.log('New Div:', newDiv);
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Récupérer la période sélectionnée
        const period = button.getAttribute('data-period');
        console.log(period);

        // Mettre à jour l'affichage des boutons
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Afficher les données pour la période sélectionnée
        displayData(period);
    });
});

});