import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { CoachesModule } from '../app/coaches/coaches.module';
import { ProgramsModule } from './programs/programs.module';
import { URLResolverService } from './utils/url-resolver.service';
import { LogoComponent } from './layout/logo/logo.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ErrorComponent, LogoComponent],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    AuthModule,
    ProgramsModule,
    CoachesModule,
    ProgramsModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true, },
    URLResolverService
  ],
  bootstrap      : [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
