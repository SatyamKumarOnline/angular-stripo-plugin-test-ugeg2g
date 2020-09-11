import { Component, OnInit, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take, flatMap } from 'rxjs/operators';
import { StripoAuthService } from './stripo-auth.service'; 
import * as StripoLib from '../assets/stripo.js';

declare var window: any;

@Component({
  selector: "stripo-email-editor",
  templateUrl: "./stripo-email-editor.html",
  styleUrls: ["./stripo-email-editor.scss"]
})
export class StripoEmailEditor implements OnInit {

    selectedEmail: any;

  constructor(private stripoAuthService: StripoAuthService) {}

  ngOnInit() {
    this.loadStripoScript();
  }

    public loadStripoScript() {
        let self = this;

        let body = <HTMLDivElement>document.body;
        let script = document.createElement('script');
        script.id = 'stripoScript';
        script.src = 'https://plugins.stripo.email/static/latest/stripo.js';
        script.async = true;
        script.defer = true;
        script.onload = function () {
            self.initStripo();
        };
        body.appendChild(script);
    }

    initStripo() {
        let self = this;

        window.Stripo.init({
            settingsId: 'stripoSettingsContainer',
            previewId: 'stripoPreviewContainer',
            codeEditorButtonId: 'codeEditor',
            undoButtonId: 'undoButton',
            redoButtonId: 'redoButton',
            locale: 'en',
            html: self.selectedEmail.html,
            css: self.selectedEmail.css,
            apiRequestData: {
                emailId: this.selectedEmail._id
            },
            getAuthToken: function (callback) {
                self.stripoAuthService.getAuthToken()
                    .subscribe((data: any) => {
                        console.log('data.token', data.token);
                        callback(data.token);
                    }, (error) => {
                        console.log('getAuthToken error', error);
                        callback(null);
                    });
            },
            "notifications": {
                "info": message => console.log(message),
                "error": message => console.error(message),
                "success": message => console.log(message),
                "warn": message => console.log(message),
                "loader": message => console.log(message),
                "hide": message => console.log(message)
            }
        });
    }


}
