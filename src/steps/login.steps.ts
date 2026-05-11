import { Given, When, Then } from '@cucumber/cucumber';
import { OrangeHRMWorld } from '../hooks/world';
import { LoginPage } from '../pages/LoginPage';
import users from '../../fixtures/users.json';

let loginPage: LoginPage;

Given('I am on the login page', async function (this: OrangeHRMWorld) {
    loginPage = new LoginPage(this.page);
    await loginPage.goto();
});

When('I enter username from {string}', async function (this: OrangeHRMWorld, userKey: string) {
    const user = users[userKey as keyof typeof users];
    await loginPage.enterUserName(user.username);
});

When('I enter password from {string}', async function (this: OrangeHRMWorld, userKey: string) {
    const user = users[userKey as keyof typeof users];
    await loginPage.enterPassword(user.password);
});

When('I click the login button', async function (this: OrangeHRMWorld) {
    await loginPage.clickLoginButton();
});

When('I attempt to login with wrong password {int} times', async function (this: OrangeHRMWorld, attempts: number) {
    for (let i = 0; i < attempts; i++) {
        await loginPage.enterUserName(users.admin.username);
        await loginPage.enterPassword(`wrongpassword${i}`);
        await loginPage.clickLoginButton();
    }
});

When('I navigate directly to the dashboard URL', async function (this: OrangeHRMWorld) {
    await this.page.goto('/web/index.php/dashboard/index');
});

Then('I should be on the dashboard', async function (this: OrangeHRMWorld) {
    await loginPage.assertDashBoard();
});

Then('I should see an invalid credentials error', async function (this: OrangeHRMWorld) {
    await loginPage.assertInvalidCredentialsError();
});

Then('I should see a username required error', async function (this: OrangeHRMWorld) {
    await loginPage.assertUsernameRequiredValidation();
});

Then('I should see a password required error', async function (this: OrangeHRMWorld) {
    await loginPage.assertPasswordRequiredValidation();
});

Then('I should see both fields required error', async function (this: OrangeHRMWorld) {
    await loginPage.assertBothFieldsRequiredValidation();
});

Then('I should see an account disabled error', async function (this: OrangeHRMWorld) {
    await loginPage.assertAccountDisabled();
});

Then('I should be redirected to the login page', async function (this: OrangeHRMWorld) {
    await loginPage.assertOnLoginPage();
});

Then('I should be on the ESS dashboard', async function (this: OrangeHRMWorld) {
    await loginPage.assertEssDashboard();
});