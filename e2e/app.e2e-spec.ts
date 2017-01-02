import { WebtechLab5Page } from './app.po';

describe('webtech-lab5 App', function() {
  let page: WebtechLab5Page;

  beforeEach(() => {
    page = new WebtechLab5Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
