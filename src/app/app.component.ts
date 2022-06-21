import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-line-login';
  idToken = '';
  displayName = '';
  pictureUrl = '';
  statusMessage = '';
  userId = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initLine();
    this.getSignature();
  }

  initLine(): void {
    liff.init({ liffId: '1657236181-DkbxgrEO' }, () => {
      if (liff.isLoggedIn()) {
        this.runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  runApp(): void {
    const idToken = liff.getIDToken();
    this.idToken = idToken;
    liff.getProfile().then(profile => {
      console.log(profile);
      this.displayName = profile.displayName;
      this.pictureUrl = profile.pictureUrl;
      this.statusMessage = profile.statusMessage;
      this.userId = profile.userId;
    }).catch(err => console.error(err));
  }

  getSignature() {
    const crypto = require('crypto');
    const channelSecret = 'bb9d7b27df04c1a30b8a2870a7e56f9f';
    const body = '...';
    const signature = crypto.createHmac('SHA256', channelSecret).update(body).digest('base64');

    console.log(signature);
  }

  logout(): void {
    liff.logout();
    window.location.reload();
  }
}