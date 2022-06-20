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
      this.getFriendship();
    }).catch(err => console.error(err));
  }

  getFriendship() {
    // liff.getFriendship().then((data) => {
    //     console.log(data);
    //     if (data.friendFlag) {
    //         // something you want to do
    //     }
    // });

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

    if (liff.isApiAvailable('shareTargetPicker')) {
        liff.shareTargetPicker([
            {
                type: 'text',
                text: 'Hello, World!',
            },
        ]);
    }
  }

  logout(): void {
    liff.logout();
    window.location.reload();
  }
}