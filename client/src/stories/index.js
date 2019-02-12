import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
import { withKnobs, text} from '@storybook/addon-knobs';

import Logo from '../components/atoms/Logo';
import SiteTitle from '../components/atoms/SiteTitle';
import MenuButton from '../components/atoms/MenuButton';
import BarreMenu from '../components/molecules/BarreMenu';
import { BrowserRouter as Router} from "react-router-dom";

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Logo', module).add('Avec une image', () => <Logo />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>));

storiesOf('atoms/SiteTitle', module)
  .add('Titre', () => (
      <SiteTitle children="Un titre" />
  )
);

const storyMenuButton = storiesOf('Storybook Knobs', module);
storyMenuButton.addDecorator(withKnobs);
storyMenuButton.add('Menu Button', () => (
	<MenuButton children={text('Contenu','')}/>
));

const storyBarreMenu = storiesOf('Storybook Knobs', module);
storyBarreMenu.addDecorator(withKnobs);
storyBarreMenu.add('Barre de Menu', () =>(
  <Router>
    <BarreMenu />
  </Router>
));
