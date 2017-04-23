
function init() {
    exportNArea = document.getElementById('nodeData');
    exportEArea = document.getElementById('edgeData')
    importButton = document.getElementById('import_button');
    exportButton = document.getElementById('export_button');

    draw();
}

var nodes = null;
var edges = null;
var network = null;

var nodesData = [];


// randomly create some nodes and edges
var data = getScaleFreeNetwork(0);
var network;
var container;
var options

function destroy() {
    if (network !== null) {
    network.destroy();
    network = null;
    }
}

function draw() {
    destroy();
    nodes = [];
    edges = [];

    // create a network
    container = document.getElementById('mynetwork');

    options = {
    manipulation: {
        
        addNode: function (data, callback) {
        data.label = ""
        data.title = ""
        data.shape = "circularImage"
        data.image = ""
        data.id = "0"

        // filling in the popup DOM elements
        document.getElementById('operation').innerHTML = "Add Sim";
        document.getElementById('node-id').value = data.id;
        document.getElementById('node-label').value = data.label;
        document.getElementById('saveButton').onclick = saveData.bind(this, data, callback, "add");
        document.getElementById('cancelButton').onclick = clearPopUp.bind();
        document.getElementById('searchPanel').style.display = 'none';
        document.getElementById('edgePanel').style.display = 'none';
        },
        editNode: function (data, callback) {
        
        // filling in the popup DOM elements
        document.getElementById('operation').innerHTML = "Edit Sim";
        document.getElementById('node-id').value = data.id;
        document.getElementById('node-label').value = data.label;
        document.getElementById('saveButton').onclick = saveData.bind(this, data, callback, "edit");
        document.getElementById('cancelButton').onclick = clearPopUp.bind();
        document.getElementById('searchPanel').style.display = 'none';
        document.getElementById('edgePanel').style.display = 'none';
        
        },
        addEdge: function (data, callback) {
        data.title = document.getElementById('edgeTypes').value;
        data.color = famColour;
        data.arrow = "to";
        callback(data)
        clearPopUp();
        },
        editEdge: function (data, callback) {
        data.arrow = "to";
        data.title = document.getElementById('edgeTypes').value;
        data.color = famColour;
        callback(data)
        clearPopUp();
        }
    }
}; 
    network = new vis.Network(container, data, options);
}

function clearPopUp() {
    document.getElementById('searchPanel').style.display = 'block';
    document.getElementById('edgePanel').style.display = 'none';
    
    console.log("data", data)
}

var ids = []
function updateIds(action, id){
    if(action == "refresh"){
        ids = []
    }
    ids += [id]
}

/*SAVE THE SIM YOU'VE CREATED*/
function saveData(data,callback,change) {

    //Set ID
    if(change == "add"){
        if(ids.length != 0){
            var id = parseInt(ids[ids.length -1]) + 1
            data.id = id       
        }
        ids += [parseInt(data.id)];
    }

    //Set Sim name
    var fullName = document.getElementById('node-label').value;
    var simName = fullName.substr(0, fullName.indexOf(' ')); 
    var famName = fullName.substr(fullName.indexOf(' ')+1); 
    
    data.label = simName;

    //Set Sim Gender
    var circleColour = "#73ABC2"
    var aspiration = ""
    var traits = ""
    var details = ""

    if(document.getElementById("node-female").checked){
        circleColour = "#FFA0B9"
    }else if(document.getElementById("node-dead").checked){
        circleColour = "#C1C1C1"
    }

    //Set Fam colours
    getFamily(famName)

    //Set Details Box
    aspSelect = document.getElementById("aspiration")
    aspiration = getSelectedOptions(aspSelect);

    traitSelect = document.getElementById("traits")
    traits = getSelectedOptions(traitSelect);

    var job = document.getElementById("node-job").value;

    if(traits.length == 1){
    details = "<div class='popup'><p style='display: none;'>" + famName + "</p><img id='asp' src='" + aspiration[0].value + 
                "'><img src='" + traits[0].value + 
                "'><br><p>" + job + "</p></div>"
    }

    if(traits.length == 2){
    details = "<div class='popup'><p style='display: none;'>" + famName + "</p><img id='asp' src='" + aspiration[0].value + 
                "'><img src='" + traits[0].value + 
                "'><img src='" + traits[1].value + 
                "'><br><p>" + job + "</p></div>"
    }

    if(traits.length == 3){
        details = "<div class='popup'><p style='display: none;'>" + famName + "</p><img id='asp' src='" + aspiration[0].value + 
                    "'><img src='" + traits[0].value + 
                    "'><img src='" + traits[1].value + 
                    "'><img src='" + traits[2].value + 
                    "'><br><p>" + job + "</p></div>"
        console.log(details)
    }

    if(traits.length == 4){
        details = "<div class='popup'><p style='display: none;'>" + famName + "</p><img id='asp' src='" + aspiration[0].value + 
                    "'><img src='" + traits[0].value + 
                    "'><img src='" + traits[1].value + 
                    "'><img src='" + traits[2].value + 
                    "'><img src='" + traits[3].value + 
                    "'><br><p>" + job + "</p></div>"
        console.log(details)
    }
    portrait = document.getElementById("portrait").files[0].name;

    data.image = "assets/Sims/" + portrait

    data.title = details;

    data.color = {background: circleColour , border: famColour }
    data.color.highlight = {background: circleColour , border: famColour }

    clearPopUp();
    callback(data);
    
}

