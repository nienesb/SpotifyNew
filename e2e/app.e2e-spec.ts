import { SpotifyNewPage } from './app.po';

describe('spotify-new App', function() {
  let page: SpotifyNewPage;

  beforeEach(() => {
    page = new SpotifyNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
