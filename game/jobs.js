// ============================================================
// DOMINICAN CITY - JOBS V3
// Sistema de trabajos y economía
// ============================================================

import {
    addMoney,
    changeReputation,
    consumeEnergy
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
            "Ayuda a los clientes y empaca sus compras."
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
            "Toca música en fiestas, clubes y reuniones."
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
            "Asiste a la escuela para mejorar tu educación."
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
            "Repara vehículos y aprende mecánica."
    },


    construction: {
        id: "construction",
        name: "Trabajador de construcción",
        salary: 17,
        energyCost: 18,
        reputation: 3,

        description:
            "Ayuda a construir y reparar edificios."
    },


    fisherman: {
        id: "fisherman",
        name: "Pescador",
        salary: 13,
        energyCost: 14,
        reputation: 2,

        description:
            "Sale a pescar y vende sus capturas."
    }

};


// ============================================================
// ESTADO DEL TRABAJO
// ============================================================

export const workState = {

    currentJob: "unemployed",

    hoursWorked: 0,

    totalEarned: 0,

    working: false
};


// ============================================================
// CONSEGUIR TRABAJO
// ============================================================

export function getJob(jobId) {

    const job =
        jobs[jobId];

    if (!job) {
        return false;
    }

    workState.currentJob =
        jobId;

    workState.hoursWorked = 0;

    return true;
}


// ============================================================
// DEJAR TRABAJO
// ============================================================

export function quitJob() {

    workState.currentJob =
        "unemployed";

    workState.hoursWorked = 0;

    workState.working = false;
}


// ============================================================
// COMENZAR TURNO
// ============================================================

export function startWork() {

    if (
        workState.currentJob ===
        "unemployed"
    ) {

        return {
            success: false,
            message:
                "No tienes trabajo."
        };
    }

    workState.working = true;

    return {
        success: true,
        message:
            "Has comenzado tu jornada."
    };
}


// ============================================================
// TRABAJAR
// ============================================================

export function work(hours = 1) {

    const job =
        jobs[
            workState.currentJob
        ];

    if (!job) {

        return {
            success: false,
            money: 0,
            message:
                "No tienes trabajo."
        };
    }


    if (job.energyCost * hours >
        100) {

        return {
            success: false,
            money: 0,
            message:
                "Estás demasiado cansado."
        };
    }


    const earned =
        job.salary * hours;


    addMoney(earned);


    workState.hoursWorked +=
        hours;


    workState.totalEarned +=
        earned;


    changeReputation(
        job.reputation * hours
    );


    consumeEnergy(
    job.energyCost * hours
);


    return {

        success: true,

        money: earned,

        hours,

        message:
            `Has trabajado ${hours} hora(s) y ganado $${earned}.`
    };
}


// ============================================================
// FINALIZAR TURNO
// ============================================================

export function finishWork() {

    workState.working = false;

    return {

        hours:
            workState.hoursWorked,

        earned:
            workState.totalEarned,

        job:
            workState.currentJob
    };
}


// ============================================================
// CONSEGUIR TRABAJO ALEATORIO
// ============================================================

export function getRandomJob() {

    const ids =
        Object.keys(jobs)
            .filter(
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
// LISTA DE TRABAJOS
// ============================================================

export function getAvailableJobs() {

    return Object.values(jobs);
}


// ============================================================
// INFORMACIÓN DEL TRABAJO ACTUAL
// ============================================================

export function getCurrentJob() {

    return jobs[
        workState.currentJob
    ];
}
