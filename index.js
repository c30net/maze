// module aliases
const { Engine, Render, Runner, World, Bodies, Composite } = Matter;

// create an engine
const engine = Engine.create();
const { world } = engine;
const height = window.innerHeight;
const width = window.innerWidth;
const wallThickness = 5;

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width,
        height,
        wireframes: false,
    },
});

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
//var ground = Bodies.rectangle(500, 830, 1000, 60, { isStatic: true });

// add all of the bodies to the world
//Composite.add(engine.world, [boxA, boxB, ground]);
World.add(world, [boxA, boxB]);
console.log(Matter);

const walls = [
    //upper wall
    Bodies.rectangle(width / 2, 0, width, wallThickness, {
        isStatic: true,
        render: {
            fillStyle: 'red',
        },
    }),
    //right wall
    Bodies.rectangle(width, height / 2, wallThickness, width, {
        isStatic: true,
        render: {
            fillStyle: 'red',
        },
    }),
    //down wall
    Bodies.rectangle(width / 2, height, width, wallThickness, {
        isStatic: true,
        render: {
            fillStyle: 'red',
        },
    }),
    //left wall
    Bodies.rectangle(0, height / 2, wallThickness, width, {
        isStatic: true,
        render: {
            fillStyle: 'red',
        },
    }),
];
World.add(world, walls);
