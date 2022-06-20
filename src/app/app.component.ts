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
      this.getToken();
    }).catch(err => console.error(err));
  }

  getToken() {
    this.http.post('https://api.line.me/message/v3/notifier/token', {
      "liffAccessToken": liff.getAccessToken()
  }).subscribe(resp => {
      console.log(resp);
      this.sendMessage(resp);
    })
  }

  sendMessage(data: any) {
//     this.http.post('https://api.line.me/message/v3/notifier/send?target=service', {
//     "templateName": "thankyou_msg_en",
//     "params": {
//         "date": "2020-04-23",
//         "username": "Brown & Cony"
//     },
//     "notificationToken": data.notificationToken
// }).subscribe(resp => {
//   console.log(resp);
// })
    liff
    .sendMessages([
      {
        type: "text",
        text: "Hello, World!",
      },
    ])
    .then(() => {
      console.log("message sent");
    })
    .catch((err) => {
      console.log("error", err);
    });
  }

  logout(): void {
    liff.logout();
    window.location.reload();
  }
}