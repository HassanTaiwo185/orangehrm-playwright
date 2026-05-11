import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit, BrowserType } from '@playwright/test';

export interface WorldParameters {
  browser : 'chromium' | 'firefox' | 'msedge' | 'webkit';
  baseUrl : string;
  headless: boolean;
}

export class OrangeHRMWorld extends World {
  browser!: Browser;        // The browser program (Chrome/Firefox/etc)
  context!: BrowserContext; // An isolated session (like incognito)
  page!   : Page;           // The actual tab we click/type on
  parameters: WorldParameters;
  testData: Record<string, unknown> = {}; // Share data between steps

  constructor(options: IWorldOptions) {
    super(options);
    this.parameters = options.parameters as WorldParameters;
  }

  async init(): Promise<void> {
    const browserType: BrowserType = this.resolveBrowser();
    this.browser = await browserType.launch({
      headless: this.parameters.headless,
      channel : this.parameters.browser === 'msedge' ? 'msedge' : undefined
    });
    this.context = await this.browser.newContext({
      baseURL : this.parameters.baseUrl,
      viewport: { width: 1280, height: 720 }
    });
    this.page = await this.context.newPage();
  }

  async teardown(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }

  private resolveBrowser(): BrowserType {
    switch (this.parameters.browser) {
      case 'firefox': return firefox;
      case 'webkit' : return webkit;
      default       : return chromium;
    }
  }

  get baseUrl(): string { return this.parameters.baseUrl; }
}

setWorldConstructor(OrangeHRMWorld);
