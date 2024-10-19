const fs = require('fs');

// Function to parse the JSON file
function readJSON(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Function to decode y-values from the given base
function decodeYValue(value, base) {
    return parseInt(value, base);  // Convert value from the specified base
}

// Lagrange Interpolation function to find the constant term 'c'
function lagrangeInterpolation(x, y, k) {
    let result = 0;  // Initialize result as 0

    for (let i = 0; i < k; i++) {
        let term = y[i];  // Start with y_i
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= -x[j] / (x[i] - x[j]);  // Multiply terms for interpolation
            }
        }
        result += term;  // Add the Lagrange term to the result
    }

    return result;
}

function main() {
    // Step 1: Read and parse JSON input
    const inputFile = 'input.json';  // Path to the input JSON file
    const jsonObject = readJSON(inputFile);

    // Step 2: Extract keys (n = number of points, k = minimum required)
    const keys = jsonObject['keys'];
    const n = keys['n'];  // Number of roots provided
    const k = keys['k'];  // Minimum number of points required (m+1)

    // Step 3: Prepare arrays to store x and decoded y values
    let xValues = [];
    let yValues = [];

    // Step 4: Extract the values and decode y-values
    for (let i = 1; i <= k; i++) {
        const base = jsonObject[i.toString()]['base'];  // Get base as string
        const value = jsonObject[i.toString()]['value'];  // Get the encoded value

        // Decode the y-value
        const yDecoded = decodeYValue(value, base);

        xValues.push(i);  // The x-value is just the key (1, 2, 3, ...)
        yValues.push(yDecoded);  // Store decoded y-value
    }

    // Step 5: Use Lagrange Interpolation to find the constant term 'c'
    const secret = lagrangeInterpolation(xValues, yValues, k);

    // Step 6: Print the constant term 'c' (the secret)
    console.log("Secret (constant term c):", secret);
}

// Run the program
main();
