// ============================================================
// DOMINICAN CITY - JOBS V5
// Sistema de trabajos, turnos y economía
// ============================================================

import {
    player,
    addMoney,
    changeReputation,
    consumeEnergy,
    startWorking,
    stopWorking
} from "./player.js";


// ============================================================
// TRABAJOS DISPONIBLES
// ============================================================

export const jobs = {

    unemployed: {

        id: "unemployed",

        name: "Desempleado",

        salary: 0,

        energyCost: 0,

        reputation: 0,

        description:
            "Actualmente no tienes trabajo."

    },


    barber: {

        id: "barber",

        name: "Barbero",

        salary: 12,

        energyCost: 8,

        reputation: 2,

        description:
            "Trabaja en una barbería y aprende el oficio."

    },


    taxi: {

        id: "taxi",

        name: "Chofer de concho",

        salary: 15,

        energyCost: 10,

        reputation: 2,

        description:
            "Transporta pasajeros por la ciudad."

    },


    supermarket: {

        id: "supermarket",

        name: "Empacador",

        salary: 8,

        energyCost: 6,

        reputation: 1,

        description:
            "Empaca las compras de los clientes."

    },


    farmer: {

        id: "farmer",

        name: "Agricultor",

        salary: 14,

        energyCost: 15,

        reputation: 2,

        description:
            "Trabaja la tierra y ayuda con las cosechas."

    },


    musician: {

        id: "musician",

        name: "Músico",

        salary: 18,

        energyCost: 12,

        reputation: 4,

        description:
            "Toca música en fiestas y reuniones."

    },


    singer: {

        id: "singer",

        name: "Cantante",

        salary: 20,

        energyCost: 12,

        reputation: 5,

        description:
            "Canta en clubes y eventos."

    },


    student: {

        id: "student",

        name: "Estudiante",

        salary: 0,

        energyCost: 5,

        reputation: 1,

        description:
            "Estudia para mejorar tu educación."

    },


    street_vendor: {

        id: "street_vendor",

        name: "Vendedor ambulante",

        salary: 10,

        energyCost: 9,

        reputation: 1,

        description:
            "Vende productos por las calles."

    },


    mechanic: {

        id: "mechanic",

        name: "Mecánico",

        salary: 16,

        energyCost: 12,

        reputation: 3,

        description:
            "Repara vehículos."

    },


    construction: {

        id: "construction",

        name: "Constructor",

        salary: 17,

        energyCost: 18,

        reputation: 3,

        description:
            "Construye y repara edificios."

    },


    fisherman: {

        id: "fisherman",

        name: "Pescador",

        salary: 13,

        energyCost: 14,

        reputation: 2,

        description:
            "Pesca y vende sus capturas."

    }

};


// ============================================================
// ESTADO DEL TRABAJO
// ============================================================

export const workState = {

    currentJob: "unemployed",

    hoursWorked: 0,

    totalEarned: 0,

    working: false,

    workTimer: 0,

    shiftLength: 30

};


// ============================================================
// MENSAJE DE TRABAJO
// ============================================================

function result(
    success,
    message,
    money = 0
) {

    return {

        success,

        message,

        money

    };

}


// ============================================================
// CONSEGUIR TRABAJO
// ============================================================

export function getJob(
    jobId
) {

    const job =
        jobs[jobId];


    if (!job) {

        return result(
            false,
            "Ese trabajo no existe."
        );

    }


    workState.currentJob =
        jobId;


    workState.hoursWorked =
        0;


    workState.totalEarned =
        0;


    return result(
        true,
        `Ahora eres ${job.name}.`
    );

}


// ============================================================
// DEJAR TRABAJO
// ============================================================

export function quitJob() {

    workState.currentJob =
        "unemployed";


    workState.hoursWorked =
        0;


    workState.totalEarned =
        0;


    workState.working =
        false;


    stopWorking();

}


