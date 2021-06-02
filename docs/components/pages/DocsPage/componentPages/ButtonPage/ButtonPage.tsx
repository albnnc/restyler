import { Box, Demo, Heading } from 'docs/components/shared';
import { Fragment } from 'react';
import { BasicDemo } from './BasicDemo';
import basicDemoCode from './BasicDemo.tsx?raw';
import { Blueprint } from './Blueprint';
import blueprintCode from './Blueprint.tsx?raw';
import { OthersDemo } from './OthersDemo';
import othersDemoCode from './OthersDemo.tsx?raw';

export const ButtonPage = () => {
  return (
    <Fragment>
      <Heading kind="2" margin={{ top: 'none' }}>
        Basic variants
      </Heading>
      <Box>
        Aliquam ullamcorper molestie ipsum, a tristique est vulputate vel. Nulla
        facilisi. Nullam iaculis dolor a nunc tempor commodo. Duis diam purus,
        ullamcorper a suscipit non, luctus in mauris. Phasellus dui nibh,
        vulputate eget facilisis in, vulputate id felis. Vivamus faucibus sed
        ligula vel viverra. Nulla facilisi. Ut elit dolor, feugiat id est porta,
        eleifend imperdiet dui. Pellentesque vulputate eleifend orci, vitae
        vehicula odio porttitor ut. Vestibulum iaculis at velit id faucibus.
        Etiam a dolor congue, posuere arcu sit amet, consectetur augue. Sed eget
        luctus lectus. Aliquam tortor augue, pharetra eget suscipit eget, porta
        sed massa. In at auctor odio, ut.
      </Box>
      <Demo margin={{ vertical: 'medium' }} code={basicDemoCode}>
        <BasicDemo />
      </Demo>
      <Heading kind="2">Others</Heading>
      <Demo margin={{ vertical: 'medium' }} code={othersDemoCode}>
        <OthersDemo />
      </Demo>
      <Heading kind="2">Blueprint</Heading>
      <Demo margin={{ vertical: 'medium' }} code={blueprintCode}>
        <Blueprint />
      </Demo>
    </Fragment>
  );
};
