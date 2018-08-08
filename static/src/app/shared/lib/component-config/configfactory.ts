import { Injector } from '@angular/core';
import { Router, Route, Routes } from '@angular/router';
import { ConfigService } from './config-cache';
import { PageModule } from '../../../pages/pages.module';
import { MyDeqComponentModule } from './componentModule';
import * as _ from 'lodash';

export function ConfigServiceFactory(injector: Injector): Function {
    return () => {
        //console.log('Getting config in routing module');
        const service: ConfigService = ConfigService.getInstane();
        const router: Router = injector.get(Router);
        const decoratorFactory = Reflect.getOwnPropertyDescriptor(PageModule, '__annotations__').value[0];
        let componentList: any[] = [];

        // Create a list of components from modules.
        decoratorFactory.imports.forEach(importedModule => {
                if (importedModule.prototype instanceof MyDeqComponentModule) {
                componentList = componentList
                                .concat(Reflect.getOwnPropertyDescriptor(importedModule, '__annotations__')
                                .value[0].entryComponents);
            }
        });

        //Register routes for each component.
        const filteredRoutes = router.config;
        const userDefRoute: Routes = [];
        componentList.forEach(element => {
            const newArr = _.map(service.getRoute(element.name), function (elm) {
                return elm.pageURL.split('/');
            });
            findAndAdd(userDefRoute, newArr, element);
        });
        userDefRoute.push(filteredRoutes[0]);
        router.resetConfig(userDefRoute);

    };
}

function findAndAdd(routeArr: any, pathArr: string[][], componentObj: any) {

    pathArr.forEach(element => {
        _findAndAddHelper(routeArr, element, componentObj);
    });

}

function _findAndAddHelper(routeArr: any, pathArr: string[], componentObj: any) {
    let pathObj: Route = _.find(routeArr, { path: pathArr[0] });

    //if Not Found
    if (!pathObj) {
        // do we have more elm in path arr
        if (pathArr.length > 1) {
            // -- if yes add path & children to pathObj and pass children filed as routerArr to same Function
            const pathVal = pathArr.shift();
            const emptyArr: Routes = [];

            pathObj = {
                path: pathVal,
                children: emptyArr
            };
            _findAndAddHelper(pathObj['children'], pathArr, componentObj);
            routeArr.push(pathObj);
        } else {
            // -- if no add path and component to route arr;
            pathObj = {
                path: pathArr[0],
                component: componentObj
            };
            routeArr.push(pathObj);
        }
    } else {
        //If found 
        // if childeren present 
        if (pathObj['children']) {
            // - if yes call same function with children filed as routerArr and path arr with top elm removed.              
        } else {
            // if no add children & call same function with children filed as routerArr and path arr with top elm removed.
            const emptyArr: Routes = [];
            pathObj['children'] = emptyArr;
        }

        pathArr.shift();
        _findAndAddHelper(pathObj['children'], pathArr, componentObj);
    }
}
