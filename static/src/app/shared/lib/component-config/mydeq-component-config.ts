import { ConfigCacheService } from './config-cache';
import { Optional } from '../../../../../node_modules/@angular/core';

export function MydeqComponentConfig(input: ConfigInput): ClassDecorator {

   return function(constructor: Function) {
    const service: ConfigCacheService = ConfigCacheService.getInstane();
    const metadataObj = calculateServiceURL(input);

    if (metadataObj.resourceBundle){
        metadataObj.resourceBundle = new metadataObj.resourceBundle();
    }
    service.setComponentMetadata(constructor.name, metadataObj);
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


