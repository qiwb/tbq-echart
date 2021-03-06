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
export declare class NgxEchartsService {
    constructor();
    /**
     * Get global echarts object
     * @returns {ECharts}
     */
    readonly echarts: any;
    /**
     * Wrapper for echarts.graphic
     */
    readonly graphic: any;
    /**
     * Wrapper for echarts.init
     */
    readonly init: any;
    /**
     * Wrapper for echarts.connect
     */
    readonly connect: any;
    /**
     * Wrapper for echarts.disconnect
     */
    readonly disconnect: any;
    /**
     * Wrapper for echarts.dispose
     */
    readonly dispose: any;
    /**
     * Wrapper for echarts.getInstanceByDom
     */
    readonly getInstanceByDom: any;
    /**
     * Wrapper for echarts.registerMap
     */
    readonly registerMap: any;
    /**
     * Wrapper for echarts.getMap
     */
    readonly getMap: any;
    /**
     * Wrapper for echarts.registerTheme
     */
    readonly registerTheme: any;
    private _checkEcharts();
}
