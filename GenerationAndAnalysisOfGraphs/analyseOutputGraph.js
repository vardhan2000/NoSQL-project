import fs from "fs";
import jsnx from "jsnetworkx";

const filePath  = './directed/graph5.json';
const data = fs.readFileSync(filePath);
const jsonData = JSON.parse(data);

console.log(jsonData);

const graph = new jsnx.Graph();
jsonData.forEach(({ _, u, v, w }) => {
    graph.addEdge(u, v, { weight: w });
});

const res = await jsnx.algorithms.genFindCliques(graph);
const res2 = await jsnx.algorithms.graphCliqueNumber(graph);
const res3 = await jsnx.algorithms.graphNumberOfCliques(graph);
var path = jsnx.allPairsDijkstraPath(graph);
console.log(res);
console.log(res2);
console.log(res3);
console.log("Shortest path from node 0 to node 4 is: ", path.get(0).get(4).join(" -> "));
console.log(graph.nodes().length); // Prints the num of nodes
console.log(graph.edges().length); // Prints the num of edges