import React from 'react';
import { storiesOf } from '@storybook/react';

import FooterTemplate from '../components/organisms/FooterTemplate';

import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import { withKnobs, text} from '@storybook/addon-knobs';

import Logo from '../components/atoms/Logo';
import SiteTitle from '../components/atoms/SiteTitle';
import MenuButton from '../components/atoms/MenuButton';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Logo', module).add('Avec une image', () => <Logo />);

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .add('SiteTitle', () => (
      <SiteTitle children={text('Contenu','Titre')} />
  ))
  .add('Menu Button', () => (
      <MenuButton children={text('Contenu','Bouton')}/>
  ))

storiesOf('organisms', module)
    .addDecorator(withKnobs)
    .add('Footer', () => (
      <FooterTemplate left={text('Gauche','gaute')} right={text('Droite','droiche')}/>
))


