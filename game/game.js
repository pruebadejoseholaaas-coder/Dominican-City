// ============================================================
// DOMINICAN CITY - GAME ENGINE V3
// Cerebro principal del juego
// ============================================================

import {
    player,
    movePlayer,
    limitPlayer,
    toggleDance
} from "./player.js";

import {
    WORLD,
    regions,
    roads,
    locations,
    trees,
    getLocationNear,
    getCurrentRegion
} from "./world.js";

import {
    npcs,
    updateNPCs,
    getNearestNPC,
    getDialogue,
    changeRelationship
} from "./npcs.js";

import {
    jobs,
    workState,
    getJob,
    startWork,
    work,
    finishWork,
    getCurrentJob
} from "./jobs.js";

import {
    saveGame,
    loadGame,
    hasSaveGame
} from "./save.js";


// ============================================================
// ESTADO GENERAL
// ============================================================

export const game = {

    running: false,

    paused: false,

    time: {
        hour: 8,
        minute: 0,
        day: 1,
        month: 1,
        year: 1965
    },

    keys: {},

    camera: {
        x: 0,
        y: 0
    },

    message: "",

    messageTimer: 0,

    currentRegion: null,

    currentLocation: null,

    nearbyNPC: null
};


// ============================================================
// INICIAR JUEGO
// ============================================================

export function startGame() {

    console.log(
        "🇩🇴 DOMINICAN CITY V3"
    );

    console.log(
        "Mundo:",
        WORLD.name
    );

    console.log(
        "Año:",
        WORLD.year
    );

    game.running = true;

    setupKeyboard();

    if (hasSaveGame()) {

        console.log(
            "Existe una partida guardada."
        );
    }

    updateWorldState();

    showMessage(
        "Bienvenido a Dominican City 🇩🇴"
    );
}


// ============================================================
// TECLADO
// ============================================================

function setupKeyboard() {

    window.addEventListener(
        "keydown",
        event => {

            const key =
                event.key.toLowerCase();

            game.keys[key] = true;


            // --------------------------
            // P = pausa
            // --------------------------

            if (key === "p") {

                game.paused =
                    !game.paused;

                showMessage(
                    game.paused
                        ? "Juego pausado"
                        : "Juego continuado"
                );
            }


            // --------------------------
            // B = bailar
            // --------------------------

            if (key === "b") {

                const dancing =
                    toggleDance();

                showMessage(
                    dancing
                        ? "💃 ¡Estás bailando!"
                        : "Terminaste de bailar."
                );
            }


            // --------------------------
            // E = interactuar
            // --------------------------

            if (key === "e") {

                interact();
            }


            // --------------------------
            // G = guardar
            // --------------------------

            if (key === "g") {

                if (saveGame()) {

                    showMessage(
                        "💾 Partida guardada."
                    );
                }
            }


            // --------------------------
            // L = cargar
            // --------------------------

            if (key === "l") {

                if (loadGame()) {

                    showMessage(
                        "📂 Partida cargada."
                    );

                    updateWorldState();
                }
            }
        }
    );


    window.addEventListener(
        "keyup",
        event => {

            const key =
                event.key.toLowerCase();

            game.keys[key] = false;
        }
    );
}


// ============================================================
// ACTUALIZAR JUEGO
// ============================================================

export function update(delta = 1) {

    if (!game.running) {
        return;
    }

    if (game.paused) {
        return;
    }


    // --------------------------
    // Jugador
    // --------------------------

    movePlayer(
        game.keys,
        delta
    );

    limitPlayer(
        WORLD.width,
        WORLD.height
    );


    // --------------------------
    // NPCs
    // --------------------------

    updateNPCs(delta);


    // --------------------------
    // Tiempo
    // --------------------------

    updateTime(delta);


    // --------------------------
    // Mundo
    // --------------------------

    updateWorldState();


    // --------------------------
    // Cámara
    // --------------------------

    updateCamera();


    // --------------------------
    // Mensajes
    // --------------------------

    if (
        game.messageTimer > 0
    ) {

        game.messageTimer -=
            delta;
    }
}


// ============================================================
// TIEMPO DEL JUEGO
// ============================================================

function updateTime(delta) {

    game.time.minute +=
        delta * 0.4;

    if (
        game.time.minute >= 60
    ) {

        game.time.minute = 0;

        game.time.hour++;
    }


    if (
        game.time.hour >= 24
    ) {

        game.time.hour = 0;

        game.time.day++;
    }


    if (
        game.time.day > 30
    ) {

        game.time.day = 1;

        game.time.month++;
    }


    if (
        game.time.month > 12
    ) {

        game.time.month = 1;

        game.time.year++;
    }
}


