var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("app/components/breadcrumbService", ["@angular/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var BreadcrumbService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BreadcrumbService = (function () {
                function BreadcrumbService() {
                    this.routesFriendlyNames = new Map();
                    this.routesFriendlyNamesRegex = new Map();
                    this.routesWithCallback = new Map();
                    this.routesWithCallbackRegex = new Map();
                    this.hideRoutes = new Array();
                    this.hideRoutesRegex = new Array();
                }
                /**
                 * Specify a friendly name for the corresponding route.
                 *
                 * @param route
                 * @param name
                 */
                BreadcrumbService.prototype.addFriendlyNameForRoute = function (route, name) {
                    this.routesFriendlyNames.set(route, name);
                };
                /**
                 * Specify a friendly name for the corresponding route matching a regular expression.
                 *
                 * @param route
                 * @param name
                 */
                BreadcrumbService.prototype.addFriendlyNameForRouteRegex = function (routeRegex, name) {
                    this.routesFriendlyNamesRegex.set(routeRegex, name);
                };
                /**
                 * Specify a callback for the corresponding route.
                 * When a mathing url is navigatedd to, the callback function is invoked to get the name to be displayed in the breadcrumb.
                 */
                BreadcrumbService.prototype.addCallbackForRoute = function (route, callback) {
                    this.routesWithCallback.set(route, callback);
                };
                /**
                 * Specify a callback for the corresponding route matching a regular expression.
                 * When a mathing url is navigatedd to, the callback function is invoked to get the name to be displayed in the breadcrumb.
                 */
                BreadcrumbService.prototype.addCallbackForRouteRegex = function (routeRegex, callback) {
                    this.routesWithCallbackRegex.set(routeRegex, callback);
                };
                /**
                 * Show the friendly name for a given route (url). If no match is found the url (without the leading '/') is shown.
                 *
                 * @param route
                 * @returns {*}
                 */
                BreadcrumbService.prototype.getFriendlyNameForRoute = function (route) {
                    var name;
                    var routeEnd = route.substr(route.lastIndexOf('/') + 1, route.length);
                    this.routesFriendlyNames.forEach(function (value, key, map) {
                        if (key === route) {
                            name = value;
                        }
                    });
                    this.routesFriendlyNamesRegex.forEach(function (value, key, map) {
                        if (new RegExp(key).exec(route)) {
                            name = value;
                        }
                    });
                    this.routesWithCallback.forEach(function (value, key, map) {
                        if (key === route) {
                            name = value(routeEnd);
                        }
                    });
                    this.routesWithCallbackRegex.forEach(function (value, key, map) {
                        if (new RegExp(key).exec(route)) {
                            name = value(routeEnd);
                        }
                    });
                    return name ? name : routeEnd;
                };
                /**
                 * Specify a route (url) that should not be shown in the breadcrumb.
                 */
                BreadcrumbService.prototype.hideRoute = function (route) {
                    if (!this.hideRoutes.includes(route)) {
                        this.hideRoutes.push(route);
                    }
                };
                /**
                 * Specify a route (url) regular expression that should not be shown in the breadcrumb.
                 */
                BreadcrumbService.prototype.hideRouteRegex = function (routeRegex) {
                    if (!this.hideRoutesRegex.includes(routeRegex)) {
                        this.hideRoutesRegex.push(routeRegex);
                    }
                };
                /**
                 * Returns true if a route should be hidden.
                 */
                BreadcrumbService.prototype.isRouteHidden = function (route) {
                    var hide = this.hideRoutes.includes(route);
                    this.hideRoutesRegex.forEach(function (value) {
                        if (new RegExp(value).exec(route)) {
                            hide = true;
                        }
                    });
                    return hide;
                };
                BreadcrumbService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], BreadcrumbService);
                return BreadcrumbService;
            }());
            exports_1("BreadcrumbService", BreadcrumbService);
        }
    }
});
System.register("app/components/breadcrumb", ['@angular/core', '@angular/router', "app/components/breadcrumbService"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, router_1, breadcrumbService_1;
    var BreadcrumbComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (breadcrumbService_1_1) {
                breadcrumbService_1 = breadcrumbService_1_1;
            }],
        execute: function() {
            /**
             * This component shows a breadcrumb trail for available routes the router can navigate to.
             * It subscribes to the router in order to update the breadcrumb trail as you navigate to a component.
             */
            BreadcrumbComponent = (function () {
                function BreadcrumbComponent(router, breadcrumbService) {
                    this.router = router;
                    this.breadcrumbService = breadcrumbService;
                    this.useBootstrap = true;
                    this.prefix = '';
                }
                BreadcrumbComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._urls = new Array();
                    if (this.prefix.length > 0) {
                        this._urls.unshift(this.prefix);
                    }
                    this._routerSubscription = this.router.events.subscribe(function (navigationEnd) {
                        _this._urls.length = 0; //Fastest way to clear out array
                        _this.generateBreadcrumbTrail(navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url);
                    });
                };
                BreadcrumbComponent.prototype.ngOnChanges = function () {
                    if (!this._urls) {
                        return;
                    }
                    this._urls.length = 0;
                    this.generateBreadcrumbTrail(this.router.url);
                };
                BreadcrumbComponent.prototype.generateBreadcrumbTrail = function (url) {
                    if (!this.breadcrumbService.isRouteHidden(url)) {
                        //Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
                        this._urls.unshift(url);
                    }
                    if (url.lastIndexOf('/') > 0) {
                        this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/'))); //Find last '/' and add everything before it as a parent route
                    }
                    else if (this.prefix.length > 0) {
                        this._urls.unshift(this.prefix);
                    }
                };
                BreadcrumbComponent.prototype.navigateTo = function (url) {
                    this.router.navigateByUrl(url);
                };
                BreadcrumbComponent.prototype.friendlyName = function (url) {
                    return !url ? '' : this.breadcrumbService.getFriendlyNameForRoute(url);
                };
                BreadcrumbComponent.prototype.ngOnDestroy = function () {
                    this._routerSubscription.unsubscribe();
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Boolean)
                ], BreadcrumbComponent.prototype, "useBootstrap", void 0);
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', String)
                ], BreadcrumbComponent.prototype, "prefix", void 0);
                BreadcrumbComponent = __decorate([
                    core_2.Component({
                        selector: 'breadcrumb',
                        template: "\n        <ul [class.breadcrumb]=\"useBootstrap\">\n            <li *ngFor=\"let url of _urls; let last = last\" [ngClass]=\"{'active': last}\"> <!-- disable link of last item -->\n                <a role=\"button\" *ngIf=\"!last && url == prefix\" (click)=\"navigateTo('/')\">{{url}}</a>\n                <a role=\"button\" *ngIf=\"!last && url != prefix\" (click)=\"navigateTo(url)\">{{friendlyName(url)}}</a>\n                <span *ngIf=\"last\">{{friendlyName(url)}}</span>\n                <span *ngIf=\"last && url == prefix\">{{friendlyName('/')}}</span>\n            </li>\n        </ul>\n    "
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, breadcrumbService_1.BreadcrumbService])
                ], BreadcrumbComponent);
                return BreadcrumbComponent;
            }());
            exports_2("BreadcrumbComponent", BreadcrumbComponent);
        }
    }
});
System.register("app/app.module", ['@angular/core', '@angular/common', "app/components/breadcrumb", "app/components/breadcrumbService"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3, common_1, breadcrumb_1;
    var Ng2BreadcrumbModule;
    var exportedNames_1 = {
        'Ng2BreadcrumbModule': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_3(exports);
    }
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (breadcrumb_1_1) {
                breadcrumb_1 = breadcrumb_1_1;
                exportStar_1(breadcrumb_1_1);
            },
            function (breadcrumbService_2_1) {
                exportStar_1(breadcrumbService_2_1);
            }],
        execute: function() {
            Ng2BreadcrumbModule = (function () {
                function Ng2BreadcrumbModule() {
                }
                Ng2BreadcrumbModule = __decorate([
                    core_3.NgModule({
                        imports: [
                            common_1.CommonModule
                        ],
                        declarations: [
                            breadcrumb_1.BreadcrumbComponent
                        ],
                        exports: [
                            breadcrumb_1.BreadcrumbComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Ng2BreadcrumbModule);
                return Ng2BreadcrumbModule;
            }());
            exports_3("Ng2BreadcrumbModule", Ng2BreadcrumbModule);
        }
    }
});
System.register("ng2-breadcrumb", ["app/app.module", "app/components/breadcrumb", "app/components/breadcrumbService"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[
            function (app_module_1_1) {
                exports_4({
                    "Ng2BreadcrumbModule": app_module_1_1["Ng2BreadcrumbModule"]
                });
            },
            function (breadcrumb_3_1) {
                exports_4({
                    "BreadcrumbComponent": breadcrumb_3_1["BreadcrumbComponent"]
                });
            },
            function (breadcrumbService_3_1) {
                exports_4({
                    "BreadcrumbService": breadcrumbService_3_1["BreadcrumbService"]
                });
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=ng2-breadcrumb.js.map