import { MlclMgmtPage } from './app.po';

describe('mlcl-mgmt App', function() {
  let page: MlclMgmtPage;

  beforeEach(() => {
    page = new MlclMgmtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
