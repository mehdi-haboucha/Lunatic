import { test, expect } from '@playwright/test';
test('Questionnaire Controles Boucles Liées', async ({ page }) => {
	await page.goto(
		'https://visu-stromae-v2-sandbox.demo.insee.io/visualize?questionnaire=https%3A%2F%2Fpogues-back-office-sandbox.demo.insee.io%2Fapi%2Fpersistence%2Fquestionnaire%2Fjson-lunatic%2Fl7j0wwqx'
	);

	await page.getByRole('button', { name: 'Commencer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('radio', { name: 'Oui' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('radio', { name: 'Oui' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText(
				'Vous avez indiqué avoir deux résidences principales, pouvez-vous corriger l’une de vos réponses ?'
			)
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page.getByRole('radio', { name: 'Non' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByLabel('➡ 3. NBHAB : controle si > 5').fill('9');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText('supérieur à 5')
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page.getByLabel('➡ 3. NBHAB : controle si > 5').fill('2');
	await page.getByRole('button', { name: 'Continuer' }).click();
	expect(await page.getByRole('textbox').count()).toEqual(2);
	await page
		.getByLabel(
			'➡ 4. PrénomDeux controles sur le prénom : un sur le vide et sur Prénom = A'
		)
		.first()
		.fill('A');
	await page
		.getByLabel(
			'➡ 4. PrénomDeux controles sur le prénom : un sur le vide et sur Prénom = A'
		)
		.nth(1)
		.fill('BBB');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText('Remplir Q1 INDIV')
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page.getByRole('radio', { name: 'Oui' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('radio', { name: 'Oui' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText('Q1 et Q2 de A incompatibles')
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page.getByRole('radio', { name: 'Non' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel('➡ 7. Montant entre 0 et 100 pour l’individu A')
		.fill('120');

	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText('La valeur doit être comprise entre 0 et 100.')
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page
		.getByLabel('➡ 7. Montant entre 0 et 100 pour l’individu A')
		.fill('78');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText('Remplir Q1 INDIV')
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page.getByRole('radio', { name: 'Oui' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('radio', { name: 'Oui' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText('Q1 et Q2 de BBB incompatibles')
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page.getByRole('radio', { name: 'Non' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page
		.getByLabel('➡ 7. Montant entre 0 et 100 pour l’individu BBB')
		.fill('130');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await expect(
		page
			.getByRole('dialog', { name: 'Des points requièrent votre attention.' })
			.getByText('La valeur doit être comprise entre 0 et 100.')
	).toBeVisible();
	await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
	await page
		.getByLabel('➡ 7. Montant entre 0 et 100 pour l’individu BBB')
		.fill('72');
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.getByRole('button', { name: 'Continuer' }).click();
	await page.locator('#main').click();
});
