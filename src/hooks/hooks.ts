import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { OrangeHRMWorld } from './world';

setDefaultTimeout(60_000);

BeforeAll(async function () {
  console.log('\n OrangeHRM Test Suite Starting...\n');
});

AfterAll(async function () {
  console.log('\n Done! Run: npm run report:serve\n');
});

Before(async function (this: OrangeHRMWorld) {
    await this.init();
    await this.attach(`Browser: ${this.parameters.browser}`, 'text/plain');
});

After(async function (this: OrangeHRMWorld, scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.attach(screenshot, 'image/png');
        await this.attach(`Failed on: ${this.page.url()}`, 'text/plain');
    }
    await this.teardown();
    // Give the demo site time to recover between scenarios
    await new Promise(resolve => setTimeout(resolve, 3000));
});