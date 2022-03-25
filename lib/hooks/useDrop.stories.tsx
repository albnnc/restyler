/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, useState } from 'react';
import { Box, Button, ModalBody, useDrop } from 'lib';
import { Checkbox } from 'lib/components';
import { DropPlacement } from './useDrop';

export default {
  title: 'hooks/useDrop'
} as Meta;

export const Basics = () => {
  const [isTailored, setIsTailored] = useState(false);
  const [isTopPlaced, setIsTopPlaced] = useState(false);
  const [openDrop, anchorRef] = useDrop<HTMLButtonElement>();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Checkbox value={isTailored} onChange={setIsTailored}>
        Tailored
      </Checkbox>
      <Checkbox value={isTopPlaced} onChange={setIsTopPlaced}>
        Top-placed
      </Checkbox>
      <Button
        ref={anchorRef}
        kind="primary"
        onClick={() => {
          openDrop({
            isTailored,
            placement: isTopPlaced ? DropPlacement.Top : DropPlacement.Bottom,
            render: ({ handleClose }) => (
              <Box sx={{ p: 2 }}>
                <Box>Lorem ipsum</Box>
                <Button kind="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            )
          });
        }}
      >
        Open
      </Button>
    </Box>
  );
};
