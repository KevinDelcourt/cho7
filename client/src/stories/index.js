import React from 'react';
import { storiesOf } from '@storybook/react';

import FooterTemplate from '../components/organisms/FooterTemplate';

import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import { withKnobs, text} from '@storybook/addon-knobs';

import Logo from '../components/atoms/Logo';
import SiteTitle from '../components/atoms/SiteTitle';
import MenuButton from '../components/atoms/MenuButton';
import LabelDescription from '../components/atoms/LabelDescription';
import FieldDescription from '../components/atoms/FieldDescription';

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
  .add('LabelDescription', () => (
    <LabelDescription children={text('Contenu','text')}/>
))
.add('FieldDescription', () => (
  <FieldDescription />
))

storiesOf('organisms', module)
    .addDecorator(withKnobs)
    .add('Footer', () => (
      <FooterTemplate left={text('Gauche','gaute')} right={text('Droite','droiche')}/>
))


