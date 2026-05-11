import {Page, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage{

    private readonly usernameInput = this.page.getByPlaceholder('Username');
    private readonly passwordInput = this.page.getByPlaceholder('Password');
    private readonly loginButton   = this.page.getByRole('button', { name: 'Login' });
    private readonly errorMessage  = this.page.getByText('Invalid credentials');
    private readonly requiredError = this.page.getByText('Required');

    constructor(page: Page){
        super(page);
    }

    async goto(): Promise<void>{
        await this.navigate('/web/index.php/auth/login');
        await this.waitForpageLoad();
    }

    async enterUserName(username: string): Promise<void>{
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
       await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
       await this.loginButton.click();
    }

    async assertDashBoard(): Promise<void>{
        await expect(this.page).toHaveURL(/dashboard/);
    }

    async assertInvalidCredentialsError(): Promise<void> {
       await expect(this.errorMessage).toBeVisible();
    }

    async assertUsernameRequiredValidation(): Promise<void> {
       await expect(this.requiredError.first()).toBeVisible();
    }

   async assertPasswordRequiredValidation(): Promise<void> {
     await expect(this.requiredError.last()).toBeVisible();
    }

    async assertBothFieldsRequiredValidation(): Promise<void> {
       await expect(this.requiredError.nth(0)).toBeVisible();
       await expect(this.requiredError.nth(1)).toBeVisible();
    }

    async assertAccountDisabled(): Promise<void> {
      await expect(this.page.getByText('Account Disabled')).toBeVisible();
    }

    async assertOnLoginPage(): Promise<void> {
        await expect(this.page).toHaveURL(/auth\/login/);
    }


    async assertEssDashboard(): Promise<void> {
       await expect(this.page).toHaveURL(/dashboard/);
       await expect(this.page.getByRole('link', { name: 'Admin' })).not.toBeVisible();
       await expect(this.page.getByRole('link', { name: 'My Info' })).toBeVisible();
    }



}