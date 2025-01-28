
# Water Jug Challenge

The Water Jugs Problem is a timeless puzzle that tests your ability to think strategically. The challenge involves two water jugs, each with unique, unmarked capacities. The objective is to measure out a precise, predetermined amount of water in one of the jugs using only a specific set of actions.

These actions are simple but demand thoughtful execution to achieve the desired outcome:

- Fill a jug to its maximum capacity: add water until the jug is completely full.
- Empty a jug completely: remove all the water from the jug until it is entirely empty.
- Transfer water between jugs: pour water from one jug into the other until the receiving jug is full or the pouring jug is empty.


## APP Description 💻

This App allows for three inputs, which will be X,Y and Z.

- X -> First water jug
- Y -> Second water jug
- Z -> Desired amount of water

The app is intended to return the values on the screen.


### Algorithm 📋

To ensure the correct operation of the algorithm, all values inserted in the inputs must meet specific conditions: each value must be a positive integer greater than zero. If any of the values are less than or equal to zero, or are not integers, an error message will be generated stating: 'All inputs must be positive integers'.


#### findSolution = (X, Y, Z) =>

This method tackles the Water Jug Problem using the Breadth-First Search (BFS) algorithm, which systematically examines all possible states of the jugs. By utilizing BFS, we can effectively explore every potential move and determine the shortest sequence of actions required to achieve the target water measurement.

```JS
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
```

The findSolution method consists of 3 key elements

##### 1. Outer Function: findSolution(X, Y, Z)

`findSolution`, is designed to solve the Water Jug Problem using recursion and backtracking. Here's a detailed breakdown of how it works:


###### Inputs:
- X: Capacity of bucket X.
- Y: Capacity of bucket Y.
- Z: Target amount of water to be measured in either bucket.

###### Output:
An array of steps that outlines how to measure exactly Z units of water using the two buckets, or an empty array if no solution exists.
The function uses a helper recursive function solve to explore all possible states of the buckets.

##### 2. Inner Recursive Function: solve(bucketX, bucketY, target, steps, visited)

This function explores all possible states of the two buckets (bucketX and bucketY) and tries to find a sequence of steps to reach the target amount.

###### Parameters:

- `bucketX` and `bucketY`: The current amounts of water in bucket X and bucket Y.
- target: The desired amount of water (Z).
- steps: An array of the steps taken so far, each step recording:
- The state of the buckets (bucketX, bucketY).
- The action performed to reach that state.
- The step number.
- visited: A set of states already visited to avoid redundant calculations.

##### 3. Key Features:

- Avoiding Redundancy: The visited set ensures that the same state isn't processed multiple times, optimizing the solution.
- Recursive Depth-First Search: The function systematically explores all possible moves, backtracking when necessary.
- Step Tracking: The steps array records every action, providing a clear explanation of how the solution is reached.



## Getting Started  🚀


This project was built using a set of tools and programming languages designed for speed, efficiency, and reliability. Vite was chosen as the build tool, offering a modern, high-performance environment for development. The main technologies used were React, JavaScript, and CSS. React provided a framework for structuring the app's components, JavaScript added interactivity and dynamic features, while CSS managed the visual appearance and layout. These widely used technologies are well-established in the web development industry, ensuring that the project remains compatible and easy to maintain over time.

To run the project, follow these steps:

### Prerequisites  📋

* Vite and React requires Node.js version 18+ or 20+ [Node.js](https://nodejs.org/en/)
* To make the project, [Visual Studio Code](https://code.visualstudio.com/) was used as a development environment, but other IDEs can be used aswell.


### Installation 🔧

_First, begin by downloading the repository. Open your console, navigate to the directory where you'd like to save the project, and execute the following command:_

```
git clone https://github.com/eddiedibs/chicksgold-frontend
```

_Next, install the required project dependencies by running the following command:_

```
npm install
```

_Once the dependencies are installed, the project is ready for deployment._

## Deployment  📦

_To deploy the project locally (on localhost:5173), run one of the following commands:_

```
npm run dev
```


## Author ✒️

**Eduardo Carmona** - [eddiedibs](https://github.com/eddiedibs)