import { Component, NgZone } from '@angular/core';

@Component({
    selector: 'mydeq-session-timeout',
    templateUrl: './timeout.component.html'
})
export class SessionTimeOutModalComponent {
    sessionTimedOut = false;
    timeoutMessageIsVisible: boolean;
    private timeout = 1200000;     // 20m
    private warnTime = 1080000;     // 20m - 118s(count down) - 2m(buffer)
    private timer: any;
    private timestamp: any;

    init() {
        this.timestamp = new Date();
        this.initWatcher(() => {
            this.showWarnTimeoutModal();
        }, this.warnTime);
    }

    initWatcher(action, timeout) {
        this.timer = setTimeout(() => {
            action();
        }, timeout);
    }

    exdentSession () {
        clearTimeout(this.timer);
        this.init();
    }

    showWarnTimeoutModal() {
        this.sessionTimedOut = false;
        this.timeoutMessageIsVisible = true;
        const diffTime: number = this.timeout - this.warnTime;
        this.initWatcher(() => {
            this.showTimeoutModal();
        }, diffTime);
    }

    showTimeoutModal() {
        this.sessionTimedOut = true;
        this.timeoutMessageIsVisible = true;
    }

    continueSession() {
        clearTimeout(this.timer);
        this.timeoutMessageIsVisible = false;
        this.initWatcher(() => {
            this.showWarnTimeoutModal();
        }, this.warnTime);
    }

    endSession() {
        window.open('http://azdeq.gov/', '_self');
    }
}
