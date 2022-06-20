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
      // this.getFriendship();
    }).catch(err => console.error(err));
  }

  sendMessage() {
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

  sendTarget() {
    liff.shareTargetPicker(
      [
        {
          "type": "bubble",
          "styles": {
            "header": {
              "backgroundColor": "#ffaaaa"
            },
            "body": {
              "backgroundColor": "#aaffaa"
            },
            "footer": {
              "backgroundColor": "#aaaaff"
            }
          },
          "header": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "header"
              }
            ]
          },
          "hero": {
            "type": "image",
            "url": "https://example.com/flex/images/image.jpg",
            "size": "full",
            "aspectRatio": "2:1"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "body"
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "footer"
              }
            ]
          }
        }
    ],
      {
        isMultiple: true,
      }
    )
    .then(function (res) {
      if (res) {
        // succeeded in sending a message through TargetPicker
        console.log(`[${res.status}] Message sent!`)
      } else {
        const [majorVer, minorVer] = (liff.getLineVersion() || "").split('.');
        if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) {
          // LINE 10.3.0 - 10.10.0
          // Old LINE will access here regardless of user's action
          console.log('TargetPicker was opened at least. Whether succeeded to send message is unclear')
        } else {
          // LINE 10.11.0 -
          // sending message canceled
          console.log('TargetPicker was closed!')
        }
      }
    }).catch(function (error) {
      // something went wrong before sending a message
      console.log('something wrong happen')
    })
  }

  logout(): void {
    liff.logout();
    window.location.reload();
  }
}