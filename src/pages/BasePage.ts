import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string): Promise<void> {
        const baseUrl = process.env.BASE_URL ?? 'https://opensource-demo.orangehrmlive.com';
        await this.page.goto(`${baseUrl}${path}`);
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async waitForpageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }
}