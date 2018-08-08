import { Component , OnInit} from '@angular/core';
import { MydeqComponentConfig } from '../../../shared/lib/component-config/mydeq-component-config';

@Component({
    selector: 'app-hello-world',
    templateUrl: './helloworld.component.html'
})
@MydeqComponentConfig({
    route: [{pageURL: '/modify/helloworld'}],
    serviceURL: '/abc',
    placeBarRequired: false,
    showSaveAndExit: false,
    title: 'Title'
})
export class HelloWorldComponent implements OnInit {

    constructor() {}
    ngOnInit(): void {
        console.log('Hello world init');
    }
}