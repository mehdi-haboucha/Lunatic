import { test, expect } from '@playwright/test';
test('QNONREG - sum, min dans une boucle et sur controle prénom et test filtre occurrence', async ({
	page,
}) => {
	await page.goto(
		'https://visu-stromae-v2-sandbox.demo.insee.io/visualize?questionnaire=https%3A%2F%2Fpogues-back-office-sandbox.demo.insee.io%2Fapi%2Fpersistence%2Fquestionnaire%2Fjson-lunatic%2Flb3ei722'
	);
	await page.getByRole('button', { name: 'Commencer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 1. NB').fill('2');
	expect(await page.getByLabel('➡ 1. NB').inputValue()).toEqual('2');
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(await page.getByRole('textbox').count()).toEqual(2);

	await page.locator('[id="ksyjvi40-0\\ "]').fill('AA');
	expect(await page.locator('[id="ksyjvi40-0\\ "]').inputValue()).toEqual('AA');
	await page.locator('[id="ksyjvi40-1\\ "]').fill('BB');
	expect(await page.locator('[id="ksyjvi40-1\\ "]').inputValue()).toEqual('BB');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(await page.getByText('➡ 3. Age de l’individu : AA')).toBeVisible();
	await page.getByLabel('➡ 3. Age de l’individu : AA').fill('22');
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(await page.getByText('➡ 3. Age de l’individu : BB')).toBeVisible();
	await page.getByLabel('➡ 3. Age de l’individu : BB').fill('12');
	await page.getByRole('button', { name: 'Continuer' }).click();
	//TODO
	expect(page.getByText('Affichage du nb de majeurs : 1')).toBeVisible();
	expect(page.getByText('Affichage du somme age : 34')).toBeVisible();
	expect(
		page.getByText('Affichage du min des ages sans cast: 12')
	).toBeVisible();
	await page.getByRole('button', { name: 'Continuer' }).click();
	//DIVERS
	expect(page.getByText('➡ 4. divers')).toBeVisible();
	await page.getByRole('button', { name: 'Continuer' }).click();
	//TODO
	expect(page.getByText('Affichage de la somme des ages : 34')).toBeVisible();
	expect(page.getByText('Affichage du nb de majeurs : 1')).toBeVisible();
	expect(page.getByText('Affichage du min des ages : 12')).toBeVisible();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
});
