export const findSolution = (X, Y, Z) => {
    // Helper function to recursively explore the states
    const solve = (bucketX, bucketY, target, steps, visited) => {
        // Check if the current state has reached the target goal
        if (bucketX === target || bucketY === target) {
            const solvedSteps = [...steps];
            solvedSteps[solvedSteps.length - 1].status = "Solved";
            return solvedSteps;
        }

        // Mark the current state as visited
        const stateKey = `${bucketX}-${bucketY}`;
        if (visited.has(stateKey)) {
            return null;  // Skip this state if already visited
        }
        visited.add(stateKey);

        // Define possible actions and resulting states
        const actions = [
            { newBucketX: X, newBucketY: bucketY, action: "Fill bucket X" },
            { newBucketX: bucketX, newBucketY: Y, action: "Fill bucket Y" },
            { newBucketX: 0, newBucketY: bucketY, action: "Empty bucket X" },
            { newBucketX: bucketX, newBucketY: 0, action: "Empty bucket Y" },
            {
                newBucketX: Math.max(0, bucketX - (Y - bucketY)),
                newBucketY: Math.min(Y, bucketX + bucketY),
                action: "Transfer from bucket X to Y"
            },
            {
                newBucketX: Math.min(X, bucketX + bucketY),
                newBucketY: Math.max(0, bucketY - (X - bucketX)),
                action: "Transfer from bucket Y to X"
            }
        ];

        // Explore each possible action recursively
        for (const { newBucketX, newBucketY, action } of actions) {
            const newSteps = [...steps, { step: steps.length + 1, bucketX: newBucketX, bucketY: newBucketY, action }];
            const result = solve(newBucketX, newBucketY, target, newSteps, visited);
            if (result) return result;  // Return the solution if found
        }

        return null;  // No solution found from this state
    };

    // Initialize visited set and start the recursive search from both buckets empty
    const visited = new Set();
    const result = solve(0, 0, Z, [], visited);
    
    // If no solution found, return an empty array
    return result || [];
};

export const getSolution = (req, res) => {
    const { x_capacity, y_capacity, z_amount_wanted } = req.body;

    // Input validation
    if (!Number.isInteger(x_capacity) || !Number.isInteger(y_capacity) || !Number.isInteger(z_amount_wanted) ||
        x_capacity <= 0 || y_capacity <= 0 || z_amount_wanted <= 0) {
        return res.status(400).json({ error: 'All inputs must be positive integers' });
    }

    // Check if a solution is possible (Z must be less than or equal to the maximum of the two bucket capacities)
    if (z_amount_wanted > Math.max(x_capacity, y_capacity)) {
        return res.json({ solution: 'No solution possible' });
    }

    // Get the solution from the findSolution function
    const solution = findSolution(x_capacity, y_capacity, z_amount_wanted);

    if (solution.length === 0) {
        return res.json({ solution: 'No solution possible' });
    }

    res.json({ solution });
};
