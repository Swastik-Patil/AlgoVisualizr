function Graph(am, w, h, dir, dag) {
  if (am == undefined) {
    return;
  }
  this.init(am, w, h, dir, dag);
}

Graph.prototype = new Algorithm();
Graph.prototype.constructor = Graph;
Graph.superclass = Algorithm.prototype;

var LARGE_ALLOWED = [
  [
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
  ],
  [
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
  ],
  [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    true,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
  ],
];

var LARGE_CURVE = [
  [0, 0, -0.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.25, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -0.25],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-0.25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0.25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -0.4, 0, 0],
];

var LARGE_X_POS_LOGICAL = [
  600, 700, 800, 900, 650, 750, 850, 600, 700, 800, 900, 650, 750, 850, 600,
  700, 800, 900,
];

var LARGE_Y_POS_LOGICAL = [
  50, 50, 50, 50, 150, 150, 150, 250, 250, 250, 250, 350, 350, 350, 450, 450,
  450, 450,
];

var SMALL_ALLLOWED = [
  [false, true, true, true, true, false, false, false],
  [true, false, true, true, false, true, true, false],
  [true, true, false, false, true, true, true, false],
  [true, true, false, false, false, true, false, true],
  [true, false, true, false, false, false, true, true],
  [false, true, true, true, false, false, true, true],
  [false, true, true, false, true, true, false, true],
  [false, false, false, true, true, true, true, false],
];

var SMALL_CURVE = [
  [0, 0.001, 0, 0.5, -0.5, 0, 0, 0],
  [0, 0, 0, 0.001, 0, 0.001, -0.2, 0],
  [0, 0.001, 0, 0, 0, 0.2, 0, 0],
  [-0.5, 0, 0, 0, 0, 0.001, 0, 0.5],
  [0.5, 0, 0, 0, 0, 0, 0, -0.5],
  [0, 0, -0.2, 0, 0, 0, 0.001, 0.001],
  [0, 0.2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, -0.5, 0.5, 0, 0, 0],
];

var SMALL_X_POS_LOGICAL = [800, 725, 875, 650, 950, 725, 875, 800];
var SMALL_Y_POS_LOGICAL = [25, 125, 125, 225, 225, 325, 325, 425];

var VERTEX_INDEX_COLOR = "#0000FF";
var EDGE_COLOR = "#000000";

var SMALL_SIZE = 8;
var LARGE_SIZE = 18;

var HIGHLIGHT_COLOR = "#0000FF";

Graph.prototype.init = function (am, w, h, directed, dag) {
  directed = directed == undefined ? true : directed;
  dag = dag == undefined ? false : dag;

  Graph.superclass.init.call(this, am, w, h);
  this.nextIndex = 0;

  this.currentLayer = 1;
  this.isDAG = dag;
  this.directed = directed;
  this.currentLayer = 1;
  this.addControls();

  this.setup_small();
};

Graph.prototype.addControls = function (addDirection) {
  if (addDirection == undefined) {
    addDirection = true;
  }
  this.newGraphButton = addControlToAlgorithmBar("Button", "New Graph");
  this.newGraphButton.onclick = this.newGraphCallback.bind(this);

  if (addDirection) {
    var radioButtonList = addRadioButtonGroupToAlgorithmBar(
      ["Directed Graph", "Undirected Graph"],
      "GraphType"
    );
    this.directedGraphButton = radioButtonList[0];
    this.directedGraphButton.onclick = this.directedGraphCallback.bind(
      this,
      true
    );
    this.undirectedGraphButton = radioButtonList[1];
    this.undirectedGraphButton.onclick = this.directedGraphCallback.bind(
      this,
      false
    );
    this.directedGraphButton.checked = this.directed;
    this.undirectedGraphButton.checked = !this.directed;
  }
};

Graph.prototype.directedGraphCallback = function (newDirected, event) {
  if (newDirected != this.directed) {
    this.directed = newDirected;
    this.animationManager.resetAll();
    this.setup();
  }
};

Graph.prototype.smallGraphCallback = function (event) {
  if (this.size != SMALL_SIZE) {
    this.animationManager.resetAll();
    this.setup_small();
  }
};

Graph.prototype.newGraphCallback = function (event) {
  this.animationManager.resetAll();
  steps += "";
  document.querySelector(".explain").innerHTML = "";
  this.setup();
};

Graph.prototype.recolorGraph = function () {
  for (var i = 0; i < this.size; i++) {
    for (var j = 0; j < this.size; j++) {
      if (this.adj_matrix[i][j] >= 0) {
        this.setEdgeColor(i, j, EDGE_COLOR);
      }
    }
  }
};

Graph.prototype.highlightEdge = function (i, j, highlightVal) {
  this.cmd(
    "SetEdgeHighlight",
    this.circleID[i],
    this.circleID[j],
    highlightVal
  );
  if (!this.directed) {
    this.cmd(
      "SetEdgeHighlight",
      this.circleID[j],
      this.circleID[i],
      highlightVal
    );
  }
};

Graph.prototype.setEdgeColor = function (i, j, color) {
  this.cmd("SetTextColor", this.adj_matrixID[i][j], color);
  this.cmd("SetEdgeColor", this.circleID[i], this.circleID[j], color);
  if (!this.directed) {
    this.cmd("SetEdgeColor", this.circleID[j], this.circleID[i], color);
  }
};

Graph.prototype.clearEdges = function () {
  for (var i = 0; i < this.size; i++) {
    for (var j = 0; j < this.size; j++) {
      if (this.adj_matrix[i][j] >= 0) {
        this.cmd("Disconnect", this.circleID[i], this.circleID[j]);
      }
    }
  }
};

Graph.prototype.rebuildEdges = function () {
  this.clearEdges();
  this.buildEdges();
};

