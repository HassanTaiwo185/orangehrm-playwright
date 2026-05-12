import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LeavePage extends BasePage {

    // ─── ARRANGE: Locators ───────────────────────────────────────────────────

    private readonly employeeNameInput    = this.page.getByPlaceholder('Type for hints...');
    private readonly assignButton         = this.page.getByRole('button', { name: 'Assign' });
    private readonly searchButton         = this.page.getByRole('button', { name: 'Search' });
    private readonly resetButton          = this.page.getByRole('button', { name: 'Reset' });

    private readonly leaveTypeDropdown    = this.page.locator('.oxd-input-group')
                                               .filter({ hasText: 'Leave Type' })
                                               .locator('.oxd-select-text-input');

    private readonly fromDateInput        = this.page.locator('.oxd-input-group')
                                               .filter({ hasText: 'From Date' })
                                               .locator('input');

    private readonly toDateInput          = this.page.locator('.oxd-input-group')
                                               .filter({ hasText: 'To Date' })
                                               .locator('input');

    private readonly commentsInput        = this.page.locator('textarea');

    private readonly statusDropdown       = this.page.locator('.oxd-input-group')
                                               .filter({ hasText: 'Show Leave with Status' })
                                               .locator('.oxd-select-text-input');

    private readonly confirmDialogTitle   = this.page.getByText('Confirm Leave Assignment', { exact: true });
    private readonly confirmOkButton      = this.page.getByRole('button', { name: 'Ok' });
    private readonly toastMessage         = this.page.getByText('Successfully Saved', { exact: true });
    private readonly autoCompleteDropdown = this.page.locator('.oxd-autocomplete-dropdown');

    private readonly assignLeaveHeading   = this.page.getByRole('heading', { name: 'Assign Leave' });
    private readonly leaveListHeading     = this.page.getByRole('heading', { name: 'Leave List' });
    private readonly requiredError        = this.page.getByText('Required').first();
    private readonly maxCommentError      = this.page.getByText('Should not exceed 250 characters');
    private readonly dateValidationError  = this.page.getByText('To date should be after from date');
    private readonly overlapWarning       = this.page.getByText('Overlapping Leave Request(s) Found');
    private readonly recordsFoundSpan     = this.page.locator('span').filter({ hasText: 'Records Found' }).first();
    private readonly noRecordsFoundSpan   = this.page.locator('span').filter({ hasText: 'No Records Found' }).first();
    private readonly selectDropdown       = this.page.getByText('-- Select --').first();

    constructor(page: Page) {
        super(page);
    }

    // ─── ACT: Navigation ─────────────────────────────────────────────────────

    async navigateToAssignLeave(): Promise<void> {
        await this.page.getByRole('link', { name: 'Leave' }).click();
        await this.page.waitForTimeout(500);
        await this.page.getByRole('link', { name: 'Assign Leave' }).click();
        await this.waitForpageLoad();
    }

    async navigateToLeaveList(): Promise<void> {
        await this.page.getByRole('link', { name: 'Leave' }).click();
        await this.page.waitForTimeout(500);
        await this.page.getByRole('link', { name: 'Leave List' }).click();
        await this.waitForpageLoad();
    }

    // ─── ACT: Form Interactions ───────────────────────────────────────────────

    async enterEmployeeName(name: string): Promise<void> {
        await this.employeeNameInput.click();
        await this.employeeNameInput.fill(name);
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option').first().waitFor({ timeout: 8000 });
        await this.page.getByRole('option').first().click();
    }

    async enterEmployeeNameNoResult(name: string): Promise<void> {
        await this.employeeNameInput.click();
        await this.employeeNameInput.type(name, { delay: 100 });
        await this.page.waitForTimeout(2000);
    }

    async selectLeaveType(leaveType: string): Promise<void> {
        await this.leaveTypeDropdown.click();
        await this.page.getByRole('option', { name: leaveType }).click();
    }

    async enterFromDate(date: string): Promise<void> {
        await this.fromDateInput.fill(date);
        await this.page.keyboard.press('Tab');
    }

    async enterToDate(date: string): Promise<void> {
        await this.toDateInput.fill(date);
        await this.page.keyboard.press('Tab');
    }

    async enterComments(comments: string): Promise<void> {
        await this.commentsInput.fill(comments);
    }

    async selectStatus(status: string): Promise<void> {
        await this.statusDropdown.click();
        await this.page.getByRole('option', { name: status }).click();
    }

    // ─── ACT: Button Clicks ───────────────────────────────────────────────────

    async handleConfirmationPopup(): Promise<void> {
        try {
            await this.confirmDialogTitle.waitFor({ timeout: 8000 });
            await this.confirmOkButton.click();
            await this.page.waitForTimeout(2000);
        } catch {
            // no confirmation popup appeared
        }
    }

    async clickAssign(): Promise<void> {
        await this.assignButton.click();
        await this.page.waitForTimeout(2000);
    }

    async clickAssignAndConfirm(): Promise<void> {
        await this.assignButton.click();
        await this.page.waitForTimeout(2000);
        await this.handleConfirmationPopup();
    }

    async clickSearch(): Promise<void> {
        await this.searchButton.click();
    }

    async clickReset(): Promise<void> {
        await this.resetButton.click();
    }

    // ─── ASSERT ───────────────────────────────────────────────────────────────

    async assertOnAssignLeave(): Promise<void> {
        await expect(this.page).toHaveURL(/assignLeave/);
        await expect(this.assignLeaveHeading).toBeVisible();
    }

    async assertOnLeaveList(): Promise<void> {
        await expect(this.page).toHaveURL(/viewLeaveList/);
        await expect(this.leaveListHeading).toBeVisible();
    }

    async assertLeaveAssigned(): Promise<void> {
        await expect(this.toastMessage).toBeVisible({ timeout: 15000 });
    }

    async assertNoRecordsFound(): Promise<void> {
        await expect(
            this.autoCompleteDropdown.getByText('No Records Found')
        ).toBeVisible({ timeout: 8000 });
    }

    async assertRequiredFieldError(): Promise<void> {
        await expect(this.requiredError).toBeVisible();
    }

    async assertMaxCommentError(): Promise<void> {
        await expect(this.maxCommentError).toBeVisible();
    }

    async assertDateValidationError(): Promise<void> {
        await expect(this.dateValidationError).toBeVisible({ timeout: 5000 });
    }

    async assertConfirmationPopupAppeared(): Promise<void> {
          await expect(this.confirmDialogTitle).toBeVisible({ timeout: 10000 });
    }

    async assertOverlappingLeaveWarning(): Promise<void> {
        await expect(this.overlapWarning).toBeVisible({ timeout: 10000 });
    }

    async assertLeaveListHasRecords(): Promise<void> {
        await expect(this.page).toHaveURL(/viewLeaveList/);
        await expect(this.recordsFoundSpan).toBeVisible({ timeout: 10000 });
    }

    async assertLeaveListEmpty(): Promise<void> {
        await expect(this.page).toHaveURL(/viewLeaveList/);
        await expect(this.noRecordsFoundSpan).toBeVisible({ timeout: 10000 });
    }

    async assertFiltersCleared(): Promise<void> {
        await expect(this.selectDropdown).toBeVisible();
    }
}