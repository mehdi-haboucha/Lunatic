import { test, expect } from '@playwright/test';
test('Questionnaire Controles Filtres et Vidages', async ({ page }) => {
	await page.goto(
		'https://visu-stromae-v2-sandbox.demo.insee.io/visualize?questionnaire=https%3A%2F%2Fpogues-back-office-sandbox.demo.insee.io%2Fapi%2Fpersistence%2Fquestionnaire%2Fjson-lunatic%2Flfsey94u'
	);
	await page.getByRole('button', { name: 'Commencer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('radio', { name: 'je ne filtre pas' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 2. Input1').fill('1');
	expect(await page.getByLabel('➡ 2. Input1').inputValue()).toEqual('1');
	await page.getByRole('button', { name: 'Continuer' }).click();

	await page.getByLabel('➡ 3. Input2').fill('2');
	expect(await page.getByLabel('➡ 3. Input2').inputValue()).toEqual('2');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 4. Input3').fill('3');
	expect(await page.getByLabel('➡ 4. Input3').inputValue()).toEqual('3');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('radio', { name: 'je ne filtre pas' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('radio', { name: 'AAAA' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('radio', { name: 'BBBB' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('radio', { name: 'je filtre' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
});
