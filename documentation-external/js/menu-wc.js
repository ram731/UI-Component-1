'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">external documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-066a9faaba86b24cbe1b1b70092133e6"' : 'data-target="#xs-components-links-module-AppModule-066a9faaba86b24cbe1b1b70092133e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-066a9faaba86b24cbe1b1b70092133e6"' :
                                            'id="xs-components-links-module-AppModule-066a9faaba86b24cbe1b1b70092133e6"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonPageModule.html" data-type="entity-link">CommonPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CommonPageModule-a175b1dfaa68b7ce240f638dcbca3585"' : 'data-target="#xs-components-links-module-CommonPageModule-a175b1dfaa68b7ce240f638dcbca3585"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CommonPageModule-a175b1dfaa68b7ce240f638dcbca3585"' :
                                            'id="xs-components-links-module-CommonPageModule-a175b1dfaa68b7ce240f638dcbca3585"' }>
                                            <li class="link">
                                                <a href="components/AdditionalCommentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdditionalCommentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CertifyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CertifyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EachQuestion.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EachQuestion</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuestionListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResponsivePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResponsivePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WhatsNeededComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WhatsNeededComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentPageModule.html" data-type="entity-link">ComponentPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentPageModule-a7ab9c71703b6348fb091830012627aa"' : 'data-target="#xs-components-links-module-ComponentPageModule-a7ab9c71703b6348fb091830012627aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentPageModule-a7ab9c71703b6348fb091830012627aa"' :
                                            'id="xs-components-links-module-ComponentPageModule-a7ab9c71703b6348fb091830012627aa"' }>
                                            <li class="link">
                                                <a href="components/PageFooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageFooterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataTableModule.html" data-type="entity-link">DataTableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DataTableModule-97b71ed495edb211ed58d11e02adb735"' : 'data-target="#xs-components-links-module-DataTableModule-97b71ed495edb211ed58d11e02adb735"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataTableModule-97b71ed495edb211ed58d11e02adb735"' :
                                            'id="xs-components-links-module-DataTableModule-97b71ed495edb211ed58d11e02adb735"' }>
                                            <li class="link">
                                                <a href="components/BootstrapPaginator.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BootstrapPaginator</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DefaultSorter.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DefaultSorter</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Paginator.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Paginator</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-DataTableModule-97b71ed495edb211ed58d11e02adb735"' : 'data-target="#xs-directives-links-module-DataTableModule-97b71ed495edb211ed58d11e02adb735"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-DataTableModule-97b71ed495edb211ed58d11e02adb735"' :
                                        'id="xs-directives-links-module-DataTableModule-97b71ed495edb211ed58d11e02adb735"' }>
                                        <li class="link">
                                            <a href="directives/DataTable.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataTable</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyDEQCoreModule.html" data-type="entity-link">MyDEQCoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' : 'data-target="#xs-components-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' :
                                            'id="xs-components-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' }>
                                            <li class="link">
                                                <a href="components/CommentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormFieldComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyDEQLoadingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyDEQLoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MydeqAlertModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MydeqAlertModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MydeqFooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MydeqFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MydeqHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MydeqHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MydeqNavigationAlertModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MydeqNavigationAlertModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NeedHelpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NeedHelpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SessionTimeOutModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SessionTimeOutModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VSDropdownComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VSDropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' : 'data-target="#xs-injectables-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' :
                                        'id="xs-injectables-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' }>
                                        <li class="link">
                                            <a href="injectables/GlobalService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GlobalService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MyDeqErrorHandler.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MyDeqErrorHandler</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PageConentService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PageConentService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' : 'data-target="#xs-pipes-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' :
                                            'id="xs-pipes-links-module-MyDEQCoreModule-f6d79c53e79b6006d7ff82aba525e324"' }>
                                            <li class="link">
                                                <a href="pipes/ConcatStringPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConcatStringPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PhonePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhonePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SafeUrlPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafeUrlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PageModule.html" data-type="entity-link">PageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-2d6a8a64ee2c1d24de412ebb6ead2516"' : 'data-target="#xs-injectables-links-module-SharedModule-2d6a8a64ee2c1d24de412ebb6ead2516"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-2d6a8a64ee2c1d24de412ebb6ead2516"' :
                                        'id="xs-injectables-links-module-SharedModule-2d6a8a64ee2c1d24de412ebb6ead2516"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoggerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoggerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Utils.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>Utils</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseComponent.html" data-type="entity-link">BaseComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseController.html" data-type="entity-link">BaseController</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasePageContent.html" data-type="entity-link">BasePageContent</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasePathController.html" data-type="entity-link">BasePathController</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgbDateFRParserFormatter.html" data-type="entity-link">NgbDateFRParserFormatter</a>
                            </li>
                            <li class="link">
                                <a href="classes/PagecontentAdditionalComments.html" data-type="entity-link">PagecontentAdditionalComments</a>
                            </li>
                            <li class="link">
                                <a href="classes/PagecontentCertify.html" data-type="entity-link">PagecontentCertify</a>
                            </li>
                            <li class="link">
                                <a href="classes/PagecontentConfirmation.html" data-type="entity-link">PagecontentConfirmation</a>
                            </li>
                            <li class="link">
                                <a href="classes/PagecontentQuestionList.html" data-type="entity-link">PagecontentQuestionList</a>
                            </li>
                            <li class="link">
                                <a href="classes/PagecontentResponsivePage.html" data-type="entity-link">PagecontentResponsivePage</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectDropDown.html" data-type="entity-link">SelectDropDown</a>
                            </li>
                            <li class="link">
                                <a href="classes/SelectDropDown-1.html" data-type="entity-link">SelectDropDown</a>
                            </li>
                            <li class="link">
                                <a href="classes/WhatsNeededPageContent.html" data-type="entity-link">WhatsNeededPageContent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContentService.html" data-type="entity-link">ContentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalService.html" data-type="entity-link">GlobalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link">LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MyDeqErrorHandler.html" data-type="entity-link">MyDeqErrorHandler</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PageConentService.html" data-type="entity-link">PageConentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Utils.html" data-type="entity-link">Utils</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AdditionalGetCallDetails.html" data-type="entity-link">AdditionalGetCallDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdditionalPutCallDetails.html" data-type="entity-link">AdditionalPutCallDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataEvent.html" data-type="entity-link">DataEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EachQuestionDetail.html" data-type="entity-link">EachQuestionDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeaderDetails.html" data-type="entity-link">HeaderDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageEvent.html" data-type="entity-link">PageEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageFooterDetail.html" data-type="entity-link">PageFooterDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageTextGetter.html" data-type="entity-link">PageTextGetter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageTextSetter.html" data-type="entity-link">PageTextSetter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortEvent.html" data-type="entity-link">SortEvent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});