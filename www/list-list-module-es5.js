(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["list-list-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/list/list.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/list/list.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title>\r\n      Bulletin/Circular/Manual\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content fullscreen>\r\n  <!--<ion-list>\r\n    <ion-item *ngFor=\"let item of items\">\r\n      <ion-icon [name]=\"item.icon\" slot=\"start\"></ion-icon>\r\n      {{item.title}}\r\n      <div class=\"item-note\" slot=\"end\">\r\n        {{item.note}}\r\n      </div>\r\n    </ion-item>\r\n  </ion-list>-->\r\n  \r\n    <!--<div *ngIf=\"selectedItem\" padding>\r\n      You navigated here from <b>{{selectedItem.title }}</b>\r\n    </div>-->\r\n    <ion-card>\r\n      <img src=\"/assets/icon/179483.png\" />\r\n      <ion-card-header>\r\n        <ion-card-subtitle>Category: Bulletin</ion-card-subtitle>\r\n        <ion-card-title>By: Ms. Wutsamon Singsee</ion-card-title>\r\n      </ion-card-header>\r\n      <ion-card-content>\r\n        Description: DFO-CC-IM-007 The tailpipe fire procedures and emergency announcements\r\n      </ion-card-content>\r\n        <ion-button expand=\"block\" color=\"danger\" (click)=\"openLocalPdf()\" >Open Local PDF</ion-button>\r\n        <ion-button expand=\"block\" color=\"danger\" (click)=\"downloadAndOpenPdf()\">Download and open PDF</ion-button>\r\n    </ion-card>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/list/list.module.ts":
/*!*************************************!*\
  !*** ./src/app/list/list.module.ts ***!
  \*************************************/
/*! exports provided: ListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPageModule", function() { return ListPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _list_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./list.page */ "./src/app/list/list.page.ts");







var ListPageModule = /** @class */ (function () {
    function ListPageModule() {
    }
    ListPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _list_page__WEBPACK_IMPORTED_MODULE_6__["ListPage"]
                    }
                ])
            ],
            declarations: [_list_page__WEBPACK_IMPORTED_MODULE_6__["ListPage"]]
        })
    ], ListPageModule);
    return ListPageModule;
}());



/***/ }),

/***/ "./src/app/list/list.page.scss":
/*!*************************************!*\
  !*** ./src/app/list/list.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xpc3QvbGlzdC5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/list/list.page.ts":
/*!***********************************!*\
  !*** ./src/app/list/list.page.ts ***!
  \***********************************/
/*! exports provided: ListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPage", function() { return ListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/file/ngx */ "./node_modules/@ionic-native/file/ngx/index.js");
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ "./node_modules/@ionic-native/file-transfer/ngx/index.js");
/* harmony import */ var _ionic_native_file_opener_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/file-opener/ngx */ "./node_modules/@ionic-native/file-opener/ngx/index.js");
/* harmony import */ var _ionic_native_document_viewer_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/document-viewer/ngx */ "./node_modules/@ionic-native/document-viewer/ngx/index.js");








var ListPage = /** @class */ (function () {
    function ListPage(platform, file, ft, fileOpener, document, alertCrtl) {
        this.platform = platform;
        this.file = file;
        this.ft = ft;
        this.fileOpener = fileOpener;
        this.document = document;
        this.alertCrtl = alertCrtl;
        this.domain_name = "http://cdic.lionairapp.com";
        this.icons = [
            'flask',
            'wifi',
            'beer',
            'football',
            'basketball',
            'paper-plane',
            'american-football',
            'boat',
            'bluetooth',
            'build'
        ];
        this.items = [];
        /*for (let i = 1; i < 11; i++) {
          this.items.push({
            title: 'Item ' + i,
            note: 'This is item #' + i,
            icon: this.icons[Math.floor(Math.random() * this.icons.length)]
          });
        }*/
    }
    ListPage.prototype.openLocalPdf = function () {
        var _this = this;
        var filePath = this.file.applicationDirectory + 'www/assets';
        console.log('filePath is ' + filePath);
        if (this.platform.is('android')) {
            var fakeName = Date.now();
            this.file.copyFile(filePath, 'D5100_EN.pdf', this.file.dataDirectory, fakeName + ".pdf").then(function (result) {
                _this.fileOpener.open(result.nativeURL, 'application/pdf');
                _this.presentAlert("openLocalPdf", "openning", "");
            });
        }
        else {
            var options = {
                title: 'My PDF'
            };
            this.document.viewDocument(filePath + "/D5100_EN.pdf", 'application/pdf', options);
        }
    };
    ListPage.prototype.downloadAndOpenPdf = function () {
        var _this = this;
        var downloadUrl = this.domain_name + '/public/documents/pdf/1.pdf';
        console.log('downloadUrl is ' + downloadUrl);
        var path = this.file.dataDirectory;
        console.log('Path is ' + path);
        var transfer = this.ft.create();
        transfer.download(downloadUrl, path + "myfile.pdf").then(function (entry) {
            var url = entry.toURL();
            console.log('url is ' + url);
            if (_this.platform.is('ios')) {
                console.log(_this.platform.is);
                _this.document.viewDocument(url, 'application/pdf', {});
            }
            else {
                console.log(_this.platform.is);
                _this.fileOpener.open(url, 'application/pdf');
            }
        });
    };
    ListPage.prototype.presentAlert = function (head, subhead, message) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCrtl.create({
                            header: head,
                            subHeader: subhead,
                            message: message,
                            buttons: ['Close']
                        })];
                    case 1:
                        alert = _a.sent();
                        console.log("presentAlert is running");
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListPage.prototype.ngOnInit = function () {
    };
    ListPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] },
        { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_3__["File"] },
        { type: _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_4__["FileTransfer"] },
        { type: _ionic_native_file_opener_ngx__WEBPACK_IMPORTED_MODULE_5__["FileOpener"] },
        { type: _ionic_native_document_viewer_ngx__WEBPACK_IMPORTED_MODULE_6__["DocumentViewer"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
    ]; };
    ListPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-list',
            template: __webpack_require__(/*! raw-loader!./list.page.html */ "./node_modules/raw-loader/index.js!./src/app/list/list.page.html"),
            styles: [__webpack_require__(/*! ./list.page.scss */ "./src/app/list/list.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"],
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_3__["File"],
            _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_4__["FileTransfer"],
            _ionic_native_file_opener_ngx__WEBPACK_IMPORTED_MODULE_5__["FileOpener"],
            _ionic_native_document_viewer_ngx__WEBPACK_IMPORTED_MODULE_6__["DocumentViewer"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
    ], ListPage);
    return ListPage;
}());



/***/ })

}]);
//# sourceMappingURL=list-list-module-es5.js.map