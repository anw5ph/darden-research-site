setData();
function setData() {
    fetch(aave)
    .then(function(response) {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }
        response.json().then(function(data) {

            data = JSON.parse(data);

            const node_num = document.getElementById("aave_node_num");
            node_num.innerText = data.num_node;

            const edge_num = document.getElementById("aave_edge_num");
            edge_num.innerText = data.num_edge;

            const scc_num = document.getElementById("aave_scc_num");
            scc_num.innerText = data.num_conn_comp;

            const lcc_num = document.getElementById("aave_lcc_num");
            lcc_num.innerText = data.largest_comp;

            const density = document.getElementById("aave_density_num");
            density.innerText = Math.round(data.density * 100000) / 100000;

            const triangles = document.getElementById("aave_triangle_num");
            triangles.innerText = Math.round(data.triangles * 100000) / 10000;

            const trans = document.getElementById("aave_trans");
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
    var container = document.getElementById('aave_network');

     // parsing and collecting nodes and edges from the python
      nodes = new vis.DataSet([{"group": 0, "id": "\\x3229149012a035ef51d724e0343eb31ce3e4bb7d", "label": "\\x3229149012a035ef51d724e0343eb31ce3e4bb7d", "shape": "dot", "title": "\\x3229149012a035ef51d724e0343eb31ce3e4bb7d", "value": 1}, {"group": 0, "id": "\\x28c6c06298d514db089934071355e5743bf21d60", "label": "\\x28c6c06298d514db089934071355e5743bf21d60", "shape": "dot", "title": "\\x28c6c06298d514db089934071355e5743bf21d60", "value": 1}, {"group": 0, "id": "\\x33566c9d8be6cf0b23795e0d380e112be9d75836", "label": "\\x33566c9d8be6cf0b23795e0d380e112be9d75836", "shape": "dot", "title": "\\x33566c9d8be6cf0b23795e0d380e112be9d75836", "value": 1}, {"group": 0, "id": "\\xd8dc3fd89541a1c0e304e63076bd7f7a3741a88a", "label": "\\xd8dc3fd89541a1c0e304e63076bd7f7a3741a88a", "shape": "dot", "title": "\\xd8dc3fd89541a1c0e304e63076bd7f7a3741a88a", "value": 1}, {"group": 0, "id": "\\xcd531ae9efcce479654c4926dec5f6209531ca7b", "label": "\\xcd531ae9efcce479654c4926dec5f6209531ca7b", "shape": "dot", "title": "\\xcd531ae9efcce479654c4926dec5f6209531ca7b", "value": 0}, {"group": 0, "id": "\\x2629de54a2b7ed0164b896c273bec77a78819a9b", "label": "\\x2629de54a2b7ed0164b896c273bec77a78819a9b", "shape": "dot", "title": "\\x2629de54a2b7ed0164b896c273bec77a78819a9b", "value": 1}, {"group": 6, "id": "\\x22f9dcf4647084d6c31b2765f6910cd85c178c18", "label": "\\x22f9dcf4647084d6c31b2765f6910cd85c178c18", "shape": "dot", "title": "0x: Exchange Proxy Flash Wallet", "value": 2}, {"group": 0, "id": "\\xb5e8c25f34a84613229babf4d0899157d74568f9", "label": "\\xb5e8c25f34a84613229babf4d0899157d74568f9", "shape": "dot", "title": "\\xb5e8c25f34a84613229babf4d0899157d74568f9", "value": 1}, {"group": 0, "id": "\\x2205efa224011dd6c17392b10ec9e906d2aa5d89", "label": "\\x2205efa224011dd6c17392b10ec9e906d2aa5d89", "shape": "dot", "title": "\\x2205efa224011dd6c17392b10ec9e906d2aa5d89", "value": 0}, {"group": 17, "id": "\\x2faf487a4414fe77e2327f0bf4ae2a264a776ad2", "label": "\\x2faf487a4414fe77e2327f0bf4ae2a264a776ad2", "shape": "dot", "title": "FTX Exchange", "value": 3}, {"group": 0, "id": "\\x8914019d12628cce16bc652c39207b604d91d975", "label": "\\x8914019d12628cce16bc652c39207b604d91d975", "shape": "dot", "title": "\\x8914019d12628cce16bc652c39207b604d91d975", "value": 1}, {"group": 0, "id": "\\x33812e984d49ed5b44d75a008c12060e5076238c", "label": "\\x33812e984d49ed5b44d75a008c12060e5076238c", "shape": "dot", "title": "\\x33812e984d49ed5b44d75a008c12060e5076238c", "value": 0}, {"group": 1, "id": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb", "label": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb", "shape": "dot", "title": "Uniswap V3: AAVE", "value": 3}, {"group": 7, "id": "\\x288931fa76d7b0482f0fd0bca9a50bf0d22b9fef", "label": "\\x288931fa76d7b0482f0fd0bca9a50bf0d22b9fef", "shape": "dot", "title": "1inch: Aggregation Executor 2", "value": 1}, {"group": 9, "id": "\\xd784927ff2f95ba542bfc824c8a8a98f3495f6b5", "label": "\\xd784927ff2f95ba542bfc824c8a8a98f3495f6b5", "shape": "dot", "title": "Aave: Incentives Controller", "value": 1}, {"group": 4, "id": "\\x4da27a545c0c5b758a6ba100e3a049001de870f5", "label": "\\x4da27a545c0c5b758a6ba100e3a049001de870f5", "shape": "dot", "title": "Aave: Staked Aave", "value": 1}, {"group": 10, "id": "\\x1111111254fb6c44bac0bed2854e76f90643097d", "label": "\\x1111111254fb6c44bac0bed2854e76f90643097d", "shape": "dot", "title": "1inch v4: Router", "value": 1}, {"group": 0, "id": "\\x466a96abbba294a6489ce46271c506ebd0b56365", "label": "\\x466a96abbba294a6489ce46271c506ebd0b56365", "shape": "dot", "title": "\\x466a96abbba294a6489ce46271c506ebd0b56365", "value": 0}, {"group": 0, "id": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9", "label": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9", "shape": "dot", "title": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9", "value": 3}, {"group": 3, "id": "\\xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf", "label": "\\xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf", "shape": "dot", "title": "MEV Bot", "value": 2}, {"group": 3, "id": "\\x00000000c2cf7648c169b25ef1c217864bfa38cc", "label": "\\x00000000c2cf7648c169b25ef1c217864bfa38cc", "shape": "dot", "title": "MEV Bot", "value": 1}, {"group": 0, "id": "\\xa9d1e08c7793af67e9d92fe308d5697fb81d3e43", "label": "\\xa9d1e08c7793af67e9d92fe308d5697fb81d3e43", "shape": "dot", "title": "\\xa9d1e08c7793af67e9d92fe308d5697fb81d3e43", "value": 4}, {"group": 0, "id": "\\x2b98006084845ae63e28d1f53a78553db6f0d188", "label": "\\x2b98006084845ae63e28d1f53a78553db6f0d188", "shape": "dot", "title": "\\x2b98006084845ae63e28d1f53a78553db6f0d188", "value": 1}, {"group": 8, "id": "\\xd75ea151a61d06868e31f8988d28dfe5e9df57b4", "label": "\\xd75ea151a61d06868e31f8988d28dfe5e9df57b4", "shape": "dot", "title": "SushiSwap: AAVE", "value": 1}, {"group": 0, "id": "\\x10853821beb29e2ff64887c90d4570f384566a3a", "label": "\\x10853821beb29e2ff64887c90d4570f384566a3a", "shape": "dot", "title": "\\x10853821beb29e2ff64887c90d4570f384566a3a", "value": 1}, {"group": 2, "id": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81", "label": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81", "shape": "dot", "title": "Balancer: AAVE-WETH", "value": 3}, {"group": 11, "id": "\\xffc97d72e13e01096502cb8eb52dee56f74dad7b", "label": "\\xffc97d72e13e01096502cb8eb52dee56f74dad7b", "shape": "dot", "title": "Aave: aAAVE Token V2", "value": 1}, {"group": 32, "id": "\\x21a31ee1afc51d94c2efccaa2092ad1028285549", "label": "\\x21a31ee1afc51d94c2efccaa2092ad1028285549", "shape": "dot", "title": "Binance 15", "value": 2}, {"group": 0, "id": "\\xf9eb9ea903a61a98744b56d9dd1a72cf83c48f9e", "label": "\\xf9eb9ea903a61a98744b56d9dd1a72cf83c48f9e", "shape": "dot", "title": "\\xf9eb9ea903a61a98744b56d9dd1a72cf83c48f9e", "value": 0}, {"group": 0, "id": "\\x8c54ebdd960056d2cff5998df5695daca1fc0190", "label": "\\x8c54ebdd960056d2cff5998df5695daca1fc0190", "shape": "dot", "title": "\\x8c54ebdd960056d2cff5998df5695daca1fc0190", "value": 1}, {"group": 0, "id": "\\x6767526a362ec6c6b1df185478e4f01506b73ff3", "label": "\\x6767526a362ec6c6b1df185478e4f01506b73ff3", "shape": "dot", "title": "\\x6767526a362ec6c6b1df185478e4f01506b73ff3", "value": 1}, {"group": 0, "id": "\\x2170a59a79bee0b475b7f1cce0d6e85505acce2f", "label": "\\x2170a59a79bee0b475b7f1cce0d6e85505acce2f", "shape": "dot", "title": "\\x2170a59a79bee0b475b7f1cce0d6e85505acce2f", "value": 0}, {"group": 0, "id": "\\xab63019b15f4605b50ce1b49d934bdcc85d7e937", "label": "\\xab63019b15f4605b50ce1b49d934bdcc85d7e937", "shape": "dot", "title": "\\xab63019b15f4605b50ce1b49d934bdcc85d7e937", "value": 1}, {"group": 0, "id": "\\x25f2226b597e8f9514b3f68f00f494cf4f286491", "label": "\\x25f2226b597e8f9514b3f68f00f494cf4f286491", "shape": "dot", "title": "\\x25f2226b597e8f9514b3f68f00f494cf4f286491", "value": 1}, {"group": 0, "id": "\\x529c3f58d6c2e4b9f8a63f2049cf6b8c3301e59f", "label": "\\x529c3f58d6c2e4b9f8a63f2049cf6b8c3301e59f", "shape": "dot", "title": "\\x529c3f58d6c2e4b9f8a63f2049cf6b8c3301e59f", "value": 0}, {"group": 0, "id": "\\x01c4d578d26c90265f7ec587c1f235e65608d7d3", "label": "\\x01c4d578d26c90265f7ec587c1f235e65608d7d3", "shape": "dot", "title": "\\x01c4d578d26c90265f7ec587c1f235e65608d7d3", "value": 2}, {"group": 0, "id": "\\x9409f4e0d8521a619e1668d82e425a4d8e9db437", "label": "\\x9409f4e0d8521a619e1668d82e425a4d8e9db437", "shape": "dot", "title": "\\x9409f4e0d8521a619e1668d82e425a4d8e9db437", "value": 1}, {"group": 0, "id": "\\x00000000ae347930bd1e7b0f35588b92280f9e75", "label": "\\x00000000ae347930bd1e7b0f35588b92280f9e75", "shape": "dot", "title": "\\x00000000ae347930bd1e7b0f35588b92280f9e75", "value": 2}, {"group": 0, "id": "\\x5ba42facdbc4aeae6befcc567fd62e9242fc69ad", "label": "\\x5ba42facdbc4aeae6befcc567fd62e9242fc69ad", "shape": "dot", "title": "\\x5ba42facdbc4aeae6befcc567fd62e9242fc69ad", "value": 0}, {"group": 0, "id": "\\xfa103c21ea2df71dfb92b0652f8b1d795e51cdef", "label": "\\xfa103c21ea2df71dfb92b0652f8b1d795e51cdef", "shape": "dot", "title": "\\xfa103c21ea2df71dfb92b0652f8b1d795e51cdef", "value": 1}, {"group": 20, "id": "\\xdfd5293d8e347dfe59e90efd55b2956a1343963d", "label": "\\xdfd5293d8e347dfe59e90efd55b2956a1343963d", "shape": "dot", "title": "Binance 16", "value": 1}, {"group": 0, "id": "\\x36efd9914d30b16575429516bfff0f196062dce9", "label": "\\x36efd9914d30b16575429516bfff0f196062dce9", "shape": "dot", "title": "\\x36efd9914d30b16575429516bfff0f196062dce9", "value": 1}, {"group": 0, "id": "\\xeeaa83b2d581a3a790774d4dae7bf354fffe3376", "label": "\\xeeaa83b2d581a3a790774d4dae7bf354fffe3376", "shape": "dot", "title": "\\xeeaa83b2d581a3a790774d4dae7bf354fffe3376", "value": 1}, {"group": 0, "id": "\\x649765821d9f64198c905ec0b2b037a4a52bc373", "label": "\\x649765821d9f64198c905ec0b2b037a4a52bc373", "shape": "dot", "title": "\\x649765821d9f64198c905ec0b2b037a4a52bc373", "value": 0}, {"group": 0, "id": "\\xda73904d044c2e82426e6d9f2a7c65fbce2b63a6", "label": "\\xda73904d044c2e82426e6d9f2a7c65fbce2b63a6", "shape": "dot", "title": "\\xda73904d044c2e82426e6d9f2a7c65fbce2b63a6", "value": 1}, {"group": 0, "id": "\\x0d0707963952f2fba59dd06f2b425ace40b492fe", "label": "\\x0d0707963952f2fba59dd06f2b425ace40b492fe", "shape": "dot", "title": "\\x0d0707963952f2fba59dd06f2b425ace40b492fe", "value": 1}, {"group": 0, "id": "\\xfee4da5ca060c06aabf10c7978df39f6ce82e719", "label": "\\xfee4da5ca060c06aabf10c7978df39f6ce82e719", "shape": "dot", "title": "\\xfee4da5ca060c06aabf10c7978df39f6ce82e719", "value": 0}, {"group": 0, "id": "\\x93c70c3a3fb600f2b7e1125ff382d01b051c36d0", "label": "\\x93c70c3a3fb600f2b7e1125ff382d01b051c36d0", "shape": "dot", "title": "\\x93c70c3a3fb600f2b7e1125ff382d01b051c36d0", "value": 1}, {"group": 12, "id": "\\x3e66b66fd1d0b02fda6c811da9e0547970db2f21", "label": "\\x3e66b66fd1d0b02fda6c811da9e0547970db2f21", "shape": "dot", "title": "Balancer: Exchange Proxy 2", "value": 1}, {"group": 0, "id": "\\xe40c9db4b30c32dfb29f48379c21fc459337ea95", "label": "\\xe40c9db4b30c32dfb29f48379c21fc459337ea95", "shape": "dot", "title": "\\xe40c9db4b30c32dfb29f48379c21fc459337ea95", "value": 1}, {"group": 0, "id": "\\x002e1798bff1ea5bcd703133eb61706070080c19", "label": "\\x002e1798bff1ea5bcd703133eb61706070080c19", "shape": "dot", "title": "\\x002e1798bff1ea5bcd703133eb61706070080c19", "value": 0}, {"group": 0, "id": "\\x135896de8421be2ec868e0b811006171d9df802a", "label": "\\x135896de8421be2ec868e0b811006171d9df802a", "shape": "dot", "title": "\\x135896de8421be2ec868e0b811006171d9df802a", "value": 1}, {"group": 0, "id": "\\x67af61cbea47812ac1eca7b584a13fbae2f8967a", "label": "\\x67af61cbea47812ac1eca7b584a13fbae2f8967a", "shape": "dot", "title": "\\x67af61cbea47812ac1eca7b584a13fbae2f8967a", "value": 0}, {"group": 5, "id": "\\xdef171fe48cf0115b1d80b88dc8eab59176fee57", "label": "\\xdef171fe48cf0115b1d80b88dc8eab59176fee57", "shape": "dot", "title": "Paraswap v5: Augustus Swapper Mainnet", "value": 3}, {"group": 0, "id": "\\x91db9e27e750c43a96926b2e04d795c24f13f67b", "label": "\\x91db9e27e750c43a96926b2e04d795c24f13f67b", "shape": "dot", "title": "\\x91db9e27e750c43a96926b2e04d795c24f13f67b", "value": 1}, {"group": 0, "id": "\\x7390917c51fa26afb227cd41b1d7123e8489d1dc", "label": "\\x7390917c51fa26afb227cd41b1d7123e8489d1dc", "shape": "dot", "title": "\\x7390917c51fa26afb227cd41b1d7123e8489d1dc", "value": 1}, {"group": 0, "id": "\\x3d7103a5f20ab0eaa28eeae750a56c6b1c4b0827", "label": "\\x3d7103a5f20ab0eaa28eeae750a56c6b1c4b0827", "shape": "dot", "title": "\\x3d7103a5f20ab0eaa28eeae750a56c6b1c4b0827", "value": 0}, {"group": 0, "id": "\\x1522900b6dafac587d499a862861c0869be6e428", "label": "\\x1522900b6dafac587d499a862861c0869be6e428", "shape": "dot", "title": "\\x1522900b6dafac587d499a862861c0869be6e428", "value": 0}, {"group": 0, "id": "\\x5596d991bf7753f0f14e1c5b59abbea626725401", "label": "\\x5596d991bf7753f0f14e1c5b59abbea626725401", "shape": "dot", "title": "\\x5596d991bf7753f0f14e1c5b59abbea626725401", "value": 1}, {"group": 0, "id": "\\xd83126c00204da1e2e24c9ea75677936cf4caa64", "label": "\\xd83126c00204da1e2e24c9ea75677936cf4caa64", "shape": "dot", "title": "\\xd83126c00204da1e2e24c9ea75677936cf4caa64", "value": 1}, {"group": 0, "id": "\\x52a258ed593c793251a89bfd36cae158ee9fc4f8", "label": "\\x52a258ed593c793251a89bfd36cae158ee9fc4f8", "shape": "dot", "title": "\\x52a258ed593c793251a89bfd36cae158ee9fc4f8", "value": 0}, {"group": 0, "id": "\\x1b702afe2342b43196c6959f2bebf57156c8f13b", "label": "\\x1b702afe2342b43196c6959f2bebf57156c8f13b", "shape": "dot", "title": "\\x1b702afe2342b43196c6959f2bebf57156c8f13b", "value": 1}, {"group": 0, "id": "\\x1f652b71cd7072ffc91aabb97a4c8d850f93a626", "label": "\\x1f652b71cd7072ffc91aabb97a4c8d850f93a626", "shape": "dot", "title": "\\x1f652b71cd7072ffc91aabb97a4c8d850f93a626", "value": 1}, {"group": 0, "id": "\\xb3c839dbde6b96d37c56ee4f9dad3390d49310aa", "label": "\\xb3c839dbde6b96d37c56ee4f9dad3390d49310aa", "shape": "dot", "title": "\\xb3c839dbde6b96d37c56ee4f9dad3390d49310aa", "value": 1}, {"group": 0, "id": "\\x941b4fdb4b1533ab2cc8b90ff0700f658b4aa642", "label": "\\x941b4fdb4b1533ab2cc8b90ff0700f658b4aa642", "shape": "dot", "title": "\\x941b4fdb4b1533ab2cc8b90ff0700f658b4aa642", "value": 1}, {"group": 0, "id": "\\xec11acc6d90482b9c70cebd04605d0192bd2d8a8", "label": "\\xec11acc6d90482b9c70cebd04605d0192bd2d8a8", "shape": "dot", "title": "\\xec11acc6d90482b9c70cebd04605d0192bd2d8a8", "value": 0}, {"group": 0, "id": "\\x3d31a92dc4416b24b5e2a96654a0cb519c92bcf5", "label": "\\x3d31a92dc4416b24b5e2a96654a0cb519c92bcf5", "shape": "dot", "title": "\\x3d31a92dc4416b24b5e2a96654a0cb519c92bcf5", "value": 1}, {"group": 0, "id": "\\x822b932039be361f5c0453b8cbf4a14162ff6ac4", "label": "\\x822b932039be361f5c0453b8cbf4a14162ff6ac4", "shape": "dot", "title": "\\x822b932039be361f5c0453b8cbf4a14162ff6ac4", "value": 0}, {"group": 0, "id": "\\x5ee749300b534aaa1183ac86ac52995a7edfc7c7", "label": "\\x5ee749300b534aaa1183ac86ac52995a7edfc7c7", "shape": "dot", "title": "\\x5ee749300b534aaa1183ac86ac52995a7edfc7c7", "value": 1}, {"group": 0, "id": "\\xf6c8851b9c02e10bd31e4d853c17e377922f0fc4", "label": "\\xf6c8851b9c02e10bd31e4d853c17e377922f0fc4", "shape": "dot", "title": "\\xf6c8851b9c02e10bd31e4d853c17e377922f0fc4", "value": 1}, {"group": 0, "id": "\\xb8001c3ec9aa1985f6c747e25c28324e4a361ec1", "label": "\\xb8001c3ec9aa1985f6c747e25c28324e4a361ec1", "shape": "dot", "title": "\\xb8001c3ec9aa1985f6c747e25c28324e4a361ec1", "value": 0}, {"group": 0, "id": "\\x99c9fc46f92e8a1c0dec1b1747d010903e884be1", "label": "\\x99c9fc46f92e8a1c0dec1b1747d010903e884be1", "shape": "dot", "title": "\\x99c9fc46f92e8a1c0dec1b1747d010903e884be1", "value": 0}, {"group": 33, "id": "\\xddfabcdc4d8ffc6d5beaf154f18b778f892a0740", "label": "\\xddfabcdc4d8ffc6d5beaf154f18b778f892a0740", "shape": "dot", "title": "Coinbase 3", "value": 0}]);
        edges = new vis.DataSet([{"arrows": "to", "from": "\\x3229149012a035ef51d724e0343eb31ce3e4bb7d", "title": "Date: 2022-08-08T14:00:03+00:00\n Amount: 222.8 tokens", "to": "\\x28c6c06298d514db089934071355e5743bf21d60"}, {"arrows": "to", "from": "\\x33566c9d8be6cf0b23795e0d380e112be9d75836", "title": "Date: 2022-08-08T14:04:14+00:00\n Amount: 499.8 tokens", "to": "\\xd8dc3fd89541a1c0e304e63076bd7f7a3741a88a"}, {"arrows": "to", "from": "\\xd8dc3fd89541a1c0e304e63076bd7f7a3741a88a", "title": "Date: 2022-08-08T14:05:11+00:00\n Amount: 499.8 tokens", "to": "\\xcd531ae9efcce479654c4926dec5f6209531ca7b"}, {"arrows": "to", "from": "\\x2629de54a2b7ed0164b896c273bec77a78819a9b", "title": "Date: 2022-08-08T14:06:30+00:00\n Amount: 5.577629226783194 tokens", "to": "\\x22f9dcf4647084d6c31b2765f6910cd85c178c18"}, {"arrows": "to", "from": "\\xb5e8c25f34a84613229babf4d0899157d74568f9", "title": "Date: 2022-08-08T14:07:20+00:00\n Amount: 1.34588383 tokens", "to": "\\x2205efa224011dd6c17392b10ec9e906d2aa5d89"}, {"arrows": "to", "from": "\\x2faf487a4414fe77e2327f0bf4ae2a264a776ad2", "title": "Date: 2022-08-08T14:06:37+00:00\n Amount: 439.0 tokens", "to": "\\x8914019d12628cce16bc652c39207b604d91d975"}, {"arrows": "to", "from": "\\x22f9dcf4647084d6c31b2765f6910cd85c178c18", "title": "Date: 2022-08-08T14:06:30+00:00\n Amount: 5.577629226783194 tokens", "to": "\\x33812e984d49ed5b44d75a008c12060e5076238c"}, {"arrows": "to", "from": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb", "title": "Date: 2022-08-08T14:12:02+00:00\n Amount: 143.57803553379523 tokens", "to": "\\x288931fa76d7b0482f0fd0bca9a50bf0d22b9fef"}, {"arrows": "to", "from": "\\xd784927ff2f95ba542bfc824c8a8a98f3495f6b5", "title": "Date: 2022-08-08T14:08:19+00:00\n Amount: 6.75128762688e-05 tokens", "to": "\\x4da27a545c0c5b758a6ba100e3a049001de870f5"}, {"arrows": "to", "from": "\\x1111111254fb6c44bac0bed2854e76f90643097d", "title": "Date: 2022-08-08T14:12:02+00:00\n Amount: 656.4223646849401 tokens", "to": "\\x466a96abbba294a6489ce46271c506ebd0b56365"}, {"arrows": "to", "from": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9", "title": "Date: 2022-08-08T14:12:02+00:00\n Amount: 555.0280375361757 tokens", "to": "\\xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf"}, {"arrows": "to", "from": "\\x00000000c2cf7648c169b25ef1c217864bfa38cc", "title": "Date: 2022-08-08T14:12:02+00:00\n Amount: 137.947846152856 tokens", "to": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb"}, {"arrows": "to", "from": "\\x8914019d12628cce16bc652c39207b604d91d975", "title": "Date: 2022-08-08T14:14:50+00:00\n Amount: 439.0 tokens", "to": "\\xa9d1e08c7793af67e9d92fe308d5697fb81d3e43"}, {"arrows": "to", "from": "\\xa9d1e08c7793af67e9d92fe308d5697fb81d3e43", "title": "Date: 2022-08-08T14:13:53+00:00\n Amount: 25.30322996 tokens", "to": "\\x2b98006084845ae63e28d1f53a78553db6f0d188"}, {"arrows": "to", "from": "\\xd75ea151a61d06868e31f8988d28dfe5e9df57b4", "title": "Date: 2022-08-08T14:12:02+00:00\n Amount: 65.74550548963991 tokens", "to": "\\x288931fa76d7b0482f0fd0bca9a50bf0d22b9fef"}, {"arrows": "to", "from": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb", "title": "Date: 2022-08-08T14:10:52+00:00\n Amount: 283.08219088496566 tokens", "to": "\\x10853821beb29e2ff64887c90d4570f384566a3a"}, {"arrows": "to", "from": "\\x288931fa76d7b0482f0fd0bca9a50bf0d22b9fef", "title": "Date: 2022-08-08T14:12:02+00:00\n Amount: 656.4223646849401 tokens", "to": "\\x1111111254fb6c44bac0bed2854e76f90643097d"}, {"arrows": "to", "from": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81", "title": "Date: 2022-08-08T14:12:02+00:00\n Amount: 447.09882366150487 tokens", "to": "\\x288931fa76d7b0482f0fd0bca9a50bf0d22b9fef"}, {"arrows": "to", "from": "\\x10853821beb29e2ff64887c90d4570f384566a3a", "title": "Date: 2022-08-08T14:13:27+00:00\n Amount: 283.08219088496566 tokens", "to": "\\xffc97d72e13e01096502cb8eb52dee56f74dad7b"}, {"arrows": "to", "from": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81", "title": "Date: 2022-08-08T14:12:02+00:00\n Amount: 137.947846152856 tokens", "to": "\\x00000000c2cf7648c169b25ef1c217864bfa38cc"}, {"arrows": "to", "from": "\\xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf", "title": "Date: 2022-08-08T14:12:02+00:00\n Amount: 555.0280375361757 tokens", "to": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81"}, {"arrows": "to", "from": "\\x21a31ee1afc51d94c2efccaa2092ad1028285549", "title": "Date: 2022-08-08T14:15:23+00:00\n Amount: 18.47098177 tokens", "to": "\\xf9eb9ea903a61a98744b56d9dd1a72cf83c48f9e"}, {"arrows": "to", "from": "\\x8c54ebdd960056d2cff5998df5695daca1fc0190", "title": "Date: 2022-08-08T14:15:23+00:00\n Amount: 210.5 tokens", "to": "\\x6767526a362ec6c6b1df185478e4f01506b73ff3"}, {"arrows": "to", "from": "\\xa9d1e08c7793af67e9d92fe308d5697fb81d3e43", "title": "Date: 2022-08-08T14:18:39+00:00\n Amount: 3.13755022 tokens", "to": "\\x2170a59a79bee0b475b7f1cce0d6e85505acce2f"}, {"arrows": "to", "from": "\\xab63019b15f4605b50ce1b49d934bdcc85d7e937", "title": "Date: 2022-08-08T14:15:23+00:00\n Amount: 89.40647818948 tokens", "to": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb"}, {"arrows": "to", "from": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81", "title": "Date: 2022-08-08T14:20:52+00:00\n Amount: 27.662400295158488 tokens", "to": "\\x22f9dcf4647084d6c31b2765f6910cd85c178c18"}, {"arrows": "to", "from": "\\x25f2226b597e8f9514b3f68f00f494cf4f286491", "title": "Date: 2022-08-08T14:19:11+00:00\n Amount: 414.88359479984155 tokens", "to": "\\x529c3f58d6c2e4b9f8a63f2049cf6b8c3301e59f"}, {"arrows": "to", "from": "\\x22f9dcf4647084d6c31b2765f6910cd85c178c18", "title": "Date: 2022-08-08T14:20:52+00:00\n Amount: 27.662400295158488 tokens", "to": "\\x01c4d578d26c90265f7ec587c1f235e65608d7d3"}, {"arrows": "to", "from": "\\x01c4d578d26c90265f7ec587c1f235e65608d7d3", "title": "Date: 2022-08-08T14:20:52+00:00\n Amount: 27.662400295158488 tokens", "to": "\\x9409f4e0d8521a619e1668d82e425a4d8e9db437"}, {"arrows": "to", "from": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9", "title": "Date: 2022-08-08T14:22:25+00:00\n Amount: 342.7618680143304 tokens", "to": "\\xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf"}, {"arrows": "to", "from": "\\x00000000ae347930bd1e7b0f35588b92280f9e75", "title": "Date: 2022-08-08T14:22:25+00:00\n Amount: 142.8478223748779 tokens", "to": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81"}, {"arrows": "to", "from": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9", "title": "Date: 2022-08-08T14:23:29+00:00\n Amount: 44.28354194985915 tokens", "to": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb"}, {"arrows": "to", "from": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9", "title": "Date: 2022-08-08T14:22:25+00:00\n Amount: 25.82241580260078 tokens", "to": "\\xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf"}, {"arrows": "to", "from": "\\xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf", "title": "Date: 2022-08-08T14:22:25+00:00\n Amount: 25.82241580260078 tokens", "to": "\\x5ba42facdbc4aeae6befcc567fd62e9242fc69ad"}, {"arrows": "to", "from": "\\x28c6c06298d514db089934071355e5743bf21d60", "title": "Date: 2022-08-08T14:24:12+00:00\n Amount: 307.59 tokens", "to": "\\xfa103c21ea2df71dfb92b0652f8b1d795e51cdef"}, {"arrows": "to", "from": "\\xdfd5293d8e347dfe59e90efd55b2956a1343963d", "title": "Date: 2022-08-08T14:23:29+00:00\n Amount: 50.0 tokens", "to": "\\x36efd9914d30b16575429516bfff0f196062dce9"}, {"arrows": "to", "from": "\\xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf", "title": "Date: 2022-08-08T14:22:25+00:00\n Amount: 342.7618680143304 tokens", "to": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81"}, {"arrows": "to", "from": "\\x00000000ae347930bd1e7b0f35588b92280f9e75", "title": "Date: 2022-08-08T14:23:29+00:00\n Amount: 71.81576892882009 tokens", "to": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb"}, {"arrows": "to", "from": "\\xfa103c21ea2df71dfb92b0652f8b1d795e51cdef", "title": "Date: 2022-08-08T14:25:41+00:00\n Amount: 307.59 tokens", "to": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9"}, {"arrows": "to", "from": "\\x36efd9914d30b16575429516bfff0f196062dce9", "title": "Date: 2022-08-08T14:26:24+00:00\n Amount: 50.0 tokens", "to": "\\x4da27a545c0c5b758a6ba100e3a049001de870f5"}, {"arrows": "to", "from": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb", "title": "Date: 2022-08-08T14:28:31+00:00\n Amount: 18.192108990779246 tokens", "to": "\\xeeaa83b2d581a3a790774d4dae7bf354fffe3376"}, {"arrows": "to", "from": "\\xeeaa83b2d581a3a790774d4dae7bf354fffe3376", "title": "Date: 2022-08-08T14:28:31+00:00\n Amount: 18.192108990779246 tokens", "to": "\\x649765821d9f64198c905ec0b2b037a4a52bc373"}, {"arrows": "to", "from": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9", "title": "Date: 2022-08-08T14:28:51+00:00\n Amount: 102.58641635680914 tokens", "to": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb"}, {"arrows": "to", "from": "\\xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf", "title": "Date: 2022-08-08T14:28:31+00:00\n Amount: 280.6379145059977 tokens", "to": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81"}, {"arrows": "to", "from": "\\x00000000ae347930bd1e7b0f35588b92280f9e75", "title": "Date: 2022-08-08T14:29:29+00:00\n Amount: 143.9492198279105 tokens", "to": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81"}, {"arrows": "to", "from": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9", "title": "Date: 2022-08-08T14:28:31+00:00\n Amount: 280.6379145059977 tokens", "to": "\\xa57bd00134b2850b2a1c55860c9e9ea100fdd6cf"}, {"arrows": "to", "from": "\\xda73904d044c2e82426e6d9f2a7c65fbce2b63a6", "title": "Date: 2022-08-08T14:29:14+00:00\n Amount: 11.09665264264984 tokens", "to": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb"}, {"arrows": "to", "from": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9", "title": "Date: 2022-08-08T14:28:47+00:00\n Amount: 130.0501801591819 tokens", "to": "\\xd75ea151a61d06868e31f8988d28dfe5e9df57b4"}, {"arrows": "to", "from": "\\x0d0707963952f2fba59dd06f2b425ace40b492fe", "title": "Date: 2022-08-08T14:29:31+00:00\n Amount: 17.5994 tokens", "to": "\\xfee4da5ca060c06aabf10c7978df39f6ce82e719"}, {"arrows": "to", "from": "\\xa9d1e08c7793af67e9d92fe308d5697fb81d3e43", "title": "Date: 2022-08-08T14:29:43+00:00\n Amount: 236.595 tokens", "to": "\\xfa103c21ea2df71dfb92b0652f8b1d795e51cdef"}, {"arrows": "to", "from": "\\x6767526a362ec6c6b1df185478e4f01506b73ff3", "title": "Date: 2022-08-08T14:29:43+00:00\n Amount: 1108.8999 tokens", "to": "\\x28c6c06298d514db089934071355e5743bf21d60"}, {"arrows": "to", "from": "\\x93c70c3a3fb600f2b7e1125ff382d01b051c36d0", "title": "Date: 2022-08-08T14:32:35+00:00\n Amount: 477.711 tokens", "to": "\\x3e66b66fd1d0b02fda6c811da9e0547970db2f21"}, {"arrows": "to", "from": "\\xd784927ff2f95ba542bfc824c8a8a98f3495f6b5", "title": "Date: 2022-08-08T14:30:18+00:00\n Amount: 182.53291317271572 tokens", "to": "\\x4da27a545c0c5b758a6ba100e3a049001de870f5"}, {"arrows": "to", "from": "\\xfa103c21ea2df71dfb92b0652f8b1d795e51cdef", "title": "Date: 2022-08-08T14:31:17+00:00\n Amount: 236.595 tokens", "to": "\\x56178a0d5f301baf6cf3e1cd53d9863437345bf9"}, {"arrows": "to", "from": "\\x2faf487a4414fe77e2327f0bf4ae2a264a776ad2", "title": "Date: 2022-08-08T14:30:18+00:00\n Amount: 134.775 tokens", "to": "\\x6767526a362ec6c6b1df185478e4f01506b73ff3"}, {"arrows": "to", "from": "\\x3e66b66fd1d0b02fda6c811da9e0547970db2f21", "title": "Date: 2022-08-08T14:32:35+00:00\n Amount: 477.711 tokens", "to": "\\xc697051d1c6296c24ae3bcef39aca743861d9a81"}, {"arrows": "to", "from": "\\x4da27a545c0c5b758a6ba100e3a049001de870f5", "title": "Date: 2022-08-08T14:32:35+00:00\n Amount: 1.01 tokens", "to": "\\xe40c9db4b30c32dfb29f48379c21fc459337ea95"}, {"arrows": "to", "from": "\\x9409f4e0d8521a619e1668d82e425a4d8e9db437", "title": "Date: 2022-08-08T14:34:34+00:00\n Amount: 17.228761775507998 tokens", "to": "\\x01c4d578d26c90265f7ec587c1f235e65608d7d3"}, {"arrows": "to", "from": "\\x01c4d578d26c90265f7ec587c1f235e65608d7d3", "title": "Date: 2022-08-08T14:34:34+00:00\n Amount: 17.211533338829533 tokens", "to": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb"}, {"arrows": "to", "from": "\\xa9d1e08c7793af67e9d92fe308d5697fb81d3e43", "title": "Date: 2022-08-08T14:32:53+00:00\n Amount: 427.82815283 tokens", "to": "\\x002e1798bff1ea5bcd703133eb61706070080c19"}, {"arrows": "to", "from": "\\xffc97d72e13e01096502cb8eb52dee56f74dad7b", "title": "Date: 2022-08-08T14:37:59+00:00\n Amount: 181.4 tokens", "to": "\\x135896de8421be2ec868e0b811006171d9df802a"}, {"arrows": "to", "from": "\\xe40c9db4b30c32dfb29f48379c21fc459337ea95", "title": "Date: 2022-08-08T14:34:22+00:00\n Amount: 1.01 tokens", "to": "\\x67af61cbea47812ac1eca7b584a13fbae2f8967a"}, {"arrows": "to", "from": "\\xdef171fe48cf0115b1d80b88dc8eab59176fee57", "title": "Date: 2022-08-08T14:37:59+00:00\n Amount: 97.956 tokens", "to": "\\xd75ea151a61d06868e31f8988d28dfe5e9df57b4"}, {"arrows": "to", "from": "\\x2faf487a4414fe77e2327f0bf4ae2a264a776ad2", "title": "Date: 2022-08-08T14:38:50+00:00\n Amount: 391.975 tokens", "to": "\\x91db9e27e750c43a96926b2e04d795c24f13f67b"}, {"arrows": "to", "from": "\\x7390917c51fa26afb227cd41b1d7123e8489d1dc", "title": "Date: 2022-08-08T14:34:11+00:00\n Amount: 1.9745096 tokens", "to": "\\x3d7103a5f20ab0eaa28eeae750a56c6b1c4b0827"}, {"arrows": "to", "from": "\\xdef171fe48cf0115b1d80b88dc8eab59176fee57", "title": "Date: 2022-08-08T14:37:59+00:00\n Amount: 83.444 tokens", "to": "\\x5ab53ee1d50eef2c1dd3d5402789cd27bb52c1bb"}, {"arrows": "to", "from": "\\x91db9e27e750c43a96926b2e04d795c24f13f67b", "title": "Date: 2022-08-08T14:40:26+00:00\n Amount: 391.975 tokens", "to": "\\x1522900b6dafac587d499a862861c0869be6e428"}, {"arrows": "to", "from": "\\x135896de8421be2ec868e0b811006171d9df802a", "title": "Date: 2022-08-08T14:37:59+00:00\n Amount: 181.4 tokens", "to": "\\xdef171fe48cf0115b1d80b88dc8eab59176fee57"}, {"arrows": "to", "from": "\\xdef171fe48cf0115b1d80b88dc8eab59176fee57", "title": "Date: 2022-08-08T14:42:12+00:00\n Amount: 27.593178961666666 tokens", "to": "\\x5596d991bf7753f0f14e1c5b59abbea626725401"}, {"arrows": "to", "from": "\\xd83126c00204da1e2e24c9ea75677936cf4caa64", "title": "Date: 2022-08-08T14:40:54+00:00\n Amount: 9.61877447 tokens", "to": "\\x52a258ed593c793251a89bfd36cae158ee9fc4f8"}, {"arrows": "to", "from": "\\x1b702afe2342b43196c6959f2bebf57156c8f13b", "title": "Date: 2022-08-08T14:39:16+00:00\n Amount: 0.984739 tokens", "to": "\\x1f652b71cd7072ffc91aabb97a4c8d850f93a626"}, {"arrows": "to", "from": "\\xb3c839dbde6b96d37c56ee4f9dad3390d49310aa", "title": "Date: 2022-08-08T14:42:12+00:00\n Amount: 27.593178961666666 tokens", "to": "\\xdef171fe48cf0115b1d80b88dc8eab59176fee57"}, {"arrows": "to", "from": "\\x941b4fdb4b1533ab2cc8b90ff0700f658b4aa642", "title": "Date: 2022-08-08T14:44:54+00:00\n Amount: 0.1629736297 tokens", "to": "\\xec11acc6d90482b9c70cebd04605d0192bd2d8a8"}, {"arrows": "to", "from": "\\x2b98006084845ae63e28d1f53a78553db6f0d188", "title": "Date: 2022-08-08T14:45:17+00:00\n Amount: 25.30322996 tokens", "to": "\\x4da27a545c0c5b758a6ba100e3a049001de870f5"}, {"arrows": "to", "from": "\\x3d31a92dc4416b24b5e2a96654a0cb519c92bcf5", "title": "Date: 2022-08-08T14:45:42+00:00\n Amount: 56.65 tokens", "to": "\\x822b932039be361f5c0453b8cbf4a14162ff6ac4"}, {"arrows": "to", "from": "\\x21a31ee1afc51d94c2efccaa2092ad1028285549", "title": "Date: 2022-08-08T14:48:03+00:00\n Amount: 210.12853053 tokens", "to": "\\x5ee749300b534aaa1183ac86ac52995a7edfc7c7"}, {"arrows": "to", "from": "\\xf6c8851b9c02e10bd31e4d853c17e377922f0fc4", "title": "Date: 2022-08-08T14:48:42+00:00\n Amount: 7958.0 tokens", "to": "\\xb8001c3ec9aa1985f6c747e25c28324e4a361ec1"}, {"arrows": "to", "from": "\\x1f652b71cd7072ffc91aabb97a4c8d850f93a626", "title": "Date: 2022-08-08T14:49:58+00:00\n Amount: 0.984739 tokens", "to": "\\xa9d1e08c7793af67e9d92fe308d5697fb81d3e43"}, {"arrows": "to", "from": "\\x5596d991bf7753f0f14e1c5b59abbea626725401", "title": "Date: 2022-08-08T14:52:40+00:00\n Amount: 27.593178961666666 tokens", "to": "\\x99c9fc46f92e8a1c0dec1b1747d010903e884be1"}, {"arrows": "to", "from": "\\x5ee749300b534aaa1183ac86ac52995a7edfc7c7", "title": "Date: 2022-08-08T14:54:19+00:00\n Amount: 210.12853053 tokens", "to": "\\xddfabcdc4d8ffc6d5beaf154f18b778f892a0740"}]);
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