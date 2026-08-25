// ============================================================
// DOMINICAN CITY - PLAYER V3
// Sistema del personaje principal
// ============================================================

export const player = {
    name: "José",

    // Posición en el mundo
    x: 850,
    y: 720,

    // Movimiento
    speed: 3.2,
    direction: "down",

    // Estado
    health: 100,
    energy: 100,
    hunger: 100,

    // Economía
    money: 25,

    // Trabajo
    job: "Desempleado",

    // Animación
    walking: false,
    dancing: false,
    sleeping: false,

    // Personalización
    clothing: {
        shirt: "roja",
        pants: "azul",
        shoes: "negros"
    },

    // Familia
    familyRelationship: 75,

    // Progreso
    education: 0,
    reputation: 0
};


// ============================================================
// MOVIMIENTO
// ============================================================

export function movePlayer(keys, delta = 1) {

    if (player.sleeping) {
        return;
    }

    let dx = 0;
    let dy = 0;

    if (keys["w"] || keys["arrowup"]) {
        dy -= 1;
        player.direction = "up";
    }

    if (keys["s"] || keys["arrowdown"]) {
        dy += 1;
        player.direction = "down";
    }

    if (keys["a"] || keys["arrowleft"]) {
        dx -= 1;
        player.direction = "left";
    }

    if (keys["d"] || keys["arrowright"]) {
        dx += 1;
        player.direction = "right";
    }

    player.walking = dx !== 0 || dy !== 0;

    if (!player.walking) {
        return;
    }

    const length = Math.sqrt(
        dx * dx + dy * dy
    );

    dx /= length;
    dy /= length;

    player.x += dx * player.speed * delta;
    player.y += dy * player.speed * delta;

    // Gastos de energía y hambre
    player.energy -= 0.01 * delta;
    player.hunger -= 0.005 * delta;
}


// ============================================================
// LIMITES DEL MUNDO
// ============================================================

export function limitPlayer(worldWidth, worldHeight) {

    player.x = Math.max(
        30,
        Math.min(
            worldWidth - 30,
            player.x
        )
    );

    player.y = Math.max(
        30,
        Math.min(
            worldHeight - 30,
            player.y
        )
    );
}


// ============================================================
// DINERO
// ============================================================

export function addMoney(amount) {

    player.money += amount;

    if (player.money < 0) {
        player.money = 0;
    }
}


export function spendMoney(amount) {

    if (player.money < amount) {
        return false;
    }

    player.money -= amount;

    return true;
}


// ============================================================
// ENERGÍA
// ============================================================

export function restoreEnergy(amount) {

    player.energy = Math.min(
        100,
        player.energy + amount
    );
}


// ============================================================
// HAMBRE
// ============================================================

export function eat(amount) {

    player.hunger = Math.min(
        100,
        player.hunger + amount
    );
}


// ============================================================
// SALUD
// ============================================================

export function heal(amount) {

    player.health = Math.min(
        100,
        player.health + amount
    );
}


// ============================================================
// EXPERIENCIA / EDUCACIÓN
// ============================================================

export function study(amount = 1) {

    player.education = Math.min(
        100,
        player.education + amount
    );
}


// ============================================================
// REPUTACIÓN
// ============================================================

export function changeReputation(amount) {

    player.reputation += amount;

    player.reputation = Math.max(
        0,
        Math.min(
            100,
            player.reputation
        )
    );
}


// ============================================================
// BAILE
// ============================================================

export function toggleDance() {

    player.dancing = !player.dancing;

    if (player.dancing) {
        player.energy -= 3;
    }

    return player.dancing;
}


// ============================================================
// DESCANSAR
// ============================================================

export function startSleeping() {

    player.sleeping = true;
    player.walking = false;
}


export function stopSleeping() {

    player.sleeping = false;
    player.energy = 100;
}


// ============================================================
// ROPA
// ============================================================

export function changeClothing(
    shirt,
    pants,
    shoes
) {

    if (shirt) {
        player.clothing.shirt = shirt;
    }

    if (pants) {
        player.clothing.pants = pants;
    }

    if (shoes) {
        player.clothing.shoes = shoes;
    }
}


// ============================================================
// ESTADO DEL PERSONAJE
// ============================================================

export function getPlayerStatus() {

    return {

        name: player.name,

        money: player.money,

        health: player.health,

        energy: player.energy,

        hunger: player.hunger,

        job: player.job,

        education: player.education,

        reputation: player.reputation,

        familyRelationship:
            player.familyRelationship,

        clothing: {
            ...player.clothing
        }
    };
}

