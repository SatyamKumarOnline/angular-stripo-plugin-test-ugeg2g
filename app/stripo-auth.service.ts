import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const STRIPO_AUTH_PATH = "https://plugins.stripo.email/api/v1/auth";

@Injectable()
export class StripoAuthService {

    constructor(public http: HttpClient) {
    }

  getAuthToken() {
    // TEMPORARILY INSERT CREDS HERE, BUT DON'T SAVE IT PERMANENTLY!!!
    let pluginId = ""; // <----
    let secretKey = ""; // <----

    let config = {
      url: STRIPO_AUTH_PATH,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        pluginId: pluginId,
        secretKey: secretKey
        // role: 'ADMIN' // only pass this if you want admin role; leave blank for normal users
      }
    };

    return this.http.post(config.url,
      JSON.stringify(config.body), { observe: 'response' })
      .subscribe((token: any) => {
        let _token = token.json();
        // console.log('token', _token);
        return _token;
      }, (error => {
        console.error("fetchUrl error:", error);
        return { error: error };
      })
      );

  }
}
