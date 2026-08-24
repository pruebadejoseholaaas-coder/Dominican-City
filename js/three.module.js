<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">

<title>RD World 3D — Fase 1</title>

<style>

*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}

html,
body{
    width:100%;
    height:100%;
    overflow:hidden;
    font-family:Arial,Helvetica,sans-serif;
    background:#05070a;
    color:white;
}

#game{
    position:fixed;
    inset:0;
}

canvas{
    display:block;
}

/* =========================
   HUD
========================= */

#hud{
    position:fixed;
    inset:0;
    pointer-events:none;
    z-index:20;
}

.top-left{
    position:absolute;
    top:18px;
    left:18px;

    background:rgba(5,8,12,.72);
    border:1px solid rgba(255,255,255,.12);
    backdrop-filter:blur(12px);

    border-radius:12px;
    padding:12px 15px;

    min-width:190px;
}

.game-title{
    font-size:18px;
    font-weight:900;
    letter-spacing:-.5px;
}

.game-title span{
    color:#ffca28;
}

.location{
    color:#aeb8c7;
    font-size:12px;
    margin-top:5px;
}

.stats{
    margin-top:10px;

    display:flex;
    gap:12px;

    font-size:12px;
}

.stat{
    color:#dbe2ea;
}

.stat b{
    color:white;
}

/* =========================
   COMPASS
========================= */

#compass{
    position:absolute;
    top:18px;
    left:50%;
    transform:translateX(-50%);

    padding:8px 16px;

    border-radius:999px;

    background:rgba(5,8,12,.68);
    border:1px solid rgba(255,255,255,.12);

    backdrop-filter:blur(10px);

    font-size:12px;
    font-weight:bold;

    letter-spacing:2px;
}

/* =========================
   HELP
========================= */

#help{
    position:absolute;
    right:18px;
    top:18px;

    max-width:240px;

    background:rgba(5,8,12,.68);
    border:1px solid rgba(255,255,255,.12);

    border-radius:12px;

    padding:12px;

    font-size:12px;
    line-height:1.55;

    color:#cbd3de;
}

#help b{
    color:white;
}

/* =========================
   MINIMAP
========================= */

#minimap{
    position:absolute;

    right:18px;
    bottom:18px;

    width:170px;
    height:170px;

    background:rgba(5,8,12,.82);

    border:2px solid rgba(255,255,255,.2);

    border-radius:14px;

    overflow:hidden;

    box-shadow:
        0 10px 30px rgba(0,0,0,.35);
}

#mapCanvas{
    width:100%;
    height:100%;
}

/* =========================
   CENTER MESSAGE
========================= */

#message{
    position:absolute;

    left:50%;
    bottom:28px;

    transform:translateX(-50%);

    background:rgba(5,8,12,.72);

    border:1px solid rgba(255,255,255,.12);

    padding:9px 15px;

    border-radius:999px;

    color:#dce3ec;

    font-size:12px;

    opacity:0;

    transition:.3s;
}

#message.show{
    opacity:1;
}

/* =========================
   MOBILE CONTROLS
========================= */

#mobileControls{
    display:none;

    position:absolute;
    inset:0;

    pointer-events:none;
}

.joystick{
    position:absolute;

    left:25px;
    bottom:30px;

    width:120px;
    height:120px;

    border-radius:50%;

    background:rgba(255,255,255,.08);

    border:1px solid rgba(255,255,255,.15);

    pointer-events:auto;
}

.stick{
    position:absolute;

    width:54px;
    height:54px;

    left:33px;
    top:33px;

    border-radius:50%;

    background:rgba(255,255,255,.22);

    border:1px solid rgba(255,255,255,.25);
}

.mobile-look{
    position:absolute;

    right:20px;
    bottom:25px;

    width:150px;
    height:130px;

    border-radius:20px;

    background:rgba(255,255,255,.035);

    border:1px solid rgba(255,255,255,.08);

    pointer-events:auto;

    display:flex;
    align-items:center;
    justify-content:center;

    color:rgba(255,255,255,.35);

    font-size:11px;
}