// ============================================================
// COMENZAR TURNO
// ============================================================

export function startWork() {

    if (
        workState.currentJob ===
        "unemployed"
    ) {

        return result(
            false,
            "❌ No tienes trabajo. Busca un lugar donde puedas trabajar."
        );

    }


    if (
        workState.working
    ) {

        return result(
            false,
            "💼 Ya estás trabajando."
        );

    }


    if (
        player.energy < 10
    ) {

        return result(
            false,
            "😴 Estás demasiado cansado para trabajar."
        );

    }


    const job =
        jobs[
            workState.currentJob
        ];


    workState.working =
        true;


    workState.workTimer =
        0;


    startWorking(
        job.id,
        job.name
    );


    return result(
        true,
        `💼 Comenzaste a trabajar como ${job.name}.`
    );

}


// ============================================================
// REALIZAR UNA HORA DE TRABAJO
// ============================================================

export function work(
    hours = 1
) {

    const job =
        jobs[
            workState.currentJob
        ];


    if (!job) {

        return result(
            false,
            "❌ No tienes trabajo."
        );

    }


    if (
        !workState.working
    ) {

        return result(
            false,
            "❌ No estás trabajando."
        );

    }


    const energyNeeded =
        job.energyCost *
        hours;


    if (
        player.energy <
        energyNeeded
    ) {

        return result(
            false,
            "😴 Estás demasiado cansado. Pulsa F para terminar."
        );

    }


    const earned =
        job.salary *
        hours;


    addMoney(
        earned
    );


    consumeEnergy(
        energyNeeded
    );


    changeReputation(
        job.reputation *
        hours
    );


    workState.hoursWorked +=
        hours;


    workState.totalEarned +=
        earned;


    return result(

        true,

        `💰 Has trabajado ${hours} hora(s) y ganado $${earned}.`,

        earned

    );

}


// ============================================================
// ACTUALIZAR TRABAJO
// ============================================================

export function updateWork(
    delta
) {

    if (
        !workState.working
    ) {

        return null;

    }


    workState.workTimer +=
        delta;


    /*
     * Cada 60 frames aproximadamente
     * representa una hora de trabajo.
     */

    if (
        workState.workTimer >= 60
    ) {

        workState.workTimer = 0;


        return work(1);

    }


    return null;

}


// ============================================================
// FINALIZAR TURNO
// ============================================================

export function finishWork() {

    if (
        !workState.working
    ) {

        return result(
            false,
            "❌ No estás trabajando."
        );

    }


    const hours =
        workState.hoursWorked;


    const earned =
        workState.totalEarned;


    workState.working =
        false;


    workState.workTimer =
        0;


    stopWorking();


    return {

        success: true,

        hours,

        earned,

        job:
            workState.currentJob,

        message:
            `🏁 Terminaste tu jornada. Trabajaste ${hours} hora(s) y ganaste $${earned}.`

    };

}


// ============================================================
// TRABAJO ACTUAL
// ============================================================

export function getCurrentJob() {

    return jobs[
        workState.currentJob
    ];

}


// ============================================================
// TRABAJOS DISPONIBLES
// ============================================================

export function getAvailableJobs() {

    return Object.values(
        jobs
    );

}


// ============================================================
// TRABAJO ALEATORIO
// ============================================================

export function getRandomJob() {

    const ids =
        Object.keys(
            jobs
        ).filter(
            id =>
                id !== "unemployed"
        );


    const random =
        Math.floor(
            Math.random() *
            ids.length
        );


    return jobs[
        ids[random]
    ];

}


// ============================================================
// ESTADO DEL TRABAJO
// ============================================================

export function getWorkStatus() {

    return {

        working:
            workState.working,

        currentJob:
            workState.currentJob,

        hoursWorked:
            workState.hoursWorked,

        totalEarned:
            workState.totalEarned,

        progress:
            workState.workTimer /
            workState.shiftLength

    };

}
