import { Injectable } from '@angular/core';

@Injectable()
export class SurveyService {

  survey: any[] = [];
  constructor() {}

  setSurvey(survey) {
    this.survey = survey;
  }

  getById(id: string) {
    return this.survey.filter(o => {
      return o.id === id;
    })[0] || null;
  }

}
