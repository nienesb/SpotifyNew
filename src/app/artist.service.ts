import {Injectable, Component} from '@angular/core';
import {Observable} from "rxjs";
import {Request, Headers, Response, Http, RequestOptions} from "@angular/http";
import {Artist} from "../../Artist";
import {SpotifyOptions} from "angular2-spotify";


export const spotifyConfig = {
  clientId: '62b917dd9db545c9993305cca9b84f48',
  redirectUri: 'http://localhost:4200/callback',
  scope: 'user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private',
  authToken: localStorage.getItem('angular2-spotify-token'),
  apiBase: 'https://api.spotify.com/v1'
}

interface HttpRequestOptions {
  method?: string;
  url: string;
  search?: Object;
  body?: Object;
  headers?: Headers;
}

@Injectable()
export class ArtistService {
  public userInfo: any;
  public playListInfo: any;
  public favoritesInfo: any;
  private showDialog;
  private authToken;
  // account settings mee geven
  constructor(private http: Http) {
    this.showDialog = true;
    this.authToken = localStorage.getItem('angular2-spotify-token');

  }

  // functie om artiesten te zoeken
  getArtist(searchWord: string) {
    let fullURL = 'https://api.spotify.com/v1/search?type=artist&q=' + encodeURIComponent(searchWord);
    return this.http.get(fullURL)
      .map((res: Response) => {
        console.log(res.json());
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postApplicationRequest(code: string) {
  }

  login() {
    let promise = new Promise((resolve, reject) => {
      let w = 400,
        h = 500,
        left = (screen.width / 2) - (w / 2),
        top = (screen.height / 2) - (h / 2);

      let params = {
        client_id: spotifyConfig.clientId,
        redirect_uri: spotifyConfig.redirectUri,
        scope: spotifyConfig.scope || '',
        response_type: 'token',
        show_dialog: this.showDialog
      };
      let authCompleted = false;
      let authWindow = this.openDialog(
        'https://accounts.spotify.com/authorize?' + this.toQueryString(params),
        'Spotify',
        'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left,
        () => {
          if (!authCompleted) {
            return reject('Login rejected error');
          }
        }
      );

      // token opslaam
      let storageChanged = (e) => {
        console.log(e.key);
        if (e.key === 'angular2-spotify-token') {
          if (authWindow) {
            authWindow.close();
          }
          authCompleted = true;

          this.authToken = e.newValue;
          window.removeEventListener('storage', storageChanged, false);

          return resolve(e.newValue);
        }
      };
      window.addEventListener('storage', storageChanged, false);
    });

    return Observable.fromPromise(promise).catch(this.handleError);
  }

  logout() {
    this.authToken = null;
    this.userInfo = null;
    localStorage.setItem('angular2-spotify-token', null);
  }

  private openDialog(uri, name, options, cb) {
    let win = window.open(uri, name, options);
    let interval = window.setInterval(() => {
      try {
        if (!win || win.closed) {
          window.clearInterval(interval);
          cb(win);
        }
      } catch (e) {
        console.log(e);
      }
    }, 100000000);
    return win;
  }

  private auth(isJson?: boolean): Object {
    let auth = {
      'Authorization': 'Bearer ' + this.authToken
    };
    if (isJson) {
      auth['Content-Type'] = 'application/json';
    }
    return auth;
  }

  private toQueryString(obj: Object): string {
    let parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    }
    return parts.join('&');
  };

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  //naam gebruiker ophalen
  getCurrentUser() {
    return this.api({
      method: 'get',
      url: `/me`,
      headers: this.getHeaders()
    }).map(res => res.json());
  }

  //afspeellijsten ophalen
  public getCurrentUsersPlaylists(limit: number, offSet: number) {
    return this.api({
      method: 'get',
      url: `/me/playlists?limit=${limit}&offset=${offSet}`,
      headers: this.getHeaders()
    }).map(res => res.json());
  }

  //favoriete artiesten ophalen
  following(type: string, options?: SpotifyOptions) {
    options = options || {};
    options.type = type;
    return this.api({
      method: 'get',
      url: `/me/following`,
      search: options,
      headers: this.getHeaders()
    }).map(res => res.json());
  }

  //artiesten volgen/favoriet maken
  follow(type: string, ids: string | Array<string>) {
    return this.api({
      method: 'put',
      url: `/me/following`,
      search: {type: type, ids: ids.toString()},
      headers: this.getHeaders()
    });
  }

  // functie om artiesten te on-favorieten
  unfollow(type: string, ids: string) {
    return this.api({
      method: 'delete',
      url: `/me/following`,
      search: {type: type, ids: ids},
      headers: this.getHeaders()
    });
  }

  private getHeaders(isJson?: boolean): any {
    return new Headers(this.auth(isJson));
  }

  private api(requestOptions: HttpRequestOptions) {
    var response = this.http.request(new Request({
      url: spotifyConfig.apiBase + requestOptions.url,
      method: requestOptions.method || 'get',
      search: this.toQueryString(requestOptions.search),
      body: JSON.stringify(requestOptions.body),
      headers: requestOptions.headers
    }));
    return response;
  }
}