@media(max-width:700px){

    #help{
        display:none;
    }

    #mobileControls{
        display:block;
    }

    .top-left{
        top:10px;
        left:10px;

        min-width:150px;

        padding:9px 11px;
    }

    .game-title{
        font-size:14px;
    }

    .location{
        font-size:10px;
    }

    .stats{
        font-size:10px;
        gap:8px;
    }

    #compass{
        top:10px;
        font-size:10px;
    }

    #minimap{
        width:120px;
        height:120px;

        right:10px;
        bottom:165px;
    }

}

/* =========================
   LOADING
========================= */

#loading{
    position:fixed;
    inset:0;

    z-index:100;

    background:#070b10;

    display:flex;
    align-items:center;
    justify-content:center;

    flex-direction:column;

    gap:15px;

    transition:opacity .6s;
}

.loading-title{
    font-size:28px;
    font-weight:900;
}

.loading-title span{
    color:#ffca28;
}

.loading-bar{
    width:230px;
    height:5px;

    background:#1d2732;

    border-radius:999px;

    overflow:hidden;
}

.loading-progress{
    height:100%;
    width:0%;

    background:#ffca28;

    transition:.4s;
}

.loading-text{
    color:#8895a5;
    font-size:12px;
}

</style>
</head>

<body>

<div id="game"></div>

<div id="loading">

    <div class="loading-title">
        RD <span>WORLD</span>
    </div>

    <div class="loading-bar">
        <div
            class="loading-progress"
            id="loadingProgress">
        </div>
    </div>

    <div
        class="loading-text"
        id="loadingText">
        Preparando el mundo...
    </div>

</div>


<div id="hud">

    <div class="top-left">

        <div class="game-title">
            🇩🇴 RD <span>WORLD</span>
        </div>

        <div
            class="location"
            id="location">
            Zona rural
        </div>

        <div class="stats">

            <div class="stat">
                🌤️ <b id="timeText">
                    Día
                </b>
            </div>

            <div class="stat">
                🧍 <b>
                    Explorador
                </b>
            </div>

        </div>

    </div>


    <div id="compass">
        N
    </div>


    <div id="help">

        <b>🎮 Controles</b>

        <br><br>

        <b>W A S D</b> — caminar

        <br>

        <b>Mouse</b> — mirar

        <br>

        <b>Shift</b> — correr

        <br>

        <b>Espacio</b> — saltar

        <br><br>

        Explora el mundo.

    </div>


    <div id="minimap">

        <canvas
            id="mapCanvas"
            width="170"
            height="170">
        </canvas>

    </div>


    <div id="message">
        Explora la isla 🇩🇴
    </div>


    <div id="mobileControls">

        <div class="joystick">

            <div class="stick"></div>

        </div>

        <div class="mobile-look">
            DESLIZA PARA MIRAR
        </div>

    </div>

</div>


<!-- Three.js se carga LOCALMENTE desde js/three.module.js. -->
<script type="module">

/* ============================================================
   RD WORLD 3D
   FASE 1
============================================================ */

import * as THREE from './js/three.module.js';

'use strict';


/* ============================================================
   VARIABLES
============================================================ */

let scene;
let camera;
let renderer;

let player;
let playerBody;

let clock;

let sun;
let ambientLight;

let worldTime = 0;

let cameraYaw = 0;
let cameraPitch = 0.25;

let keys = {};

let buildings = [];

let trees = [];

let roads = [];

let ground;

let playerVelocityY = 0;

let canJump = true;

let mouseDown = false;

let lastMouseX = 0;
let lastMouseY = 0;


/* ============================================================
   CONFIGURACIÓN
============================================================ */

const WORLD_SIZE = 900;

const PLAYER_SPEED = 7;

const RUN_SPEED = 13;

const GRAVITY = 28;

const JUMP_FORCE = 11;


/* ============================================================
   LOADING
============================================================ */

function loading(percent,text){

    document
        .getElementById('loadingProgress')
        .style.width =
        percent + '%';

    document
        .getElementById('loadingText')
        .textContent =
        text;

}


/* ============================================================
   ESCENA
============================================================ */

function showFatalError(message){
    const screen=document.getElementById('loading');
    const text=document.getElementById('loadingText');
    const progress=document.getElementById('loadingProgress');
    if(progress){ progress.style.width='100%'; progress.style.background='#ef5350'; }
    if(text){ text.innerHTML='❌ No se pudo iniciar el juego.<br><small style="color:#ff8a80;display:block;margin-top:8px;max-width:520px;text-align:center">'+String(message)+'</small>'; }
    if(screen){ screen.style.opacity='1'; screen.style.pointerEvents='auto'; }
}

