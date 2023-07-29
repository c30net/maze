// module aliases
const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } =
    Matter;

// create an engine
const engine = Engine.create();
const { world } = engine;
const height = window.innerHeight;
const width = window.innerWidth;
const wallThickness = 5;
let columns = 9;
let rows = 16;
if (innerHeight > innerWidth) {
    columns = 9;
    rows = 16;
}

const horizontalWall = width / columns;
const verticalWall = height / rows;

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
    Bodies.rectangle(width, height / 2, wallThickness, height, {
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
    Bodies.rectangle(0, height / 2, wallThickness, height, {
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

const startRow = Math.floor(Math.random() * rows);
const startColumn = Math.floor(Math.random() * columns);
const shuffle = (arr) => {
    let index = arr.length - 1;
    while (index >= 0) {
        const randomNumber1 = Math.floor(Math.random() * index);
        const temp = arr[randomNumber1];
        arr[randomNumber1] = arr[index];
        arr[index] = temp;
        index--;
        //console.log(randomNumber1, arr[randomNumber1], arr);
    }
    return arr;
};
const stepThroughCell = (row, column) => {
    //if i have visited the cell at [row , column] return
    if (grid[row][column]) {
        return;
    }
    //mark this cell as being visited : set it as true

    grid[row][column] = true;

    //assemble randomly-ordered list of neighbors
    const neighbors = [
        //above
        [row - 1, column, 'up'],
        //right
        [row, column + 1, 'right'],
        //below
        [row + 1, column, 'below'],
        //left
        [row, column - 1, 'left'],
    ];
    const randomizedNeighbors = shuffle(neighbors);

    //for each neighbor
    // console.log(randomizedNeighbors);
    for (let neighbor of randomizedNeighbors) {
        const [nextRow, nextColumn, direction] = neighbor;

        //see if that neighbor is out of bounds
        if (
            nextRow < 0 ||
            nextRow > rows - 1 ||
            nextColumn < 0 ||
            nextColumn > columns - 1
        ) {
            continue;
        }

        //if we have visited that neighbor , continue to next neighbor but before continuing
        if (grid[nextRow][nextColumn]) {
            continue;
        }
        if (direction === 'up') {
            horizontals[row - 1][column] = true;
        } else if (direction === 'right') {
            verticals[row][column] = true;
        } else if (direction === 'below') {
            horizontals[row][column] = true;
        } else if (direction === 'left') {
            verticals[row][column - 1] = true;
        }

        stepThroughCell(nextRow, nextColumn);

        //remove a wall from either horizontals or verticals
    }

    //then visit that next cell: it means call stepThroughCell again
    //and pass to it the next cell coordinates
};
stepThroughCell(startRow, startColumn);
//stepThroughCell(1, 1);
verticals.forEach((vWalls, index1) => {
    vWalls.forEach((vWall, index2) => {
        if (!vWall) {
            World.add(
                world,
                Bodies.rectangle(
                    (index2 + 1) * horizontalWall,
                    index1 * verticalWall + verticalWall / 2,
                    wallThickness,
                    verticalWall,
                    {
                        isStatic: true,
                        render: {
                            fillStyle: 'yellow',
                        },
                    }
                )
            );
        }
    });
});
horizontals.forEach((hWalls, index3) => {
    hWalls.forEach((hWall, index4) => {
        if (!hWall) {
            World.add(
                world,
                Bodies.rectangle(
                    index4 * horizontalWall + horizontalWall / 2,
                    (index3 + 1) * verticalWall,
                    horizontalWall,
                    wallThickness,
                    {
                        isStatic: true,
                        render: {
                            fillStyle: 'yellow',
                        },
                    }
                )
            );
        }
    });
});

//GOAL
const goal = Bodies.rectangle(
    width - horizontalWall / 2,
    height - verticalWall / 2,
    horizontalWall * 0.8,
    verticalWall * 0.8,
    {
        isStatic: true,
        render: {
            fillStyle: 'yellow',
        },
    }
);
World.add(world, goal);
//Ball
const ball = Bodies.circle(
    horizontalWall / 2,
    verticalWall / 2,
    horizontalWall > verticalWall ? verticalWall / 2.4 : horizontalWall / 2.4,

    {
        isStatic: false,
        render: {
            fillStyle: 'red',
        },
    }
);
World.add(world, ball);
