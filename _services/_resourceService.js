const booleanQuestions = [

  {
    stateVariable: "gender"
  }

];

export function getBooleanQuestions() {
  return booleanQuestions.map(question => Object.freeze(question));
}