function init(){
    if(window.__rdWorldStarted) return;
    if(!THREE || !THREE.Scene || !THREE.WebGLRenderer){
        showFatalError('Three.js no se cargó correctamente desde ./js/three.module.js.');
        return;
    }
    window.__rdWorldStarted=true;
    try{
        loading(10,'Creando el mundo...');


    scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(
            0x7db7e8
        );


    scene.fog =
        new THREE.Fog(
            0x7db7e8,
            180,
            700
        );


    clock =
        new THREE.Clock();


    /* =========================
       CÁMARA
    ========================= */

    camera =
        new THREE.PerspectiveCamera(
            65,
            innerWidth / innerHeight,
            .1,
            1200
        );


    camera.position.set(
        0,
        5,
        10
    );


    /* =========================
       RENDERER
    ========================= */

    renderer =
        new THREE.WebGLRenderer({
            antialias:true,
            powerPreference:'high-performance'
        });


    renderer.setSize(
        innerWidth,
        innerHeight
    );


    renderer.setPixelRatio(
        Math.min(
            devicePixelRatio,
            1.7
        )
    );


    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    document
        .getElementById('game')
        .appendChild(renderer.domElement);


    loading(
        25,
        'Creando iluminación...'
    );


    createLights();


    loading(
        40,
        'Construyendo la isla...'
    );


    createWorld();


    loading(
        65,
        'Construyendo ciudad...'
    );


    createCity();


    loading(
        80,
        'Creando vegetación...'
    );


    createNature();


    loading(
        90,
        'Preparando personaje...'
    );


    createPlayer();


    setupEvents();


    loading(
        100,
        '¡Mundo listo!'
    );


    setTimeout(
        () => {

            const loadingScreen =
                document.getElementById(
                    'loading'
                );

            loadingScreen.style.opacity =
                '0';

            setTimeout(
                () => {

                    loadingScreen.remove();

                },
                700
            );

        },
        500
    );


    animate();

    }catch(error){
        console.error('RD WORLD — error al iniciar:',error);
        showFatalError(error && error.message ? error.message : 'Error desconocido al iniciar el juego.');
    }

}


/* ============================================================
   ILUMINACIÓN
============================================================ */

function createLights(){

    ambientLight =
        new THREE.HemisphereLight(
            0xbfe5ff,
            0x4b3525,
            1.8
        );


    scene.add(
        ambientLight
    );


    sun =
        new THREE.DirectionalLight(
            0xffffff,
            2.4
        );


    sun.position.set(
        100,
        180,
        80
    );


    sun.castShadow = true;


    sun.shadow.mapSize.width =
        2048;

    sun.shadow.mapSize.height =
        2048;


    sun.shadow.camera.left =
        -350;

    sun.shadow.camera.right =
        350;

    sun.shadow.camera.top =
        350;

    sun.shadow.camera.bottom =
        -350;


    scene.add(
        sun
    );

}


/* ============================================================
   MATERIAL
============================================================ */

function material(color){

    return new THREE.MeshStandardMaterial({
        color:color,
        roughness:.9,
        metalness:0
    });

}


/* ============================================================
   CUBO
============================================================ */

function cube(
    width,
    height,
    depth,
    color,
    x,
    y,
    z
){

    const geometry =
        new THREE.BoxGeometry(
            width,
            height,
            depth
        );


    const mesh =
        new THREE.Mesh(
            geometry,
            material(color)
        );


    mesh.position.set(
        x,
        y,
        z
    );


    mesh.castShadow = true;

    mesh.receiveShadow = true;


    scene.add(
        mesh
    );


    return mesh;

}


/* ============================================================
   MUNDO
============================================================ */

