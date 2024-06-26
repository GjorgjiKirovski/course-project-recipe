import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  userSub: Subscription

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}
  
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !user ? false : true;
      }
    })  
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  onLogout(){
    this.authService.logout();
  }

}
