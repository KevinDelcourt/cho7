import React from 'react';
import { storiesOf } from '@storybook/react';

import Footer from '../components/organisms/Footer';

storiesOf('organisms/Footer', module)
  .add('Footer', () => (
      <Footer left="gaute" right="droiche"/>
  )
);
