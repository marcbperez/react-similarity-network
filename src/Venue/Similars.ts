import axios from 'axios';
import Venue from './Venue';
import { APIBASEURL, APIVERSION } from '../constants';

/**
 * Retrieves a list of similar venues given a venue ID.
 */
export default class Similars {
  baseUrl: string;
  version: string;

  constructor(
    baseUrl: string = APIBASEURL,
    version: string = APIVERSION
  ) {
    this.baseUrl = baseUrl;
    this.version = version;
  }

  /**
   * Return a formed URL to search for similar venues.
   */
  url(clientId: string, clientSecret: string, venueId: string): string {
    const { baseUrl, version } = this;
    return `${baseUrl}/${venueId}/similar?v=${version}`
      + `&client_id=${clientId}&client_secret=${clientSecret}`
  }

  /**
   * Resolves the response object.
   */
  resolve(result: any): Venue[] {
    const results = result.data.response.similarVenues.items;
    return results.map((item: Venue) => ({ ...item, links: [] }));
  }

  /**
   * Get the list of similar venues.
   */
  get(
    clientId: string, clientSecret: string, venueId: string
  ): Promise<Venue[]> {
    const url: string = this.url(clientId, clientSecret, venueId);
    return axios.get(url).then((result: any) => this.resolve(result));
  }
}
