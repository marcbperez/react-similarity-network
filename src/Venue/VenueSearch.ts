import axios from 'axios';
import Venue from './Venue';
import { APIBASEURL, APIVERSION, APISEARCHNEAR } from '../constants';

/**
 * Searches for a list of venues given a name query.
 */
export default class VenueSearch {
  baseUrl: string;
  version: string;
  near: string;

  constructor(
    baseUrl: string = APIBASEURL,
    version: string = APIVERSION,
    near: string = APISEARCHNEAR
  ) {
    this.baseUrl = baseUrl;
    this.version = version;
    this.near = near;
  }

  /**
   * Returns the complete URL.
   */
  url(clientId: string, clientSecret: string, query: string): string {
    const { baseUrl, version, near } = this;
    return `${baseUrl}/search?v=${version}`
      + `&near=${near}&query=${query}`
      + `&client_id=${clientId}&client_secret=${clientSecret}`;
  }

  /**
   * Resolves the response object.
   */
  resolve(result: any): Venue[] {
    const results = result.data.response.venues;
    return results.map((item: Venue) => ({ ...item, links: [] }));
  }

  /**
   * Gets the list of venues.
   */
  get(
    clientId: string, clientSecret: string, query: string
  ): Promise<Venue[]> {
    const url: string = this.url(clientId, clientSecret, query);
    return axios.get(url).then((result: any) => this.resolve(result));
  }
}
