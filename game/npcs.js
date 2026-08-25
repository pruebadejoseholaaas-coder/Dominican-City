// ============================================================
// DOMINICAN CITY - NPCS V3
// Personas y vida del mundo
// ============================================================
k
export const npcs = [

    // ========================================================
    // FAMILIA
    // ========================================================

    {
        id: "mother",

        name: "Doña Carmen",

        role: "Madre",

        profession: "Ama de casa",

        x: 560,
        y: 540,

        color: "#b56576",

        age: 48,

        relationship: 95,

        home: true,

        dialogue: [
            "Mijo, ¿ya comiste?",
            "No te olvides de visitar a tu familia.",
            "Aquí siempre tendrás tu casa.",
            "Ten cuidado cuando salgas."
        ]
    },

    {
        id: "father",

        name: "Don Rafael",

        role: "Padre",

        profession: "Trabajador",

        x: 650,
        y: 560,

        color: "#355070",

        age: 52,

        relationship: 90,

        home: true,

        dialogue: [
            "Hay que trabajar duro en esta vida.",
            "Aprende un oficio, muchacho.",
            "La familia siempre va primero.",
            "Cuando tengas tiempo vamos a jugar dominó."
        ]
    },

    {
        id: "sister",

        name: "Ana",

        role: "Hermana",

        profession: "Estudiante",

        x: 590,
        y: 610,

        color: "#6a994e",

        age: 17,

        relationship: 92,

        home: true,

        dialogue: [
            "¡Hola hermano!",
            "¿Vas para el barrio?",
            "Después quiero ir a escuchar música.",
            "Mamá dice que vuelvas temprano."
        ]
    },


    // ========================================================
    // BARRIO
    // ========================================================

    {
        id: "pepe",

        name: "Don Pepe",

        role: "Comerciante",

        profession: "Dueño de colmado",

        x: 1120,
        y: 500,

        color: "#9c6644",

        age: 55,

        relationship: 50,

        dialogue: [
            "¡Llegó el muchacho!",
            "Aquí hay de todo en el colmado.",
            "¿Qué vas a comprar?",
            "En este barrio nos conocemos todos."
        ]
    },

    {
        id: "ramon",

        name: "Ramón",

        role: "Barbero",

        profession: "Barbero",

        x: 1560,
        y: 520,

        color: "#4361ee",

        age: 31,

        relationship: 45,

        dialogue: [
            "¿Quieres aprender barbería?",
            "Este oficio deja su dinerito.",
            "Pasa por aquí cuando quieras.",
            "Tengo clientes desde temprano."
        ]
    },

    {
        id: "maria",

        name: "María",

        role: "Maestra",

        profession: "Maestra",

        x: 2200,
        y: 550,

        color: "#f4a261",

        age: 29,

        relationship: 40,

        dialogue: [
            "La educación abre muchas puertas.",
            "Los muchachos necesitan estudiar.",
            "¿Has pensado volver a la escuela?",
            "Nunca es tarde para aprender."
        ]
    },


    // ========================================================
    // TRANSPORTE
    // ========================================================

    {
        id: "juan",

        name: "Juan",

        role: "Taxista",

        profession: "Chofer de concho",

        x: 2200,
        y: 1100,

        color: "#e63946",

        age: 36,

        relationship: 35,

        dialogue: [
            "¿Vas para algún sitio?",
            "Los conchos nunca paran.",
            "Hay que conocer bien las calles.",
            "Si quieres aprender a manejar, yo te enseño."
        ]
    },


    // ========================================================
    // MÚSICA
    // ========================================================

    {
        id: "pedro",

        name: "Pedro",

        role: "Músico",

        profession: "Músico",

        x: 2800,
        y: 650,

        color: "#2a9d8f",

        age: 27,

        relationship: 45,

        dialogue: [
            "Esta noche hay música en el club.",
            "Vamos a tocar un merengue.",
            "También podemos tocar bachata.",
            "La música une al barrio."
        ]
    },

    {
        id: "rosa",

        name: "Rosa",

        role: "Cantante",

        profession: "Cantante",

        x: 2900,
        y: 580,

        color: "#e76f51",

        age: 24,

        relationship: 40,

        dialogue: [
            "¿Te gusta la música?",
            "Estoy preparando una presentación.",
            "Ven al club esta noche.",
            "Aquí siempre hay gente compartiendo."
        ]
    },


    // ========================================================
    // ESCUELA
    // ========================================================

    {
        id: "miguel",

        name: "Miguel",

        role: "Estudiante",

        profession: "Estudiante",

        x: 1950,
        y: 800,

        color: "#457b9d",

        age: 16,

        relationship: 30,

        dialogue: [
            "¿Ya terminaste las clases?",
            "Después vamos a jugar pelota.",
            "Tengo que estudiar para mañana.",
            "Nos vemos en el barrio."
        ]
    },


    // ========================================================
    // CAMPO
    // ========================================================

    {
        id: "campesino",

        name: "Don Manuel",

        role: "Campesino",

        profession: "Agricultor",

        x: 1100,
        y: 2200,

        color: "#8d6e63",

        age: 58,

        relationship: 25,

        dialogue: [
            "La tierra da trabajo.",
            "Aquí nos levantamos temprano.",
            "Si quieres trabajar en el campo, puedo enseñarte.",
            "Hay que cuidar la cosecha."
        ]
    },

    // ========================================================
    // VENDEDORA
    // ========================================================

    {
        id: "luisa",

        name: "Doña Luisa",

        role: "Vendedora",

        profession: "Vendedora",

        x: 1300,
        y: 2300,

        color: "#bc6c25",

        age: 43,

        relationship: 25,

        dialogue: [
            "Tengo frutas frescas.",
            "¿Qué necesitas comprar?",
            "Aquí todo se vende temprano.",
            "El barrio siempre está lleno."
        ]
    }
];


