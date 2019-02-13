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
import BarreMenu from '../components/molecules/BarreMenu';
import { BrowserRouter as Router} from "react-router-dom";

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
	<Button onClick={action('clicked')}>
	  <span role="img" aria-label="so cool">
		😀 😎 👍 💯
	  </span>
	</Button>));

storiesOf('Logo', module).add('Avec une image', () => <Logo />);

storiesOf('atoms', module)
  .addDecorator(withKnobs)
  .add('SiteTitle', () => (
      <SiteTitle children={text('Contenu','Titre')} />
  ))
  .add('Menu Button', () => (
      <MenuButton children={text('Contenu','Bouton')}/>
  ))
  


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

storiesOf('organisms', module)
	.addDecorator(withKnobs)
	.add('Footer', () => (
	  <FooterTemplate left={text('Gauche','gaute')} right={text('Droite','droiche')}/>
));



const Description = storiesOf('Storybook Knobs', module);
Description.addDecorator(withKnobs);
Description.add('LabelDescription', () => (

  <LabelDescription children={text('Contenu','text')}/>
))
.add('FieldDescription', () => (
<FieldDescription />
))