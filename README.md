# NoSQL Final Project

## Demo Video
Video - [https://youtu.be/aKORL37PY7c](https://youtu.be/aKORL37PY7c)

You may want to slow down the video speed to 0.75x for more clarity.

## To Generate Random Graphs
- make GenerationAndAnalysisOfGraphs your working directory
- run the following commands
```
npm install
node generateRandomGraphs.js
```
It generates n random graphs with j nodes and an edge between each node is created with a probability of 0.6, so file graph5.json will have edgelist of a graph with 5 nodes and a random weight for each edge between 1 to 10.

- To load a graph data into mongodb:
```
mongoimport --db dgraphs --collection graph5 --file directed/graph5.json --jsonArray

mongoimport --db ugraphs --collection graph5 --file undirected/graph5.json --jsonArray
```

- Switch back to the main or outer directory as your working directory.
- The input.js file specifices the db name, input graph name, output graph name

Following are the commands for using the components

Commands - 

- To create a database:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/createDB.js
```
- To create a cycle graph of size 5 for understanding and testing the scripts:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/createTestCollectionC5.js ./scripts/createTestCollectionC5Plus5.js
```
- To create a famous petersen graph for understanding and testing the scripts:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/createTestCollectionPetersen.js
```
- To copy a graph:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/copyCollectionVariable.js ./scripts/copyCollection.js
```
- To convert Edge list to adjacency list:
```
mongosh ./scripts/input.js ./scripts/edgeToAdjacency.js
```
- To convert Adjacency list to edge list:
```
mongosh ./scripts/input.js ./scripts/adjacenyToEdge.js
```
- To convert Undirected edge list to Directed edge list:
```
mongosh ./scripts/input.js ./scripts/undirectedToDirected.js
```
- To remove self loops:
```
mongosh ./scripts/input.js ./scripts/removeSelfLoops.js
```
- To remove mutli edges and replace the edge weight by the sum:
```
mongosh ./scripts/input.js ./scripts/removeMultiEdges.js
```
- To get a induced subgraph with one vertex deleted:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/subgraphInducedOneVertexVariable.js ./scripts/subgraphInducedOneVertex.js
```
- To get a induced subgraph with multiple vertices deleted:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/subgraphInducedMultipleVertexVariable.js ./scripts/subgraphInducedMultipleVertex.js
```
- To get a subgraph with one edge deleted:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/subgraphOneEdgeVariable.js ./scripts/subgraphOneEdge.js
```
- To get a subgraph with multiple edges deleted:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/subgraphMultipleEdgeVariable.js ./scripts/subgraphMultipleEdge.js
```
- To get a minor of a graph with one edge contracted:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/topologicalMinorOneEdgeVariable.js ./scripts/topologicalMinorOneEdge.js
```
- To get a topological minor of a graph:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/minorOneEdgeVariable.js ./scripts/minorOneEdge.js
```
- To get vertices of components of a graph:
```
$ mongosh ./scripts/nameOfDB.js ./scripts/componentsOfGraphVariable.js ./scripts/componentsOfGraph.js
```
- To get the Weakly connected components of a graph:
```
$ mongosh ./nameOfDB.js ./wccVariable.js ./wcc.js
```
- To export a graph collection to json file:

```
mongoexport --db graphs --collection graph10 --out output/graph10.json --jsonArray
```

## To Analyse the Graphs
- make GenerationAndAnalysisOfGraphs your working directory

To analyse your output graph on the terminal simply change the input json path in analyseOutputGraph.js and run:
```
node analyseOutputGraph.js
```

To visualize any graph.json file in the browser, change  the input json path in analysisScript.js and from the directory of the file run:
```
http-server -p 3000
```
This will start a http server at port 3000 where you can click on the html file in the browser and it will bring up the visualization.

# NoSQL-project
# NoSQL-project
