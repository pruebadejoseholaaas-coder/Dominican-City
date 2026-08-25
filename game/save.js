// ============================================================
// DOMINICAN CITY - SAVE SYSTEM V3
// Sistema de guardado de partida
// ============================================================

import { player } from "./player.js";
import { workState } from "./jobs.js";
import { npcs } from "./npcs.js";


// ============================================================
// NOMBRE DEL GUARDADO
// ============================================================

const SAVE_KEY = "dominican_city_save_v3";


// ============================================================
// CREAR DATOS DEL JUGADOR
// ============================================================

function createSaveData() {

    return {

        version: 3,

        date:
            new Date().toISOString(),

        player: {

            name:
                player.name,

            x:
                player.x,

            y:
                player.y,

            direction:
                player.direction,

            health:
                player.health,

            energy:
                player.energy,

            hunger:
                player.hunger,

            money:
                player.money,

            job:
                player.job,

            education:
                player.education,

            reputation:
                player.reputation,

            familyRelationship:
                player.familyRelationship,

            clothing: {

                shirt:
                    player.clothing.shirt,

                pants:
                    player.clothing.pants,

                shoes:
                    player.clothing.shoes
            }
        },


        work: {

            currentJob:
                workState.currentJob,

            hoursWorked:
                workState.hoursWorked,

            totalEarned:
                workState.totalEarned
        },


        npcs:
            npcs.map(npc => ({

                id:
                    npc.id,

                relationship:
                    npc.relationship,

                x:
                    npc.x,

                y:
                    npc.y
            }))
    };
}


// ============================================================
// GUARDAR PARTIDA
// ============================================================

export function saveGame() {

    try {

        const data =
            createSaveData();

        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(data)
        );

        console.log(
            "🇩🇴 Dominican City: partida guardada."
        );

        return true;

    } catch (error) {

        console.error(
            "No se pudo guardar la partida:",
            error
        );

        return false;
    }
}


// ============================================================
// COMPROBAR SI EXISTE UNA PARTIDA
// ============================================================

export function hasSaveGame() {

    return (
        localStorage.getItem(
            SAVE_KEY
        ) !== null
    );
}


// ============================================================
// CARGAR PARTIDA
// ============================================================

export function loadGame() {

    try {

        const saved =
            localStorage.getItem(
                SAVE_KEY
            );

        if (!saved) {

            console.log(
                "No existe una partida guardada."
            );

            return false;
        }


        const data =
            JSON.parse(saved);


        // ------------------------------
        // Jugador
        // ------------------------------

        if (data.player) {

            Object.assign(
                player,
                data.player
            );

            if (
                data.player.clothing
            ) {

                player.clothing =
                    {
                        ...data.player.clothing
                    };
            }
        }


        // ------------------------------
        // Trabajo
        // ------------------------------

        if (data.work) {

            Object.assign(
                workState,
                data.work
            );

            workState.working =
                false;
        }


        // ------------------------------
        // NPC
        // ------------------------------

        if (
            Array.isArray(data.npcs)
        ) {

            for (
                const savedNPC
                of data.npcs
            ) {

                const npc =
                    npcs.find(
                        n =>
                            n.id ===
                            savedNPC.id
                    );

                if (!npc) {
                    continue;
                }

                if (
                    typeof savedNPC.x ===
                    "number"
                ) {

                    npc.x =
                        savedNPC.x;
                }

                if (
                    typeof savedNPC.y ===
                    "number"
                ) {

                    npc.y =
                        savedNPC.y;
                }

                if (
                    typeof savedNPC.relationship ===
                    "number"
                ) {

                    npc.relationship =
                        savedNPC.relationship;
                }
            }
        }


        console.log(
            "🇩🇴 Dominican City: partida cargada."
        );

        return true;

    } catch (error) {

        console.error(
            "No se pudo cargar la partida:",
            error
        );

        return false;
    }
}


// ============================================================
// BORRAR PARTIDA
// ============================================================

export function deleteSaveGame() {

    localStorage.removeItem(
        SAVE_KEY
    );

    console.log(
        "Partida eliminada."
    );
}


// ============================================================
// INFORMACIÓN DEL GUARDADO
// ============================================================

export function getSaveInfo() {

    const saved =
        localStorage.getItem(
            SAVE_KEY
        );

    if (!saved) {

        return null;
    }

    try {

        const data =
            JSON.parse(saved);

        return {

            version:
                data.version,

            date:
                data.date,

            playerName:
                data.player?.name,

            money:
                data.player?.money,

            job:
                data.player?.job
        };

    } catch {

        return null;
    }
}