function createWorld(){

    /* =========================
       TERRENO
    ========================= */

    const geometry =
        new THREE.PlaneGeometry(
            WORLD_SIZE,
            WORLD_SIZE,
            20,
            20
        );


    const terrainMaterial =
        new THREE.MeshStandardMaterial({
            color:0x4e8a45,
            roughness:1
        });


    ground =
        new THREE.Mesh(
            geometry,
            terrainMaterial
        );


    ground.rotation.x =
        -Math.PI / 2;


    ground.receiveShadow =
        true;


    scene.add(
        ground
    );


    /* =========================
       PLAYA
    ========================= */

    const beach =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                WORLD_SIZE,
                90
            ),
            material(0xd9c38a)
        );


    beach.rotation.x =
        -Math.PI / 2;


    beach.position.z =
        -405;


    beach.position.y =
        .03;


    scene.add(
        beach
    );


    /* =========================
       MAR
    ========================= */

    const ocean =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                1600,
                1600
            ),
            new THREE.MeshStandardMaterial({
                color:0x1976a5,
                roughness:.25,
                metalness:.1
            })
        );


    ocean.rotation.x =
        -Math.PI / 2;


    ocean.position.y =
        -.15;


    ocean.position.z =
        -700;


    scene.add(
        ocean
    );


    /* =========================
       CARRETERA PRINCIPAL
    ========================= */

    createRoad(
        18,
        WORLD_SIZE,
        0,
        0
    );


    createRoad(
        WORLD_SIZE,
        18,
        0,
        0
    );


    createRoad(
        14,
        WORLD_SIZE,
        -150,
        0
    );


    createRoad(
        WORLD_SIZE,
        14,
        0,
        160
    );


}


/* ============================================================
   CARRETERA
============================================================ */

function createRoad(
    width,
    depth,
    x,
    z
){

    const road =
        cube(
            width,
            .08,
            depth,
            0x25282c,
            x,
            .04,
            z
        );


    roads.push(
        road
    );


    /* líneas */

    if(width < depth){

        for(
            let zz = -WORLD_SIZE/2;
            zz < WORLD_SIZE/2;
            zz += 24
        ){

            cube(
                .35,
                .1,
                10,
                0xf4df83,
                x,
                .11,
                zz
            );

        }

    }else{

        for(
            let xx = -WORLD_SIZE/2;
            xx < WORLD_SIZE/2;
            xx += 24
        ){

            cube(
                10,
                .1,
                .35,
                0xf4df83,
                xx,
                .11,
                z
            );

        }

    }

}


/* ============================================================
   CIUDAD
============================================================ */

function createCity(){

    const blocks = [

        [-100,-100],
        [80,-100],
        [-100,100],
        [100,100],
        [220,-70],
        [-230,50],
        [240,150],
        [-250,-170],
        [180,-230],
        [-40,230]

    ];


    blocks.forEach(
        (position,index) => {

            createBuildingBlock(
                position[0],
                position[1],
                index
            );

        }
    );


    /* Plaza */

    const plaza =
        new THREE.Mesh(
            new THREE.CircleGeometry(
                45,
                32
            ),
            material(0xc6b48a)
        );


    plaza.rotation.x =
        -Math.PI/2;


    plaza.position.set(
        0,
        .08,
        0
    );


    scene.add(
        plaza
    );


    /* fuente */

    const fountain =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                8,
                10,
                1,
                32
            ),
            material(0x8d9ba8)
        );


    fountain.position.set(
        0,
        .6,
        0
    );


    fountain.castShadow =
        true;


    scene.add(
        fountain
    );

}


/* ============================================================
   BLOQUE DE EDIFICIOS
============================================================ */

function createBuildingBlock(
    centerX,
    centerZ,
    seed
){

    const count =
        4 + (seed % 3);


    for(
        let i=0;
        i<count;
        i++
    ){

        const x =
            centerX +
            ((i%2)*45) -
            23;


        const z =
            centerZ +
            (Math.floor(i/2)*38) -
            25;


        const width =
            20 + ((i*7)%13);


        const depth =
            18 + ((i*5)%12);


        const height =
            8 + ((i*seed+5)%22);


        const colors = [
            0xe8d7b6,
            0xd6c0a2,
            0xf0d3a7,
            0xc7d3cf,
            0xe1b68a,
            0xbfcbd4
        ];


        const building =
            cube(
                width,
                height,
                depth,
                colors[
                    (i+seed)
                    % colors.length
                ],
                x,
                height/2,
                z
            );


        buildings.push(
            building
        );


        createRoof(
            width,
            depth,
            x,
            height,
            z
        );


        createDoor(
            x,
            height,
            z,
            depth
        );

    }

}


/* ============================================================
   TECHO
============================================================ */

