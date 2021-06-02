import { Carousel } from 'docs/components/shared';
import mountains from 'docs/images/mountains.jpg';
import orange from 'docs/images/orange.jpg';

export const BasicDemo = () => {
  return (
    <Carousel>
      <div>
        <img
          src={mountains}
          css={{ width: '100%', maxHeight: '100%', verticalAlign: 'middle' }}
        />
      </div>
      <div>
        <img
          src={orange}
          css={{ width: '100%', maxHeight: '100%', verticalAlign: 'middle' }}
        />
      </div>
    </Carousel>
  );
};
