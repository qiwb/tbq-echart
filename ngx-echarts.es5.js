import { Directive, ElementRef, EventEmitter, HostListener, Injectable, Input, NgModule, NgZone, Output } from '@angular/core';
import { Observable as Observable$1 } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
var ChangeFilter = (function () {
    /**
     * @param {?} _changes
     */
    function ChangeFilter(_changes) {
        this._changes = _changes;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ChangeFilter.of = function (changes) {
        return new ChangeFilter(changes);
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    ChangeFilter.prototype.notEmpty = function (key) {
        if (this._changes[key]) {
            var /** @type {?} */ value = this._changes[key].currentValue;
            if (value !== undefined && value !== null) {
                return Observable$1.of(value);
            }
        }
        return Observable$1.empty();
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    ChangeFilter.prototype.has = function (key) {
        if (this._changes[key]) {
            var /** @type {?} */ value = this._changes[key].currentValue;
            return Observable$1.of(value);
        }
        return Observable$1.empty();
    };
    return ChangeFilter;
}());
var NgxEchartsDirective = (function () {
    /**
     * @param {?} el
     * @param {?} _ngZone
     */
    function NgxEchartsDirective(el, _ngZone) {
        this.el = el;
        this._ngZone = _ngZone;
        // chart events:
        this.chartInit = new EventEmitter();
        this.chartClick = new EventEmitter();
        this.chartDblClick = new EventEmitter();
        this.chartMouseDown = new EventEmitter();
        this.chartMouseUp = new EventEmitter();
        this.chartMouseOver = new EventEmitter();
        this.chartMouseOut = new EventEmitter();
        this.chartGlobalOut = new EventEmitter();
        this.chartContextMenu = new EventEmitter();
        this.chartDataZoom = new EventEmitter();
        this.legendselectchanged = new EventEmitter();
        this._chart = null;
        this.currentWindowWidth = null;
    }
    /**
     * @return {?}
     */
    NgxEchartsDirective.prototype.createChart = function () {
        var _this = this;
        this.currentWindowWidth = window.innerWidth;
        var /** @type {?} */ dom = this.el.nativeElement;
        if (window && window.getComputedStyle) {
            var /** @type {?} */ prop = window.getComputedStyle(dom, null).getPropertyValue('height');
            if (!prop || prop === '0px') {
                dom.style.height = '400px';
            }
        }
        return this._ngZone.runOutsideAngular(function () { return echarts.init(dom, _this.theme || undefined, _this.initOpts || undefined); });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxEchartsDirective.prototype.onWindowResize = function (event) {
        if (event.target.innerWidth !== this.currentWindowWidth) {
            this.currentWindowWidth = event.target.innerWidth;
            if (this._chart) {
                this._chart.resize();
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxEchartsDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var /** @type {?} */ filter = ChangeFilter.of(changes);
        filter.notEmpty('options').subscribe(function (opt) { return _this.onOptionsChange(opt); });
        filter.notEmpty('merge').subscribe(function (opt) { return _this.setOption(opt); });
        filter.has('loading').subscribe(function (v) { return _this.toggleLoading(!!v); });
    };
    /**
     * @return {?}
     */
    NgxEchartsDirective.prototype.ngOnDestroy = function () {
        if (this._chart) {
            this._chart.dispose();
            this._chart = null;
        }
    };
    /**
     * @param {?} opt
     * @return {?}
     */
    NgxEchartsDirective.prototype.onOptionsChange = function (opt) {
        if (opt) {
            if (!this._chart) {
                this._chart = this.createChart();
                // output echart instance:
                this.chartInit.emit(this._chart);
                // register events:
                this.registerEvents(this._chart);
            }
            this._chart.setOption(this.options, true);
            this._chart.resize();
        }
    };
    /**
     * @param {?} _chart
     * @return {?}
     */
    NgxEchartsDirective.prototype.registerEvents = function (_chart) {
        var _this = this;
        if (_chart) {
            // register mouse events:
            _chart.on('click', function (e) { return _this._ngZone.run(function () { return _this.chartClick.emit(e); }); });
            _chart.on('dblClick', function (e) { return _this._ngZone.run(function () { return _this.chartDblClick.emit(e); }); });
            _chart.on('mousedown', function (e) { return _this._ngZone.run(function () { return _this.chartMouseDown.emit(e); }); });
            _chart.on('mouseup', function (e) { return _this._ngZone.run(function () { return _this.chartMouseUp.emit(e); }); });
            _chart.on('mouseover', function (e) { return _this._ngZone.run(function () { return _this.chartMouseOver.emit(e); }); });
            _chart.on('mouseout', function (e) { return _this._ngZone.run(function () { return _this.chartMouseOut.emit(e); }); });
            _chart.on('globalout', function (e) { return _this._ngZone.run(function () { return _this.chartGlobalOut.emit(e); }); });
            _chart.on('contextmenu', function (e) { return _this._ngZone.run(function () { return _this.chartContextMenu.emit(e); }); });
            // other events;
            _chart.on('datazoom', function (e) { return _this._ngZone.run(function () { return _this.chartDataZoom.emit(e); }); });
            _chart.on('legendselectchanged', function (e) { return _this._ngZone.run(function () { return _this.legendselectchanged.emit(e); }); });
        }
    };
    /**
     * @return {?}
     */
    NgxEchartsDirective.prototype.clear = function () {
        if (this._chart) {
            this._chart.clear();
        }
    };
    /**
     * @param {?} loading
     * @return {?}
     */
    NgxEchartsDirective.prototype.toggleLoading = function (loading) {
        if (this._chart) {
            loading ? this._chart.showLoading() : this._chart.hideLoading();
        }
    };
    /**
     * @param {?} option
     * @param {?=} opts
     * @return {?}
     */
    NgxEchartsDirective.prototype.setOption = function (option, opts) {
        if (this._chart) {
            this._chart.setOption(option, opts);
        }
    };
    return NgxEchartsDirective;
}());
NgxEchartsDirective.decorators = [
    { type: Directive, args: [{
                selector: 'echarts, [echarts]'
            },] },
];
/**
 * @nocollapse
 */
NgxEchartsDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: NgZone, },
]; };
NgxEchartsDirective.propDecorators = {
    'options': [{ type: Input },],
    'theme': [{ type: Input },],
    'loading': [{ type: Input },],
    'initOpts': [{ type: Input },],
    'merge': [{ type: Input },],
    'chartInit': [{ type: Output },],
    'chartClick': [{ type: Output },],
    'chartDblClick': [{ type: Output },],
    'chartMouseDown': [{ type: Output },],
    'chartMouseUp': [{ type: Output },],
    'chartMouseOver': [{ type: Output },],
    'chartMouseOut': [{ type: Output },],
    'chartGlobalOut': [{ type: Output },],
    'chartContextMenu': [{ type: Output },],
    'chartDataZoom': [{ type: Output },],
    'legendselectchanged': [{ type: Output },],
    'onWindowResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
};
/**
 * Provide an wrapper for global echarts
 * ```typescript
 * export class AppComponent implements onInit {
 *   constructor(private nes: NgxEchartsService) {}
 *
 *   ngOnInit() {
 *     // const points = ...;
 *     // const rect = ...;
 *
 *     // Get native global echarts object, then call native function
 *     const echarts = this.nes.echarts;
 *     const points = echarts.graphic.clipPointsByRect(points, rect);
 *
 *     // Or call wrapper function directly:
 *     const points = this.nes.graphic.clipPointsByRect(points, rect);
 *   }
 * }
 * ```
 */
var NgxEchartsService = (function () {
    function NgxEchartsService() {
    }
    Object.defineProperty(NgxEchartsService.prototype, "echarts", {
        /**
         * Get global echarts object
         * @return {?}
         */
        get: function () {
            return echarts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "graphic", {
        /**
         * Wrapper for echarts.graphic
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.graphic : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "init", {
        /**
         * Wrapper for echarts.init
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.init : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "connect", {
        /**
         * Wrapper for echarts.connect
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.connect : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "disconnect", {
        /**
         * Wrapper for echarts.disconnect
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.disconnect : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "dispose", {
        /**
         * Wrapper for echarts.dispose
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.dispose : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "getInstanceByDom", {
        /**
         * Wrapper for echarts.getInstanceByDom
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.getInstanceByDom : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "registerMap", {
        /**
         * Wrapper for echarts.registerMap
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.registerMap : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "getMap", {
        /**
         * Wrapper for echarts.getMap
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.getMap : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "registerTheme", {
        /**
         * Wrapper for echarts.registerTheme
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.registerTheme : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxEchartsService.prototype._checkEcharts = function () {
        if (echarts) {
            return true;
        }
        else {
            console.error('[ngx-echarts] global ECharts not loaded');
            return false;
        }
    };
    return NgxEchartsService;
}());
NgxEchartsService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
NgxEchartsService.ctorParameters = function () { return []; };
var NgxEchartsModule = (function () {
    function NgxEchartsModule() {
    }
    return NgxEchartsModule;
}());
NgxEchartsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NgxEchartsDirective
                ],
                exports: [
                    NgxEchartsDirective
                ],
                providers: [
                    NgxEchartsService
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxEchartsModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { NgxEchartsModule, NgxEchartsDirective, NgxEchartsService };
//# sourceMappingURL=ngx-echarts.es5.js.map
