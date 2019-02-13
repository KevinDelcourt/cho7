import React from 'react';
import { storiesOf } from '@storybook/react';

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
import Creation from '../components/organisms/Creation';
import FooterTemplate from '../components/organisms/FooterTemplate';
import InputBase from '../components/atoms/InputBase';
import LabelBase from '../components/atoms/LabelBase';
import LabelInput from '../components/molecules/LabelInput';
import TextareaBase from '../components/atoms/TextareaBase';
import LabelTextarea from '../components/molecules/LabelTextarea';
import MainContainer from '../components/molecules/MainContainer';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);



storiesOf('Logo', module).add('Avec une image', () => <Logo />);

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
  .add('Creation',()=>(
      <Creation path="oui.mp3"/>
	))

const storyInputBase = storiesOf("atoms/Composant de base", module);
storyInputBase.add("Input de base", () => (
	<InputBase />
));

const storyLabelBase = storiesOf('atoms/Composant de base', module);
storyLabelBase.addDecorator(withKnobs);
storyLabelBase.add("Label de base", () => (
	<LabelBase children={text('Label children','')} />
));

const storyLabelInput = storiesOf("molecules/Composant de base", module);
storyLabelInput.addDecorator(withKnobs);
storyLabelInput.add("Label Input", ()=> (
	<LabelInput label={text('Label value','')} />
));

const storyTextareaBase = storiesOf("atoms/Composant de base", module);
storyTextareaBase.addDecorator(withKnobs);
storyTextareaBase.add("Textarea", () =>(
	<TextareaBase rows={number("nbLigne",5)} cols={number('NbCol',10)} />
));


const storyLabelTextarea = storiesOf("molecules/Composant de base", module);
storyLabelTextarea.addDecorator(withKnobs);
storyLabelTextarea.add("LabelTextarea", ()=>(
	<LabelTextarea label={text("Label value",'')} row={number("row", 5)} col={number("col",5)} />
));

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
const storyMainContainer = storiesOf("molecules/Composant de base", module);
const child = [<div style={{border: "solid 1px black"}}>hqeugrhzo</div>];
storyMainContainer.addDecorator(withKnobs);
storyMainContainer.add("MainContainer", () => (
	<MainContainer title={text("label du titre",'')} children={child}/>
))