import { When, Then } from '@cucumber/cucumber';
import { OrangeHRMWorld } from '../hooks/world';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import recruitmentData from '../../fixtures/recruitment.json';

let recruitmentPage: RecruitmentPage;



When('I navigate to Candidates page', async function (this: OrangeHRMWorld) {
     recruitmentPage = new RecruitmentPage(this.page);
    await recruitmentPage.navigateToCandidates();
    await recruitmentPage.assertOnCandidatesPage();

});

When('I filter candidates using {string}', async function (this: OrangeHRMWorld, dataKey: string) {
    const data = recruitmentData[dataKey as keyof typeof recruitmentData] as {
        status?: string;
        vacancy?: string;
        method?: string;
    };

    if (data.status) {
        await recruitmentPage.selectStatus(data.status);
    }
    if (data.vacancy) {
        await recruitmentPage.selectVacancy(data.vacancy);
    }
    if (data.method) {
        await recruitmentPage.selectMethod(data.method);
    }
});

When('I enter candidate name from {string}', async function (this: OrangeHRMWorld, dataKey: string) {
    const data = recruitmentData[dataKey as keyof typeof recruitmentData] as {
        candidateName: string;
    };
    await recruitmentPage.enterCandidateName(data.candidateName);
});

When('I click the recruitment search button', async function (this: OrangeHRMWorld) {
    await recruitmentPage.clickSearch();
});

When('I click the recruitment reset button', async function (this: OrangeHRMWorld) {
    await recruitmentPage.clickReset();
});

When('I view the first candidate', async function (this: OrangeHRMWorld) {
    await recruitmentPage.clickViewFirstCandidate();
});

When('I click delete on the first candidate', async function (this: OrangeHRMWorld) {
    await recruitmentPage.clickDeleteFirstCandidate();
});

When('I confirm the delete', async function (this: OrangeHRMWorld) {
    await recruitmentPage.confirmDelete();
});

When('I cancel the delete', async function (this: OrangeHRMWorld) {
    await recruitmentPage.cancelDelete();
});

Then('I should see candidate records', async function (this: OrangeHRMWorld) {
    await recruitmentPage.assertHasRecords();
});

Then('I should see no candidate records', async function (this: OrangeHRMWorld) {
    await recruitmentPage.assertNoRecordsFound();
});

Then('I should see an invalid name error', async function (this: OrangeHRMWorld) {
    await recruitmentPage.assertInvalidNameError();
});

Then('the candidate filters should be cleared', async function (this: OrangeHRMWorld) {
    await recruitmentPage.assertFiltersCleared();
});

Then('I should see candidate detail sections', async function (this: OrangeHRMWorld) {
    await recruitmentPage.assertCandidateDetailVisible();
});

Then('I should see the delete confirmation dialog', async function (this: OrangeHRMWorld) {
    await recruitmentPage.assertDeleteConfirmDialogVisible();
});

Then('the candidate should be deleted successfully', async function (this: OrangeHRMWorld) {
    await recruitmentPage.assertDeletedSuccessfully();
});