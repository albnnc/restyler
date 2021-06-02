import { Box, File } from 'docs/components/shared';
import React from 'react';

export const CustomLabelDemo = () => (
  <Box direction="column">
    <File placeholder="Basic" inputProps={{ multiple: true }}>
      {fileNames => {
        return (
          <Box
            extend={{
              width: 300,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {fileNames.length ? (
              <span>
                <span style={{ fontWeight: 500 }}>
                  {`${fileNames.length} files selected: `}
                </span>
                <span style={{ fontWeight: 200 }}>{fileNames.join(' | ')}</span>
              </span>
            ) : (
              <span
                style={{
                  display: 'block',
                  textAlign: 'center'
                }}
              >
                Chosee file
              </span>
            )}
          </Box>
        );
      }}
    </File>
  </Box>
);