function createRoof(
    width,
    depth,
    x,
    y,
    z
){

    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                Math.max(width,depth)*.72,
                6,
                4
            ),
            material(0x8f4438)
        );


    roof.rotation.y =
        Math.PI/4;


    roof.position.set(
        x,
        y+3,
        z
    );


    roof.scale.z =
        depth/width;


    roof.castShadow =
        true;


    scene.add(
        roof
    );

}


/* ============================================================
   PUERTA
============================================================ */

function createDoor(
    x,
    buildingHeight,
    z,
    depth
){

    const door =
        cube(
            3,
            5,
            .3,
            0x51352b,
            x,
            2.5,
            z-depth/2-.2
        );


    door.castShadow =
        false;

}


/* ============================================================
   NATURALEZA
============================================================ */

function createNature(){

    /* árboles aleatorios */

    for(
        let i=0;
        i<170;
        i++
    ){

        const x =
            (Math.random()-.5)
            * (WORLD_SIZE-60);


        const z =
            (Math.random()-.5)
            * (WORLD_SIZE-60);


        /* evitar centro */

        if(
            Math.abs(x)<70 &&
            Math.abs(z)<70
        ){

            continue;

        }


        /* evitar carreteras */

        if(
            Math.abs(x)<13 ||
            Math.abs(z)<13
        ){

            continue;

        }


        createTree(
            x,
            z
        );

    }


    /* palmeras cerca de la playa */

    for(
        let i=0;
        i<25;
        i++
    ){

        const x =
            (Math.random()-.5)
            * 700;


        const z =
            -370 +
            Math.random()*45;


        createPalm(
            x,
            z
        );

    }

}


/* ============================================================
   ÁRBOL
============================================================ */

function createTree(
    x,
    z
){

    const group =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                .7,
                1,
                7,
                8
            ),
            material(0x70452a)
        );


    trunk.position.y =
        3.5;


    trunk.castShadow =
        true;


    group.add(
        trunk
    );


    const leaves =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                4,
                8,
                8
            ),
            material(0x286a32)
        );


    leaves.position.y =
        8;


    leaves.scale.y =
        .8;


    leaves.castShadow =
        true;


    group.add(
        leaves
    );


    group.position.set(
        x,
        0,
        z
    );


    scene.add(
        group
    );


    trees.push(
        group
    );

}


/* ============================================================
   PALMERA
============================================================ */

function createPalm(
    x,
    z
){

    const group =
        new THREE.Group();


    const trunk =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                .45,
                .8,
                9,
                8
            ),
            material(0x77502c)
        );


    trunk.position.y =
        4.5;


    group.add(
        trunk
    );


    for(
        let i=0;
        i<7;
        i++
    ){

        const leaf =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    .45,
                    .2,
                    6
                ),
                material(0x2c813b)
            );


        leaf.position.y =
            9;


        leaf.rotation.y =
            i * Math.PI*2/7;


        leaf.rotation.x =
            -.35;


        group.add(
            leaf
        );

    }


    group.position.set(
        x,
        0,
        z
    );


    scene.add(
        group
    );

}


/* ============================================================
   PERSONAJE
============================================================ */

function createPlayer(){

    player =
        new THREE.Group();


    /* cuerpo */

    const body =
        new THREE.Mesh(
            new THREE.CapsuleGeometry(
                .65,
                1.5,
                6,
                12
            ),
            material(0x1769aa)
        );


    body.position.y =
        1.7;


    body.castShadow =
        true;


    player.add(
        body
    );


    playerBody =
        body;


    /* cabeza */

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                .58,
                16,
                16
            ),
            material(0xa86f4f)
        );


    head.position.y =
        3.15;


    head.castShadow =
        true;


    player.add(
        head
    );


    /* cabello */

    const hair =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                .6,
                16,
                16
            ),
            material(0x171311)
        );


    hair.position.y =
        3.45;


    hair.scale.y =
        .45;


    player.add(
        hair
    );


    player.position.set(
        0,
        0,
        45
    );


    scene.add(
        player
    );

}


/* ============================================================
   INPUT
============================================================ */

