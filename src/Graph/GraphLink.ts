import * as d3 from 'd3';

/**
 * Link between venues to use in the graph.
 */
interface GraphLink extends d3.SimulationNodeDatum {
  source: string,
  target: string
}

export default GraphLink;
