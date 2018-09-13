export class ConfigCacheService {

    private static instace: ConfigCacheService = null;
    private componentMetadata: Map<string, any> = new Map<string, any>();

    private constructor() {}

    public static getInstane() {

        if (!ConfigCacheService.instace) {
            ConfigCacheService.instace = new ConfigCacheService();
        }

        return ConfigCacheService.instace;
    }

    public setComponentMetadata(key: string, value: any) {
        this.componentMetadata.set(key, value);
    }

    public getRoute(componentName: string) : any {
        return this.componentMetadata.get(componentName).route;
    }

    public getResourceBundle(componentName: string) {
        return this.componentMetadata.get(componentName).resourceBundle;
    }

    public isPlaceBarRequired(componentName: string) {
        return this.componentMetadata.get(componentName).placeBarRequired;
    }

    public showSaveAndExit(componentName: string) {
        return this.componentMetadata.get(componentName).showSaveAndExit;
    }

    public getTitle(componentName: string) {
        return this.componentMetadata.get(componentName).title;
    }

    public getMetadata(componentName:string): string {
        return this.componentMetadata.get(componentName);
    }
}
