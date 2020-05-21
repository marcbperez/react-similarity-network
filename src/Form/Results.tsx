import React from 'react';
import Venue from '../Venue/Venue';

interface Props {
  items: Venue[],
  onClick: (e: any, item: Venue) => void
}

const Results = (props: Props) => {
  const { items, onClick } = props;

  return (
    <ul>
      { items.map((item: Venue) =>
        <li key={item.id}>
          <a href='/' onClick={(e: any) => onClick(e, item)}>{item.name}</a>
        </li>
      )}
    </ul>
  );
}

Results.defaultProps = {
  items: [],
  onClick: (e: any, item: Venue) => {}
};

export default Results;
