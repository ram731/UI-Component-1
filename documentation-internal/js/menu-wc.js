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
                    <a href="index.html" data-type="index-link">&#x27;internal-documentation&#x27;</a>
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
                                            'data-target="#components-links-module-AppModule-dabb400e392788765409dff1eb55ef87"' : 'data-target="#xs-components-links-module-AppModule-dabb400e392788765409dff1eb55ef87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-dabb400e392788765409dff1eb55ef87"' :
                                            'id="xs-components-links-module-AppModule-dabb400e392788765409dff1eb55ef87"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonPageModule.html" data-type="entity-link">CommonPageModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentModule.html" data-type="entity-link">ComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentModule-22ac5b50b0d22aff5b564b48b0910cec"' : 'data-target="#xs-components-links-module-ComponentModule-22ac5b50b0d22aff5b564b48b0910cec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentModule-22ac5b50b0d22aff5b564b48b0910cec"' :
                                            'id="xs-components-links-module-ComponentModule-22ac5b50b0d22aff5b564b48b0910cec"' }>
                                            <li class="link">
                                                <a href="components/HistoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HistoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InventoryListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InventoryListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchComponent</a>
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
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' : 'data-target="#xs-components-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' :
                                            'id="xs-components-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' }>
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
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SessionTimeOutModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SessionTimeOutModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' : 'data-target="#xs-injectables-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' :
                                        'id="xs-injectables-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' }>
                                        <li class="link">
                                            <a href="injectables/LoggerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoggerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ManagerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ManagerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MyDeqErrorHandler.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MyDeqErrorHandler</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PageConentService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PageConentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/Utils.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>Utils</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' : 'data-target="#xs-pipes-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' :
                                            'id="xs-pipes-links-module-SharedModule-38c5661acf4d6e376acccacf97155ea9"' }>
                                            <li class="link">
                                                <a href="pipes/ConcatStringPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConcatStringPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/PhonePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PhonePipe</a>
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
                                <a href="classes/BaseControllerComponent.html" data-type="entity-link">BaseControllerComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasePageContent.html" data-type="entity-link">BasePageContent</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormDataUtil.html" data-type="entity-link">FormDataUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/HistoryText.html" data-type="entity-link">HistoryText</a>
                            </li>
                            <li class="link">
                                <a href="classes/InventoryListText.html" data-type="entity-link">InventoryListText</a>
                            </li>
                            <li class="link">
                                <a href="classes/ManagerConstant.html" data-type="entity-link">ManagerConstant</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgbDateFRParserFormatter.html" data-type="entity-link">NgbDateFRParserFormatter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReviewSectionText.html" data-type="entity-link">ReviewSectionText</a>
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
                                    <a href="injectables/BaseServices.html" data-type="entity-link">BaseServices</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link">LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManagerService.html" data-type="entity-link">ManagerService</a>
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
                                <a href="interfaces/DataEvent.html" data-type="entity-link">DataEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageEvent.html" data-type="entity-link">PageEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageTextGetter.html" data-type="entity-link">PageTextGetter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageTextSetter.html" data-type="entity-link">PageTextSetter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReviewComponentDetails.html" data-type="entity-link">ReviewComponentDetails</a>
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