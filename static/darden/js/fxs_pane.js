setData();
function setData() {
    fetch(fxs)
    .then(function(response) {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }
        response.json().then(function(data) {

            data = JSON.parse(data);

            const node_num = document.getElementById("fxs_node_num");
            node_num.innerText = data.num_node;

            const edge_num = document.getElementById("fxs_edge_num");
            edge_num.innerText = data.num_edge;

            const scc_num = document.getElementById("fxs_scc_num");
            scc_num.innerText = data.num_conn_comp;

            const lcc_num = document.getElementById("fxs_lcc_num");
            lcc_num.innerText = data.largest_comp;

            const density = document.getElementById("fxs_density_num");
            density.innerText = Math.round(data.density * 100000) / 100000;

            const triangles = document.getElementById("fxs_triangle_num");
            triangles.innerText = data.triangles;

            const trans = document.getElementById("fxs_trans");
            trans.innerText = data.transitivity;
        });
    })

    .catch(function(error) {
        console.log("Fetch error: " + error);
    });

}


// initialize global variables.
var edges;
var nodes;
var network; 
var container;
var options, data;


// This method is responsible for drawing the graph, returns the drawn network
function drawGraph() {
    var container = document.getElementById('fxs_network');

    // parsing and collecting nodes and edges from the python
    nodes = new vis.DataSet([{"group": 3, "id": "\\x1104b4df568fa7af90b1bed1d78a2f71e748dc8a", "label": "\\x1104b4df568fa7af90b1bed1d78a2f71e748dc8a", "shape": "dot", "title": "TransparentUpgradeableProxy Contract", "value": 1}, {"group": 10, "id": "\\x61eb53ee427ab4e007d78a9134aacb3101a2dc23", "label": "\\x61eb53ee427ab4e007d78a9134aacb3101a2dc23", "shape": "dot", "title": "SushiSwap: FXS", "value": 0}, {"group": 7, "id": "\\x278dc748eda1d8efef1adfb518542612b49fcd34", "label": "\\x278dc748eda1d8efef1adfb518542612b49fcd34", "shape": "dot", "title": "FraxGaugeFXSRewardsDistributor", "value": 1}, {"group": 8, "id": "\\x35678017e1d252da1cdd6745b147e3e75d1f9c27", "label": "\\x35678017e1d252da1cdd6745b147e3e75d1f9c27", "shape": "dot", "title": "FraxUnifiedFarm_ERC20_Fraxswap_FRAX_IQ", "value": 0}, {"group": 4, "id": "\\x28120d9d49dbaeb5e34d6b809b842684c482ef27", "label": "\\x28120d9d49dbaeb5e34d6b809b842684c482ef27", "shape": "dot", "title": "VirtualBalanceRewardPool Contract", "value": 1}, {"group": 3, "id": "\\x3cf54f3a1969be9916dad548f3c084331c4450b5", "label": "\\x3cf54f3a1969be9916dad548f3c084331c4450b5", "shape": "dot", "title": "TransparentUpgradeableProxy Contract", "value": 1}, {"group": 5, "id": "\\x4f3ad55d7b884cdc48add1e2451a13af17887f26", "label": "\\x4f3ad55d7b884cdc48add1e2451a13af17887f26", "shape": "dot", "title": "ExtraRewardStashV3 Contract", "value": 1}, {"group": 6, "id": "\\x59cfcd384746ec3035299d90782be065e466800b", "label": "\\x59cfcd384746ec3035299d90782be065e466800b", "shape": "dot", "title": "FraxVoterProxy", "value": 1}, {"group": 9, "id": "\\x685b63cfe0179b3efb70a01dcb1d648549aa192d", "label": "\\x685b63cfe0179b3efb70a01dcb1d648549aa192d", "shape": "dot", "title": "AnyswapV5ERC20", "value": 1}, {"group": 0, "id": "\\xed3105a0ec578908ff55073a22dda66943605e3f", "label": "\\xed3105a0ec578908ff55073a22dda66943605e3f", "shape": "dot", "title": "\\xed3105a0ec578908ff55073a22dda66943605e3f", "value": 0}, {"group": 0, "id": "\\x9acd4f65448208f691417511193686f4b6058952", "label": "\\x9acd4f65448208f691417511193686f4b6058952", "shape": "dot", "title": "\\x9acd4f65448208f691417511193686f4b6058952", "value": 1}, {"group": 0, "id": "\\x9d40dd78d9f03182eed194ba8189dd42af172f0a", "label": "\\x9d40dd78d9f03182eed194ba8189dd42af172f0a", "shape": "dot", "title": "\\x9d40dd78d9f03182eed194ba8189dd42af172f0a", "value": 1}, {"group": 11, "id": "\\xcd8286b48936cdac20518247dbd310ab681a9fbf", "label": "\\xcd8286b48936cdac20518247dbd310ab681a9fbf", "shape": "dot", "title": "Uniswap V3: FXS 2", "value": 0}, {"group": 12, "id": "\\xc6764e58b36e26b08fd1d2aed4538c02171fa872", "label": "\\xc6764e58b36e26b08fd1d2aed4538c02171fa872", "shape": "dot", "title": "veFXSYieldDistributorV4", "value": 1}, {"group": 13, "id": "\\xc8418af6358ffdda74e09ca9cc3fe03ca6adc5b0", "label": "\\xc8418af6358ffdda74e09ca9cc3fe03ca6adc5b0", "shape": "dot", "title": "Frax Finance: veFXS", "value": 1}, {"group": 0, "id": "\\xdc35af40e50007eaa7a5ad287e9401e57b2c5486", "label": "\\xdc35af40e50007eaa7a5ad287e9401e57b2c5486", "shape": "dot", "title": "\\xdc35af40e50007eaa7a5ad287e9401e57b2c5486", "value": 0}, {"group": 14, "id": "\\xd658a338613198204dca1143ac3f01a722b5d94a", "label": "\\xd658a338613198204dca1143ac3f01a722b5d94a", "shape": "dot", "title": "Vyper_contract", "value": 1}, {"group": 15, "id": "\\xda2c338350a0e59ce71cdced9679a3a590dd9bec", "label": "\\xda2c338350a0e59ce71cdced9679a3a590dd9bec", "shape": "dot", "title": "FRAX Finance: Staking FRAX-FXS", "value": 1}]);
    edges = new vis.DataSet([{"arrows": "to", "from": "\\x1104b4df568fa7af90b1bed1d78a2f71e748dc8a", "title": "Date: 2022-08-04T20:23:33+00:00\n Amount: 40.427488522977015 tokens", "to": "\\x61eb53ee427ab4e007d78a9134aacb3101a2dc23"}, {"arrows": "to", "from": "\\x278dc748eda1d8efef1adfb518542612b49fcd34", "title": "Date: 2022-08-04T20:30:39+00:00\n Amount: 14085.94245891238 tokens", "to": "\\x35678017e1d252da1cdd6745b147e3e75d1f9c27"}, {"arrows": "to", "from": "\\x28120d9d49dbaeb5e34d6b809b842684c482ef27", "title": "Date: 2022-08-04T20:23:33+00:00\n Amount: 40.427488522977015 tokens", "to": "\\x3cf54f3a1969be9916dad548f3c084331c4450b5"}, {"arrows": "to", "from": "\\x3cf54f3a1969be9916dad548f3c084331c4450b5", "title": "Date: 2022-08-04T20:23:33+00:00\n Amount: 40.427488522977015 tokens", "to": "\\x1104b4df568fa7af90b1bed1d78a2f71e748dc8a"}, {"arrows": "to", "from": "\\x4f3ad55d7b884cdc48add1e2451a13af17887f26", "title": "Date: 2022-08-04T20:15:00+00:00\n Amount: 15.402174619655048 tokens", "to": "\\x28120d9d49dbaeb5e34d6b809b842684c482ef27"}, {"arrows": "to", "from": "\\x59cfcd384746ec3035299d90782be065e466800b", "title": "Date: 2022-08-04T20:15:00+00:00\n Amount: 15.402174619655048 tokens", "to": "\\x4f3ad55d7b884cdc48add1e2451a13af17887f26"}, {"arrows": "to", "from": "\\x685b63cfe0179b3efb70a01dcb1d648549aa192d", "title": "Date: 2022-08-04T20:00:33+00:00\n Amount: 733.1784368709419 tokens", "to": "\\xed3105a0ec578908ff55073a22dda66943605e3f"}, {"arrows": "to", "from": "\\x9acd4f65448208f691417511193686f4b6058952", "title": "Date: 2022-08-04T20:44:44+00:00\n Amount: 141.0 tokens", "to": "\\x61eb53ee427ab4e007d78a9134aacb3101a2dc23"}, {"arrows": "to", "from": "\\x9d40dd78d9f03182eed194ba8189dd42af172f0a", "title": "Date: 2022-08-04T20:19:00+00:00\n Amount: 378.2476449537546 tokens", "to": "\\xcd8286b48936cdac20518247dbd310ab681a9fbf"}, {"arrows": "to", "from": "\\xc6764e58b36e26b08fd1d2aed4538c02171fa872", "title": "Date: 2022-08-04T20:15:00+00:00\n Amount: 15.402174619655048 tokens", "to": "\\x59cfcd384746ec3035299d90782be065e466800b"}, {"arrows": "to", "from": "\\xc8418af6358ffdda74e09ca9cc3fe03ca6adc5b0", "title": "Date: 2022-08-04T20:12:28+00:00\n Amount: 57.0 tokens", "to": "\\xdc35af40e50007eaa7a5ad287e9401e57b2c5486"}, {"arrows": "to", "from": "\\xd658a338613198204dca1143ac3f01a722b5d94a", "title": "Date: 2022-08-04T20:42:00+00:00\n Amount: 141.40422072298193 tokens", "to": "\\x9acd4f65448208f691417511193686f4b6058952"}, {"arrows": "to", "from": "\\xda2c338350a0e59ce71cdced9679a3a590dd9bec", "title": "Date: 2022-08-04T20:17:11+00:00\n Amount: 14.164832823540603 tokens", "to": "\\x9d40dd78d9f03182eed194ba8189dd42af172f0a"}]);

    data = {nodes: nodes, edges: edges};

    var options = {
        "configure": {
            "enabled": false
        },
        "edges": {
            "color": {
                "inherit": true
            },
            "smooth": {
                "enabled": true,
                "type": "dynamic"
            }
        },
        "interaction": {
            "dragNodes": true,
            "hideEdgesOnDrag": false,
            "hideNodesOnDrag": false
        },
        "physics": {
            "enabled": true,
            "stabilization": {
                "enabled": true,
                "fit": true,
                "iterations": 1000,
                "onlyDynamicEdges": false,
                "updateInterval": 50
            }
        }
    };

    network = new vis.Network(container, data, options);

    return network;

}

drawGraph();