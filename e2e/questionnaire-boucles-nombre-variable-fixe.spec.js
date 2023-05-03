import { test, expect } from '@playwright/test';
test('QNONREG - tous types boucle nombre variable ou fixe (min=max)', async ({
	page,
}) => {
	await page.goto(
		'https://visu-stromae-v2-sandbox.demo.insee.io/visualize?questionnaire=https%3A%2F%2Fpogues-back-office-sandbox.demo.insee.io%2Fapi%2Fpersistence%2Fquestionnaire%2Fjson-lunatic%2Fkx0a2hn8'
	);

	await page.getByRole('button', { name: 'Commencer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	// await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 1. PRENOM').first().fill('AA');
	await page.getByRole('button', { name: 'Ajoute un prénom' }).click();
	await page.getByLabel('➡ 1. PRENOM').nth(1).fill('BB');
	await page.getByRole('button', { name: 'Ajoute un prénom' }).click();
	await page.getByLabel('➡ 1. PRENOM').nth(2).fill('CC');
	expect(await page.locator('input[type="text"]').count()).toEqual(3);
	await page.getByRole('button', { name: 'Remove row' }).click();
	expect(await page.locator('input[type="text"]').count()).toEqual(2);
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 2. Q1 de AA').fill('A');

	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel('➡ 3. Affichage de Q2 si Q1 = A - rappel du prénom : AA')
		.fill('A2');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 2. Q1 de BB').fill('A');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel('➡ 3. Affichage de Q2 si Q1 = A - rappel du prénom : BB')
		.fill('B1');
	await page
		.getByLabel('➡ 3. Affichage de Q2 si Q1 = A - rappel du prénom : BB')
		.fill('B2');
	//cas sans q2 pour AA et BB
	await page.getByRole('button', { name: 'Retour' }).click();
	await page.getByRole('button', { name: 'Retour' }).click();
	await page.getByRole('button', { name: 'Retour' }).click();
	await page.getByLabel('➡ 2. Q1 de AA').fill('C');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 2. Q1 de BB').fill('C');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 4. Décrire un produitContrôle sur P1 vide').click();
	await page
		.getByLabel('➡ 4. Décrire un produitContrôle sur P1 vide')
		.fill('P');
	await page
		.getByLabel('➡ 4. Décrire un produitContrôle sur P1 vide')
		.fill('P1');
	await page.getByLabel('➡ 5. Avis sur produit').fill('ras');
	await page.getByRole('button', { name: 'Ajouter un produit' }).click();
	await page
		.getByLabel('➡ 4. Décrire un produitContrôle sur P1 vide')
		.nth(1)
		.click();
	await page
		.getByLabel('➡ 4. Décrire un produitContrôle sur P1 vide')
		.nth(1)
		.press('CapsLock');
	await page
		.getByLabel('➡ 4. Décrire un produitContrôle sur P1 vide')
		.nth(1)
		.fill('P2');
	await page.getByLabel('➡ 5. Avis sur produit').nth(1).fill('ras');
	await page.getByRole('button', { name: 'Remove row' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel('➡ 6. NBon vérifie que la formule cast-string-NB est ok :null')
		.fill('3');
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(await page.getByRole('textbox').count()).toEqual(3);
	// Vérifie que le texte du premier champ de texte est égal à "A"
	await page.locator('[id="kwupruv2-0\\ "]').fill('A');

	const textA = await page.locator('[id="kwupruv2-0\\ "]').inputValue();
	expect(textA).toEqual('A');
	await page.locator('[id="kwupruv2-1\\ "]').fill('B');
	// Vérifie que le texte du deuxième champ de texte est égal à "B"
	expect(await page.locator('[id="kwupruv2-1\\ "]').inputValue()).toEqual('B');
	await page.locator('[id="kwupruv2-2\\ "]').fill('C');
	// Vérifie que le texte du troisième champ de texte est égal à "C"
	expect(await page.locator('[id="kwupruv2-2\\ "]').inputValue()).toEqual('C');
	await page.getByRole('button', { name: 'Continuer' }).click();

	await page.getByLabel('➡ 8. AGE de A').fill('10');
	expect(page.getByText('➡ 8. AGE de A')).toBeVisible();
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(page.getByText('➡ 8. AGE de B')).toBeVisible();
	await page.getByLabel('➡ 8. AGE de B').fill('11');
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(page.getByText('➡ 8. AGE de C')).toBeVisible();
	await page.getByLabel('➡ 8. AGE de C').fill('12');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
});
