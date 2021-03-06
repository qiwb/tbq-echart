import { SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
export declare class ChangeFilter {
    private _changes;
    constructor(_changes: SimpleChanges);
    static of(changes: SimpleChanges): ChangeFilter;
    notEmpty<T>(key: string): Observable<T>;
    has<T>(key: string): Observable<T>;
}
