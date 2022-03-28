/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { Button } from 'lib';
import { useQuestion } from './useQuestion';

export default {
  title: 'hooks/useQuestion'
} as Meta;

export const Basics = () => {
  const [answer, setAnswer] = useState<string>('');
  const openQuestion = useQuestion(
    {
      heading: 'Important question',
      content: 'Are you sure you want to continue?'
    },
    { deps: [] }
  );
  return (
    <Button
      kind="primary"
      onClick={async () => {
        const isOk = await openQuestion();
        setAnswer(isOk ? '(yes)' : '(no)');
      }}
    >
      Open {answer}
    </Button>
  );
};