Graph.prototype.buildEdges = function () {
  for (var i = 0; i < this.size; i++) {
    for (var j = 0; j < this.size; j++) {
      if (this.adj_matrix[i][j] >= 0) {
        var edgeLabel;
        if (this.showEdgeCosts) {
          edgeLabel = String(this.adj_matrix[i][j]);
        } else {
          edgeLabel = "";
        }
        if (this.directed) {
          this.cmd(
            "Connect",
            this.circleID[i],
            this.circleID[j],
            EDGE_COLOR,
            this.adjustCurveForDirectedEdges(
              this.curve[i][j],
              this.adj_matrix[j][i] >= 0
            ),
            1,
            edgeLabel
          );
        } else if (i < j) {
          this.cmd(
            "Connect",
            this.circleID[i],
            this.circleID[j],
            EDGE_COLOR,
            this.curve[i][j],
            0,
            edgeLabel
          );
        }
      }
    }
  }
};

Graph.prototype.setup_small = function () {
  this.allowed = SMALL_ALLLOWED;
  this.curve = SMALL_CURVE;
  this.x_pos_logical = SMALL_X_POS_LOGICAL;
  this.y_pos_logical = SMALL_Y_POS_LOGICAL;
  this.size = SMALL_SIZE;
  this.setup();
};

Graph.prototype.adjustCurveForDirectedEdges = function (curve, bidirectional) {
  if (!bidirectional || Math.abs(curve) > 0.01) {
    return curve;
  } else {
    return 0.1;
  }
};

Graph.prototype.setup = function () {
  this.commands = new Array();
  this.circleID = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    this.circleID[i] = this.nextIndex++;
    this.cmd(
      "CreateCircle",
      this.circleID[i],
      i,
      this.x_pos_logical[i],
      this.y_pos_logical[i]
    );
    this.cmd("SetTextColor", this.circleID[i], VERTEX_INDEX_COLOR, 0);

    this.cmd("SetLayer", this.circleID[i], 1);
  }

  this.adj_matrix = new Array(this.size);
  this.adj_matrixID = new Array(this.size);
  for (i = 0; i < this.size; i++) {
    this.adj_matrix[i] = new Array(this.size);
    this.adj_matrixID[i] = new Array(this.size);
  }
  console.log(this.adj_matrix);

  var edgePercent;
  if (this.size == SMALL_SIZE) {
    if (this.directed) {
      edgePercent = 0.4;
    } else {
      edgePercent = 0.5;
    }
  } else {
    if (this.directed) {
      edgePercent = 0.35;
    } else {
      edgePercent = 0.6;
    }
  }

  var lowerBound = 0;

  if (this.directed) {
    for (i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        this.adj_matrixID[i][j] = this.nextIndex++;
        if (
          this.allowed[i][j] &&
          Math.random() <= edgePercent &&
          (i < j ||
            Math.abs(this.curve[i][j]) < 0.01 ||
            this.adj_matrixID[j][i] == -1) &&
          (!this.isDAG || i < j)
        ) {
          if (this.showEdgeCosts) {
            this.adj_matrix[i][j] = Math.floor(Math.random() * 9) + 1;
          } else {
            this.adj_matrix[i][j] = 1;
          }
        } else {
          this.adj_matrix[i][j] = -1;
        }
      }
    }
    this.buildEdges();
  } else {
    for (i = 0; i < this.size; i++) {
      for (j = i + 1; j < this.size; j++) {
        this.adj_matrixID[i][j] = this.nextIndex++;
        this.adj_matrixID[j][i] = this.nextIndex++;

        if (this.allowed[i][j] && Math.random() <= edgePercent) {
          if (this.showEdgeCosts) {
            this.adj_matrix[i][j] = Math.floor(Math.random() * 9) + 1;
          } else {
            this.adj_matrix[i][j] = 1;
          }
          this.adj_matrix[j][i] = this.adj_matrix[i][j];
          if (this.showEdgeCosts) {
            var edgeLabel = String(this.adj_matrix[i][j]);
          } else {
            edgeLabel = "";
          }
          this.cmd(
            "Connect",
            this.circleID[i],
            this.circleID[j],
            EDGE_COLOR,
            this.curve[i][j],
            0,
            edgeLabel
          );
        } else {
          this.adj_matrix[i][j] = -1;
          this.adj_matrix[j][i] = -1;
        }
      }
    }

    this.buildEdges();

    for (i = 0; i < this.size; i++) {
      this.adj_matrix[i][i] = -1;
    }
  }

  this.animationManager.setAllLayers([0, this.currentLayer]);
  this.animationManager.StartNewAnimation(this.commands);
  this.animationManager.skipForward();
  this.animationManager.clearHistory();
  this.clearHistory();
};

Graph.prototype.resetAll = function () {};

// NEED TO OVERRIDE IN PARENT
Graph.prototype.reset = function () {
  // Throw an error?
};

Graph.prototype.disableUI = function (event) {
  this.newGraphButton.disabled = true;
  if (this.directedGraphButton != null && this.directedGraphButton != undefined)
    this.directedGraphButton.disabled = true;
  if (
    this.undirectedGraphButton != null &&
    this.undirectedGraphButton != undefined
  )
    this.undirectedGraphButton.disabled = true;
  this.enableUI();
};

Graph.prototype.enableUI = function (event) {
  this.newGraphButton.disabled = false;
  if (this.directedGraphButton != null && this.directedGraphButton != undefined)
    this.directedGraphButton.disabled = false;
  if (
    this.undirectedGraphButton != null &&
    this.undirectedGraphButton != undefined
  )
    this.undirectedGraphButton.disabled = false;
};

var currentAlg;
function init() {
  var animManag = initCanvas();
  currentAlg = new Graph(animManag, canvas.width, canvas.height);
}
