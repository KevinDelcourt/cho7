import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number} from '@storybook/addon-knobs';
import SiteTitle from '../components/atoms/SiteTitle';
import LabelDescription from '../components/atoms/LabelDescription';
import FieldDescription from '../components/atoms/FieldDescription';
import UploadForm from '../components/organisms/UploadForm';
import BarreMenu from '../components/molecules/BarreMenu';
import { BrowserRouter as Router} from "react-router-dom";
import FooterTemplate from '../components/organisms/FooterTemplate';
import InputBase from '../components/atoms/InputBase';
import LabelBase from '../components/atoms/LabelBase';
import LabelInput from '../components/molecules/LabelInput';
import TextareaBase from '../components/atoms/TextareaBase';
import LabelTextarea from '../components/molecules/LabelTextarea';
import MainContainer from '../components/molecules/MainContainer';
import Button from '../components/atoms/Button';

storiesOf('atoms', module)
  .add('Titre', () => (
	  <SiteTitle children="Un titre" />
  )
);

const storyButton = storiesOf('atoms', module);
storyButton.addDecorator(withKnobs);
storyButton.add('Button', () => (
	<Button bgColor={text('Background-Color','#916D43')} children={text('Value','MyButton')} border={text('Border','none')}/>
));

const storyBarreMenu = storiesOf('molecules', module);
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

const storyInputBase = storiesOf("atoms", module);
storyInputBase.add("Input de base", () => (
	<InputBase />
));

const storyLabelBase = storiesOf('atoms', module);
storyLabelBase.addDecorator(withKnobs);
storyLabelBase.add("Label de base", () => (
	<LabelBase children={text('Label children','')} />
));

const storyLabelInput = storiesOf("molecules", module);
storyLabelInput.addDecorator(withKnobs);
storyLabelInput.add("Label Input", ()=> (
	<LabelInput label={text('Label','myLabel')} input={text('Input','')} />
));

const storyTextareaBase = storiesOf("atoms", module);
storyTextareaBase.addDecorator(withKnobs);
storyTextareaBase.add("Textarea", () =>(
	<TextareaBase rows={number("nbLigne",5)} cols={number('NbCol',10)} />
));


const storyLabelTextarea = storiesOf("molecules", module);
storyLabelTextarea.addDecorator(withKnobs);
storyLabelTextarea.add("LabelTextarea", ()=>(
	<LabelTextarea label={text("Label value",'')} row={number("row", 5)} col={number("col",5)} />
));

const Description = storiesOf('atoms', module);
Description.addDecorator(withKnobs);
Description.add('LabelDescription', () => (
  <LabelDescription children={text('Contenu','text')}/>
))
.add('FieldDescription', () => (
<FieldDescription />
))

const storyMainContainer = storiesOf("molecules", module);
const child = [<div style={{backgroundColor: "white"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>];
storyMainContainer.addDecorator(withKnobs);
storyMainContainer.add("MainContainer", () => (
	<MainContainer title={text("label du titre",'Mon titre')} children={child}/>
))