db = connect("mongodb://localhost:27017/" + dbName);

db.getCollection(inputCollection).aggregate([
  // Stage 1: Group edges by source vertex 'u' and create an array of target vertices 'v'
  {
    $group: {
      _id: "$u",
      v: { $push: "$v" },
      w: { $push: "$w" },
    },
  },

  // Stage 2: Add a 'visited' field to each vertex with an initial value of false
  {
    $addFields: { "visited": false }
  },

  {
    $out: intermediateCollection,
  },
])

db.getCollection(intermediateCollection).aggregate([

  // Stage 3: Perform DFS on each unvisited vertex and create a separate document for each component
  
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          visited: false,
        },
    },
    {
      $graphLookup:
        /**
         * from: The target collection.
         * startWith: Expression to start.
         * connectFromField: Field to connect.
         * connectToField: Field to connect to.
         * as: Name of the array field.
         * maxDepth: Optional max recursion depth.
         * depthField: Optional Name of the depth field.
         * restrictSearchWithMatch: Optional query.
         */
        {
          from: "intermediate_2_C5",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "v",
          as: "vertices",
          // restrictSearchWithMatch: {}
        },
    },
    {
      $addFields:
        /**
         * newField: The new field name.
         * expression: The new field expression.
         */
        {
          visited: true,
          "vertices.visited": true,
        },
    },
    {
      $project: {
        v: "$vertices._id",
      },
    },  
    {
        $out: intermediateCollection+"_2",
    },
]);

db.getCollection(intermediateCollection+"_2").aggregate([
    {
      $unwind: "$v"
    },
    {
      $sort: {
        "v": 1
      }
    },
    {
      $group: {
        _id: "$_id",
        v: { $push: "$v" }
      }
    },
    {
        $project:
        {
            _id: 1,
            v: 1,
            component: "$v"
        }
    },
    {
        $out: intermediateCollection+"_3",
    },
])

db.getCollection(intermediateCollection+"_3").aggregate([
    {
        $project: {
            component: 1,
            string: {
            $reduce: {
                input: {
                $map: {
                    input: "$v",
                    in: { $toString: "$$this" }
                }
                },
                initialValue: "",
                in: { $concat: [ "$$value", ",", "$$this" ] }
            }
            }
        }
    },
    {
        $group:
        {
            _id: "$string",
            component: { $first: "$component" }
        }
    },
    {
        $project:
        {
            _id: 0,
            component:1,
        }
    },
    {
        $out: outputCollection,
    }
])
