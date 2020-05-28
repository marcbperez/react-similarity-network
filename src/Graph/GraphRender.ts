import * as d3 from 'd3';
import GraphLink from './GraphLink';
import {
  GRAPHWIDTH,
  GRAPHHEIGHT,
  LINKSTROKECOLOR,
  LINKSTROKEWIDTH,
  LINKSTROKEOPACITY,
  NODESTROKECOLOR,
  NODESTROKEWIDTH,
  NODESTROKEOPACITY,
  NODEFILL,
  NODERADIUS
} from '../constants';
import Venue from '../Venue/Venue';

/**
 * Renders a similarity network graph on an SVG element using D3.
 */
export default class GraphRender {
  /**
   * Renders the graph.
   */
  draw(
    element: SVGSVGElement,
    nodes: Venue[],
    width: number = GRAPHWIDTH,
    height: number = GRAPHHEIGHT
  ) {
    // Reset the graph first.
    this.reset(element, width, height);
    // Generate links, and add the link and node groups.
    const links: GraphLink[] = this.nodeLinks(nodes);
    const linkGroup: any = this.linkGroup(element, links)
    const nodeGroup: any = this.nodeGroup(element, nodes);
    // Start the simulation
    this.simulate(nodes, nodeGroup, links, linkGroup);
  }

  /**
   * Resets the graph.
   */
  reset(element: SVGSVGElement, width: number, height: number) {
    // Resize the contents
    const viewBox = `${-width / 2} ${-height / 2} ${width} ${height}`;
    const svg = d3.select(element).attr('viewBox', viewBox);
    // Remove all elements.
    svg.selectAll('*').remove();
  }

  /**
   * Adds, and returns, the link group.
   */
  linkGroup(element: SVGSVGElement, links: GraphLink[]): any {
    return d3.select(element)
      .append('g')
      .attr('stroke', LINKSTROKECOLOR)
      .attr('stroke-width', LINKSTROKEWIDTH)
      .attr('stroke-opacity', LINKSTROKEOPACITY)
      .selectAll('line')
      .data(links)
      .join('line');
  }

  /**
   * Adds, and returns, the node group.
   */
  nodeGroup(element: SVGSVGElement, nodes: Venue[]): any {
    const group = d3.select(element)
      .append('g')
      .attr('stroke', NODESTROKECOLOR)
      .attr('stroke-width', NODESTROKEWIDTH)
      .attr('stroke-opacity', NODESTROKEOPACITY)
      .attr('fill', NODEFILL)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', NODERADIUS);
    // Set the name as title for every node.
    group.append('title').text((node: Venue) => node.name);
    return group;
  }

  /**
   * Creates and starts the simulation.
   */
  simulate(nodes: Venue[], nodeGroup: any, links: GraphLink[], linkGroup: any) {
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d: any) => d.id))
      .force('charge', d3.forceManyBody())
      .force('x', d3.forceX())
      .force('y', d3.forceY());
    // Tie and contain the nodes together via their links.
    simulation.on('tick', () => {
      linkGroup
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      nodeGroup
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
    });
  }

  /**
   * Returns a list of links given a set of nodes.
   */
  nodeLinks(nodes: Venue[]): GraphLink[] {
    let links: GraphLink[] = [];
    // Flatten the list of node links.
    nodes.forEach((item: Venue) => item.links.forEach((link: string) =>
      links.push({ source: item.id, target: link })
    ));
    return links;
  }
}
