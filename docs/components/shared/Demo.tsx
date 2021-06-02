import { useTheme } from 'docs/core';
import { css } from 'emotion';
import { BoxProps } from 'lib';
import React, { useState } from 'react';
import { MdCode } from 'react-icons/md';
import { Highlight } from './Highlight';
import { Box, Button, Collapse } from './registry';

export interface DemoProps extends BoxProps {
  code?: string;
  contentProps?: BoxProps;
}

export const Demo = ({ code, contentProps, children, ...rest }: DemoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const codeButton = (
    <Button
      onClick={() => setIsOpen(!isOpen)}
      border="none"
      color="#777777"
      padding="small"
      font="small"
      className={css`
        position: absolute;
        top: 7px;
        right: 10px;
        font-family: 'Roboto Mono', monospace;
        &:hover {
          color: ${theme.variables?.palette?.primary};
        }
      `}
    >
      <MdCode size="1.2rem" />
    </Button>
  );

  return (
    <Box
      {...rest}
      className={css`
        position: relative;
      `}
    >
      {code && codeButton}
      <Box
        background="lightGrey"
        padding="50px"
        direction="row"
        align="center"
        justify="center"
      >
        <Box {...contentProps}>{children}</Box>
      </Box>
      {code && (
        <Collapse isOpen={isOpen}>
          <Highlight code={code.trim()} />
        </Collapse>
      )}
    </Box>
  );
};
