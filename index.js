// module aliases
const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } =
    Matter;

// create an engine
const engine = Engine.create();
const { world } = engine;
const height = window.innerHeight;
const width = window.innerWidth;
const wallThickness = 5;
const columns = 3;
const rows = 3;

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
//add mouse capability to darg and throw bodies with mouse
World.add(
    world,
    MouseConstraint.create(engine, {
        mouse: Mouse.create(render.canvas),
    })
);

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

//Maze Generation

// const grid = [];
// for (let i = 0; i < 3; i++) {
//     grid.push([]);
//     for (let j = 0; j < 3; j++) {
//         grid[i].push(false);
//     }
// }

const grid = Array(rows)
    .fill(null)
    .map(() => {
        return Array(columns).fill(false);
    });
const verticals = Array(rows)
    .fill(null)
    .map(() => {
        return Array(columns - 1).fill(false);
    });
const horizontals = Array(rows - 1)
    .fill(null)
    .map(() => {
        return Array(columns).fill(false);
    });

console.log(grid, verticals, horizontals);
