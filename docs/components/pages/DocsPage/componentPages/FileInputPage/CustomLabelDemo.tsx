import { Box, File } from 'docs/components/shared';
import React from 'react';

export const CustomLabelDemo = () => (
  <Box direction="column">
    <File placeholder="Basic" inputProps={{ multiple: true }}>
      {fileNames => (
        <Box
          extend={{
            width: 300,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textAlign: 'center'
          }}
        >
          {fileNames.length ? fileNames.join(' | ') : 'Choose file'}
        </Box>
      )}
    </File>
  </Box>
);
