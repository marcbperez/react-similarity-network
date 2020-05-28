import * as d3 from 'd3';

/**
 * Venue item to use in the graph.
 */
interface Venue extends d3.SimulationNodeDatum {
  id: string,
  name: string,
  links: string[]
}

export default Venue;
