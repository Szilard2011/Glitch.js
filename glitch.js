// Define the Glitch element
elements.glitch = {
    color: ["#FF00FF", "#00FFFF", "#FFD700", "#FF3333", "#000000"], // Randomized glitch colors
    behavior: [
        "MUTATE", // Random transformations
        "TELEPORT", // Teleport to a random location
        "CORRUPT" // Corrupt neighboring pixels
    ],
    tick: function(pixel) {
        // Glitch teleportation (moves to a random nearby location)
        if (Math.random() < 0.1) { // 10% chance to teleport
            const teleportX = Math.floor(Math.random() * elements.width);
            const teleportY = Math.floor(Math.random() * elements.height);
            movePixel(pixel.x, pixel.y, teleportX, teleportY);
        }

        // Corruption logic (spread glitch to neighbors)
        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0],  // Cardinal directions
            [1, 1], [-1, 1], [1, -1], [-1, -1] // Diagonal directions
        ];

        directions.forEach(([dx, dy]) => {
            const neighborX = pixel.x + dx;
            const neighborY = pixel.y + dy;

            if (isValidPixel(neighborX, neighborY)) {
                const neighbor = getPixel(neighborX, neighborY);

                if (neighbor && Math.random() < 0.2) { // 20% chance to corrupt
                    neighbor.element = "glitch"; // Spread Glitch
                }
            }
        });

        // Random transformations
        if (Math.random() < 0.05) { // 5% chance to randomly transform itself
            const elementsList = Object.keys(elements);
            const randomElement = elementsList[Math.floor(Math.random() * elementsList.length)];
            pixel.element = randomElement; // Transform into a random element
        }

        // Interactions with other elements
        if (pixel.element === "water" && Math.random() < 0.3) {
            // Special reaction with water
            pixel.element = "steam";
            pixel.color = "#00FFFF";
        } else if (pixel.element === "fire" && Math.random() < 0.3) {
            // Special reaction with fire
            pixel.element = "ash";
            pixel.color = "#333333";
        }
    },
    properties: {
        unstable: true, // A property indicating it is highly unstable
    },
    explosionPower: 5, // Causes explosions when destroyed
};

// Utility functions for sandbox mechanics
function movePixel(x, y, newX, newY) {
    const pixel = getPixel(x, y);
    setPixel(newX, newY, pixel);
    deletePixel(x, y);
}

function isValidPixel(x, y) {
    return x >= 0 && y >= 0 && x < elements.width && y < elements.height;
}

function getPixel(x, y) {
    // Add logic to retrieve a pixel at (x, y)
}

function setPixel(x, y, pixel) {
    // Add logic to set a pixel at (x, y)
}

function deletePixel(x, y) {
    // Add logic to delete a pixel at (x, y)
}
