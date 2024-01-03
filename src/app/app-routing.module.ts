import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
    //loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'about-me',
    loadChildren: () => import('./pages/about-me/about-me.module').then(m => m.AboutMePageModule)
  },
  {
    path: 'upload-id',
    loadChildren: () => import('./pages/upload-id/upload-id.module').then(m => m.UploadIdPageModule)
  },
  {
    path: 'choose-pic-modal',
    loadChildren: () => import('./modals/choose-pic-modal/choose-pic-modal.module').then(m => m.ChoosePicModalPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'product-result',
    loadChildren: () => import('./pages/product-result/product-result.module').then(m => m.ProductResultPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'ride-waiting',
    loadChildren: () => import('./pages/ride-waiting/ride-waiting.module').then(m => m.RideWaitingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'on-way',
    loadChildren: () => import('./pages/on-way/on-way.module').then(m => m.OnWayPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'calcen-ride-modal',
    loadChildren: () => import('./modals/calcen-ride-modal/calcen-ride-modal.module').then(m => m.CalcenRideModalPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'ride-end',
    loadChildren: () => import('./modals/ride-end/ride-end.module').then(m => m.RideEndPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'calling',
    loadChildren: () => import('./modals/calling/calling.module').then(m => m.CallingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'ride-history',
    loadChildren: () => import('./pages/ride-history/ride-history.module').then(m => m.RideHistoryPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/indox/indox.module').then(m => m.IndoxPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'customer-service',
    loadChildren: () => import('./pages/customer-service/customer-service.module').then(m => m.CustomerServicePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./modals/notifications/notifications.module').then(m => m.NotificationsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./modals/menu/menu.module').then(m => m.MenuPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'signup-as-driver',
    loadChildren: () => import('./modals/signup-as-driver/signup-as-driver.module').then(m => m.SignupAsDriverPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'indox',
    loadChildren: () => import('./pages/indox/indox.module').then(m => m.IndoxPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'delete-modal',
    loadChildren: () => import('./modals/delete-modal/delete-modal.module').then(m => m.DeleteModalPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./modals/chat/chat.module').then(m => m.ChatPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'be-driver',
    loadChildren: () => import('./pages/be-driver/be-driver.module').then(m => m.BeDriverPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'ridew',
    loadChildren: () => import('./modals/ridew/ridew.module').then(m => m.RidewPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'on-way-modal',
    loadChildren: () => import('./modals/on-way-modal/on-way-modal.module').then(m => m.OnWayModalPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'home-modal',
    loadChildren: () => import('./modals/home-modal/home-modal.module').then(m => m.HomeModalPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'select-vehicle-modal',
    loadChildren: () => import('./modals/select-vehicle-modal/select-vehicle-modal.module').then( m => m.SelectVehicleModalPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'ride-preferences',
    loadChildren: () => import('./pages/ride-preferences/ride-preferences.module').then( m => m.RidePreferencesPageModule)
  },
  {
    path: 'card-information',
    loadChildren: () => import('./pages/card-information/card-information.module').then( m => m.CardInformationPageModule)
  }
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
