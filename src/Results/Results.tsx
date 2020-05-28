import React from 'react';
import Venue from '../Venue/Venue';

interface Props {
  items: Venue[],
  onClick: (event: any, item: Venue) => void
}

/**
 * Shows a list of links with a custom click behaviour.
 */
const Results = (props: Props) => {
  const { items, onClick } = props;

  return (
    <ul>
      { items.map((item: Venue) =>
        <li key={item.id}>
          <a href='/' onClick={(event: any) => onClick(event, item)}>
            {item.name}
          </a>
        </li>
      )}
    </ul>
  );
}

Results.defaultProps = {
  items: [],
  onClick: (event: any, item: Venue) => {}
};

export default Results;
