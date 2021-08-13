/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Scroll } from 'src';
import { createBlueprint } from 'storybook/utils';

export default {
  title: 'Containers/Scroll'
} as Meta;

export const Basics = () => {
  return (
    <Scroll sx={{ maxWidth: '500px' }}>
      <Box sx={{ width: '700px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor
        sollicitudin enim non lacinia. Quisque ultricies est et neque
        pellentesque, a blandit massa ultricies. Pellentesque porta malesuada
        nulla. Cras ornare eros mi, a tincidunt lorem eleifend quis. Nulla
        consectetur accumsan tempus. Vivamus in diam facilisis, viverra est
        vitae, sodales ligula. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas. Nunc vitae ligula tristique,
        dapibus tortor vitae, facilisis mauris. Donec non dolor tempus,
        fermentum orci a, feugiat quam. Interdum et malesuada fames ac ante
        ipsum primis in faucibus. Mauris lobortis, magna non cursus varius,
        sapien felis mollis tortor, ut finibus diam nulla quis neque. Fusce
        gravida mauris sit amet justo imperdiet, id porttitor nulla tempor.
        Vivamus fermentum tortor eget arcu rutrum, id ultrices metus iaculis.
        Integer nunc ipsum, facilisis eget tempor nec, iaculis a nisi. Curabitur
        iaculis mauris nec nisi placerat, quis ornare arcu commodo. Praesent
        vulputate ullamcorper efficitur. Donec bibendum leo id dui convallis
        ultrices. In eget accumsan lacus, at bibendum nisl. Sed eget rhoncus
        erat, non iaculis massa. Vivamus sed mattis ligula. Curabitur porttitor
        velit sit amet commodo congue. Praesent eu elit lectus. Praesent
        bibendum vestibulum ante sed cursus.
      </Box>
    </Scroll>
  );
};

export const Blueprint = createBlueprint('scroll');
