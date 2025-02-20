import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApplicationPresenterAPI, ApplicationPresenter, RobotSettings } from '@universal-robots/contribution-api';
import { SimpleStorageNode } from './simple-storage.node';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';
import { URCAP_ID, VENDOR_ID } from 'src/generated/contribution-constants';

@Component({
    templateUrl: './simple-storage.component.html',
    styleUrls: ['./simple-storage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleStorageComponent implements ApplicationPresenter, OnChanges {
    // applicationAPI is optional
    @Input() applicationAPI: ApplicationPresenterAPI;
    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // applicationNode is required
    @Input() applicationNode: SimpleStorageNode;
    private beService: BackendService = inject(BackendService);
    readonly readResponse$: Observable<string | null> = this.beService.readData$;
    readonly writeResponse$: Observable<string | null> = this.beService.writeData$;
    writeText: string;

    private backendHttpUrl: string;

    constructor(
        protected readonly translateService: TranslateService,
        protected readonly cd: ChangeDetectorRef
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.robotSettings) {
            if (changes.applicationAPI?.currentValue && changes.applicationAPI.firstChange) {
                this.backendHttpUrl = this.applicationAPI.getContainerContributionURL(VENDOR_ID, URCAP_ID, 'simple-storage-backend', 'rest-api');
                console.log(this.backendHttpUrl);
            }

            if (!changes?.robotSettings?.currentValue) {
                return;
            }

            if (changes?.robotSettings?.isFirstChange()) {
                if (changes?.robotSettings?.currentValue) {
                    this.translateService.use(changes?.robotSettings?.currentValue?.language);
                }
                this.translateService.setDefaultLang('en');
            }

            this.translateService
                .use(changes?.robotSettings?.currentValue?.language)
                .pipe(first())
                .subscribe(() => {
                    this.cd.detectChanges();
                });
        }
    }

    onSubmit($event: string) {
        this.writeText = $event;
        this.cd.detectChanges();
    }

    onWriteClick() {
        console.log(`Sending the following text to file: ${this.writeText}`);
        this.beService.writeData(this.backendHttpUrl, this.writeText);
    }

    onReadClick() {
        this.beService.readData(this.backendHttpUrl);
    }


    // call saveNode to save node parameters
    saveNode() {
        this.cd.detectChanges();
        this.applicationAPI.applicationNodeService.updateNode(this.applicationNode);
    }
}
