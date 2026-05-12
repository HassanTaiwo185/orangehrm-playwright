import { Given } from '@cucumber/cucumber';
import { OrangeHRMWorld } from '../hooks/world';
import { LoginPage } from '../pages/LoginPage';
import users from '../../fixtures/users.json';

Given('I am logged in as Admin', async function (this: OrangeHRMWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.enterUserName(users.admin.username);
    await loginPage.enterPassword(users.admin.password);
    await loginPage.clickLoginButton();
    await loginPage.assertDashBoard();
});