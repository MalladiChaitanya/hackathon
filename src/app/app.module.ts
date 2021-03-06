import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { MyQuestionsComponent } from './components/my-questions/my-questions.component';
import { AskAQuestionComponent } from './components/ask-aquestion/ask-aquestion.component';
import { SubquestionsComponent } from './components/subquestions/subquestions.component';

import { QuestionsService } from './services/questions.service';
import { LoginService } from "./services/login.service";
import { RegisterService } from "./services/register.service";
import { AskQuestion } from "./services/ask-question.service";
import { LoginActivate } from "./services/login-activate.service";
import { AnswerService } from "./services/answer.service";

import { SearchFilterPipe } from './components/subquestions/subquestions.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [LoginActivate],
    children: [
      {
        path: 'questions', component: QuestionsComponent,
        canActivate: [LoginActivate],
        children: [
          { path: 'showQuestion', component: SubquestionsComponent, canActivate: [LoginActivate] }
        ]
      },
      { path: 'myQuestions', canActivate: [LoginActivate], component: MyQuestionsComponent },
      { path: 'askAQuestion', canActivate: [LoginActivate], component: AskAQuestionComponent }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' }
];

@NgModule({
    declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    DashboardComponent,
    QuestionsComponent,
    MyQuestionsComponent,
    AskAQuestionComponent,
    SubquestionsComponent,
    SearchFilterPipe,
    QuestionDetailComponent
  ],
  imports: [
      BrowserModule,
      HttpModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      RouterModule.forRoot(routes)
  ],
  providers: [LoginService, QuestionsService, RegisterService, AskQuestion, LoginActivate, AnswerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
