import { Directive, ViewContainerRef } from "@angular/core";

/**
 * Used for deprecated example FactoryResolver for dynamic component
 */
@Directive({
    selector:'[appPlaceholder]'
})
export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef){}
}