// ============================================================
// ESTADO DEL MUNDO
// ============================================================

function updateWorldState() {

    game.currentRegion =
        getCurrentRegion(
            player.x,
            player.y
        );


    game.currentLocation =
        getLocationNear(
            player.x,
            player.y,
            180
        );


    game.nearbyNPC =
        getNearestNPC(
            player.x,
            player.y,
            120
        );
}


// ============================================================
// CÁMARA
// ============================================================

function updateCamera() {

    game.camera.x =
        player.x - 400;

    game.camera.y =
        player.y - 300;


    game.camera.x =
        Math.max(
            0,
            Math.min(
                WORLD.width - 800,
                game.camera.x
            )
        );


    game.camera.y =
        Math.max(
            0,
            Math.min(
                WORLD.height - 600,
                game.camera.y
            )
        );
}


// ============================================================
// INTERACCIONES
// ============================================================

export function interact() {

    // --------------------------
    // NPC
    // --------------------------

    if (game.nearbyNPC) {

        const npc =
            game.nearbyNPC;

        const dialogue =
            getDialogue(npc);

        changeRelationship(
            npc,
            1
        );

        showMessage(
            `${npc.name}: "${dialogue}"`
        );

        return;
    }


    // --------------------------
    // Lugar
    // --------------------------

    if (game.currentLocation) {

        const location =
            game.currentLocation;

        interactWithLocation(
            location
        );

        return;
    }


    showMessage(
        "No hay nada con lo que puedas interactuar."
    );
}


// ============================================================
// INTERACTUAR CON LUGAR
// ============================================================

function interactWithLocation(
    location
) {

    switch (
        location.type
    ) {

        case "house":

            showMessage(
                "🏠 Esta es tu casa familiar."
            );

            break;


        case "shop":

            showMessage(
                "🛒 Puedes comprar productos en el colmado."
            );

            break;


        case "barber":

            showMessage(
                "💈 Aquí puedes trabajar como barbero."
            );

            break;


        case "school":

            showMessage(
                "📚 Aquí puedes estudiar."
            );

            break;


        case "club":

            showMessage(
                "🎵 Esta noche hay música y baile."
            );

            break;


        case "market":

            showMessage(
                "🛒 Puedes buscar trabajo como empacador."
            );

            break;


        case "transport":

            showMessage(
                "🚕 Aquí trabajan los choferes de concho."
            );

            break;


        case "sports":

            showMessage(
                "⚾ Aquí puedes jugar béisbol."
            );

            break;


        case "farm":

            showMessage(
                "🌾 Aquí puedes trabajar en el campo."
            );

            break;


        case "beach":

            showMessage(
                "🌊 Has llegado a la playa."
            );

            break;


        default:

            showMessage(
                location.name
            );
    }
}


// ============================================================
// CONSEGUIR TRABAJO
// ============================================================

export function chooseJob(
    jobId
) {

    const success =
        getJob(jobId);

    if (!success) {

        showMessage(
            "Ese trabajo no existe."
        );

        return false;
    }

    const job =
        jobs[jobId];

    showMessage(
        `💼 Ahora trabajas como ${job.name}.`
    );

    return true;
}


// ============================================================
// TRABAJAR
// ============================================================

export function workPlayer(
    hours = 1
) {

    const result =
        work(hours);

    showMessage(
        result.message
    );

    return result;
}


// ============================================================
// INICIAR TRABAJO
// ============================================================

export function beginWork() {

    const result =
        startWork();

    showMessage(
        result.message
    );

    return result;
}


// ============================================================
// TERMINAR TRABAJO
// ============================================================

export function endWork() {

    const result =
        finishWork();

    showMessage(
        `Terminaste tu jornada. Ganaste $${result.earned}.`
    );

    return result;
}


// ============================================================
// MENSAJES
// ============================================================

export function showMessage(
    message
) {

    game.message =
        message;

    game.messageTimer =
        5;

    console.log(
        message
    );
}


// ============================================================
// INFORMACIÓN DEL JUEGO
// ============================================================

export function getGameState() {

    return {

        player: {
            x: player.x,
            y: player.y,
            money: player.money,
            energy: player.energy,
            hunger: player.hunger,
            job: player.job
        },

        time: {
            ...game.time
        },

        region:
            game.currentRegion?.name ||
            "Desconocida",

        location:
            game.currentLocation?.name ||
            null,

        nearbyNPC:
            game.nearbyNPC?.name ||
            null
    };
}


// ============================================================
// EXPORTAR DATOS DEL MUNDO
// ============================================================

export function getWorldData() {

    return {

        world: WORLD,

        regions,

        roads,

        locations,

        trees,

        npcs,

        jobs
    };
}

