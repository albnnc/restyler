import React, { useState } from 'react';
import { Anchor, Collapse } from '~docs/components/shared';

export const BasicDemo = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Anchor onClick={() => setIsOpen(!isOpen)}>Toggle</Anchor>
      <Collapse isOpen={isOpen}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Collapse>
    </>
  );
};
