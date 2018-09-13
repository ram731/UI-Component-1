import { ConfigCacheService } from './config-cache';
import { Optional } from '@angular/core';

export function MydeqComponentConfig(input: ConfigInput): ClassDecorator {

   return function(constructor: Function) {
    const service: ConfigCacheService = ConfigCacheService.getInstane();
    const metadataObj = calculateServiceName(input);

    if (metadataObj.resourceBundle){
        metadataObj.resourceBundle = new metadataObj.resourceBundle();
    }
    console.log('MydeqComponentConfig constructor.name', constructor.name )
    service.setComponentMetadata(constructor.name, metadataObj);
  };
}

function calculateServiceName(input: ConfigInput) {
    input.route.forEach(eachRoute => {
        eachRoute.serviceName = eachRoute.serviceName || input.serviceName;
    });

    return input;
}

export interface ConfigInput {
    route?: Path[];
    serviceName?: string;
    resourceBundle?: any;
    placeBarRequired?: boolean;
    showSaveAndExit?: boolean;
    title?: string;
}

interface Path {
    pageURL?: string;
    serviceName?: string;
}


