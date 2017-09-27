"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", {value: true});
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AuthComponent = (function () {
  function AuthComponent(router, fb, authService) {
    this.router = router;
    this.fb = fb;
    this.authService = authService;
    this.auth = new forms_1.FormControl();
    this.logged_in = false;
  }

  AuthComponent.prototype.ngOnInit = function () {
    this.form = this.fb.group({
      email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
      password: ['', forms_1.Validators.required]
    });
    /* new FormGroup({
         email: new FormControl({value: 'Email'}, Validators.required),
         password: new FormControl({value: 'Password'}, Validators.required)
       });*/
  };
  AuthComponent.prototype.ngAfterViewInit = function () {
    this.logged_in = this.authService.access_token != null;
    if (this.logged_in)
      this.router
        .navigate(['/dashboard'])
        .then(function () {
        });
  };
  AuthComponent.prototype.signInUp = function () {
    var _this = this;
    this.authService
      .signinup(this.form.value)
      .subscribe(function (_user) {
        if (_user.hasOwnProperty('access_token')) {
          _this.authService.access_token = _user.access_token;
          localStorage.setItem('access-token', _this.authService.access_token);
          _this.router
            .navigate(['/dashboard'])
            .then(function () {
            });
        }
      });
  };
  return AuthComponent;
}());
AuthComponent = __decorate([
  core_1.Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
  })
], AuthComponent);
exports.AuthComponent = AuthComponent;