// ============================================================
// ESTADO DE LOS NPC
// ============================================================

export function updateNPCs(delta = 1) {

    for (const npc of npcs) {

        // La familia permanece cerca de casa.
        if (npc.home) {
            continue;
        }

        // Crear dirección si todavía no existe.
        if (
            typeof npc.direction !== "number"
        ) {

            npc.direction =
                Math.random() *
                Math.PI *
                2;
        }

        // Ocasionalmente cambian de dirección.
        if (
            Math.random() < 0.008
        ) {

            npc.direction =
                Math.random() *
                Math.PI *
                2;
        }

        const speed =
            npc.speed || 0.35;

        npc.x +=
            Math.cos(npc.direction) *
            speed *
            delta;

        npc.y +=
            Math.sin(npc.direction) *
            speed *
            delta;
    }
}


// ============================================================
// BUSCAR NPC CERCANO
// ============================================================

export function getNearestNPC(
    x,
    y,
    maxDistance = 120
) {

    let closest = null;

    let closestDistance =
        Infinity;

    for (const npc of npcs) {

        const distance =
            Math.hypot(
                x - npc.x,
                y - npc.y
            );

        if (
            distance < maxDistance &&
            distance < closestDistance
        ) {

            closest = npc;

            closestDistance =
                distance;
        }
    }

    return closest;
}


// ============================================================
// HABLAR CON NPC
// ============================================================

export function getDialogue(npc) {

    if (
        !npc ||
        !npc.dialogue ||
        npc.dialogue.length === 0
    ) {

        return "Hola.";
    }

    const index =
        Math.floor(
            Math.random() *
            npc.dialogue.length
        );

    return npc.dialogue[index];
}


// ============================================================
// RELACIÓN
// ============================================================

export function changeRelationship(
    npc,
    amount
) {

    if (!npc) {
        return;
    }

    npc.relationship += amount;

    npc.relationship =
        Math.max(
            0,
            Math.min(
                100,
                npc.relationship
            )
        );
}


// ============================================================
// NPCS POR PROFESIÓN
// ============================================================

export function getNPCsByProfession(
    profession
) {

    return npcs.filter(
        npc =>
            npc.profession === profession
    );
}


// ============================================================
// NPC POR ID
// ============================================================

export function getNPCById(id) {

    return npcs.find(
        npc =>
            npc.id === id
    );
}
