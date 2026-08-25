// ============================================================
// DOMINICAN CITY - GAME ENGINE V5
// Motor principal del mundo abierto
// ============================================================

import {
    player,
    movePlayer,
    limitPlayer,
    toggleDance,
    updateDance
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
    getCurrentJob,
    updateWork
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


    // --------------------------------------------------------
    // TIEMPO
    // --------------------------------------------------------

    time: {

        hour: 8,

        minute: 0,

        day: 1,

        month: 1,

        year: 1965

    },


    // --------------------------------------------------------
    // TECLADO
    // --------------------------------------------------------

    keys: {},


    // --------------------------------------------------------
    // CÁMARA
    // --------------------------------------------------------

    camera: {

        x: 0,

        y: 0

    },


    // --------------------------------------------------------
    // MENSAJES
    // --------------------------------------------------------

    message: "",

    messageTimer: 0,


    // --------------------------------------------------------
    // MUNDO
    // --------------------------------------------------------

    currentRegion: null,

    currentLocation: null,

    nearbyNPC: null

};


// ============================================================
// INICIAR JUEGO
// ============================================================

export function startGame() {

    console.log(
        "🇩🇴 DOMINICAN CITY V5"
    );


    console.log(
        "Mundo:",
        WORLD.name
    );


    console.log(
        "Año:",
        WORLD.year
    );


    game.running =
        true;


    setupKeyboard();


    if (
        hasSaveGame()
    ) {

        console.log(
            "Existe una partida guardada."
        );

    }


    updateWorldState();


    showMessage(
        "🇩🇴 Bienvenido a Dominican City"
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


            /*
             * Evitar que mantener una tecla
             * provoque múltiples acciones.
             */

            const firstPress =
                !game.keys[key];


            game.keys[key] =
                true;


            if (
                !firstPress
            ) {

                return;

            }


            // =================================================
            // PAUSA
            // =================================================

            if (
                key === "p"
            ) {

                game.paused =
                    !game.paused;


                showMessage(

                    game.paused

                        ? "⏸️ Juego pausado"

                        : "▶️ Juego continuado"

                );


                return;

            }


            // =================================================
            // BAILAR
            // =================================================

            if (
                key === "b"
            ) {

                if (
                    game.paused
                ) {

                    return;

                }


                const dancing =
                    toggleDance();


                if (
                    dancing
                ) {

                    showMessage(
                        "💃 ¡BACHATA! Sigue el ritmo..."
                    );

                } else {

                    showMessage(
                        "🕺 Dejaste de bailar."
                    );

                }


                return;

            }


            // =================================================
            // TRABAJAR
            // =================================================

            if (
                key === "t"
            ) {

                if (
                    game.paused
                ) {

                    return;

                }


                beginWork();


                return;

            }


            // =================================================
            // TERMINAR TRABAJO
            // =================================================

            if (
                key === "f"
            ) {

                if (
                    game.paused
                ) {

                    return;

                }


                endWork();


                return;

            }


            // =================================================
            // INTERACTUAR
            // =================================================

            if (
                key === "e"
            ) {

                if (
                    game.paused
                ) {

                    return;

                }


                interact();


                return;

            }


            // =================================================
            // GUARDAR
            // =================================================

            if (
                key === "g"
            ) {

                if (
                    saveGame()
                ) {

                    showMessage(
                        "💾 Partida guardada correctamente."
                    );

                } else {

                    showMessage(
                        "❌ No se pudo guardar."
                    );

                }


                return;

            }


            // =================================================
            // CARGAR
            // =================================================

            if (
                key === "l"
            ) {

                if (
                    loadGame()
                ) {

                    showMessage(
                        "📂 Partida cargada."
                    );


                    updateWorldState();

                } else {

                    showMessage(
                        "❌ No hay partida guardada."
                    );

                }


                return;

            }

        }
    );


    window.addEventListener(
        "keyup",
        event => {

            const key =
                event.key.toLowerCase();


            game.keys[key] =
                false;

        }
    );

}


// ============================================================
// ACTUALIZAR JUEGO
// ============================================================

export function update(
    delta = 1
) {

    if (
        !game.running
    ) {

        return;

    }


    if (
        game.paused
    ) {

        return;

    }


    // ========================================================
    // JUGADOR
    // ========================================================

    movePlayer(
        game.keys,
        delta
    );


    limitPlayer(
        WORLD.width,
        WORLD.height
    );


    // ========================================================
    // BAILE
    // ========================================================

    updateDance(
        delta
    );


    // ========================================================
    // TRABAJO
    // ========================================================

    const workResult =
        updateWork(
            delta
        );


    if (
        workResult &&
        workResult.success
    ) {

        showMessage(
            workResult.message
        );

    }


    // ========================================================
    // NPCS
    // ========================================================

    updateNPCs(
        delta
    );


    // ========================================================
    // TIEMPO
    // ========================================================

    updateTime(
        delta
    );


    // ========================================================
    // MUNDO
    // ========================================================

    updateWorldState();


    // ========================================================
    // CÁMARA
    // ========================================================

    updateCamera();


    // ========================================================
    // MENSAJES
    // ========================================================

    if (
        game.messageTimer > 0
    ) {

        game.messageTimer -=
            delta;


        if (
            game.messageTimer < 0
        ) {

            game.messageTimer = 0;

        }

    }

}


