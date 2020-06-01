export const TITLE: string = 'Similarity Network';
export const ERROR: string = 'Something went wrong, please try again later.';
export const APIBASEURL: string = 'https://api.foursquare.com/v2/venues';
export const APIVERSION: string = '20200226';
export const APISEARCHNEAR: string = 'London';
export const FORMTESTID: string = 'Form';
export const INPUTTYPE: string = 'text';
export const CLIENTIDNAME: string = 'clientId';
export const CLIENTIDPLACEHOLDER: string = 'Client ID';
export const CLIENTIDTYPE: string = 'password';
export const CLIENTSECRETNAME: string = 'clientSecret';
export const CLIENTSECRETPLACEHOLDER: string = 'Client Secret';
export const CLIENTSECRETTYPE: string = 'password';
export const QUERYNAME: string = 'query';
export const QUERYPLACEHOLDER: string = 'Query';
export const SUBMITBUTTON: string = 'Search';
export const GRAPHTESTID: string = 'Graph';
export const GRAPHWIDTH: number = window.innerWidth;
export const GRAPHHEIGHT: number = window.innerHeight;
export const GRAPHINTERVAL: number = 2000;
export const GRAPHLIMIT: number = 500;
export const LINKSTROKECOLOR: string = 'black';
export const LINKSTROKEWIDTH: number = 2.0;
export const LINKSTROKEOPACITY: number = 0.6;
export const NODEFILL: string = 'orange';
export const NODESTROKECOLOR: string = 'white';
export const NODESTROKEWIDTH: number = 1.5;
export const NODESTROKEOPACITY: number = 1.0;
export const NODERADIUS: number = 5;
export const SPACEKEY: string = ' ';

// Used for testing:
// Space event and item collection with a seed venue.
export const SPACEEVENT: any = { key: SPACEKEY, code: 'Space' };
export const TESTITEMS: any = [{ id: '1', name: '1st', links: [] }];
// Sample venue search response.
export const TESTSEARCHDATA: any = {
  data: {
    response: {
      venues: [
        { id: '1', name: '1st' },
        { id: '2', name: '2nd' }
      ]
    }
  }
};
// Sample venue similars response.
export const TESTSIMILARDATA: any = {
  data: {
    response: {
      similarVenues: {
        items: [
          { id: '3', name: '3rd' },
          { id: '4', name: '4th' }
        ]
      }
    }
  }
};