function setupEvents(){

    window.addEventListener(
        'keydown',
        event => {

            keys[
                event.key.toLowerCase()
            ] = true;


            if(
                event.code ===
                'Space'
            ){

                jump();

            }

        }
    );


    window.addEventListener(
        'keyup',
        event => {

            keys[
                event.key.toLowerCase()
            ] = false;

        }
    );


    renderer.domElement.addEventListener(
        'mousedown',
        event => {

            mouseDown =
                true;

            lastMouseX =
                event.clientX;

            lastMouseY =
                event.clientY;

        }
    );


    window.addEventListener(
        'mouseup',
        () => {

            mouseDown =
                false;

        }
    );


    window.addEventListener(
        'mousemove',
        event => {

            if(!mouseDown)
                return;


            const dx =
                event.clientX -
                lastMouseX;


            const dy =
                event.clientY -
                lastMouseY;


            lastMouseX =
                event.clientX;


            lastMouseY =
                event.clientY;


            cameraYaw -=
                dx * .005;


            cameraPitch -=
                dy * .003;


            cameraPitch =
                THREE.MathUtils.clamp(
                    cameraPitch,
                    -.1,
                    .8
                );

        }
    );


    window.addEventListener(
        'resize',
        resize
    );


    setupMobileControls();

}


/* ============================================================
   SALTO
============================================================ */

function jump(){

    if(!canJump)
        return;


    playerVelocityY =
        JUMP_FORCE;


    canJump =
        false;

}


/* ============================================================
   MOVIMIENTO
============================================================ */

function updatePlayer(delta){

    let moveX = 0;

    let moveZ = 0;


    if(
        keys.w ||
        keys.arrowup
    ){

        moveZ -= 1;

    }


    if(
        keys.s ||
        keys.arrowdown
    ){

        moveZ += 1;

    }


    if(
        keys.a ||
        keys.arrowleft
    ){

        moveX -= 1;

    }


    if(
        keys.d ||
        keys.arrowright
    ){

        moveX += 1;

    }


    const moving =
        moveX !== 0 ||
        moveZ !== 0;


    if(moving){

        const length =
            Math.hypot(
                moveX,
                moveZ
            );


        moveX /= length;
        moveZ /= length;


        const speed =
            keys.shift
                ? RUN_SPEED
                : PLAYER_SPEED;


        /* dirección de cámara */

        const sin =
            Math.sin(cameraYaw);


        const cos =
            Math.cos(cameraYaw);


        const worldX =
            moveX*cos -
            moveZ*sin;


        const worldZ =
            moveX*sin +
            moveZ*cos;


        player.position.x +=
            worldX *
            speed *
            delta;


        player.position.z +=
            worldZ *
            speed *
            delta;


        /* rotación */

        player.rotation.y =
            Math.atan2(
                worldX,
                worldZ
            );


        /* animación */

        playerBody.rotation.z =
            Math.sin(
                performance.now()*.01
            )*.035;

    }


    /* gravedad */

    playerVelocityY -=
        GRAVITY *
        delta;


    player.position.y +=
        playerVelocityY *
        delta;


    if(
        player.position.y <= 0
    ){

        player.position.y =
            0;


        playerVelocityY =
            0;


        canJump =
            true;

    }


    /* límites */

    const limit =
        WORLD_SIZE/2 - 20;


    player.position.x =
        THREE.MathUtils.clamp(
            player.position.x,
            -limit,
            limit
        );


    player.position.z =
        THREE.MathUtils.clamp(
            player.position.z,
            -limit,
            limit
        );

}


/* ============================================================
   CÁMARA
============================================================ */

function updateCamera(){

    const distance =
        8;


    const height =
        4.3;


    const target =
        new THREE.Vector3(
            player.position.x,
            player.position.y + 2,
            player.position.z
        );


    const offset =
        new THREE.Vector3(
            Math.sin(cameraYaw)
            * distance,

            height,

            Math.cos(cameraYaw)
            * distance
        );


    offset.applyAxisAngle(
        new THREE.Vector3(1,0,0),
        cameraPitch
    );


    const desired =
        target.clone()
            .add(offset);


    camera.position.lerp(
        desired,
        .12
    );


    camera.lookAt(
        target
    );

}


/* ============================================================
   DÍA / NOCHE
============================================================ */

