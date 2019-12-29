let navi, weekName, target, targetList, exercises, time, goal, btn, timeVal, idI, activeNum, targetNr, congrats, blured;
activeNum = 0; //numer cwiczenia
domMaker(); // funkcja wiążąca dom z resztą
const weeks = {
    finalTargets: [13, 20, 28, 40, 50, 60],
    targets: [
        [11, 12, 9, 8],
        [16, 17, 14, 14],
        [22, 30, 20, 20],
        [29, 33, 29, 29],
        [20, 20, 24, 24, 20, 20, 22],
        [26, 26, 33, 33, 26, 26, 22, 22]
    ]
}

function domMaker() {
    navi = [...document.querySelectorAll('li')]; // nawigacja
    weekName = document.querySelector('#week-nr'); //nagłówek z tygodniem
    target = document.querySelector('#target'); // cel tygodnia
    targetNr = document.querySelector('.am-nr'); //ile pompek w rundzie
    targetList = document.querySelector('#target-list'); // lista celów
    exercises = [...document.querySelectorAll('.round')]; // cwiczenia
    time = document.querySelector('.sec') // zegar    
    goal = document.querySelector('.amount');
    btn = document.querySelector('.start'); // guzik startu
    blured = document.querySelector('.blured'); // div zasłaniając resztę
    congrats = document.querySelector('.congrats'); // okienko z gratulacjami
    // koniec elenty dom
    // zmienne potzebne do pracy funkcji
    timeVal = 4500; //czas jaki ma odliczac stoper w ms
    idI; // musze przypisać do tej zmiennej interwał bo inaczej go nie zatrzymam
};

// funkcje
const mainFunc = () => { //funkcja zarządzająca - ona odpala interwał

    if (activeNum < exercises.length - 1) {
        idI = setInterval(start, 10); //włącza interwał       
        targetNr.textContent = exercises[activeNum + 1].textContent;

    } else if (activeNum == exercises.length) {
        return
    }
    if (activeNum < exercises.length) { // ile na zielono
        setActive();
        activeNum++;
        if (activeNum == exercises.length) {
            // goal.innerHTML = 'Gratulacje! Dzisiejszy trening został wykonany!'
            blured.classList.add('active');
            congrats.classList.add('active');
        }
    } else {
        activeNum = 0;
    }
}
const clearing = () => { // funkcja czyszcząca interwał
    clearInterval(idI); //zatrzymuje interwał
    time.textContent = "00.00"
    timeVal = 4500;
    btn.disabled = false; //włączam guzik
}
const start = () => { //funkcja samego stopera
    timeVal--;
    time.textContent = (timeVal / 100).toFixed(2);
    btn.disabled = true; //wyłaczam guzik
    if (timeVal == 0) {
        clearing();
    }
}
const setActive = () => { //robi cwiczenia na zielono
    domMaker();
    exercises[activeNum].classList.add('active');

}

for (i = 0; i < navi.length; i++) { // zmienia nazwe tygodnia, opis, liste cwiczen
    navi[i].addEventListener('click', function () {
        activeNum = 0;
        clearing();
        targetNr.textContent = exercises[0].textContent;
        weekName.textContent = this.textContent;
        target.innerHTML = `<strong>Cel: </strong>Możesz zrobić co najmniej ${weeks["finalTargets"][this.dataset.nr]} pompek po zakończeniu 4
        serii, w których zrobiłeś kolejno ${weeks["targets"][this.dataset.nr].join(", ")} pompek. Przerwy między seriami trwają 45 sekund.`;
        let targetsToPush = []
        weeks["targets"][this.dataset.nr].forEach(e => {
            targetsToPush.push(`<span class="round">${e}</span>`)
        });
        targetsToPush.push(`<span class="round">${weeks['finalTargets'][this.dataset.nr]}</span>`);
        targetList.innerHTML = targetsToPush.join("");
        goal.innerHTML = `Wykonaj <span class="am-nr"></span> pompek <span>.</span>
        <span>.</span>
        <span>.</span>`;
        document.querySelector('.menu-mobile-content').classList.remove('active-menu');
        clearing();
        domMaker();
        targetNr.textContent = exercises[0].textContent;

    })
}
// koniec funkcje

btn.addEventListener('click', mainFunc);
// menu
document.querySelector('.menu-mobile').addEventListener('click', () => {
    document.querySelector('.menu-mobile-content').classList.add('active-menu');
})

document.querySelector('.close-congrats').addEventListener('click', () => {
    blured.classList.remove('active');
    congrats.classList.remove('active');
})