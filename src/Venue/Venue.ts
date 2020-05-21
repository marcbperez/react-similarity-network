import * as d3 from 'd3';

interface Venue extends d3.SimulationNodeDatum {
  id: string,
  name: string,
  links: string[]
}

export default Venue;
