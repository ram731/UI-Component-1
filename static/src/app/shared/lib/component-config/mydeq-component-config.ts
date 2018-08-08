import { ConfigService } from './config-cache';
import { Optional } from '../../../../../node_modules/@angular/core';

export function MydeqComponentConfig(input: ConfigInput): ClassDecorator {

   return function(constructor: Function) {
    const service: ConfigService = ConfigService.getInstane();
    service.setComponentMetadata(constructor.name, calculateServiceURL(input));
  };
}

function calculateServiceURL(input: ConfigInput) {
    input.route.forEach(eachRoute => {
        eachRoute.serviceURL = eachRoute.serviceURL || input.serviceURL;
    });

    return input;
}

export interface ConfigInput {
    route?: Path[];
    serviceURL?: string;
    resourceBundle?: any;
    placeBarRequired?: boolean;
    showSaveAndExit?: boolean;
    title?: string;
}

interface Path {
    pageURL?: string;
    serviceURL?: string;
}


