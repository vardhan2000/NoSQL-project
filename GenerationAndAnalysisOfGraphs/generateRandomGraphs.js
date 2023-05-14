import fs from "fs";
import jsnx from "jsnetworkx";

// Generates a random graph with j nodes and
// an edge between each node is created with a probability of 0.6
// so file graph5.json will have edgelist of a graph with 5 nodes
let num_graphs = 4;
let graph_sizes = [0, 10,100,1000, 5000]
for(let j = 1; j <= num_graphs; j++){
    var G = jsnx.binomialGraph(graph_sizes[j], 0.6);

    let edgeList = jsnx.convert.toEdgelist(G);
    for (let i = 0; i < edgeList.length; i++) {
      edgeList[i] = {u: edgeList[i][0], v: edgeList[i][1], w: Math.floor(Math.random() * 10) + 1};
    }
    const json = JSON.stringify(edgeList);
    fs.writeFileSync(`./directed/graph${graph_sizes[j]}.json`, json);
    
    let undirected = jsnx.convert.convertToDirected(G);
    let un_edgeList = jsnx.convert.toEdgelist(undirected);
    for (let i = 0; i < un_edgeList.length; i++) {
        un_edgeList[i] = {u: un_edgeList[i][0], v: un_edgeList[i][1], w: Math.floor(Math.random() * 10) + 1};
    }
    const un_json = JSON.stringify(un_edgeList);
    fs.writeFileSync(`./undirected/graph${graph_sizes[j]}.json`, un_json);
}