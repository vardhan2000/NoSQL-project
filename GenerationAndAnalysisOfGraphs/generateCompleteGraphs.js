import fs from "fs";
import jsnx from "jsnetworkx";

for(let j = 1; j <= num_graphs; j++){
    var G = jsnx.completeGraph(j);

    let edgeList = jsnx.convert.toEdgelist(G);
    for (let i = 0; i < edgeList.length; i++) {
      edgeList[i] = {u: edgeList[i][0], v: edgeList[i][1], w: Math.floor(Math.random() * 10) + 1};
    }
    const json = JSON.stringify(edgeList);
    fs.writeFileSync(`complete/graph${j}.json`, json);
}