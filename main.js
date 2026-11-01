const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-second-kick');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
};

// Оптимізована функція бою, щоб не дублювати код
function makeKick(damageMin, damageMax) {
    changeHP(random(damageMin), character);
    changeHP(random(damageMax), enemy);
}

// Обробник першої кнопки
$btn.addEventListener('click', function () {
    console.log('Kick 1');
    makeKick(20, 20);
});

// Обробник другої кнопки (додаткова вимога завдання)
if ($btn2) {
    $btn2.addEventListener('click', function () {
        console.log('Kick 2 (Super Attack)');
        makeKick(35, 35);
    });
}

function init() {
    console.log('Start Game!');
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
    
    // Зміна кольору смужки здоров'я залежно від залишку HP
    const percent = (person.damageHP / person.defaultHP) * 100;
    if (percent < 60 && percent > 20) {
        person.elProgressbar.style.backgroundColor = 'orange';
    } else if (percent <= 20) {
        person.elProgressbar.style.backgroundColor = 'red';
    }
}

function changeHP(count, person) {
    person.damageHP -= count;
    
    if (person.damageHP <= 0) {
        person.damageHP = 0;
        alert(person.name + ' проиграл бой!');
        $btn.disabled = true;
        if ($btn2) $btn2.disabled = true;
    }

    renderHP(person);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

init();