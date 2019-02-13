import React from 'react';
import { storiesOf } from '@storybook/react';

import FooterTemplate from '../components/organisms/FooterTemplate';

import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import { withKnobs, text, number} from '@storybook/addon-knobs';

import Logo from '../components/atoms/Logo';
import SiteTitle from '../components/atoms/SiteTitle';
import MenuButton from '../components/atoms/MenuButton';
import LabelDescription from '../components/atoms/LabelDescription';
import FieldDescription from '../components/atoms/FieldDescription';
import UploadForm from '../components/organisms/UploadForm';
import BarreMenu from '../components/molecules/BarreMenu';
import { BrowserRouter as Router} from "react-router-dom";
import SubmitButton from '../components/atoms/Submitbutton';
import CadreAvatar from '../components/atoms/CadreAvatar';


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
))
  .add('UploadForm', () => (
      <UploadForm />
))




const Description = storiesOf('Storybook Knobs', module);
Description.addDecorator(withKnobs);
Description.add('LabelDescription', () => (
  <LabelDescription children={text('Contenu','text')}/>
))
.add('FieldDescription', () => (
<FieldDescription />
))

const SubmitB = storiesOf('Storybook Knobs', module);
SubmitB.addDecorator(withKnobs);
SubmitB.add('SubmitButton', () => (
  <SubmitButton children={text('Contenu','')}/>
))

const CAvatar = storiesOf('Storybook Knobs', module);
CAvatar.addDecorator(withKnobs);
CAvatar.add('CadreAvatar', () => (
  <CadreAvatar w={number("width",10)} h={number("height", 10)}/>
))