import React, { useState } from "react";

function App() {
  const [xCapacity, setXCapacity] = useState(0);
  const [yCapacity, setYCapacity] = useState(0);
  const [zAmount, setZAmount] = useState(0);
  const [solution, setSolution] = useState([]);

  const findSolution = (X, Y, Z) => {
    const solve = (bucketX, bucketY, target, steps, visited) => {
      if (bucketX === target || bucketY === target) {
        const solvedSteps = [...steps];
        solvedSteps[solvedSteps.length - 1].status = "Solved";
        return solvedSteps;
      }

      const stateKey = `${bucketX}-${bucketY}`;
      if (visited.has(stateKey)) {
        return null;
      }
      visited.add(stateKey);

      const actions = [
        { newBucketX: bucketX, newBucketY: Y, action: "Fill bucket Y" },
        {
          newBucketX: Math.min(X, bucketX + bucketY),
          newBucketY: Math.max(0, bucketY - (X - bucketX)),
          action: "Transfer from bucket Y to X",
        },
        { newBucketX: 0, newBucketY: bucketY, action: "Empty bucket X" },
        {
          newBucketX: Math.min(X, bucketX + bucketY),
          newBucketY: Math.max(0, bucketY - (X - bucketX)),
          action: "Transfer from bucket Y to X",
        },

        {
          newBucketX: Math.max(0, bucketX - (Y - bucketY)),
          newBucketY: Math.min(Y, bucketX + bucketY),
          action: "Transfer from bucket X to Y",
        },
        { newBucketX: bucketX, newBucketY: 0, action: "Empty bucket Y" },


      ];

      for (const { newBucketX, newBucketY, action } of actions) {
        const newSteps = [
          ...steps,
          { step: steps.length + 1, bucketX: newBucketX, bucketY: newBucketY, action },
        ];
        const result = solve(newBucketX, newBucketY, target, newSteps, visited);
        if (result) return result;
      }

      return null;
    };

    const visited = new Set();
    const result = solve(0, 0, Z, [], visited);
    return result || [];
  };

  const handleSubmit = () => {
    if (xCapacity <= 0 || yCapacity <= 0 || zAmount <= 0) {
      alert("All inputs must be positive integers.");
      return;
    }

    if (zAmount > Math.max(xCapacity, yCapacity)) {
      setSolution([{ action: "No solution possible" }]);
      return;
    }

    const steps = findSolution(xCapacity, yCapacity, zAmount);
    if (steps.length === 0) {
      setSolution([{ action: "No solution possible" }]);
    } else {
      setSolution(steps);
    }
  };

  return (
    <div className="App">
      <h1>Water Jug Problem</h1>
      <div>
        <label>
          Capacity of Bucket X: 
          <input
            type="number"
            value={xCapacity}
            onChange={(e) => setXCapacity(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Capacity of Bucket Y: 
          <input
            type="number"
            value={yCapacity}
            onChange={(e) => setYCapacity(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Amount of Water Needed (Z): 
          <input
            type="number"
            value={zAmount}
            onChange={(e) => setZAmount(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Find Solution</button>
      </div>

      <div>
        <h2>Solution</h2>
        {solution.length === 0 ? (
          <p>No solution found.</p>
        ) : (
          <ul>
            {solution.map((step, index) => (
              <li key={index}>
                Step {step.step}: {step.action}
                {step.status && ` - ${step.status}`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
