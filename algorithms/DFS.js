var AUX_ARRAY_WIDTH = 40;
var AUX_ARRAY_HEIGHT = 40;
var AUX_ARRAY_START_Y = 90;

var VISITED_START_X = 475;
var PARENT_START_X = 400;

var HIGHLIGHT_CIRCLE_COLOR = "#000000";
var DFS_TREE_COLOR = "#0000FF";
var BFS_QUEUE_HEAD_COLOR = "#0000FF";

var QUEUE_START_X = 30;
var QUEUE_START_Y = 50;
var QUEUE_SPACING = 30;

let steps = "";
let st = [];

function DFS(am) {
  this.init(am);
}

DFS.prototype = new Graph();
DFS.prototype.constructor = DFS;
DFS.superclass = Graph.prototype;

DFS.prototype.addControls = function () {
  addLabelToAlgorithmBar("Start Vertex: ");
  this.startField = addControlToAlgorithmBar("Text", "");
  this.startField.onkeydown = this.returnSubmit(
    this.startField,
    this.startCallback.bind(this),
    2,
    true
  );
  this.startButton = addControlToAlgorithmBar("Button", "Run DFS");
  this.startButton.onclick = this.startCallback.bind(this);
  DFS.superclass.addControls.call(this);
};

DFS.prototype.init = function (am, w, h) {
  showEdgeCosts = false;
  DFS.superclass.init.call(this, am, w, h);
};

DFS.prototype.setup = function () {
  DFS.superclass.setup.call(this);
  this.messageID = new Array();
  this.commands = new Array();
  this.visitedID = new Array(this.size);
  this.visitedIndexID = new Array(this.size);
  this.parentID = new Array(this.size);
  this.parentIndexID = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    this.visitedID[i] = this.nextIndex++;
    this.visitedIndexID[i] = this.nextIndex++;
    this.parentID[i] = this.nextIndex++;
    this.parentIndexID[i] = this.nextIndex++;
    this.cmd(
      "CreateRectangle",
      this.visitedID[i],
      "F",
      AUX_ARRAY_WIDTH,
      AUX_ARRAY_HEIGHT,
      VISITED_START_X,
      AUX_ARRAY_START_Y + i * AUX_ARRAY_HEIGHT
    );
    this.cmd(
      "CreateLabel",
      this.visitedIndexID[i],
      i,
      VISITED_START_X - AUX_ARRAY_WIDTH,
      AUX_ARRAY_START_Y + i * AUX_ARRAY_HEIGHT
    );
    this.cmd("SetForegroundColor", this.visitedIndexID[i], VERTEX_INDEX_COLOR);
    this.cmd(
      "CreateRectangle",
      this.parentID[i],
      "",
      AUX_ARRAY_WIDTH,
      AUX_ARRAY_HEIGHT,
      PARENT_START_X,
      AUX_ARRAY_START_Y + i * AUX_ARRAY_HEIGHT
    );
    this.cmd(
      "CreateLabel",
      this.parentIndexID[i],
      i,
      PARENT_START_X - AUX_ARRAY_WIDTH,
      AUX_ARRAY_START_Y + i * AUX_ARRAY_HEIGHT
    );
    this.cmd("SetForegroundColor", this.parentIndexID[i], VERTEX_INDEX_COLOR);
  }
  this.cmd(
    "CreateLabel",
    this.nextIndex++,
    "Parent",
    PARENT_START_X - AUX_ARRAY_WIDTH + 25,
    AUX_ARRAY_START_Y - AUX_ARRAY_HEIGHT,
    0
  );
  this.cmd(
    "CreateLabel",
    this.nextIndex++,
    "Visited",
    VISITED_START_X - AUX_ARRAY_WIDTH + 25,
    AUX_ARRAY_START_Y - AUX_ARRAY_HEIGHT,
    0
  );
  this.animationManager.setAllLayers([0, this.currentLayer]);
  this.animationManager.StartNewAnimation(this.commands);
  this.animationManager.clearHistory();
  this.highlightCircleL = this.nextIndex++;
  this.highlightCircleAL = this.nextIndex++;
  this.highlightCircleAM = this.nextIndex++;
};

DFS.prototype.startCallback = function (event) {
  let startValue;
  if (this.startField.value != "") {
    startValue = this.startField.value;
    if (parseInt(startValue) < this.size) {
      steps = "";
      idx = 0;
      this.implementAction(this.doDFS.bind(this), startValue);
    }
  }
};
let idx = 0;
DFS.prototype.doDFS = function (startVetex) {
  this.visited = new Array(this.size);
  this.commands = new Array();
  if (this.messageID != null) {
    for (var i = 0; i < this.messageID.length; i++) {
      this.cmd("Delete", this.messageID[i]);
    }
  }
  this.rebuildEdges();
  this.messageID = new Array();
  for (i = 0; i < this.size; i++) {
    this.cmd("SetText", this.visitedID[i], "F");
    this.cmd("SetText", this.parentID[i], "");
    this.visited[i] = false;
  }
  var vertex = parseInt(startVetex);
  this.cmd(
    "CreateHighlightCircle",
    this.highlightCircleL,
    HIGHLIGHT_CIRCLE_COLOR,
    this.x_pos_logical[vertex],
    this.y_pos_logical[vertex]
  );
  this.cmd("SetLayer", this.highlightCircleL, 1);
  this.cmd(
    "CreateHighlightCircle",
    this.highlightCircleAL,
    HIGHLIGHT_CIRCLE_COLOR,
    this.adj_list_x_start - this.adj_list_width,
    this.adj_list_y_start + vertex * this.adj_list_height
  );
  this.cmd("SetLayer", this.highlightCircleAL, 2);
  this.cmd(
    "CreateHighlightCircle",
    this.highlightCircleAM,
    HIGHLIGHT_CIRCLE_COLOR,
    this.adj_matrix_x_start - this.adj_matrix_width,
    this.adj_matrix_y_start + vertex * this.adj_matrix_height
  );
  this.cmd("SetLayer", this.highlightCircleAM, 3);

  this.messageY = 30;
  //CLG
  steps += "Starting Vertex : " + vertex + "<br />";
  st[idx] = "Starting Vertex : " + vertex + "<br />";
  idx++;
  // steps += "Starting Vertex : " + vertex + "<br />";
  this.dfsVisit(vertex, 10);
  this.cmd("Delete", this.highlightCircleL);
  this.cmd("Delete", this.highlightCircleAL);
  this.cmd("Delete", this.highlightCircleAM);
  return this.commands;
};

