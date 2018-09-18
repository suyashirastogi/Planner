import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgDatepickerModule } from 'ng2-datepicker';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigatorBarComponent } from './navigator-bar/navigator-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EventListComponent } from './event-list-page/event-list-page.component';
import { NewEventPageComponent } from './new-event-page/new-event-page.component';
import { PartyNavBarComponent } from './party-nav-bar/party-nav-bar.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { ShowErrorsComponent } from './validators/errors-page/show-errors.component';
import { LocationPageComponent } from './location-page/location-page.component';
import { BudgetPageComponent } from './budget-page/budget-page.component';
import { PartyDetailsService } from './services/party-details.service';
import { GuestPageComponent } from './guest-page/guest-page.component';
import { UniqueValidatorDirective } from './validators/unique-validator.directive';
import { EventDetailsPageComponent } from './event-details-page/event-details-page.component';
import { OverviewPageService } from './services/overview-page.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigatorBarComponent,
    HomePageComponent,
    EventListComponent,
    NewEventPageComponent,
    PartyNavBarComponent,
    FoodPageComponent,
    ShowErrorsComponent,
    LocationPageComponent,
    BudgetPageComponent,
    GuestPageComponent,
    UniqueValidatorDirective,
    EventDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgDatepickerModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'eventplanner/home', pathMatch: 'full' },
      { path: 'eventplanner/home', component: HomePageComponent },
      { path: 'eventplanner/eventsList', component: EventListComponent },
      { path: 'eventplanner/newEventCreation', component: PartyNavBarComponent },
      { path: 'eventplanner/eventsList/updateEventCreation/:id', component: PartyNavBarComponent },
      { path: 'eventplanner/eventsList/eventDetails/:id', component: EventDetailsPageComponent },
    ])
  ],
  providers: [PartyDetailsService,OverviewPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