function getSelectedOptions(select) {
    var result = [];
    var options = select.getElementsByTagName('option');
    for (var i = 0; i < options.length; i++) {
        if (options[i].selected)
            result.push(options[i]);
    };
    return result;
}

function clearOutputArea() {
        exportNArea.value = "";
        exportEArea.value = "";
    }

function setEdge(){
    console.log("set relationship")
}

function setJob(){
    console.log("set Job")
}

function searchData(){
    //Clear existing results if any
    var resultsList = document.getElementById("results");
    if(resultsList != null){
        resultsList.innerHTML = "";
    }
    
    //get new query and search
    var query = document.getElementById("node-searchData").value;
    query = query.toLowerCase();

    //search by name or trait
    var results = nodesData.get({
        filter: function (item) {
            var name = item.label.toLowerCase();
            var traits = item.title.toLowerCase();
            console.log("name", name, query)
            if(name.includes(query)){
                return (item);
            }
             console.log("traits", traits, query)
            if(traits.includes(query)){
                return (item);
            }
            
        }
    });

    displayResults(results);
}

function displayResults(results){

    console.log(results)
    var resultsList = document.getElementById("results");
    
    //format returned info box
    for(var i=0; i<results.length; i++){
        var resultsItem = document.createElement("li");
        
        var name = document.createElement("div");
        var container = document.createElement("div");
        var img = document.createElement("img");
        var data = document.createElement("div");

        //Extract Last name from details
        var end = results[i].title.indexOf('</p><img'); 
        var famName = results[i].title.substring(45, end);  

        name.innerHTML = results[i].label + " <i>" + famName + "</i>"
        img.src = results[i].image;
        data.innerHTML = results[i].title;

        resultsItem.appendChild(name);
        name.setAttribute("id", "resultName"); // added line

        container.appendChild(img);
        img.setAttribute("style", "height: 60px;"); // added line
        container.appendChild(data);
        data.setAttribute("style", "left: 65px; position: absolute;");
        container.setAttribute("id", "resultItemContainer"); // added line
        resultsItem.appendChild(container);

        resultsItem.setAttribute("id", "resultItem"); // added line
        resultsList.appendChild(resultsItem);
    }
}

var famColour = "#7A7A7A"
/*Family Tree colours*/
var swamp = "#51574a"; var forest = "#447c69"; var moss = "#74c493"; var peat = "#8e8c6d"; var cream = "#e4bf80";
var lemon = "#e9d78e"; var rind = "#e2975d"; var apricot = "#f19670"; var coral = "#e16552"; 
var jasper = "#c94a53"; var dusty = "#be5168"; var orchid = "#a34974"; var mulberry = "#993767";
var plum = "#65387d"; var royal = "#4e2472"; var lavender = "#9163b6"; var pink = "#e279a3"; var candy = "#e0598b";
var sea = "#7c9fb0"; var sky = "#5698c4"; var mint = "#9abf88"; 

/*Autumn Colours*/
var velvet = "#472F49"; var cyan = "#2F7F7C"; var navy = "#043049"; var space ="#1B2338"

function getFamily(fam){
    console.log("family", fam)
    switch(fam){
    case "Alenko":
        famColour = royal;
        break;
    case "Dove":
        famColour = lemon;
        break;
    case "Hathaway":
        famColour = mulberry;
        break;
    case "Howard":
        famColour = rind;
        break;
    case "Johnston":
        famColour = moss;
        break;
    case "McKinnon":
        famColour = sky;
        break;
    case "Mikimoto":
        famColour = jasper;
        break;
    case "Mulligan":
        famColour = pink;
        break;
    case "Norton":
        famColour = mint;
        break;
    case "Powers":
        famColour = forest;
        break;
    case "Rutherford":
        famColour = space;
        break;
    case "Cohen":
        famColour = swamp;
        break;
    case "St John":
        famColour = peat;
        break;
    case "Strong":
        famColour = coral;
        break;
    case "Stone":
        famColour = lavender;
        break;
    default:
        famColour = "#7A7A7A"
    }
}



