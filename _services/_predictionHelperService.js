import * as Constants from '../Constants';

class HealthPredictor {
  /*
   * Healthy or not is decided by decreasinng the
   * healthlinessWeight variable as
   * 1. healthlinessWeight init set to 0
   * 2. if a nutrient has actual percentage highter then expected increase the weight by 1
   * 3. Else decrease the weight by fraction of percentage difference
   * 4. weight <= 1 will tell extreamly unhealthy
   *    weight >1 and<=2 It is not healthy
   *   weight > 2 and  <= 3  Its just about healthy, and can eat
   *   weight >3  Its Helathy and good for health
   */

  imageAnalysisData = {
    [Constants.foodContentType.CALORIES]: null,
    [Constants.foodContentType.PROTIEN]: null,
    [Constants.foodContentType.FATS]: null,
    [Constants.foodContentType.CARBS]: null,
  };

  userHealthInfo = {
    age: null,
    bodySugar: null,
    diastolicBloodPressure: null,
    gender: null,
    hasDaibeties: null,
    hasHighCholestrol: null,
    hasHypertension: null,
    height: null,
    pregnancyStatus: null,
    systolicBloodPressure: null,
    weight: null,
    bmi: null,
  };

  predictionReport = {
    healthinessLevel: 0,
    prediction: null,
    expectedMacroNutrients: null,
    observedMacroNutrients: null,
  };

  expectedMacroNutrients = {
    [Constants.foodContentType.CALORIES]: null,
    [Constants.foodContentType.PROTIEN]: null,
    [Constants.foodContentType.FATS]: null,
    [Constants.foodContentType.CARBS]: null,
  };

  observedMacroNutrients = {
    [Constants.foodContentType.CALORIES]: null,
    [Constants.foodContentType.PROTIEN]: null,
    [Constants.foodContentType.FATS]: null,
    [Constants.foodContentType.CARBS]: null,
  };

  healthlinessWeight = 0;

  constructor(imageAnalysisData, userHealthInfo) {
    this.userHealthInfo = { ...userHealthInfo };

    console.log('---------- User health info --------');
    console.log(this.userHealthInfo);

    if (imageAnalysisData && userHealthInfo) {
      this.imageAnalysisData = { ...imageAnalysisData };
      this.setObservedMacroNutrients();
      this.setExpectedMacroNutrients();
      this.setPredictionReportForObservedAndExpected();
    }
    this.setExpectedMacroNutrients();
  }

  getExpectedMacroNutrients = () => {
    return this.expectedMacroNutrients;
  };

  /**
   * Men: calories/day = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5
   * Women: calories/day = 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161
   */

  setPredictionReportForObservedAndExpected = () => {
    this.predictionReport = {
      ...this.predictionReport,
      expectedMacroNutrients: this.expectedMacroNutrients,
      observedMacroNutrients: this.observedMacroNutrients,
    };
  };

  setExpectedMacroNutrients = () => {
    const userCalories = this.getCaloriesForUser() * 1.375;

    const { pregnancyStatus } = this.userHealthInfo;

    if (pregnancyStatus) {
      this.expectedMacroNutrients = {
        [Constants.foodContentType.CALORIES]: { gram: userCalories },
        [Constants.foodContentType.PROTIEN]: {
          gram: 71,
          percentage: HealthPredictor.getNutrientInPercentage(userCalories, 71),
        },
        [Constants.foodContentType.CARBS]: {
          gram: 175,
          percentage: HealthPredictor.getNutrientInPercentage(
            userCalories,
            175,
          ),
        },
        [Constants.foodContentType.FATS]: HealthPredictor.getFatsForUser(
          userCalories,
          (multiplicationFactor = 20),
        ),
      };
      console.log('====== Expected========');
      console.log(this.expectedMacroNutrients);
      return;
    }

    this.expectedMacroNutrients = {
      [Constants.foodContentType.CALORIES]: { gram: userCalories },
      [Constants.foodContentType.PROTIEN]:
        HealthPredictor.getProtiensForUser(userCalories),
      [Constants.foodContentType.CARBS]:
        HealthPredictor.getCarbsForUser(userCalories),
      [Constants.foodContentType.FATS]:
        HealthPredictor.getFatsForUser(userCalories),
    };
    console.log('====== Expected========');
    console.log(this.expectedMacroNutrients);
  };

  setObservedMacroNutrients = () => {
    const { CALORIES, PROTIEN, FATS, CARBS } = this.imageAnalysisData;

    const userCalories = CALORIES * 1.375;

    this.observedMacroNutrients = {
      [Constants.foodContentType.CALORIES]: { gram: userCalories },
      [Constants.foodContentType.PROTIEN]: {
        gram: PROTIEN,
        percentage: HealthPredictor.getNutrientInPercentage(
          userCalories,
          PROTIEN,
        ),
      },
      [Constants.foodContentType.CARBS]: {
        gram: CARBS,
        percentage: HealthPredictor.getNutrientInPercentage(
          userCalories,
          CARBS,
        ),
      },
      [Constants.foodContentType.FATS]: {
        gram: FATS,
        percentage: HealthPredictor.getNutrientInPercentage(userCalories, FATS),
      },
    };
  };

  getCaloriesForUser = () => {
    const { height, weight, age, gender } = this.userHealthInfo;

    console.log(+height, +weight, +age, gender);

    const baseCalories = 10 * +weight + 6.25 * +height - 5 * +age;

    console.log(
      'Base calories -> ',
      gender === 'Male' ? baseCalories + 5 : baseCalories + 161,
    );
    return gender === 'Male' ? baseCalories + 5 : baseCalories + 161;
  };

