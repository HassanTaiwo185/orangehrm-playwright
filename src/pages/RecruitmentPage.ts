import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RecruitmentPage extends BasePage {

    // ─── ARRANGE: Locators ───────────────────────────────────────────────────

    private readonly candidateNameInput  = this.page.getByPlaceholder('Type for hints...');
    private readonly searchButton        = this.page.getByRole('button', { name: 'Search' });
    private readonly resetButton         = this.page.getByRole('button', { name: 'Reset' });
    private readonly deleteConfirmButton = this.page.getByRole('button', { name: 'Yes, Delete' });
    private readonly cancelDeleteButton  = this.page.getByRole('button', { name: 'No, Cancel' });

    private readonly statusDropdown      = this.page.locator('.oxd-input-group')
                                              .filter({ hasText: 'Status' })
                                              .locator('.oxd-select-text-input');

    private readonly vacancyDropdown     = this.page.locator('.oxd-input-group')
                                              .filter({ hasText: 'Vacancy' })
                                              .locator('.oxd-select-text-input');

    private readonly methodDropdown      = this.page.locator('.oxd-input-group')
                                              .filter({ hasText: 'Method of Application' })
                                              .locator('.oxd-select-text-input');

    private readonly statusDropdownText  = this.page.locator('.oxd-input-group')
                                              .filter({ hasText: 'Status' })
                                              .getByText('-- Select --');

    private readonly candidatesHeading   = this.page.getByRole('heading', { name: 'Candidates' });
    private readonly applicationStage    = this.page.getByText('Application Stage');
    private readonly candidateProfile    = this.page.getByText('Candidate Profile');
    private readonly candidateHistory    = this.page.getByText('Candidate History');
    private readonly deleteConfirmDialog = this.page.getByText('The selected record will be permanently deleted. Are you sure you want to continue?');
    private readonly successToast        = this.page.getByText('Successfully Deleted');
    private readonly invalidError        = this.page.getByText('Invalid');
    private readonly recordsFoundSpan    = this.page.locator('span').filter({ hasText: 'Records Found' }).first();
    private readonly noRecordsFoundSpan  = this.page.locator('span').filter({ hasText: 'No Records Found' }).first();

    constructor(page: Page) {
        super(page);
    }

    // ─── ACT: Navigation ─────────────────────────────────────────────────────

    async navigateToCandidates(): Promise<void> {
        await this.page.getByText('Recruitment').click();
        await this.waitForpageLoad();
    }

    // ─── ACT: Form Interactions ───────────────────────────────────────────────

    async enterCandidateName(name: string): Promise<void> {
        await this.candidateNameInput.fill(name);
        await this.page.waitForTimeout(1000);
    }

    async selectStatus(status: string): Promise<void> {
        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: status }).click();
    }

    async selectVacancy(vacancy: string): Promise<void> {
        await this.vacancyDropdown.click();
        await this.page.getByRole('option', { name: vacancy }).click();
    }

    async selectMethod(method: string): Promise<void> {
        await this.methodDropdown.click();
        await this.page.getByRole('option', { name: method }).click();
    }

    // ─── ACT: Button Clicks ───────────────────────────────────────────────────

    async clickSearch(): Promise<void> {
        await this.searchButton.click();
        await this.page.waitForTimeout(1000);
    }

    async clickReset(): Promise<void> {
        await this.resetButton.click();
    }

    async clickViewFirstCandidate(): Promise<void> {
        await this.page.getByRole('row').nth(1)
            .getByRole('button').first().click();
        await this.waitForpageLoad();
    }

    async clickDeleteFirstCandidate(): Promise<void> {
    await this.page.locator('.oxd-table-cell-action-space')
        .filter({ has: this.page.locator('.bi-trash') })
        .first()
        .click();
    }

    async confirmDelete(): Promise<void> {
        await this.deleteConfirmButton.click();
    }

    async cancelDelete(): Promise<void> {
        await this.cancelDeleteButton.click();
    }

    // ─── ASSERT ───────────────────────────────────────────────────────────────

    async assertOnCandidatesPage(): Promise<void> {
         await expect(this.page).toHaveURL(/viewCandidates/);
         await expect(this.candidatesHeading).toBeVisible();

    }

    async assertHasRecords(): Promise<void> {
        await expect(this.recordsFoundSpan).toBeVisible({ timeout: 10000 });
    }

    async assertNoRecordsFound(): Promise<void> {
        await expect(this.noRecordsFoundSpan).toBeVisible({ timeout: 10000 });
    }

    async assertInvalidNameError(): Promise<void> {
        await expect(this.invalidError).toBeVisible({ timeout: 5000 });
    }

    async assertFiltersCleared(): Promise<void> {
        await expect(this.statusDropdownText).toBeVisible();
    }

    async assertCandidateDetailVisible(): Promise<void> {
        await expect(this.applicationStage).toBeVisible({ timeout: 10000 });
        await expect(this.candidateProfile).toBeVisible({ timeout: 10000 });
        await expect(this.candidateHistory).toBeVisible({ timeout: 10000 });
    }

    async assertDeleteConfirmDialogVisible(): Promise<void> {
    await expect(this.deleteConfirmDialog).toBeVisible({ timeout: 8000 });
    }

    async assertDeleteCancelled(): Promise<void> {
        await expect(this.candidatesHeading).toBeVisible();
        await expect(this.recordsFoundSpan).toBeVisible({ timeout: 10000 });
    }

    async assertDeletedSuccessfully(): Promise<void> {
        await expect(this.successToast).toBeVisible({ timeout: 10000 });
    }
}