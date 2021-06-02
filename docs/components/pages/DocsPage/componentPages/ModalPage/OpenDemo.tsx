import { useModal, Button } from 'docs/components/shared';

export const OpenDemo = () => {
  const { openModal } = useModal();
  return (
    <Button
      kind="primary"
      onClick={() => openModal({ render: () => 'Modal content' })}
    >
      Open
    </Button>
  );
};
