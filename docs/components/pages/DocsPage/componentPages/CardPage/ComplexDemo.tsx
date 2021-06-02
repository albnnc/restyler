import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image
} from '~docs/components/shared';
import mountains from '~docs/images/mountains.jpg';

export const ComplexDemo = () => (
  <Card>
    <CardHeader>
      <Heading>Switzerland</Heading>
    </CardHeader>
    <CardBody padding={{ horizontal: 'none', bottom: 'none' }}>
      <Image src={mountains} />
    </CardBody>
    <CardBody>
      Switzerland's ecosystems can be particularly fragile, because the many
      delicate valleys separated by high mountains often form unique ecologies.
    </CardBody>
    <CardFooter direction="row" justify="end">
      <Button kind="primary" border={{ style: 'dashed' }}>
        Save
      </Button>
      <Button kind="primary" margin={{ left: 'small' }}>
        More
      </Button>
    </CardFooter>
  </Card>
);
