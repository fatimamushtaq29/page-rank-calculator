import graph from './graphData';
import { createContext, useState } from 'react';
const Context = createContext();

function ContextProvider(props) {

  const [graphData, setGraphData] = useState(graph);
  const [isAddingNodeDisabled, setIsAddingNodeDisabled] = useState(false);
  const [showButtons, setShowButtons] = useState(true)
  const [isShowForms, setIsShowForms] = useState({
    edgeForm: false,
    neighbors: false,
    pageRankForm: false
  })
  const [isDisplayPageRankResult, setIsDisplayPageRankResult] = useState(false)
  const [pageRanks, setPageRanks] = useState({})


  console.log(graphData);
  // add node to graph which exists as an object of adjacency lists.
  // Example graph = {
  //  'A': ['B', 'C'], 
  //  'B': ['A'],
  //  'C': []
  // }
  function addNode() {
    if (!isAddingNodeDisabled) {
      const graphLength = Object.keys(graphData).length;

      // Add node in form of uppercase Alphabets; 65 is the ASCII code for 'A'
      const nodeLetterToAdd = String.fromCharCode(65 + graphLength);

      setGraphData((prevGraphData) => ({
        ...prevGraphData,
        [nodeLetterToAdd]: [],
      }));
    }
  }

  // Add Edges to a given node. Edges will be in form of an array: linkNodeArray
  function addEdges(node, linkNodeArray) {
    setGraphData((prevGraphData) => ({
      ...prevGraphData,
      [node]: [...linkNodeArray],
    }));
  }

  // Show and hide forms functions;
  function showForms(key) {
    setIsShowForms(prevIsShowForms => ({
      ...prevIsShowForms,
      [key]: true
    }))
    setShowButtons(false)
  }
  

  function hideForms() {
    setIsShowForms({
      edgeForm: false,
      neighbors: false,
      pageRankForm: false
    })
    setShowButtons(true)
  }

  //Show and hide PageRank results function
  function showPageRankResult(func) {
    setPageRanks(func())
    setIsDisplayPageRankResult(true)
    setShowButtons(false)
  }

  function hidePageRankResult() {
    setIsDisplayPageRankResult(false)
    setShowButtons(true)
  }

  //PageRank Functionality
  function getPageRank(graph, numberOfIterations) {
    // damping factor 'd' is the probability at each page the "random surfer" will get bored and request another random page.
    // it can be set between 0 and 1. We usually set d to 0.85
    const d = 0.85;

    // iteration variable will be incremented after calculation of previous PageRanks
    let iteration = 0;

    // PageRanks will change after each iteration and they will be stored in previousPageRank Array of objects for each iteration
    // Each iteration(object) of this array will store PageRanks of all nodes for said iteration
    let previousPageRank = [];
    for (let i = 0; i < numberOfIterations + 1; i++) {
      previousPageRank[i] = {};
    }

    //Starting PageRank at iteration 0 for all nodes will be 1 divided by total number of nodes
    Object.keys(graph).forEach(
      (node, index, array) => (previousPageRank[0][node] = 1 / array.length)
    );

    const inboundLinksGraph = getInboundLinksGraph(graph);

    // iteration variable will be incremented after every getPageRankForNextIteration() function call as long as it is less than
    // number of variables
    while (iteration < numberOfIterations) {
      getPageRanksForNextIteration();
      iteration += 1;
    }

    function getPageRanksForNextIteration() {
      let sumPageRank = {};

      // Example: sumPageRank = {'A': [], 'B': [], 'C': []}
      Object.keys(graph).forEach((node) => (sumPageRank[node] = []));

      // PR refers to PageRank
      // I(1) refers to 'inbound link 1' ; I(2) refers to 'inbound link 2'
      // sumPageRank[A] =  PR of I(1) / Number of outbounds for I(1)  +
      //                   PR of I(2) / Number of outbounds for I(2)  + so on
      Object.entries(inboundLinksGraph).forEach(
        ([key, inboundNodes]) =>
          (sumPageRank[key] = inboundNodes.map(
            (node) => previousPageRank[iteration][node] / graph[node].length
          ))
      );

      // PageRank formula is applied and values for each iteration and each node are stored in previousPageRank array
      Object.keys(graph).forEach(
        (node, index, array) =>
          (previousPageRank[iteration + 1][node] =
            (1 - d) / array.length +
            d * sumPageRank[node].reduce((sum, element) => sum + element))
      );
    }
    return previousPageRank[previousPageRank.length-1]
  }

  //Get inbound links of a particular node.
  function getInboundLinksArray(graph, node) {
    // if graph = {
    //  'A': ['B', 'C'],
    //  'B': ['C'],
    //  'C': ['A']
    // }, then getInboundLinksArray(graph, 'C') will return an array ['A', 'B']
    //  because 'C' can be reached through 'A' and 'B'
    let inboundLinksArray = [];
    Object.entries(graph).forEach(
      ([key, linksTo]) =>
        linksTo.find((edge) => edge === node) !== undefined &&
        (inboundLinksArray = [...inboundLinksArray, key])
    );
    return inboundLinksArray;
  }

  // Get inbound links graph of all nodes
  function getInboundLinksGraph(graph) {
    let inboundLinksGraph = {};
    Object.keys(graph).forEach(
      (node) => (inboundLinksGraph[node] = getInboundLinksArray(graph, node))
    );
    return inboundLinksGraph;
  }
  console.log(pageRanks);

  return (
    <Context.Provider
      value={{
        graphData,
        addNode,
        addEdges,
        getPageRank,
        showButtons,
        showForms,
        hideForms,
        isShowForms,
        isDisplayPageRankResult,
        showPageRankResult,
        hidePageRankResult,
        pageRanks
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
