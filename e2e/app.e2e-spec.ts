import { PAngPage } from './app.po';

describe('p-ang App', () => {
  let page: PAngPage;

  beforeEach(() => {
    page = new PAngPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
