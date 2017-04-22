var exportArea;
var importButton;
var exportButton;

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
      else {
        error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}


function getScaleFreeNetwork(nodeCount) {
  var nodes = [];
  var edges = [];
  var connectionCount = [];

  // randomly create some nodes and edges
  for (var i = 0; i < nodeCount; i++) {
    nodes.push({
      id: i,
      label: String(i)
    });

    connectionCount[i] = 0;

    // create edges in a scale-free-network way
    if (i == 1) {
      var from = i;
      var to = 0;
      edges.push({
        from: from,
        to: to
      });
      connectionCount[from]++;
      connectionCount[to]++;
    }
    else if (i > 1) {
      var conn = edges.length * 2;
      var rand = Math.floor(Math.random() * conn);
      var cum = 0;
      var j = 0;
      while (j < connectionCount.length && cum < rand) {
        cum += connectionCount[j];
        j++;
      }


      var from = i;
      var to = j;
      edges.push({
        from: from,
        to: to
      });
      connectionCount[from]++;
      connectionCount[to]++;
    }
  }

  return {nodes:nodes, edges:edges};
}

var randomSeed = 764; // Math.round(Math.random()*1000);
function seededRandom() {
  var x = Math.sin(randomSeed++) * 10000;
  return x - Math.floor(x);
}

function getScaleFreeNetworkSeeded(nodeCount, seed) {
  if (seed) {
    randomSeed = Number(seed);
  }
  var nodes = [];
  var edges = [];
  var connectionCount = [];
  var edgesId = 0;


  // randomly create some nodes and edges
  for (var i = 0; i < nodeCount; i++) {
    nodes.push({
      id: i,
      label: String(i)
    });

    connectionCount[i] = 0;

    // create edges in a scale-free-network way
    if (i == 1) {
      var from = i;
      var to = 0;
      edges.push({
        id: edgesId++,
        from: from,
        to: to
      });
      connectionCount[from]++;
      connectionCount[to]++;
    }
    else if (i > 1) {
      var conn = edges.length * 2;
      var rand = Math.floor(seededRandom() * conn);
      var cum = 0;
      var j = 0;
      while (j < connectionCount.length && cum < rand) {
        cum += connectionCount[j];
        j++;
      }


      var from = i;
      var to = j;
      edges.push({
        id: edgesId++,
        from: from,
        to: to
      });
      connectionCount[from]++;
      connectionCount[to]++;
    }
  }

  return {nodes:nodes, edges:edges};
}

//*Save and Load*//

function addContextualInformation(elem, index, array) {
    elem.id = index;
    elem.connections = network.getConnectedNodes(index);  
}


function exportNetwork() {
    clearOutputArea();
    
    //Export Nodes
    var nodes = objectToArray(network.body.data.nodes._data);
    nodes.forEach(addContextualInformation);
    var exportNValue = JSON.stringify(nodes, undefined, 2);
    exportNArea.value = exportNValue;
    download(exportNValue, 'Sims_Ndata.txt', 'text/json'); //backup save
    localStorage.setItem("node_data", exportNValue); // save the item 

    //Export Edges
    var edges = objectToArray(network.body.data.edges._data);
    var exportEValue = JSON.stringify(edges, undefined, 2);
    exportEArea.value = exportEValue;
    download(exportEValue, 'Sims_Edata.txt', 'text/json'); //backup save
    localStorage.setItem("edge_data", exportEValue); // save the item 
}

function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

function importNetwork() {
  
    var inputNValue = localStorage.getItem("node_data"); // retrieve
    var inputEValue = localStorage.getItem("edge_data"); // retrieve

    if(inputNValue != null && inputEValue != null){
        //console.log("inputValue", inputNValue, inputEValue)
        var inputNData = JSON.parse(inputNValue);
        var inputEData = JSON.parse(inputEValue);

        nodesData = getNodeData(inputNData)

        var data = {
            nodes: nodesData,
            edges: getEdgeData(inputEData)
        }
        network = new vis.Network(container, data, options);
    }
}

function getNodeData(data) {
    var networkNodes = [];
    updateIds("refresh", null)

    //ADD ATTRIBUTES HERE FOR LOADING NEW ELEMENT ATTRIBUTES
    data.forEach(function(elem, index, array) {
        networkNodes.push({id: elem.id, label: elem.label,
                           x: elem.x, y: elem.y, 
                           title: elem.title, shape: elem.shape,
                           image: elem.image, color: elem.color,
                            });
        updateIds("add", elem.id);
    });

    return new vis.DataSet(networkNodes);
}

function getEdgeData(data) {
    var networkEdges = [];

    //ADD ATTRIBUTES HERE FOR LOADING NEW ELEMENT ATTRIBUTES
     data.forEach(function(edge, index, array) {
         networkEdges.push({from: edge.from, to: edge.to, arrows: 'to', title: edge.title, font: {align: 'middle'}});
    });


    return new vis.DataSet(networkEdges);
}

function objectToArray(obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
}

