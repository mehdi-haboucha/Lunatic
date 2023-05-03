import { test, expect } from '@playwright/test';

test('Questionnaire Controles Composants', async ({ page }) => {
	const url =
		'https://visu-stromae-v2-sandbox.demo.insee.io/visualize?questionnaire=https%3A%2F%2Fpogues-back-office-sandbox.demo.insee.io%2Fapi%2Fpersistence%2Fquestionnaire%2Fjson-lunatic%2Fl9o7l439';

	await page.goto(url);
	expect(page.url()).toEqual(url);

	// Page 1
	await page.getByRole('button', { name: 'Commencer' }).click();
	//Page 2
	await page.getByRole('button', { name: 'Continuer' }).click();
	//Page 3 : Q1
	//tester avec une valeur supérieur à 100
	await page
		.getByLabel(
			'➡ 1. Je suis le libellé de la question de type texte de longueur inférieure à 250 caractères'
		)
		.fill('aaaaa');
	await page.getByRole('button', { name: 'Continuer' }).click();
	//Page 4 :Q2
	//tester avec une valeur supérieur à 100
	await page
		.getByLabel(
			'➡ 2. Je suis le libellé de la question de type texte de longueur supérieure à 250 caractères. Demain, dès l’aube, à l’heure où blanchit la campagne, Je partirai. Vois-tu, je sais que tu m’attends. J’irai par la forêt, j’irai par la montagne. Je ne puis demeurer loin de toi plus longtemps. Je marcherai les yeux fixés sur mes pensées, Sans rien voir au dehors, sans entendre aucun bruit, Seul, inconnu, le dos courbé, les mains croisées, Triste, et le jour pour moi sera comme la nuit. Je ne regarderai ni l’or du soir qui tombe, Ni les voiles au loin descendant vers Harfleur, Et quand j’arriverai, je mettrai sur ta tombe Un bouquet de houx vert et de bruyère en fleur.'
		)
		.fill(Array(580).join('x'));
	await expect(page.getByRole('textbox')).toHaveValue(Array(501).join('x'));
	await page.getByRole('button', { name: 'Continuer' }).click();
	//Page 5 : Q3
	// test avec bonne valeur
	await page
		.getByLabel('➡ 3. Numérique entier sans unité - grand (max= 999999999)')
		.fill('12');
	await page.getByRole('button', { name: 'Continuer' }).click();
	//Page 6 : Q4
	await expect(
		page.getByText('Controle par rapport à question 3 dont la valeur est :12')
	).toBeVisible();
	await page
		.getByLabel('➡ 4. Numérique décimal sans unité (entre 0 et 1000.00)')
		.fill('2345.67');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText('La valeur doit être comprise entre 0.00 et 1000.00.')
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page
		.getByLabel('➡ 4. Numérique décimal sans unité (entre 0 et 1000.00)')
		.fill('8');
	await page.getByRole('button', { name: 'Continuer' }).click();
	//Page 7 : Q5
	await page
		.getByLabel(
			'➡ 5. Numérique max 9999 avec unité et infobulle sur le mot unité de cette question'
		)
		.fill('5');
	expect(page.getByText('k€', { exact: true })).toBeVisible();

	const uniteElement = await page.$('span.field-md');
	if (uniteElement) {
		await uniteElement.hover();
	} else {
		console.error('Unable to find uniteElement');
	}
	expect(
		page.getByText(
			'l’unité choisie ici est le kilo euro mais je peux tester une infobulle un peu longue pour regarder'
		)
	).toBeVisible();
	await page.getByRole('button', { name: 'Continuer' }).click();
	//Page 8
	await page.getByRole('button', { name: 'Continuer' }).click();
	//Page 9 : Q6
	//test avec mauvaise valeur

	await page.getByLabel('➡ 6. Date jour').fill('2020-05-01');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText(
				'La date saisie doit être comprise entre 2000-01-01 et 2020-03-31.'
			)
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page.getByLabel('➡ 6. Date jour').fill('2004-05-01');

	await page.getByRole('button', { name: 'Continuer' }).click();
	// Page 9 : Q7
	await page.getByLabel('➡ 7. Booléen').check();
	expect(page.getByLabel('➡ 7. Booléen').isChecked()).toBeTruthy();
	await page.getByRole('button', { name: 'Continuer' }).click();
	// Page 10
	await page.getByRole('button', { name: 'Continuer' }).click();
	// Page 11 : Q8
	// await page.getByLabel('code6').toBeVisible();
	expect(
		page.getByText('code1 : le libellé du code 1 contient du gras')
	).toBeVisible();
	expect(
		page.getByText('code2 le libellé du code 2 contient de l’italique')
	).toBeVisible();
	expect(
		page.getByText(
			'code3 : le libellé du code 3 contient du gras et de l’italique'
		)
	).toBeVisible();
	expect(
		page.getByText('code4 : le libellé du code 4 contient du gras italique')
	).toBeVisible();
	expect(
		page.getByText(
			'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3'
		)
	).toBeVisible();
	expect(page.getByText('code6')).toBeVisible();
	expect(page.getByText('code7 le code 7 porte une infobulle')).toBeVisible();
	expect(page.getByText('code8')).toBeVisible();
	const code7 = await page.$('span.field-md');
	await code7.hover();
	expect(page.getByText('My name is Bond, James Bond')).toBeVisible();
	const radioBtn8 = await page.$('#lunatic-radio-jfjepz6i-6');
	await radioBtn8.check();
	expect(radioBtn8.isChecked()).toBeTruthy();
	await page.getByRole('button', { name: 'Continuer' }).click();
	//PAGE 12 : Q9
	const thirdRadio = page.getByRole('radio', {
		name: 'code3 : le libellé du code 3 contient du gras et de l’italique',
	});
	await page
		.getByRole('radio', {
			name: 'code1 : le libellé du code 1 contient du gras',
		})
		.click();
	await page
		.getByRole('radio', {
			name: 'code1 : le libellé du code 1 contient du gras',
		})
		.press('ArrowDown');
	await page
		.getByRole('radio', {
			name: 'code2 le libellé du code 2 contient de l’italique',
		})
		.press('ArrowDown');
	await thirdRadio.press('Enter');
	expect(thirdRadio.isChecked()).toBeTruthy();
	const fifthRadio = await page.getByRole('radio', {
		name: 'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3',
	});
	await fifthRadio.click();
	expect(fifthRadio.isChecked()).toBeTruthy();
	expect(await thirdRadio.isChecked()).toBeFalsy();
	await page.getByRole('button', { name: 'Continuer' }).click();
	//PAGE 13 : Q10
	const fourthRadio = await page.$('#lunatic-radio-k6cc6f8r-4');
	await fourthRadio.check();
	expect(fourthRadio.isChecked()).toBeTruthy();
	await page.getByRole('button', { name: 'Continuer' }).click();
	//Page 14 : Q11
	const dropdown = await page.$('#jfjfae9f');
	await dropdown.click();

	// sélectionner l'option "Allier" et cliquer dessus pour la choisir
	const option = await page.$('text=Allier');
	await option.click();

	// vérifier que l'option sélectionnée a bien le texte "Allier"
	const selectedOption = await dropdown.$('.lunatic-combo-box-selected');
	const selectedOptionText = await selectedOption.textContent();
	expect(selectedOptionText.trim()).toEqual('Allier');
	await dropdown.click();
	const option2 = await page.$('text=Drôme');
	await option2.click();
	const selectedOptionText2 = await selectedOption.textContent();
	expect(selectedOptionText2.trim()).toEqual('Drôme');
	await page.getByRole('button', { name: 'Continuer' }).click();
	//PAGE 14 : Q12
	await page
		.getByLabel(
			'➡ 12. Question à choix unique - présentation autocomplétion, par TS'
		)
		.fill('ok');
	await page.getByRole('button', { name: 'Continuer' }).click();
	//PAGE 15 : Q13

	const radioBtnQ13_1 = await page.$('#lunatic-checkbox-jfkxh2lf-QCM_B1');
	const radioBtnQ13_5 = await page.$('#lunatic-checkbox-jfkxh2lf-QCM_B5');
	await radioBtnQ13_1.check();
	await radioBtnQ13_5.check();
	expect(await radioBtnQ13_1.isChecked()).toBeTruthy();
	expect(await radioBtnQ13_5.isChecked()).toBeTruthy();
	await page.getByRole('button', { name: 'Continuer' }).click();
	//PAGE 16 : Q14
	const radioNesaisPasL1 = page
		.getByRole('row', { name: 'choix 1' })
		.getByRole('radio', { name: 'Ne sait pas' });
	await radioNesaisPasL1.check();
	expect(await radioNesaisPasL1.isChecked()).toBeTruthy();
	await page.getByRole('button', { name: 'Continuer' }).click();
	//PAGE 17 : Q15
	const radioBtnQ15_1 = page
		.getByRole('row', { name: 'code1 : le libellé du code 1 contient du gras' })
		.getByRole('radio', { name: 'Oui' });
	await radioBtnQ15_1.check();
	expect(await radioBtnQ15_1.isChecked()).toBeTruthy();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel(
			'➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGERRappel de la valeur collectée INTEGER = 12'
		)
		.click();
	await page
		.getByLabel(
			'➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGERRappel de la valeur collectée INTEGER = 12'
		)
		.fill('99');
	await page
		.getByLabel(
			'➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGERRappel de la valeur collectée INTEGER = 12'
		)
		.click();
	await page
		.getByLabel(
			'➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGERRappel de la valeur collectée INTEGER = 12'
		)
		.fill('3');
	await page
		.getByRole('row', { name: 'de 16 à 17 ans' })
		.getByRole('spinbutton')
		.click();
	await page
		.getByRole('row', { name: 'de 16 à 17 ans' })
		.getByRole('spinbutton')
		.fill('4');
	await page
		.getByRole('row', { name: 'de 18 à 19 ans' })
		.getByRole('spinbutton')
		.click();
	await page
		.getByRole('row', { name: 'de 18 à 19 ans' })
		.getByRole('spinbutton')
		.fill('5');
	await page
		.getByRole('row', { name: '20 et plus' })
		.getByRole('spinbutton')
		.click();
	await page
		.getByRole('row', { name: '20 et plus' })
		.getByRole('spinbutton')
		.click();
	await page
		.getByRole('row', { name: '20 et plus' })
		.getByRole('spinbutton')
		.fill('6');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText('La somme est supérieure au nombre collecté : 12')
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page
		.getByRole('row', { name: '20 et plus' })
		.getByRole('spinbutton')
		.click();
	await page
		.getByRole('row', { name: '20 et plus' })
		.getByRole('spinbutton')
		.fill('2');
	await page
		.getByRole('row', { name: 'de 18 à 19 ans' })
		.getByRole('spinbutton')
		.click();
	await page
		.getByRole('row', { name: 'de 18 à 19 ans' })
		.getByRole('spinbutton')
		.fill('1');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel(
			'➡ 17. Tableau un axe simple, une mesure, sans unitéCOntrole sur somme des lignes > 100'
		)
		.click();
	await page
		.getByLabel(
			'➡ 17. Tableau un axe simple, une mesure, sans unitéCOntrole sur somme des lignes > 100'
		)
		.fill('12');
	expect(
		await page
			.getByLabel(
				'➡ 17. Tableau un axe simple, une mesure, sans unitéCOntrole sur somme des lignes > 100'
			)
			.inputValue()
	).toEqual('12');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel('➡ 18. Tableau un axe simple, plusieurs mesures, sans unité')
		.click();
	await page
		.getByLabel('➡ 18. Tableau un axe simple, plusieurs mesures, sans unité')
		.fill('1');
	expect(
		await page
			.getByLabel('➡ 18. Tableau un axe simple, plusieurs mesures, sans unité')
			.inputValue()
	).toEqual('1');
	await page
		.getByRole('row', {
			name: 'choix 1 ➡ 18. Tableau un axe simple, plusieurs mesures, sans unité',
		})
		.getByRole('radio', { name: 'Oui' })
		.click();
	await page
		.getByRole('row', {
			name: 'choix 1 ➡ 18. Tableau un axe simple, plusieurs mesures, sans unité',
		})
		.getByRole('radio', { name: 'Oui' })
		.click();
	await page
		.getByRole('row', {
			name: 'choix 1 ➡ 18. Tableau un axe simple, plusieurs mesures, sans unité',
		})
		.getByRole('radio', { name: 'Oui' })
		.click();
	await page
		.getByRole('row', { name: 'choix 3' })
		.getByRole('radio', { name: 'Oui' })
		.click();
	expect(
		await page
			.getByRole('row', { name: 'choix 3' })
			.getByRole('radio', { name: 'Oui' })
			.isChecked()
	).toBeTruthy();
	await page
		.getByRole('row', { name: 'choix 5' })
		.getByRole('spinbutton')
		.click();
	// await page
	// 	.getByRole('row', { name: 'choix 5' })
	// 	.getByRole('spinbutton')
	// 	.fill('toto');
	// expect(
	// 	await page
	// 		.getByRole('row', { name: 'choix 5' })
	// 		.getByRole('spinbutton')
	// 		.inputValue()
	// ).toEqual('toto');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel('➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité')
		.click();
	await page
		.getByLabel('➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité')
		.fill('1');
	await page.locator('#lunatic-table-td-jfkzttm3-1-1 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-1-1 #jfkzttm3').fill('12');
	await page.locator('#lunatic-table-td-jfkzttm3-2-1 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-2-1 #jfkzttm3').fill('13');
	await page.locator('#lunatic-table-td-jfkzttm3-3-1 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-3-1 #jfkzttm3').fill('14');
	await page.locator('#lunatic-table-td-jfkzttm3-4-1 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-4-1 #jfkzttm3').fill('15');
	await page.locator('#lunatic-table-td-jfkzttm3-5-1 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-5-1 #jfkzttm3').fill('16');
	await page.locator('#lunatic-table-td-jfkzttm3-6-1 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-6-1 #jfkzttm3').fill('17');
	await page.locator('#lunatic-table-td-jfkzttm3-7-1').click();
	await page.locator('#lunatic-table-td-jfkzttm3-7-1 #jfkzttm3').fill('18');
	await page.locator('#lunatic-table-td-jfkzttm3-0-2 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-0-2 #jfkzttm3').fill('2');
	await page.locator('#lunatic-table-td-jfkzttm3-1-2 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-1-2 #jfkzttm3').fill('21');
	await page.locator('#lunatic-table-td-jfkzttm3-2-2 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-2-2 #jfkzttm3').fill('22');
	await page.locator('#lunatic-table-td-jfkzttm3-3-2 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-3-2 #jfkzttm3').fill('23');
	await page.locator('#lunatic-table-td-jfkzttm3-4-2 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-4-2 #jfkzttm3').fill('24');
	await page.locator('#lunatic-table-td-jfkzttm3-5-2 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-5-2 #jfkzttm3').fill('25');
	await page.locator('#lunatic-table-td-jfkzttm3-6-2 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-6-2 #jfkzttm3').fill('26');
	await page.locator('#lunatic-table-td-jfkzttm3-7-2 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-7-2 #jfkzttm3').fill('27');
	await page.locator('#lunatic-table-td-jfkzttm3-0-3 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-0-3 #jfkzttm3').fill('3');
	await page.locator('#lunatic-table-td-jfkzttm3-1-3 #jfkzttm3').fill('3');
	await page.locator('#lunatic-table-td-jfkzttm3-1-3 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-1-3 #jfkzttm3').fill('31');
	await page.locator('#lunatic-table-td-jfkzttm3-2-3 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-2-3 #jfkzttm3').fill('32');
	await page.locator('#lunatic-table-td-jfkzttm3-3-3 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-3-3 #jfkzttm3').fill('33');
	await page.locator('#lunatic-table-td-jfkzttm3-4-3 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-4-3 #jfkzttm3').fill('34');
	await page.locator('#lunatic-table-td-jfkzttm3-5-3 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-5-3 #jfkzttm3').fill('35');
	await page.locator('#lunatic-table-td-jfkzttm3-6-3 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-6-3 #jfkzttm3').fill('36');
	await page.locator('#lunatic-table-td-jfkzttm3-7-3 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-7-3 #jfkzttm3').fill('37');
	await page.locator('#lunatic-table-td-jfkzttm3-0-4 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-0-4 #jfkzttm3').fill('4');
	await page.locator('#lunatic-table-td-jfkzttm3-1-4 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-1-4 #jfkzttm3').fill('41');
	await page.locator('#lunatic-table-td-jfkzttm3-2-4 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-2-4 #jfkzttm3').fill('42');
	await page.locator('#lunatic-table-td-jfkzttm3-3-4 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-3-4 #jfkzttm3').fill('43');
	await page.locator('#lunatic-table-td-jfkzttm3-4-4 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-4-4 #jfkzttm3').fill('44');
	await page.locator('#lunatic-table-td-jfkzttm3-4-4 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-5-4 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-5-4 #jfkzttm3').fill('45');
	await page.locator('#lunatic-table-td-jfkzttm3-6-4 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-6-4 #jfkzttm3').fill('46');
	await page.locator('#lunatic-table-td-jfkzttm3-7-4 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-7-4 #jfkzttm3').fill('47');
	await page.locator('#lunatic-table-td-jfkzttm3-0-5 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-0-5 #jfkzttm3').fill('5');
	await page.locator('#lunatic-table-td-jfkzttm3-1-5 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-1-5 #jfkzttm3').fill('51');
	await page.locator('#lunatic-table-td-jfkzttm3-2-5 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-2-5 #jfkzttm3').fill('52');
	await page.locator('#lunatic-table-td-jfkzttm3-3-5 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-3-5 #jfkzttm3').fill('53');
	await page.locator('#lunatic-table-td-jfkzttm3-4-5 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-4-5 #jfkzttm3').fill('54');
	await page.locator('#lunatic-table-td-jfkzttm3-5-5 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-5-5 #jfkzttm3').fill('55');
	await page.locator('#lunatic-table-td-jfkzttm3-6-5 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-6-5 #jfkzttm3').fill('56');
	await page.locator('#lunatic-table-td-jfkzttm3-7-5 #jfkzttm3').click();
	await page.locator('#lunatic-table-td-jfkzttm3-7-5 #jfkzttm3').fill('57');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel('➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité')
		.click();
	await page
		.getByLabel('➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité')
		.fill('11');
	await page
		.getByRole('row', { name: 'code 1 2 k€' })
		.locator('#jfkzrwce')
		.click();
	await page
		.getByRole('row', { name: 'code 1 2 k€' })
		.locator('#jfkzrwce')
		.fill('12');
	await page
		.getByRole('row', { name: 'code2 code 2 1 k€' })
		.locator('#jfkzrwce')
		.click();
	await page
		.getByRole('row', { name: 'code2 code 2 1 k€' })
		.locator('#jfkzrwce')
		.fill('21');
	await page
		.getByRole('row', { name: 'code 2 2 k€' })
		.locator('#jfkzrwce')
		.click();
	await page
		.getByRole('row', { name: 'code 2 2 k€' })
		.locator('#jfkzrwce')
		.fill('22');
	await page
		.getByRole('row', { name: 'code 2 3 k€' })
		.locator('#jfkzrwce')
		.click();
	await page
		.getByRole('row', { name: 'code 2 3 k€' })
		.locator('#jfkzrwce')
		.fill('23');
	await page
		.getByRole('row', { name: 'code 3 k€' })
		.locator('#jfkzrwce')
		.click();
	await page
		.getByRole('row', { name: 'code 3 k€' })
		.locator('#jfkzrwce')
		.fill('30');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel(
			'➡ 21. Tableau dynamique jusque 5 lignes, 2 mesures dont une unité A CREER'
		)
		.click();
	await page
		.getByLabel(
			'➡ 21. Tableau dynamique jusque 5 lignes, 2 mesures dont une unité A CREER'
		)
		.fill('11');
	await page.locator('#main').click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel('➡ 22. Quel est votre prénom ?Controle sur prénom vide')
		.click();
	await page
		.getByLabel('➡ 22. Quel est votre prénom ?Controle sur prénom vide')
		.press('CapsLock');
	await page
		.getByLabel('➡ 22. Quel est votre prénom ?Controle sur prénom vide')
		.fill('AAAAA');
	await page
		.getByLabel('➡ 22. Quel est votre prénom ?Controle sur prénom vide')
		.press('CapsLock');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 23. Quelle est votre adresse email ?').click();
	await page
		.getByLabel('➡ 23. Quelle est votre adresse email ?')
		.fill('a@gmail.com');
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(page.getByText('Description socio démo de AAAAA')).toBeVisible();
	await page.getByRole('button', { name: 'Continuer' }).click();
	//oui
	expect(
		page.getByText('➡ 24. Bonjour AAAAA, êtes vous majeur ?')
	).toBeVisible();
	await page.getByRole('radio', { name: 'Oui' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(
		page.getByText('➡ 25. AAAAA, quelle est votre date de naissance ?')
	).toBeVisible();
	await page.locator('#main').click();
	await page
		.getByLabel(
			'➡ 25. AAAAA, quelle est votre date de naissance ?Format année : AAAAControle sur age et fait d’être majeurAGE calculé : null'
		)
		.fill('2000-03-19');
	await page.locator('#main').click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	//cas homme
	await page.getByRole('radio', { name: 'Homme' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel(
			'➡ 27. Question masquée par défaut, qui s’affiche lorsque l’individu coche majeurSi a coché Homme, la question 33 disparaitra'
		)
		.click();
	await page
		.getByLabel(
			'➡ 27. Question masquée par défaut, qui s’affiche lorsque l’individu coche majeurSi a coché Homme, la question 33 disparaitra'
		)
		.fill("ok c'est noté");
	await page.getByRole('button', { name: 'Continuer' }).click();
	//cas femme
	await page.getByRole('button', { name: 'Retour' }).click();
	await page.getByRole('button', { name: 'Retour' }).click();
	await page.getByRole('radio', { name: 'Femme' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(
		page.getByText(
			'➡ 28. Question affichée par défaut, filtrée si l’individu est un homme'
		)
	).toBeVisible();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(
		page.getByText(
			'Nous allons maintenant décrire les personnes qui vivent avec madameAAAAA'
		)
	).toBeVisible();
	await page.getByRole('button', { name: 'Continuer' }).click();

	await page
		.getByLabel(
			'➡ 29. Combien de personnes vivent dans votre logement, y compris vous ?'
		)
		.click();
	await page
		.getByLabel(
			'➡ 29. Combien de personnes vivent dans votre logement, y compris vous ?'
		)
		.fill('2');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 30. Combien avez vous d’enfants à charge ?').click();
	await page
		.getByLabel('➡ 30. Combien avez vous d’enfants à charge ?')
		.fill('5');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText(
				'le ménage doit comporter au moins un adulte. Vous en déclarez -3'
			)
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page
		.getByLabel('➡ 30. Combien avez vous d’enfants à charge ?')
		.fill('2');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText(
				'le ménage doit comporter au moins un adulte. Vous en déclarez 0'
			)
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page
		.getByLabel(
			'➡ 30. Combien avez vous d’enfants à charge ?Controle sur nb enfantsNb adultes : 0'
		)
		.click();
	await page
		.getByLabel(
			'➡ 30. Combien avez vous d’enfants à charge ?Controle sur nb enfantsNb adultes : 0'
		)
		.fill('1');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 31. Nom').first().click();
	await page.getByLabel('➡ 31. Nom').first().press('CapsLock');
	await page.getByLabel('➡ 31. Nom').first().fill('AAA');
	await page.getByLabel('➡ 31. Nom').nth(1).click();
	await page.getByLabel('➡ 31. Nom').nth(1).fill('BBB');
	await page.getByLabel('➡ 32. Age entre 0 et 100').first().click();
	await page.getByLabel('➡ 32. Age entre 0 et 100').first().fill('18');
	await page.getByLabel('➡ 32. Age entre 0 et 100').nth(1).click();
	await page.getByLabel('➡ 32. Age entre 0 et 100').nth(1).fill('19');
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(
		page.getByText('➡ 33. AAA, quelle est votre taille en centimètres ?')
	).toBeVisible();
	await page
		.getByLabel(
			'➡ 33. AAA, quelle est votre taille en centimètres ?Controle sur taille - si taille < 80'
		)
		.click();
	await page
		.getByLabel(
			'➡ 33. AAA, quelle est votre taille en centimètres ?Controle sur taille - si taille < 80'
		)
		.fill('175');
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(
		page.getByText('➡ 33. BBB, quelle est votre taille en centimètres ?')
	).toBeVisible();
	await page
		.getByLabel(
			'➡ 33. BBB, quelle est votre taille en centimètres ?Controle sur taille - si taille < 80'
		)
		.click();
	await page
		.getByLabel(
			'➡ 33. BBB, quelle est votre taille en centimètres ?Controle sur taille - si taille < 80'
		)
		.fill('158');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.locator('#main').click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
});