function updateDayNight(delta){

    worldTime +=
        delta *
        .015;


    if(
        worldTime >
        Math.PI*2
    ){

        worldTime =
            0;

    }


    const sunX =
        Math.cos(worldTime)
        * 250;


    const sunY =
        Math.sin(worldTime)
        * 250;


    sun.position.set(
        sunX,
        Math.max(
            sunY,
            -50
        ),
        100
    );


    const daylight =
        Math.max(
            0.12,
            Math.sin(worldTime)
        );


    sun.intensity =
        .3 +
        daylight*2;


    ambientLight.intensity =
        .45 +
        daylight*1.3;


    const sky =
        new THREE.Color();


    sky.setHSL(
        .57,
        .45,
        .18 +
        daylight*.35
    );


    scene.background =
        sky;


    scene.fog.color =
        sky;


    document
        .getElementById(
            'timeText'
        )
        .textContent =
        daylight > .25
            ? 'Día'
            : 'Noche';

}


/* ============================================================
   UBICACIÓN
============================================================ */

function updateLocation(){

    const x =
        player.position.x;


    const z =
        player.position.z;


    let location =
        'Zona rural';


    if(
        Math.abs(x)<80 &&
        Math.abs(z)<80
    ){

        location =
            'Plaza Central';

    }else if(
        z < -330
    ){

        location =
            'Costa Caribeña';

    }else if(
        x > 180
    ){

        location =
            'Zona Este';

    }else if(
        x < -180
    ){

        location =
            'Zona Oeste';

    }else if(
        z > 180
    ){

        location =
            'Zona Norte';

    }


    document
        .getElementById(
            'location'
        )
        .textContent =
        location;

}


/* ============================================================
   BRÚJULA
============================================================ */

function updateCompass(){

    let degrees =
        cameraYaw *
        180 /
        Math.PI;


    degrees =
        (degrees + 360)
        % 360;


    let direction;


    if(
        degrees >= 315 ||
        degrees < 45
    ){

        direction =
            'N';

    }else if(
        degrees < 135
    ){

        direction =
            'E';

    }else if(
        degrees < 225
    ){

        direction =
            'S';

    }else{

        direction =
            'O';

    }


    document
        .getElementById(
            'compass'
        )
        .textContent =
        direction;

}


/* ============================================================
   MINIMAPA
============================================================ */

function drawMinimap(){

    const canvas =
        document.getElementById(
            'mapCanvas'
        );


    const ctx =
        canvas.getContext('2d');


    const width =
        canvas.width;


    const height =
        canvas.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    ctx.fillStyle =
        '#193321';


    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    const scale =
        width /
        WORLD_SIZE;


    /* carreteras */

    ctx.fillStyle =
        '#4b4d4d';


    roads.forEach(
        road => {

            const box =
                new THREE.Box3()
                    .setFromObject(
                        road
                    );


            const minX =
                (box.min.x +
                WORLD_SIZE/2)
                * scale;


            const maxX =
                (box.max.x +
                WORLD_SIZE/2)
                * scale;


            const minZ =
                (box.min.z +
                WORLD_SIZE/2)
                * scale;


            const maxZ =
                (box.max.z +
                WORLD_SIZE/2)
                * scale;


            ctx.fillRect(
                minX,
                minZ,
                maxX-minX,
                maxZ-minZ
            );

        }
    );


    /* edificios */

    ctx.fillStyle =
        '#8b7765';


    buildings.forEach(
        building => {

            const x =
                (building.position.x+
                WORLD_SIZE/2)
                * scale;


            const z =
                (building.position.z+
                WORLD_SIZE/2)
                * scale;


            ctx.fillRect(
                x-3,
                z-3,
                6,
                6
            );

        }
    );


    /* jugador */

    const px =
        (player.position.x+
        WORLD_SIZE/2)
        * scale;


    const pz =
        (player.position.z+
        WORLD_SIZE/2)
        * scale;


    ctx.fillStyle =
        '#ffca28';


    ctx.beginPath();

    ctx.arc(
        px,
        pz,
        5,
        0,
        Math.PI*2
    );

    ctx.fill();


    /* dirección */

    ctx.strokeStyle =
        '#fff';


    ctx.lineWidth =
        2;


    ctx.beginPath();

    ctx.moveTo(
        px,
        pz
    );


    ctx.lineTo(
        px +
        Math.sin(cameraYaw)*12,

        pz +
        Math.cos(cameraYaw)*12
    );


    ctx.stroke();

}


