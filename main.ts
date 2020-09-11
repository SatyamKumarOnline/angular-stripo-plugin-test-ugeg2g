import './polyfills';

import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StripoEmailEditor} from './app/stripo-email-editor';

// services - belong in providers section below
import { StripoAuthService } from './app/stripo-auth.service';

@NgModule({
  exports: [
    CdkTableModule,
    FlexLayoutModule
  ]
})
export class DemoMaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [StripoEmailEditor],
  declarations: [StripoEmailEditor],
  bootstrap: [StripoEmailEditor],
  providers: [StripoAuthService]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */