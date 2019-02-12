import React from 'react';
import { storiesOf } from '@storybook/react';

import FooterTemplate from '../components/organisms/FooterTemplate';

storiesOf('organisms/Footer', module)
  .add('Footer', () => (
      <FooterTemplate left="gaute" right="droiche"/>
  )
);
