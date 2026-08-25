// ============================================================
// DOMINICAN CITY - PLAYER V5
// Personaje principal
// ============================================================

export const player = {

    // --------------------------------------------------------
    // IDENTIDAD
    // --------------------------------------------------------

    name: "José",

    age: 20,


    // --------------------------------------------------------
    // POSICIÓN
    // --------------------------------------------------------

    x: 850,
    y: 720,


    // --------------------------------------------------------
    // MOVIMIENTO
    // --------------------------------------------------------

    speed: 3.2,

    direction: "down",

    walking: false,

    running: false,


    // --------------------------------------------------------
    // ESTADOS
    // --------------------------------------------------------

    health: 100,

    energy: 100,

    hunger: 100,

    dancing: false,

    sleeping: false,

    working: false,


    // --------------------------------------------------------
    // BAILE
    // --------------------------------------------------------

    danceStyle: "bachata",

    danceTime: 0,

    danceStep: 0,


    // --------------------------------------------------------
    // ECONOMÍA
    // --------------------------------------------------------

    money: 25,


    // --------------------------------------------------------
    // TRABAJO
    // --------------------------------------------------------

    job: "Desempleado",

    jobId: null,

    workTime: 0,

    workProgress: 0,


    // --------------------------------------------------------
    // PERSONALIZACIÓN
    // --------------------------------------------------------

    clothing: {

        shirt: "roja",

        pants: "azul",

        shoes: "negros",

        hat: "ninguno"

    },


    // --------------------------------------------------------
    // FAMILIA
    // --------------------------------------------------------

    familyRelationship: 75,


    // --------------------------------------------------------
    // PROGRESO
    // --------------------------------------------------------

    education: 0,

    reputation: 0,

    experience: 0

};


// ============================================================
// MOVIMIENTO
// ============================================================

export function movePlayer(
    keys,
    delta = 1
) {

    // No caminar mientras duerme
    if (player.sleeping) {

        player.walking = false;

        return;

    }


    // No caminar mientras trabaja
    if (player.working) {

        player.walking = false;

        return;

    }


    let dx = 0;

    let dy = 0;


    // ARRIBA

    if (
        keys["w"] ||
        keys["arrowup"]
    ) {

        dy -= 1;

        player.direction = "up";

    }


    // ABAJO

    if (
        keys["s"] ||
        keys["arrowdown"]
    ) {

        dy += 1;

        player.direction = "down";

    }


    // IZQUIERDA

    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {

        dx -= 1;

        player.direction = "left";

    }


    // DERECHA

    if (
        keys["d"] ||
        keys["arrowright"]
    ) {

        dx += 1;

        player.direction = "right";

    }


    player.walking =
        dx !== 0 ||
        dy !== 0;


    // Si no se mueve
    if (!player.walking) {

        return;

    }


    // Normalizar diagonal

    const length =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    dx /= length;

    dy /= length;


    // Velocidad

    let currentSpeed =
        player.speed;


    if (
        keys["shift"]
    ) {

        currentSpeed *= 1.45;

        player.running = true;

    } else {

        player.running = false;

    }


    // Movimiento

    player.x +=
        dx *
        currentSpeed *
        delta;


    player.y +=
        dy *
        currentSpeed *
        delta;


    // Gastar energía

    if (player.running) {

        player.energy -=
            0.035 * delta;

    } else {

        player.energy -=
            0.01 * delta;

    }


    // Hambre

    player.hunger -=
        0.005 * delta;


    // Límites

    player.energy =
        Math.max(
            0,
            player.energy
        );


    player.hunger =
        Math.max(
            0,
            player.hunger
        );

}


// ============================================================
// LIMITAR PERSONAJE AL MUNDO
// ============================================================

