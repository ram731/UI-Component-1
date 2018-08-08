export class ConfigService {

    private static instace: ConfigService = null;
    private componentMetadata: Map<string, any> = new Map<string, any>();

    private constructor() {}

    public static getInstane() {

        if (!ConfigService.instace) {
            ConfigService.instace = new ConfigService();
        }

        return ConfigService.instace;
    }

    public setComponentMetadata(key: string, value: any) {
        this.componentMetadata.set(key, value);
       // console.log(`After set Len is ${this.componentMetadata.size}`);
    }

    public getRoute(componentName: string) {
        console.log('Get ',componentName,this.componentMetadata);
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
