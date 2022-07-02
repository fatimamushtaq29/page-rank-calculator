This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### PageRank Theory

PageRank (PR) is an algorithm used by Google Search to rank web pages in their search engine results. It is named after both the term "web page" and co-founder Larry Page. PageRank is a way of measuring the importance of website pages.

## Formula

![](/images/pagerank-formula.jpg)

- In the above formula Page Rank of A is being calculated. 
- B, C, and D are incoming links to A.
- PR(B), PR(C), PR(D) are Page Ranks of B, C and D at previous iteration.
- Assumption: In iteration 0, all nodes have an equal Page Rank of 1 divided by total number of nodes.
- L(B), L(C), L(D) are outbound links of B, C and D
- N is the total number of nodes
- d is the damping factor. The probability, at any step, that the person will continue is a damping factor d. It is usually set to 0.85

## Project Overview

Users should be able to:

- Add nodes to a graph
- Add/Edit/Delete edges to a graph
- Get neighboring nodes given a node
- Calculate Page Ranks of all nodes where user will provide number of iterations

## Demo

[https://fatimamushtaq29.github.io/page-rank-calculator/](https://fatimamushtaq29.github.io/page-rank-calculator/)

Please refresh this site if it doesn't load on first try. 
Sometimes there is this error in the console: Error with Permissions-Policy header: Origin trial controlled feature not enabled: 'interest-cohort'. I am still trying to figure it out.

## Built with

- React
- Javascript
- Tailwind

All of the app functions are in Context and EdgeFormContext files

## Assumptions

- damping factor is going to be 0.85
- graph will be in the form of an object with adjacency lists to demonstrate edges/links like shown in image below

![](/images/graph-format.jpg)

- in the above image, keys are all the nodes and values are corresponding edges
- It is assumed that graph will not include self-edge to a node, for example node 'A' can not have 'A' in it's corresponding edges array
- If the edge array includes a node, then that must be a key/node as well in graph, for example if node 'A' has a link to 'F', then 'F' must be in the graph object as a node/key even if it does not have any outgoing links, 'F' edges will be an empty array


## Limitations

- User can add only 26 nodes from 'A' to 'Z'
- Number of iterations will be between 10-100 for calculating Page Rank

## To Be Added

- Unit Testing - This project does not have any unit testing capabilities
- Graph Visualization
