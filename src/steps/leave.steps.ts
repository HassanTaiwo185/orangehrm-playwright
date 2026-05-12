import { Given, When, Then } from '@cucumber/cucumber';
import { OrangeHRMWorld } from '../hooks/world';
import { LoginPage } from '../pages/LoginPage';
import { LeavePage } from '../pages/LeavePage';
import users from '../../fixtures/users.json';
import leaveData from '../../fixtures/leave.json';

let leavePage: LeavePage;

Given('I am logged in as Admin', async function (this: OrangeHRMWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.enterUserName(users.admin.username);
    await loginPage.enterPassword(users.admin.password);
    await loginPage.clickLoginButton();
    await loginPage.assertDashBoard();
    leavePage = new LeavePage(this.page);
});

When('I navigate to Assign Leave page', async function (this: OrangeHRMWorld) {
    await leavePage.navigateToAssignLeave();
    await leavePage.assertOnAssignLeave();
});

When('I navigate to Leave List page', async function (this: OrangeHRMWorld) {
    await leavePage.navigateToLeaveList();
    await leavePage.assertOnLeaveList();
});

When('I assign leave using {string}', async function (this: OrangeHRMWorld, dataKey: string) {
    const data = leaveData[dataKey as keyof typeof leaveData] as {
        employeeName?: string;
        leaveType?: string;
        fromDate?: string;
        toDate?: string;
        comments?: string;
    };

    if (data.employeeName && data.employeeName.trim() !== '') {
        await leavePage.enterEmployeeName(data.employeeName);
    }
    if (data.leaveType && data.leaveType.trim() !== '') {
        await leavePage.selectLeaveType(data.leaveType);
    }
    if (data.fromDate && data.fromDate.trim() !== '') {
        await leavePage.enterFromDate(data.fromDate);
    }
    if (data.toDate && data.toDate.trim() !== '') {
        await leavePage.enterToDate(data.toDate);
    }
    if (data.comments && data.comments.trim() !== '') {
        await leavePage.enterComments(data.comments);
    }
    await leavePage.clickAssignAndConfirm();
});

When('I fill leave form using {string}', async function (this: OrangeHRMWorld, dataKey: string) {
    const data = leaveData[dataKey as keyof typeof leaveData] as {
        employeeName?: string;
        leaveType?: string;
        fromDate?: string;
        toDate?: string;
        comments?: string;
    };

    if (data.employeeName && data.employeeName.trim() !== '') {
        await leavePage.enterEmployeeName(data.employeeName);
    }
    if (data.leaveType && data.leaveType.trim() !== '') {
        await leavePage.selectLeaveType(data.leaveType);
    }
    if (data.fromDate && data.fromDate.trim() !== '') {
        await leavePage.enterFromDate(data.fromDate);
    }
    if (data.toDate && data.toDate.trim() !== '') {
        await leavePage.enterToDate(data.toDate);
    }
    if (data.comments && data.comments.trim() !== '') {
        await leavePage.enterComments(data.comments);
    }
});

When('I click the assign button without filling any fields', async function (this: OrangeHRMWorld) {
    await leavePage.clickAssign();
});

When('I click the assign button', async function (this: OrangeHRMWorld) {
    await leavePage.clickAssign();
});

When('I enter invalid employee name from {string}', async function (this: OrangeHRMWorld, dataKey: string) {
    const data = leaveData[dataKey as keyof typeof leaveData] as { employeeName: string };
    await leavePage.enterEmployeeNameNoResult(data.employeeName);
});

When('I filter by status {string}', async function (this: OrangeHRMWorld, status: string) {
    await leavePage.selectStatus(status);
});

When('I filter by date range from {string}', async function (this: OrangeHRMWorld, dataKey: string) {
    const data = leaveData[dataKey as keyof typeof leaveData] as {
        fromDate: string;
        toDate: string;
    };
    await leavePage.enterFromDate(data.fromDate);
    await leavePage.enterToDate(data.toDate);
});

When('I click the search button', async function (this: OrangeHRMWorld) {
    await leavePage.clickSearch();
});

When('I click the reset button', async function (this: OrangeHRMWorld) {
    await leavePage.clickReset();
});

When('I click the assign button and confirm', async function (this: OrangeHRMWorld) {
    await leavePage.clickAssignAndConfirm();
});

Then('the leave should be assigned successfully', async function (this: OrangeHRMWorld) {
    await leavePage.assertLeaveAssigned();
});

Then('I should see a required field error', async function (this: OrangeHRMWorld) {
    await leavePage.assertRequiredFieldError();
});

Then('I should see a date validation error', async function (this: OrangeHRMWorld) {
    await leavePage.assertDateValidationError();
});

Then('I should see a confirmation popup', async function (this: OrangeHRMWorld) {
    await leavePage.assertConfirmationPopupAppeared();
});

Then('I should see no employee search results', async function (this: OrangeHRMWorld) {
    await leavePage.assertNoRecordsFound();
});

Then('I should see a maximum comment length error', async function (this: OrangeHRMWorld) {
    await leavePage.assertMaxCommentError();
});

Then('I should see an overlapping leave warning', async function (this: OrangeHRMWorld) {
    await leavePage.assertOverlappingLeaveWarning();
});

Then('I should see records in the leave list', async function (this: OrangeHRMWorld) {
    await leavePage.assertLeaveListHasRecords();
});

Then('I should see no records in the leave list', async function (this: OrangeHRMWorld) {
    await leavePage.assertLeaveListEmpty();
});

Then('the filters should be cleared', async function (this: OrangeHRMWorld) {
    await leavePage.assertFiltersCleared();
});