/* ============================================================
   MENSAJE
============================================================ */

function showMessage(
    text
){

    const message =
        document.getElementById(
            'message'
        );


    message.textContent =
        text;


    message.classList.add(
        'show'
    );


    clearTimeout(
        showMessage.timer
    );


    showMessage.timer =
        setTimeout(
            () => {

                message.classList.remove(
                    'show'
                );

            },
            2500
        );

}


/* ============================================================
   CONTROLES MÓVILES
============================================================ */

function setupMobileControls(){

    const joystick =
        document.querySelector(
            '.joystick'
        );


    const stick =
        document.querySelector(
            '.stick'
        );


    let active =
        false;


    let centerX = 0;

    let centerY = 0;


    joystick.addEventListener(
        'touchstart',
        event => {

            event.preventDefault();

            const touch =
                event.touches[0];


            const rect =
                joystick.getBoundingClientRect();


            centerX =
                rect.left +
                rect.width/2;


            centerY =
                rect.top +
                rect.height/2;


            active =
                true;

        },
        {
            passive:false
        }
    );


    joystick.addEventListener(
        'touchmove',
        event => {

            if(!active)
                return;


            event.preventDefault();


            const touch =
                event.touches[0];


            let dx =
                touch.clientX -
                centerX;


            let dy =
                touch.clientY -
                centerY;


            const max =
                40;


            const length =
                Math.hypot(
                    dx,
                    dy
                );


            if(
                length > max
            ){

                dx =
                    dx/length *
                    max;


                dy =
                    dy/length *
                    max;

            }


            stick.style.transform =
                `translate(${dx}px,${dy}px)`;


            keys.w =
                dy < -10;


            keys.s =
                dy > 10;


            keys.a =
                dx < -10;


            keys.d =
                dx > 10;

        },
        {
            passive:false
        }
    );


    joystick.addEventListener(
        'touchend',
        event => {

            active =
                false;


            stick.style.transform =
                'translate(0,0)';


            keys.w =
                false;

            keys.s =
                false;

            keys.a =
                false;

            keys.d =
                false;

        }
    );


    const look =
        document.querySelector(
            '.mobile-look'
        );


    let previousX = null;

    let previousY = null;


    look.addEventListener(
        'touchstart',
        event => {

            const touch =
                event.touches[0];


            previousX =
                touch.clientX;


            previousY =
                touch.clientY;

        },
        {
            passive:true
        }
    );


    look.addEventListener(
        'touchmove',
        event => {

            event.preventDefault();


            const touch =
                event.touches[0];


            if(
                previousX === null
            )
                return;


            const dx =
                touch.clientX -
                previousX;


            const dy =
                touch.clientY -
                previousY;


            previousX =
                touch.clientX;


            previousY =
                touch.clientY;


            cameraYaw -=
                dx*.008;


            cameraPitch -=
                dy*.004;


            cameraPitch =
                THREE.MathUtils.clamp(
                    cameraPitch,
                    -.1,
                    .8
                );

        },
        {
            passive:false
        }
    );


    look.addEventListener(
        'touchend',
        () => {

            previousX =
                null;

            previousY =
                null;

        }
    );

}


/* ============================================================
   ANIMACIÓN
============================================================ */

function animate(){

    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            clock.getDelta(),
            .05
        );


    updatePlayer(
        delta
    );


    updateCamera();


    updateDayNight(
        delta
    );


    updateLocation();


    updateCompass();


    drawMinimap();


    renderer.render(
        scene,
        camera
    );

}


/* ============================================================
   RESIZE
============================================================ */

function resize(){

    camera.aspect =
        innerWidth /
        innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        innerWidth,
        innerHeight
    );

}


/* ============================================================
   START
============================================================ */

window.addEventListener('error', function(e){
    if(!window.__rdWorldStarted && e && e.message){
        showFatalError(e.message);
    }
});

window.addEventListener('unhandledrejection', function(e){
    if(!window.__rdWorldStarted){
        const reason = e && e.reason;
        showFatalError(reason && reason.message ? reason.message : 'Error al cargar el motor 3D.');
    }
});

window.addEventListener('DOMContentLoaded', function(){
    loading(5,'Cargando motor 3D local...');
    setTimeout(init, 0);
});

</script>

</body>
</html>
