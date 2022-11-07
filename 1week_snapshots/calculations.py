import pandas as pd
import json
import networkx as nx
import matplotlib.pyplot as plt
import scipy as sp
import pandas as pd
from pyvis.network import Network
from networkx.algorithms.community import greedy_modularity_communities


def create_graph(lines):
    """
    Creates a graph in NetworkX

    This function takes an input of data and uses that data to construct a directed network graph

    Parameters
    ---------
    self
    lines: list
        The data points used for the graph construction

    Returns
    -------
    NetworkX Graph object
        Constructed from the ``lines`` inputted.
    """

    # Remove the headings
    lines.pop(0)

    # Create NetworkX graph object
    G = nx.Graph()
    DG = nx.DiGraph()

    # Iterate through data received and split at each comma, and seperate those values into their respective fields
    for line in lines:
        G.add_edge(line.split(',')[0], line.split(',')[
            1], timestamp=line.split(',')[2], amount=line.split(',')[3])
        DG.add_edge(line.split(',')[0], line.split(',')[
            1], timestamp=line.split(',')[2], amount=line.split(',')[3])

    return G, DG


def perform_calculations(digraph, graph):
    """
    Performs calculations using graph data

    This function takes in a graph object and performs a series of computations on the graph before returning the results of the calculations.

    Parameters
    ---------
    self
    graph: Graph object
        Used to perform further analysis
    """
    triang_dict = nx.triangles(graph)
    num_triangles = 0
    for k, v in triang_dict.items():
        num_triangles += v

    return nx.number_of_nodes(digraph), nx.number_of_edges(digraph), nx.number_of_selfloops(digraph), nx.number_strongly_connected_components(digraph), nx.density(digraph), greedy_modularity_communities(digraph), nx.degree(digraph), len(max(nx.strongly_connected_components(digraph), key=len)), num_triangles // 3, nx.transitivity(graph)


def data_handling(dao, day, date):

    # Reads data from csv file
    fp = open("1week_snapshots/day" + str(day) + "/" +
              dao + "_" + date + "_1day_trans_data.csv", 'r')
    fulllines = fp.readlines()
    lines = []
    for line in fulllines:
        lines.append(line.strip())

    # # Creates object instance of Transaction_Graph
    graph, digraph = create_graph(lines)
    num_nodes, num_edges, num_self, strong_comp, dens, greedy, degree, largest_comp, triangles, transitivity = perform_calculations(
        digraph, graph)

    x = {
        "num_node": num_nodes,
        "num_edge": num_edges,
        "num_conn_comp": strong_comp,
        "density": dens,
        "largest_comp": largest_comp,
        "triangles": triangles,
        "transitivity": transitivity,
    }

    y = json.dumps(x)
    with open('static/darden/js/json/' + dao + '_' + date + '.json', 'w') as f:
        json.dump(y, f, ensure_ascii=False)


dao_names = ["aave", "ape", "chz", "fwb"]
dates = ["09132022", "09142022", "09152022",
         "09162022", "09172022", "09182022", "09192022"]

for i in range(1, 8):
    d = 0
    while d < len(dao_names):
        data_handling(dao_names[d], i, dates[i - 1])
        d += 1