export function limitPlayer(
    worldWidth,
    worldHeight
) {

    player.x =
        Math.max(
            30,
            Math.min(
                worldWidth - 30,
                player.x
            )
        );


    player.y =
        Math.max(
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

export function addMoney(
    amount
) {

    player.money +=
        amount;


    if (
        player.money < 0
    ) {

        player.money = 0;

    }

}


export function spendMoney(
    amount
) {

    if (
        player.money < amount
    ) {

        return false;

    }


    player.money -=
        amount;


    return true;

}


// ============================================================
// ENERGÍA
// ============================================================

export function consumeEnergy(
    amount
) {

    player.energy =
        Math.max(
            0,
            player.energy - amount
        );

}


// ============================================================
// HAMBRE
// ============================================================

export function eat(
    amount
) {

    player.hunger =
        Math.min(
            100,
            player.hunger + amount
        );

}


// ============================================================
// SALUD
// ============================================================

export function heal(
    amount
) {

    player.health =
        Math.min(
            100,
            player.health + amount
        );

}


// ============================================================
// EDUCACIÓN
// ============================================================

export function study(
    amount = 1
) {

    player.education =
        Math.min(
            100,
            player.education + amount
        );

}


// ============================================================
// REPUTACIÓN
// ============================================================

export function changeReputation(
    amount
) {

    player.reputation +=
        amount;


    player.reputation =
        Math.max(
            0,
            Math.min(
                100,
                player.reputation
            )
        );

}


// ============================================================
// EXPERIENCIA
// ============================================================

export function addExperience(
    amount
) {

    player.experience +=
        amount;

}


// ============================================================
// BAILE
// ============================================================

export function toggleDance() {

    // No bailar mientras trabaja
    if (
        player.working
    ) {

        return false;

    }


    player.dancing =
        !player.dancing;


    if (
        player.dancing
    ) {

        player.walking = false;

        player.running = false;

        player.danceTime = 0;

        player.danceStep = 0;

        consumeEnergy(3);

    } else {

        player.danceTime = 0;

        player.danceStep = 0;

    }


    return player.dancing;

}


// ============================================================
// ACTUALIZAR BACHATA
// ============================================================

export function updateDance(
    delta
) {

    if (
        !player.dancing
    ) {

        return;

    }


    player.danceTime +=
        delta;


    /*
     * Cada cierto tiempo
     * cambia el paso.
     */

    if (
        player.danceTime >= 18
    ) {

        player.danceTime = 0;

        player.danceStep++;

        if (
            player.danceStep > 3
        ) {

            player.danceStep = 0;

        }

    }


    /*
     * La bachata consume
     * energía lentamente.
     */

    player.energy -=
        0.015 * delta;


    player.energy =
        Math.max(
            0,
            player.energy
        );


    /*
     * Si se queda sin energía,
     * deja de bailar.
     */

    if (
        player.energy <= 0
    ) {

        player.dancing = false;

    }

}


// ============================================================
// TRABAJO
// ============================================================

export function startWorking(
    jobId,
    jobName
) {

    if (
        player.dancing
    ) {

        player.dancing =
            false;

    }


    if (
        player.sleeping
    ) {

        return false;

    }


    player.working =
        true;


    player.jobId =
        jobId;


    player.job =
        jobName;


    player.workTime =
        0;


    player.workProgress =
        0;


    return true;

}


export function stopWorking() {

    player.working =
        false;


    player.jobId =
        null;


    player.job =
        "Desempleado";


    player.workTime =
        0;


    player.workProgress =
        0;

}


// ============================================================
// DESCANSAR
// ============================================================

export function startSleeping() {

    player.sleeping =
        true;


    player.walking =
        false;


    player.dancing =
        false;


    player.working =
        false;

}


export function stopSleeping() {

    player.sleeping =
        false;


    player.energy =
        100;

}


// ============================================================
// ROPA
// ============================================================

export function changeClothing(
    shirt,
    pants,
    shoes,
    hat
) {

    if (shirt) {

        player.clothing.shirt =
            shirt;

    }


    if (pants) {

        player.clothing.pants =
            pants;

    }


    if (shoes) {

        player.clothing.shoes =
            shoes;

    }


    if (hat) {

        player.clothing.hat =
            hat;

    }

}


// ============================================================
// ESTADO DEL PERSONAJE
// ============================================================

export function getPlayerStatus() {

    return {

        name:
            player.name,

        age:
            player.age,

        money:
            player.money,

        health:
            player.health,

        energy:
            player.energy,

        hunger:
            player.hunger,

        job:
            player.job,

        jobId:
            player.jobId,

        working:
            player.working,

        dancing:
            player.dancing,

        danceStyle:
            player.danceStyle,

        education:
            player.education,

        reputation:
            player.reputation,

        experience:
            player.experience,

        familyRelationship:
            player.familyRelationship,

        clothing: {

            ...player.clothing

        }

    };

}