// ============================================================
// TIEMPO
// ============================================================

function updateTime(
    delta
) {

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
// INTERACTUAR
// ============================================================

export function interact() {

    // --------------------------------------------------------
    // NPC
    // --------------------------------------------------------

    if (
        game.nearbyNPC
    ) {

        const npc =
            game.nearbyNPC;


        const dialogue =
            getDialogue(
                npc
            );


        changeRelationship(
            npc,
            1
        );


        showMessage(
            `👤 ${npc.name}: "${dialogue}"`
        );


        return;

    }


    // --------------------------------------------------------
    // LUGAR
    // --------------------------------------------------------

    if (
        game.currentLocation
    ) {

        interactWithLocation(
            game.currentLocation
        );


        return;

    }


    showMessage(
        "No hay nada cerca con lo que puedas interactuar."
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
                "🛒 Este es un colmado. Aquí puedes comprar comida."
            );

            break;


        case "barber":

            showMessage(
                "💈 BARBERÍA — Pulsa T para comenzar a trabajar como barbero."
            );

            break;


        case "school":

            showMessage(
                "📚 ESCUELA — Aquí puedes estudiar."
            );

            break;


        case "club":

            showMessage(
                "🎵 CLUB — Aquí puedes bailar bachata y trabajar como músico."
            );

            break;


        case "market":

            showMessage(
                "🛒 MERCADO — Pulsa T para trabajar como empacador."
            );

            break;


        case "transport":

            showMessage(
                "🚕 PARADA DE CONCHOS — Pulsa T para trabajar como chofer."
            );

            break;


        case "sports":

            showMessage(
                "⚾ Puedes jugar béisbol aquí."
            );

            break;


        case "farm":

            showMessage(
                "🌾 FINCA — Pulsa T para trabajar como agricultor."
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

    const result =
        getJob(
            jobId
        );


    if (
        !result.success
    ) {

        showMessage(
            result.message
        );


        return false;

    }


    showMessage(
        result.message
    );


    return true;

}


// ============================================================
// COMENZAR TRABAJO
// ============================================================

export function beginWork() {

    /*
     * Si estamos cerca de un lugar de trabajo,
     * automáticamente seleccionamos el trabajo.
     */

    if (
        game.currentLocation
    ) {

        const type =
            game.currentLocation.type;


        let jobId =
            null;


        // Barbería

        if (
            type === "barber"
        ) {

            jobId =
                "barber";

        }


        // Transporte

        else if (
            type === "transport"
        ) {

            jobId =
                "taxi";

        }


        // Mercado

        else if (
            type === "market"
        ) {

            jobId =
                "supermarket";

        }


        // Finca

        else if (
            type === "farm"
        ) {

            jobId =
                "farmer";

        }


        // Club

        else if (
            type === "club"
        ) {

            jobId =
                "musician";

        }


        /*
         * Si encontramos un trabajo,
         * lo asignamos.
         */

        if (
            jobId
        ) {

            getJob(
                jobId
            );

        }

    }


    /*
     * Si no hay trabajo seleccionado,
     * avisar.
     */

    if (
        workState.currentJob ===
        "unemployed"
    ) {

        showMessage(
            "💼 Acércate a una barbería, mercado, finca, club o parada de concho y pulsa T."
        );


        return {

            success: false

        };

    }


    const result =
        startWork();


    showMessage(
        result.message
    );


    return result;

}


// ============================================================
// TRABAJAR MANUALMENTE
// ============================================================

export function workPlayer(
    hours = 1
) {

    const result =
        work(
            hours
        );


    showMessage(
        result.message
    );


    return result;

}


// ============================================================
// TERMINAR TRABAJO
// ============================================================

export function endWork() {

    if (
        !workState.working
    ) {

        showMessage(
            "❌ No estás trabajando."
        );


        return {

            success: false

        };

    }


    const result =
        finishWork();


    showMessage(
        `🏁 Terminaste tu jornada. Ganaste $${result.earned}.`
    );


    return result;

}


// ============================================================
// MENSAJES
// ============================================================

export function showMessage(
    message,
    duration = 7
) {

    game.message =
        message;


    /*
     * Ahora los mensajes duran
     * 7 segundos.
     */

    game.messageTimer =
        duration;


    console.log(
        message
    );

}


// ============================================================
// ESTADO DEL JUEGO
// ============================================================

export function getGameState() {

    return {

        player: {

            x:
                player.x,

            y:
                player.y,

            money:
                player.money,

            energy:
                player.energy,

            hunger:
                player.hunger,

            job:
                player.job,

            working:
                player.working,

            dancing:
                player.dancing

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
// DATOS DEL MUNDO
// ============================================================

export function getWorldData() {

    return {

        world:
            WORLD,

        regions,

        roads,

        locations,

        trees,

        npcs,

        jobs

    };

}