DFS.prototype.dfsVisit = function (startVertex, messageX) {
  var nextMessage = this.nextIndex++;
  this.messageID.push(nextMessage);
  this.cmd(
    "CreateLabel",
    nextMessage,
    "DFS(" + String(startVertex) + ")",
    messageX,
    this.messageY,
    0
  );

  steps += "DFS(" + String(startVertex) + ")<br />";
  this.messageY = this.messageY + 20;
  if (!this.visited[startVertex]) {
    steps += "Visiting vertex " + startVertex + "<br />";
    this.visited[startVertex] = true;
    this.cmd("SetText", this.visitedID[startVertex], "T");
    st[idx] = steps;
    // console.log("Here ", idx);
    this.cmd("Step");
    for (var neighbor = 0; neighbor < this.size; neighbor++) {
      if (this.adj_matrix[startVertex][neighbor] > 0) {
        this.highlightEdge(startVertex, neighbor, 1);
        this.cmd("SetHighlight", this.visitedID[neighbor], 1);
        if (this.visited[neighbor]) {
          nextMessage = this.nextIndex;
          this.cmd(
            "CreateLabel",
            nextMessage,
            "Vertex " + String(neighbor) + " already visited.",
            messageX,
            this.messageY,
            0
          );
          // CLG
          steps += "<br/>DFS(" + String(neighbor) + ")<br />";
          steps += "Vertex " + String(neighbor) + " already visited<br />";
        }
        this.cmd("Step");
        this.highlightEdge(startVertex, neighbor, 0);
        this.cmd("SetHighlight", this.visitedID[neighbor], 0);
        if (this.visited[neighbor]) {
          this.cmd("Delete", nextMessage);
        }

        if (!this.visited[neighbor]) {
          this.cmd(
            "Disconnect",
            this.circleID[startVertex],
            this.circleID[neighbor]
          );
          this.cmd(
            "Connect",
            this.circleID[startVertex],
            this.circleID[neighbor],
            DFS_TREE_COLOR,
            this.curve[startVertex][neighbor],
            1,
            ""
          );
          this.cmd(
            "Move",
            this.highlightCircleL,
            this.x_pos_logical[neighbor],
            this.y_pos_logical[neighbor]
          );
          this.cmd(
            "Move",
            this.highlightCircleAL,
            this.adj_list_x_start - this.adj_list_width,
            this.adj_list_y_start + neighbor * this.adj_list_height
          );
          this.cmd(
            "Move",
            this.highlightCircleAM,
            this.adj_matrix_x_start - this.adj_matrix_width,
            this.adj_matrix_y_start + neighbor * this.adj_matrix_height
          );

          this.cmd("SetText", this.parentID[neighbor], startVertex);
          // CLG
          steps += "<br />Step " + idx + " : <br />";
          idx++;
          this.cmd("Step");
          this.dfsVisit(neighbor, messageX + 20);
          nextMessage = this.nextIndex;
          this.cmd(
            "CreateLabel",
            nextMessage,
            "Returning from recursive call: DFS(" + String(neighbor) + ")",
            messageX + 20,
            this.messageY,
            0
          );

          // CLG
          steps +=
            "Returning from recursive call: DFS(" +
            String(neighbor) +
            ")<br /><br />";

          // CLG END

          this.cmd(
            "Move",
            this.highlightCircleAL,
            this.adj_list_x_start - this.adj_list_width,
            this.adj_list_y_start + startVertex * this.adj_list_height
          );
          this.cmd(
            "Move",
            this.highlightCircleL,
            this.x_pos_logical[startVertex],
            this.y_pos_logical[startVertex]
          );
          this.cmd(
            "Move",
            this.highlightCircleAM,
            this.adj_matrix_x_start - this.adj_matrix_width,
            this.adj_matrix_y_start + startVertex * this.adj_matrix_height
          );
          this.cmd("Step");
          this.cmd("Delete", nextMessage);
        }
        this.cmd("Step");
      }
    }
  }
  steps += "<br/>DFS(" + String(startVertex) + ")<br />";
  steps += "Vertex " + startVertex + " has been visited.<br />";
  st[idx] = steps;
};

// NEED TO OVERRIDE IN PARENT
DFS.prototype.reset = function () {
  // Throw an error?
};

DFS.prototype.enableUI = function (event) {
  this.startField.disabled = false;
  this.startButton.disabled = false;
  this.startButton;
  DFS.superclass.enableUI.call(this, event);
};
DFS.prototype.disableUI = function (event) {
  this.startField.disabled = true;
  this.startButton.disabled = true;

  DFS.superclass.disableUI.call(this, event);
};

var currentAlg;

function init() {
  var animManag = initCanvas();
  currentAlg = new DFS(animManag, canvas.width, canvas.height);
  currentAlg.enableUI();
}

function explain() {
  document.querySelector("#explaination").innerHTML = steps;
  // st.map((step) => {
  //   console.log(step);
  // });
}
