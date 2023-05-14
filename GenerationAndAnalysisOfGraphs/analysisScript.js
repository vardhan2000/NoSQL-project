const jsonDataUrl = "./directed/graph5.json";

fetch(jsonDataUrl)
  .then((response) => response.json())
  .then((jsonData) => {
    const graph = new jsnx.Graph();
    jsonData.forEach(({ _, u, v, w }) => {
      graph.addEdge(u, v, { weight: w });
    });
    var path = jsnx.allPairsDijkstraPath(graph);
    const text = document.getElementById("text");
    const res2 = jsnx.algorithms.graphCliqueNumber(graph);
    const res3 = jsnx.algorithms.graphNumberOfCliques(graph);
    var path = jsnx.allPairsDijkstraPath(graph);
    text.innerHTML = "<br>Number of nodes: " + graph.nodes().length;
    text.innerHTML += "<br>Number of edges: " + graph.edges().length;
    text.innerHTML +=
      "<br>Shortest path from node 0 to node 4 is: " +
      path.get(0).get(4).join(" -> ");
    text.innerHTML += "<br>Number of cliques: " + res3;
    text.innerHTML += "<br>Size of maximal clique: " + res2;

    const links = jsonData.map(({ u, v, w }) => ({
      source: u,
      target: v,
      weight: w,
    }));
    const nodes = Array.from(
      new Set(jsonData.flatMap(({ u, v }) => [u, v])),
      (id) => ({ id, color: getRandomColor() })
    );

    const width = 500;
    const height = 500;
    const svg = d3
      .select("#graph-svg")
      .attr("width", width)
      .attr("height", height);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        nodeLabel
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y)
          .text((d) => d.id);

        linkLabel
          .attr("x", (d) => (d.source.x + d.target.x) / 2)
          .attr("y", (d) => (d.source.y + d.target.y) / 2)
          .text((d) => d.weight);
      });

    const link = svg
      .selectAll(".link")
      .data(links)
      .join("line")
      .classed("link", true)
      .attr("stroke-width", (d) => Math.sqrt(d.weight));

    const linkLabel = svg
      .selectAll(".link-label")
      .data(links)
      .join("text")
      .classed("link-label", true)
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .text((d) => d.weight);

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .join("circle")
      .classed("node", true)
      .attr("r", 8)
      .attr("fill", (d) => d.color)
      .call(drag(simulation));

    const nodeLabel = svg
      .selectAll(".node-label")
      .data(nodes)
      .join("text")
      .classed("node-label", true)
      .attr("font-family", "sans-serif")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .text((d) => d.id);

    const adjacencyList = new Map();
    jsonData.forEach(({ u, v }) => {
      if (!adjacencyList.has(u)) {
        adjacencyList.set(u, []);
      }
      if (!adjacencyList.has(v)) {
        adjacencyList.set(v, []);
      }
      adjacencyList.get(u).push(v);
      adjacencyList.get(v).push(u);
    });

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  })
  .catch((error) => {
    console.error(`Failed to load JSON data from ${jsonDataUrl}: ${error}`);
  });
