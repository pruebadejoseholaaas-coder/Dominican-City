// ============================================================
// DOMINICAN CITY - WORLD V3
// Mundo abierto inicial
// ============================================================

export const WORLD = {
h
    width: 6000,
    height: 4000,

    name: "República Dominicana",

    year: 1965
};


// ============================================================
// REGIONES
// ============================================================

export const regions = [

    {
        id: "capital",
        name: "Santo Domingo",
        type: "city",

        x: 300,
        y: 300,

        width: 1800,
        height: 1200,

        color: "#71945b",

        unlocked: true
    },

    {
        id: "santiago",
        name: "Santiago",
        type: "city",

        x: 2800,
        y: 400,

        width: 1300,
        height: 1000,

        color: "#759b5d",

        unlocked: true
    },

    {
        id: "campo",
        name: "Zona Rural",
        type: "rural",

        x: 500,
        y: 1800,

        width: 1900,
        height: 1300,

        color: "#68965b",

        unlocked: true
    },

    {
        id: "norte",
        name: "Región Norte",
        type: "rural",

        x: 3000,
        y: 1800,

        width: 2000,
        height: 1000,

        color: "#6c9b63",

        unlocked: true
    },

    {
        id: "east",
        name: "Zona Oriental",
        type: "city",

        x: 4300,
        y: 500,

        width: 1200,
        height: 1000,

        color: "#70975b",

        unlocked: false
    }
];


// ============================================================
// CARRETERAS
// ============================================================

export const roads = [

    {
        x: 0,
        y: 850,

        width: WORLD.width,
        height: 150,

        type: "highway"
    },

    {
        x: 900,
        y: 0,

        width: 160,
        height: WORLD.height,

        type: "road"
    },

    {
        x: 3000,
        y: 0,

        width: 160,
        height: WORLD.height,

        type: "road"
    },

    {
        x: 0,
        y: 2500,

        width: WORLD.width,
        height: 160,

        type: "road"
    }
];


// ============================================================
// ZONAS IMPORTANTES
// ============================================================

export const locations = [

    {
        id: "family_house",

        name: "Casa Familiar",

        type: "house",

        x: 500,
        y: 450,

        width: 300,
        height: 220
    },

    {
        id: "colmado",

        name: "Colmado",

        type: "shop",

        x: 1150,
        y: 350,

        width: 260,
        height: 180
    },

    {
        id: "barber",

        name: "Barbería",

        type: "barber",

        x: 1500,
        y: 400,

        width: 250,
        height: 180
    },

    {
        id: "school",

        name: "Escuela",

        type: "school",

        x: 1900,
        y: 350,

        width: 320,
        height: 210
    },

    {
        id: "club",

        name: "Club Social",

        type: "club",

        x: 2450,
        y: 500,

        width: 330,
        height: 220
    },

    {
        id: "supermarket",

        name: "Supermercado",

        type: "market",

        x: 1500,
        y: 1200,

        width: 350,
        height: 230
    },

    {
        id: "concho",

        name: "Parada de Conchos",

        type: "transport",

        x: 2100,
        y: 1100,

        width: 280,
        height: 150
    },

    {
        id: "baseball",

        name: "Terreno de Béisbol",

        type: "sports",

        x: 3200,
        y: 750,

        width: 500,
        height: 330
    },

    {
        id: "farm",

        name: "Finca",

        type: "farm",

        x: 900,
        y: 2100,

        width: 450,
        height: 300
    },

    {
        id: "beach",

        name: "Playa",

        type: "beach",

        x: 3900,
        y: 2700,

        width: 900,
        height: 500
    }
];


// ============================================================
// ÁRBOLES
// ============================================================

export const trees = [];

for (let i = 0; i < 250; i++) {

    trees.push({

        x:
            50 +
            Math.random() *
            (WORLD.width - 100),

        y:
            50 +
            Math.random() *
            (WORLD.height - 100),

        size:
            14 +
            Math.random() * 20
    });
}


// ============================================================
// LÍMITES
// ============================================================

export function limitPosition(
    x,
    y
) {

    return {

        x: Math.max(
            20,
            Math.min(
                WORLD.width - 20,
                x
            )
        ),

        y: Math.max(
            20,
            Math.min(
                WORLD.height - 20,
                y
            )
        )
    };
}


// ============================================================
// BUSCAR UBICACIÓN
// ============================================================

export function getLocationNear(
    x,
    y,
    distance = 180
) {

    let closest = null;

    let closestDistance =
        Infinity;

    for (
        const location
        of locations
    ) {

        const centerX =
            location.x +
            location.width / 2;

        const centerY =
            location.y +
            location.height / 2;

        const d =
            Math.hypot(
                x - centerX,
                y - centerY
            );

        if (
            d < distance &&
            d < closestDistance
        ) {

            closest = location;

            closestDistance = d;
        }
    }

    return closest;
}


// ============================================================
// REGIÓN ACTUAL
// ============================================================

export function getCurrentRegion(
    x,
    y
) {

    for (
        const region
        of regions
    ) {

        if (
            x >= region.x &&
            x <= region.x + region.width &&
            y >= region.y &&
            y <= region.y + region.height
        ) {

            return region;
        }
    }

    return null;
}
