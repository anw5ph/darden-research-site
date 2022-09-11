setData();
function setData() {
    fetch(fwb)
    .then(function(response) {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }
        response.json().then(function(data) {

            data = JSON.parse(data);

            const node_num = document.getElementById("fwb_node_num");
            node_num.innerText = data.num_node;

            const edge_num = document.getElementById("fwb_edge_num");
            edge_num.innerText = data.num_edge;

            const scc_num = document.getElementById("fwb_scc_num");
            scc_num.innerText = data.num_conn_comp;

            const lcc_num = document.getElementById("fwb_lcc_num");
            lcc_num.innerText = data.largest_comp;

            const density = document.getElementById("fwb_density_num");
            density.innerText = Math.round(data.density * 100000) / 100000;

            const triangles = document.getElementById("fwb_triangle_num");
            triangles.innerText = Math.round(data.triangles * 100000) / 10000;

            const trans = document.getElementById("fwb_trans");
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
    var container = document.getElementById('fwb_network');

    // parsing and collecting nodes and edges from the python
    nodes = new vis.DataSet([{"group": 2, "id": "\\x0a965a4caf929338044c593d82d385c4c898d8c6", "label": "\\x0a965a4caf929338044c593d82d385c4c898d8c6", "shape": "dot", "title": "Uniswap V2: FWB 2", "value": 6}, {"group": 6, "id": "\\x00000000009726632680fb29d3f7a9734e3010e2", "label": "\\x00000000009726632680fb29d3f7a9734e3010e2", "shape": "dot", "title": "Rainbow: Router", "value": 1}, {"group": 3, "id": "\\x00000000c2cf7648c169b25ef1c217864bfa38cc", "label": "\\x00000000c2cf7648c169b25ef1c217864bfa38cc", "shape": "dot", "title": "MEV Bot", "value": 1}, {"group": 1, "id": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "label": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "shape": "dot", "title": "Uniswap V3: FWB", "value": 5}, {"group": 0, "id": "\\x01ff6318440f7d5553a82294d78262d5f5084eff", "label": "\\x01ff6318440f7d5553a82294d78262d5f5084eff", "shape": "dot", "title": "\\x01ff6318440f7d5553a82294d78262d5f5084eff", "value": 1}, {"group": 0, "id": "\\x1e1674b2ec977558e10ce47ac754a5679da94e77", "label": "\\x1e1674b2ec977558e10ce47ac754a5679da94e77", "shape": "dot", "title": "\\x1e1674b2ec977558e10ce47ac754a5679da94e77", "value": 1}, {"group": 0, "id": "\\x1e99b43aec44f02f27bdcba8c5410b8ffbdf06d8", "label": "\\x1e99b43aec44f02f27bdcba8c5410b8ffbdf06d8", "shape": "dot", "title": "\\x1e99b43aec44f02f27bdcba8c5410b8ffbdf06d8", "value": 1}, {"group": 0, "id": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "label": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "shape": "dot", "title": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "value": 1}, {"group": 4, "id": "\\xc36442b4a4522e871399cd717abdd847ab11fe88", "label": "\\xc36442b4a4522e871399cd717abdd847ab11fe88", "shape": "dot", "title": "Uniswap V3: Positions NFT", "value": 1}, {"group": 0, "id": "\\x26463f18fa1f6d850542b13376edc152ca8e970d", "label": "\\x26463f18fa1f6d850542b13376edc152ca8e970d", "shape": "dot", "title": "\\x26463f18fa1f6d850542b13376edc152ca8e970d", "value": 1}, {"group": 0, "id": "\\xc218dbe19fd06a5838290cb1240d02e6aa17bbf1", "label": "\\xc218dbe19fd06a5838290cb1240d02e6aa17bbf1", "shape": "dot", "title": "\\xc218dbe19fd06a5838290cb1240d02e6aa17bbf1", "value": 2}, {"group": 0, "id": "\\x382ffce2287252f930e1c8dc9328dac5bf282ba1", "label": "\\x382ffce2287252f930e1c8dc9328dac5bf282ba1", "shape": "dot", "title": "\\x382ffce2287252f930e1c8dc9328dac5bf282ba1", "value": 0}, {"group": 0, "id": "\\x9b64330d2ea51dbec44ed7cf1239ca3843cdf1a0", "label": "\\x9b64330d2ea51dbec44ed7cf1239ca3843cdf1a0", "shape": "dot", "title": "\\x9b64330d2ea51dbec44ed7cf1239ca3843cdf1a0", "value": 1}, {"group": 0, "id": "\\x38ea4059dc6ec29c6a1154311778ee9c3cddaaf9", "label": "\\x38ea4059dc6ec29c6a1154311778ee9c3cddaaf9", "shape": "dot", "title": "\\x38ea4059dc6ec29c6a1154311778ee9c3cddaaf9", "value": 0}, {"group": 0, "id": "\\x755aa66e33350dd722feb183d06c70f90a55995d", "label": "\\x755aa66e33350dd722feb183d06c70f90a55995d", "shape": "dot", "title": "\\x755aa66e33350dd722feb183d06c70f90a55995d", "value": 1}, {"group": 0, "id": "\\x3a8b669ff0630baff1433041646ee0d2ffa20772", "label": "\\x3a8b669ff0630baff1433041646ee0d2ffa20772", "shape": "dot", "title": "\\x3a8b669ff0630baff1433041646ee0d2ffa20772", "value": 0}, {"group": 0, "id": "\\x479b5380369cbb1515c76710ceb7316fc7f16659", "label": "\\x479b5380369cbb1515c76710ceb7316fc7f16659", "shape": "dot", "title": "\\x479b5380369cbb1515c76710ceb7316fc7f16659", "value": 0}, {"group": 0, "id": "\\xcd7f43bebae54f92a236a079a212e6ec7eaa2332", "label": "\\xcd7f43bebae54f92a236a079a212e6ec7eaa2332", "shape": "dot", "title": "\\xcd7f43bebae54f92a236a079a212e6ec7eaa2332", "value": 1}, {"group": 0, "id": "\\x74de5d4fcbf63e00296fd95d33236b9794016631", "label": "\\x74de5d4fcbf63e00296fd95d33236b9794016631", "shape": "dot", "title": "\\x74de5d4fcbf63e00296fd95d33236b9794016631", "value": 1}, {"group": 0, "id": "\\x91b0c8525e941fc5deae744d925e4cbaa695b155", "label": "\\x91b0c8525e941fc5deae744d925e4cbaa695b155", "shape": "dot", "title": "\\x91b0c8525e941fc5deae744d925e4cbaa695b155", "value": 0}, {"group": 0, "id": "\\xce1b9ea48e2219926b573b16f0f5aa7975d21dd0", "label": "\\xce1b9ea48e2219926b573b16f0f5aa7975d21dd0", "shape": "dot", "title": "\\xce1b9ea48e2219926b573b16f0f5aa7975d21dd0", "value": 1}, {"group": 5, "id": "\\xe66b31678d6c16e9ebf358268a790b763c133750", "label": "\\xe66b31678d6c16e9ebf358268a790b763c133750", "shape": "dot", "title": "0x: Coinbase Wallet Proxy", "value": 1}, {"group": 0, "id": "\\xb1c6937a44c56b9136fab488d8580249b213c17b", "label": "\\xb1c6937a44c56b9136fab488d8580249b213c17b", "shape": "dot", "title": "\\xb1c6937a44c56b9136fab488d8580249b213c17b", "value": 1}, {"group": 0, "id": "\\xe5cd62ac8d2ca2a62a04958f07dd239c1ffe1a9e", "label": "\\xe5cd62ac8d2ca2a62a04958f07dd239c1ffe1a9e", "shape": "dot", "title": "\\xe5cd62ac8d2ca2a62a04958f07dd239c1ffe1a9e", "value": 1}, {"group": 0, "id": "\\xffbd4685b366bd8736427b697589d6c56209c568", "label": "\\xffbd4685b366bd8736427b697589d6c56209c568", "shape": "dot", "title": "\\xffbd4685b366bd8736427b697589d6c56209c568", "value": 0}]);
    edges = new vis.DataSet([{"arrows": "to", "from": "\\x0a965a4caf929338044c593d82d385c4c898d8c6", "title": "Date: 2022-08-07T23:43:55+00:00\n Amount: 5.099901033244905 tokens", "to": "\\x00000000009726632680fb29d3f7a9734e3010e2"}, {"arrows": "to", "from": "\\x0a965a4caf929338044c593d82d385c4c898d8c6", "title": "Date: 2022-08-08T03:23:12+00:00\n Amount: 33.635476958914964 tokens", "to": "\\x00000000c2cf7648c169b25ef1c217864bfa38cc"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T09:51:46+00:00\n Amount: 125.35340542172806 tokens", "to": "\\x01ff6318440f7d5553a82294d78262d5f5084eff"}, {"arrows": "to", "from": "\\x1e1674b2ec977558e10ce47ac754a5679da94e77", "title": "Date: 2022-08-07T21:11:31+00:00\n Amount: 80.966 tokens", "to": "\\x0a965a4caf929338044c593d82d385c4c898d8c6"}, {"arrows": "to", "from": "\\x1e99b43aec44f02f27bdcba8c5410b8ffbdf06d8", "title": "Date: 2022-08-08T06:47:55+00:00\n Amount: 100.8414915118049 tokens", "to": "\\x0a965a4caf929338044c593d82d385c4c898d8c6"}, {"arrows": "to", "from": "\\x1e1674b2ec977558e10ce47ac754a5679da94e77", "title": "Date: 2022-08-08T10:30:14+00:00\n Amount: 79.933 tokens", "to": "\\x0a965a4caf929338044c593d82d385c4c898d8c6"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-07T17:50:40+00:00\n Amount: 16.196097793918078 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-07T17:52:01+00:00\n Amount: 8.737997543509286 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\xc36442b4a4522e871399cd717abdd847ab11fe88", "title": "Date: 2022-08-07T19:26:38+00:00\n Amount: 8.086685098592914 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-07T20:34:21+00:00\n Amount: 9.0 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-07T20:35:32+00:00\n Amount: 2.0 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-07T21:28:26+00:00\n Amount: 1.4747032711449781 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-07T21:29:30+00:00\n Amount: 2.7467798171419977 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-07T21:30:21+00:00\n Amount: 1.3553255187873419 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T00:00:00+00:00\n Amount: 6.229557689265701 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T00:01:13+00:00\n Amount: 3.010160401059945 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T00:13:49+00:00\n Amount: 2.0813001331673338 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T00:14:17+00:00\n Amount: 0.9997179708638294 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T12:50:32+00:00\n Amount: 1.1728404150681184 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T12:51:36+00:00\n Amount: 0.6634314688140379 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T13:45:01+00:00\n Amount: 0.7585961783588412 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T14:23:45+00:00\n Amount: 2.74338807857e-05 tokens", "to": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T03:23:12+00:00\n Amount: 190.0361552733736 tokens", "to": "\\x26463f18fa1f6d850542b13376edc152ca8e970d"}, {"arrows": "to", "from": "\\xc218dbe19fd06a5838290cb1240d02e6aa17bbf1", "title": "Date: 2022-08-08T06:09:14+00:00\n Amount: 0.0441979588215109 tokens", "to": "\\x382ffce2287252f930e1c8dc9328dac5bf282ba1"}, {"arrows": "to", "from": "\\x9b64330d2ea51dbec44ed7cf1239ca3843cdf1a0", "title": "Date: 2022-08-08T03:50:23+00:00\n Amount: 690.2922062526561 tokens", "to": "\\x38ea4059dc6ec29c6a1154311778ee9c3cddaaf9"}, {"arrows": "to", "from": "\\x755aa66e33350dd722feb183d06c70f90a55995d", "title": "Date: 2022-08-08T06:43:54+00:00\n Amount: 11.0 tokens", "to": "\\x38ea4059dc6ec29c6a1154311778ee9c3cddaaf9"}, {"arrows": "to", "from": "\\x00000000009726632680fb29d3f7a9734e3010e2", "title": "Date: 2022-08-07T23:43:55+00:00\n Amount: 5.099901033244905 tokens", "to": "\\x3a8b669ff0630baff1433041646ee0d2ffa20772"}, {"arrows": "to", "from": "\\x0a965a4caf929338044c593d82d385c4c898d8c6", "title": "Date: 2022-08-08T04:33:39+00:00\n Amount: 5.0 tokens", "to": "\\x479b5380369cbb1515c76710ceb7316fc7f16659"}, {"arrows": "to", "from": "\\xcd7f43bebae54f92a236a079a212e6ec7eaa2332", "title": "Date: 2022-08-07T18:45:59+00:00\n Amount: 9.0 tokens", "to": "\\x74de5d4fcbf63e00296fd95d33236b9794016631"}, {"arrows": "to", "from": "\\xcd7f43bebae54f92a236a079a212e6ec7eaa2332", "title": "Date: 2022-08-08T00:29:29+00:00\n Amount: 12.0 tokens", "to": "\\x74de5d4fcbf63e00296fd95d33236b9794016631"}, {"arrows": "to", "from": "\\x0a965a4caf929338044c593d82d385c4c898d8c6", "title": "Date: 2022-08-08T06:40:42+00:00\n Amount: 11.0 tokens", "to": "\\x755aa66e33350dd722feb183d06c70f90a55995d"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-08T09:51:46+00:00\n Amount: 152.0153047080258 tokens", "to": "\\x91b0c8525e941fc5deae744d925e4cbaa695b155"}, {"arrows": "to", "from": "\\x0a965a4caf929338044c593d82d385c4c898d8c6", "title": "Date: 2022-08-08T09:51:46+00:00\n Amount: 66.60195419012997 tokens", "to": "\\x91b0c8525e941fc5deae744d925e4cbaa695b155"}, {"arrows": "to", "from": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "title": "Date: 2022-08-07T18:19:29+00:00\n Amount: 2.6783070681806387 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x74de5d4fcbf63e00296fd95d33236b9794016631", "title": "Date: 2022-08-07T18:45:59+00:00\n Amount: 9.0 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "title": "Date: 2022-08-07T19:27:30+00:00\n Amount: 30.34247336783964 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\xce1b9ea48e2219926b573b16f0f5aa7975d21dd0", "title": "Date: 2022-08-07T19:40:09+00:00\n Amount: 75.0 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "title": "Date: 2022-08-07T20:34:45+00:00\n Amount: 9.0 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "title": "Date: 2022-08-07T20:35:53+00:00\n Amount: 2.0 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x0a965a4caf929338044c593d82d385c4c898d8c6", "title": "Date: 2022-08-07T22:53:56+00:00\n Amount: 21.910987148892808 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "title": "Date: 2022-08-07T23:52:29+00:00\n Amount: 0.5768086070743177 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "title": "Date: 2022-08-08T00:11:48+00:00\n Amount: 9.239718090325647 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "title": "Date: 2022-08-08T00:15:22+00:00\n Amount: 3.0810181040311635 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "title": "Date: 2022-08-08T00:16:43+00:00\n Amount: 5.0 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x74de5d4fcbf63e00296fd95d33236b9794016631", "title": "Date: 2022-08-08T00:29:29+00:00\n Amount: 12.0 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x00000000c2cf7648c169b25ef1c217864bfa38cc", "title": "Date: 2022-08-08T03:23:12+00:00\n Amount: 33.635476958914964 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\xe66b31678d6c16e9ebf358268a790b763c133750", "title": "Date: 2022-08-08T06:09:14+00:00\n Amount: 4.375597923329581 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x0a965a4caf929338044c593d82d385c4c898d8c6", "title": "Date: 2022-08-08T06:47:55+00:00\n Amount: 70.87873740951949 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x01ff6318440f7d5553a82294d78262d5f5084eff", "title": "Date: 2022-08-08T09:51:46+00:00\n Amount: 125.35340542172806 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x0a965a4caf929338044c593d82d385c4c898d8c6", "title": "Date: 2022-08-08T10:30:14+00:00\n Amount: 53.22347339051911 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "title": "Date: 2022-08-08T12:52:22+00:00\n Amount: 1.8362718838821568 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\xb1c6937a44c56b9136fab488d8580249b213c17b", "title": "Date: 2022-08-08T13:43:27+00:00\n Amount: 4.289470553094668 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x12239fcdff8cd48c24661d3c4243ce33ceb2e273", "title": "Date: 2022-08-08T13:45:22+00:00\n Amount: 0.7585961783588412 tokens", "to": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6"}, {"arrows": "to", "from": "\\x26463f18fa1f6d850542b13376edc152ca8e970d", "title": "Date: 2022-08-08T03:28:15+00:00\n Amount: 190.0361552733736 tokens", "to": "\\x9b64330d2ea51dbec44ed7cf1239ca3843cdf1a0"}, {"arrows": "to", "from": "\\x9ab0905b39505d8682b58a57a41c4100e9c62ab6", "title": "Date: 2022-08-07T19:26:38+00:00\n Amount: 8.086685098592914 tokens", "to": "\\xc36442b4a4522e871399cd717abdd847ab11fe88"}, {"arrows": "to", "from": "\\xc218dbe19fd06a5838290cb1240d02e6aa17bbf1", "title": "Date: 2022-08-08T06:09:14+00:00\n Amount: 4.375597923329581 tokens", "to": "\\xe66b31678d6c16e9ebf358268a790b763c133750"}, {"arrows": "to", "from": "\\xe5cd62ac8d2ca2a62a04958f07dd239c1ffe1a9e", "title": "Date: 2022-08-08T05:42:37+00:00\n Amount: 5.403491384557632 tokens", "to": "\\xffbd4685b366bd8736427b697589d6c56209c568"}]);

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