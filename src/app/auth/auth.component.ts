import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthResponse, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    //used for FactoryResolver exercise, This approach is deprecated and *ngIf usage is recommended for dynamic component.
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    private closeSub: Subscription

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver){}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponse>;
        this.isLoading = true

        if(this.isLoginMode){
            authObs = this.authService.login(email, password)
        } else {
            authObs = this.authService.signup(email, password)
        }

        authObs.subscribe({
            next: (resData) => {
                console.log(resData)
                this.isLoading = false;
                this.error = null;
                this.router.navigate(['/recipes']);
            },
            error: (errorMessage) => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        })

        form.reset()
    }

    onHandleError(){
        this.error = null;
    }

    //Used for FactoryResolver exercise. This approach is deprecated.
    private showErrorAlert(errorMessage: string) { 
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = errorMessage;
        this.closeSub = componentRef.instance.close.subscribe(
            () => {
                this.closeSub.unsubscribe();
                hostViewContainerRef.clear();
            }
        );

    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
}