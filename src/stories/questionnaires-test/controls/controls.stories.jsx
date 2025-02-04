import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import simple from './V2_ControlesNonNum_horsBoucle_PasPageFin';
import simpleNum from './V2_ControlesNum_horsBoucle_PasPageFin';
import linkedLoop from './V2_Controles_BouclesLiees_PasPageFin';
import linkedLoop2 from './V2_Controles_BouclesLiees2_PasPageFin';
import defaultArgTypes from '../../utils/default-arg-types';
import boucleNTabDynamique from './boucles-n';

const stories = {
	title: 'Behaviour/Controls',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		missing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
		activeGoNextForMissing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
		management: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: false,
		},
		activeControls: {
			control: 'boolean',
			defaultValue: true,
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const BoucleN = Template.bind({});

BoucleN.args = {
	id: 'boucle-dylan',
	pagination: true,
	activeControls: true,
	source: boucleNTabDynamique,
};

export const Simple = Template.bind({});

Simple.args = {
	id: 'controls-simple',
	source: simple,
	pagination: true,
};

export const SimpleNum = Template.bind({});

SimpleNum.args = {
	id: 'controls-simple-num',
	source: simpleNum,
	pagination: true,
	activeControls: true,
};

export const LinkedLoop = Template.bind({});

LinkedLoop.args = {
	id: 'controls-linked-loop',
	source: linkedLoop,
	pagination: true,
	activeControls: true,
};

export const LinkedLoop2 = Template.bind({});

LinkedLoop2.args = {
	id: 'controls-linked-loop2',
	source: linkedLoop2,
	pagination: true,
	activeControls: true,
};
