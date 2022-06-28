import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';
// import { sendMessages } from '@liff/send-messages';
// import { Client } from '@line/bot-sdk';


// const crypto = require('crypto');
// const crypto = require("crypto-browserify")
// exports = "../../node_modules/@types/node/crypto";
// import Crypto = require("crypto");
// import * as Crypto from 'crypto';

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
    this.encrypt();
  }

  initLine(): void {
    liff.init({ liffId: '1657236181-DkbxgrEO' }, () => {
      if (liff.isLoggedIn()) {
        this.runApp();
      } else {
        liff.login({ redirectUri: 'http:localhost:8080/' });
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


  encrypt() {
    const secret = "abcdefg";
    const crypto = require('crypto');
    console.log(crypto
      .createHmac("sha256", secret)
      .update('sdadtyal')
      .digest("hex"));
    // console.log(Crypto
    //   .createHmac("sha256", secret)
    //   .update('sdadtyal')
    //   .digest("hex"));
  }

  getSignature() {
      // const channelSecret = 'bb9d7b27df04c1a30b8a2870a7e56f9f';
      // const body = '...';
      
      // const client = new Client({
      //   channelAccessToken: 'HPnl7NLuQPG/X69QwX71J+F2NGi2EfJmKCmjLS0raELWZbAfGu2JkWIJqjPEsRJ0r7VJgNNlKJCCUjlz9Rv/ee8BB7GsOAmtl431V8le0IF+JbyD0ylYwgA28pGz/XPxzaguf++elBQ/WRzfCGw/eQdB04t89/1O/w1cDnyilFU='
      // });

      // client.getMessageContent('1657236284')
      // .then((stream) => {
      //   stream.on('data', (chunk) => {
      //     console.log(chunk);
      //   });
      //   stream.on('error', (err) => {
      //     console.log(err);
      //     // error handling
      //   });
      // });

      // console.log(validateSignature(body, channelSecret, ''));
  //   const channelSecret = 'bb9d7b27df04c1a30b8a2870a7e56f9f';
  //   const body = '...';
  //   const signature = crypto.createHmac('SHA256', channelSecret).update(body).digest('base64');

  //   console.log(signature);
  }

  logout(): void {
    liff.logout();
    window.location.reload();
  }
}