  /**
   * Carbs: 45–65% of total calories Avg: 55%
   * Fats: 20–35% of total calories Avg: 28%
   * Proteins: 10–35% of total calories Avg: 23 %
   */

  static getNutrientInPercentage(totalCalories, nutrientNeededInGram) {
    if (totalCalories && nutrientNeededInGram) {
      return Math.round((nutrientNeededInGram / totalCalories) * 100);
    }
    return 0;
  }

  static getProtiensForUser(userCalories, multiplicationFactor = 23) {
    const userProtienNeed = (userCalories / 100) * multiplicationFactor;
    return {
      gram: Math.round(userProtienNeed / 4),
      percentage: HealthPredictor.getNutrientInPercentage(
        userCalories,
        userProtienNeed,
      ),
    };
  }

  static getCarbsForUser(userCalories, multiplicationFactor = 55) {
    const userCarbsNeed = (userCalories / 100) * multiplicationFactor;
    return {
      gram: Math.round(userCarbsNeed / 4),
      percentage: HealthPredictor.getNutrientInPercentage(
        userCalories,
        userCarbsNeed,
      ),
    };
  }

  static getFatsForUser(userCalories, multiplicationFactor = 28) {
    const userFatsNeed = (userCalories / 100) * multiplicationFactor;

    return {
      gram: Math.round(userFatsNeed / 9),
      percentage: HealthPredictor.getNutrientInPercentage(
        userCalories,
        userFatsNeed,
      ),
    };
  }

  setPredictionSentence = () => {
    /*
     * Healthy or not is decided by decreasinng the
     * healthlinessWeight variable as
     * 1. healthlinessWeight init set to 0
     * 2. if a nutrient has actual percentage highter then expected increase the weight by 1
     * 3. Else no nothing
     * 4. weight <= 1 will tell extreamly unhealthy
     *    weight >1 and<=2 It is not healthy
     *   weight > 2 and  <= 3  Its just about healthy, and can eat
     *   weight >3  Its Helathy and good for health
     */

    const healthlinessWeight = this.healthlinessWeight;
    let prediction = '';

    const extremelyUnhealthMessage = 'Not healthy for you';
    const healthyMessage = 'Healthy to eat';

    console.log('\n\n============= in Prediction sentence =============');
    console.log(this.imageAnalysisData);
    console.log('\n\n');

    /*
    {"CALORIES": 104, "CARBS": 63, "CATEGORY": "carbs", "EFFECT_ON_BP": false, "EFFECT_ON_CHOL": false, "EFFECT_ON_PREGNANCY": false, 
  "EFFECT_ON_SUGAR ": false, "FATS": 33, "FOOD_NAME": "chapati", "PROTIEN": 10, "SERVING_SIZE": false} 
    */
    const {
      EFFECT_ON_BP,
      EFFECT_ON_SUGAR,
      EFFECT_ON_CHOL,
      EFFECT_ON_PREGNANCY,
      FOOD_NAME
    } = this.imageAnalysisData;
    const { hasDaibeties, hasHighCholestrol, hasHypertension } =
      this.userHealthInfo;

    /*
    age: any;
    bodySugar: any;
    diastolicBloodPressure: any;
    gender: any;
    hasDaibeties: any;
    hasHighCholestrol: any;
    hasHypertension: any;
    height: any;
    pregnancyStatus: any;
    systolicBloodPressure: any;
    weight: any;
    bmi: any;
    */

    if (FOOD_NAME) {
      if (
        (EFFECT_ON_SUGAR && hasDaibeties) ||
        (EFFECT_ON_CHOL && hasHighCholestrol) ||
        (EFFECT_ON_BP && hasHypertension)
      ) {
        prediction = extremelyUnhealthMessage;
        this.healthlinessWeight = 0;
      } else {
        prediction = healthyMessage;
        this.healthlinessWeight = 5;
      }
    }
    else{
      prediction = null;
      this.healthlinessWeight = null;
    }

    // if (healthlinessWeight < 1) prediction = 'Extremely unhealthy';
    // else if (healthlinessWeight >= 1 && healthlinessWeight <= 2)
    //   prediction = 'Not much healthy, eat with care';
    // else if (healthlinessWeight >= 2 && healthlinessWeight <= 3)
    //   prediction = 'Just about healthy, and can eat';
    // else prediction = 'Its Healthy, and good to eat';

    this.predictionReport = {
      ...this.predictionReport,
      prediction,
      healthinessLevel: this.healthlinessWeight,
    };
  };

  incrementHealthlinessWeight = () => (this.healthlinessWeight += 1);

  //decrementHealthlinessWeight = () => (this.healthlinessWeight -= 1);

  updateHealthlinessWeight = (expected, observed) => {
    if (observed >= expected) this.incrementHealthlinessWeight();
    //else this.decrementHealthlinessWeight();
  };

  setHealthlinessWeight() {
    for (let macroNutrient of Object.keys(this.observedMacroNutrients)) {
      if (this.expectedMacroNutrients[macroNutrient]) {
        this.updateHealthlinessWeight(
          this.expectedMacroNutrients[macroNutrient]['gram'],
          this.observedMacroNutrients[macroNutrient]['gram'],
        );
      }
    }
    this.setPredictionSentence();
  }

  getAnalysisReport = () => {
    this.setHealthlinessWeight();
    return this.predictionReport;
  };
}

export default HealthPredictor;
