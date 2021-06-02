import { openQuestion, Button } from 'docs/components/shared';
import React, { useState } from 'react';

export const QuestionDemo = () => {
  const [message, setMessage] = useState('');

  const onClick = async () => {
    const mayDo = await openQuestion({
      heading: 'Red Button Usage',
      content: 'Are you really sure? I hope so.'
    });
    setMessage(mayDo ? 'Yes!' : 'No');
  };

  return (
    <Button kind="danger" onClick={onClick}>
      Danger {message ? `(${message})` : ''}
    </Button>
  );
};
