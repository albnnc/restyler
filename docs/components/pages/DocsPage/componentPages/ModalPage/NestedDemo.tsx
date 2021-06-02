import { openModal, Button } from 'docs/components/shared';
import { Fragment } from 'react';

const Opener = ({ level }) =>
  level ? (
    <Button
      kind="primary"
      onClick={() =>
        openModal({
          render: () => <Opener level={level - 1} />
        })
      }
    >
      Modals left: {level}
    </Button>
  ) : (
    <Fragment>
      And if you gaze for long, into an abyss, the abyss gazes also into you.
    </Fragment>
  );

export const NestedDemo = () => <Opener level={3} />;
