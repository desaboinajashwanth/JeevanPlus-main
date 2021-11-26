import { styles } from './FoodContentStatusComponent.styles';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Card, Text, Title, Paragraph } from 'react-native-paper';
import { DeviceConfig, foodContentType } from '../../Constants';
import { capatalizeText } from '../../_services/_utilServices';

export default class FoodContentStatusComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorSchemes: Object.freeze({
        [foodContentType.FATS]: (opacity = 1) => `#FF6666`,
        [foodContentType.CARBS]: (opacity = 1) => `#008cef`,
        [foodContentType.CALORIES]: (opacity = 1) => `#5754a3`,
        [foodContentType.PROTIEN]: (opacity = 1) => `#29ab87`,
      }),
      chartConfig: {
        backgroundGradientFrom: 'rgba(0,0,0,0)',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: 'rgba(0,0,0,0)',
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `#fff`,
        fillShadowGradient: '#fff',
        fillShadowGradientOpacity: 1,
      },
      cardColor: '#fff',
      isPropsDataValid: false,
      foodContentType: null,
      foodContentQuantityObservedInGram: null,
      foodContentQuantityExpectedInGram: null,
      foodContentQuantityObservedInPercentage: null,
      foodContentQuantityExpectedInPercentage: null,
      foodContentQuantityExpectedInCal: null,
      foodContentQuantityObservedInCal: null,
    };
  }

  componentDidMount() {
    if (
      this.props.foodContentQuantityObserved &&
      this.props.foodContentQuantityExpected &&
      this.props.foodContentType
    ) {
      const {
        foodContentQuantityExpected,
        foodContentQuantityObserved,
        foodContentType,
      } = this.props;

      console.log('-------------------------cdm');
      console.log({
        foodContentType,
        foodContentQuantityExpectedInCal: foodContentQuantityExpected,
        foodContentQuantityObservedInCal: foodContentQuantityObserved,
        isPropsDataValid: true,
        cardColor: this.getCardColor(),
      });

      this.setState({
        foodContentType,
        foodContentQuantityExpectedInGram: foodContentQuantityExpected['gram'],
        foodContentQuantityObservedInGram: foodContentQuantityObserved['gram'],
        foodContentQuantityExpectedInPercentage:
          foodContentQuantityExpected['percentage'],
        foodContentQuantityObservedInPercentage:
          foodContentQuantityObserved['percentage'],
        isPropsDataValid: true,
        cardColor: this.getCardColor(),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.foodContentType !== this.state.foodContentType) {
      if (
        this.props.foodContentQuantityObserved &&
        this.props.foodContentQuantityExpected &&
        this.props.foodContentType
      ) {
        const {
          foodContentQuantityExpected,
          foodContentQuantityObserved,
          foodContentType,
        } = this.props;

        this.setState({
          foodContentType,
          foodContentQuantityExpectedInGram:
            foodContentQuantityExpected['gram'],
          foodContentQuantityObservedInGram:
            foodContentQuantityObserved['gram'],
          foodContentQuantityExpectedInPercentage:
            foodContentQuantityExpected['percentage'],
          foodContentQuantityObservedInPercentage:
            foodContentQuantityObserved['percentage'],
          isPropsDataValid: true,
          cardColor: this.getCardColor(),
        });
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.foodContentQuantityObserved &&
      props.foodContentQuantityExpected &&
      props.foodContentType
    ) {
      const {
        foodContentQuantityExpected,
        foodContentQuantityObserved,
        foodContentType,
      } = props;

      return {
        foodContentType,
        foodContentQuantityExpectedInGram: foodContentQuantityExpected['gram'],
        foodContentQuantityObservedInGram: foodContentQuantityObserved['gram'],
        foodContentQuantityExpectedInPercentage:
          foodContentQuantityExpected['percentage'],
        foodContentQuantityObservedInPercentage:
          foodContentQuantityObserved['percentage'],
        isPropsDataValid: true,
        cardColor: FoodContentStatusComponent.getCardColorStatic(props, state),
      };
    }
  }

  hasFoodContent = objectToSearch => {
    return objectToSearch['foodContentType'] ? true : false;
  };

  static hasFoodContentStatic(objectToSearch) {
    return objectToSearch['foodContentType'] ? true : false;
  }

  getCardColor = () => {
    if (this.hasFoodContent(this.props)) {
      return this.state.colorSchemes[this.props.foodContentType]();
    }
    return '#323232';
  };

  static getCardColorStatic(props, state) {
    if (FoodContentStatusComponent.hasFoodContentStatic(props)) {
      return state.colorSchemes[props.foodContentType]();
    }
    return '#323232';
  }

  getTitle = () => {
    if (this.hasFoodContent(this.props)) {
      const title = foodContentType[this.props.foodContentType];
      return capatalizeText(title);
    }
  };

  convertCalToKCal(calorieValue) {
    if (calorieValue <= 0) return calorieValue;

    return +(calorieValue / 1000).toFixed(2);
  }

  getFoodStatusSentence = () => {
    if (this.state.foodContentType === foodContentType.CALORIES) {
      return `The expected daily ${this.getTitle()} intake is ${this.convertCalToKCal(
        this.state.foodContentQuantityExpectedInGram,
      )} kcalories .The food has ${this.convertCalToKCal(
        this.state.foodContentQuantityObservedInGram,
      )} Kcalories`;
    }

    return `The expected daily ${this.getTitle()} intake is ${
      this.state.foodContentQuantityExpectedInPercentage
    }% (${this.state.foodContentQuantityExpectedInGram} g) .The food has ${
      this.state.foodContentQuantityObservedInPercentage
    }% (${this.state.foodContentQuantityObservedInGram}g)`;
  };

  render() {
    const { isPropsDataValid, cardColor, foodContentType } = this.state;

    let dataForChart = null;

    if (isPropsDataValid) {
      dataForChart = {
        labels: ['Expected', 'Observed'],
        datasets: [
          {
            data:
              foodContentType === 'CALORIES'
                ? [
                    this.convertCalToKCal(
                      this.state.foodContentQuantityExpectedInGram,
                    ),
                    this.convertCalToKCal(
                      this.state.foodContentQuantityObservedInGram,
                    ),
                  ]
                : [
                    this.state.foodContentQuantityExpectedInGram,
                    this.state.foodContentQuantityObservedInGram,
                  ],
          },
        ],
      };
    }

    return (
      <>
        {isPropsDataValid && dataForChart ? (
          <View style={styles.container}>
            <Card
              style={{
                backgroundColor: cardColor,
                borderRadius: 20,
                elevation: 2,
              }}>
              <Card.Title
                title={this.getTitle()}
                subtitle="Macro nutrient"
                color={'#fff'}
                titleStyle={{ color: '#fff' }}
                subtitleStyle={{ color: '#fff' }}
              />
              <Card.Content>
                <ScrollView horizontal={true}>
                  <BarChart
                    data={dataForChart}
                    width={DeviceConfig.WINDOW_WIDTH}
                    height={200}
                    yAxisSuffix={
                      foodContentType && foodContentType === 'CALORIES'
                        ? ' kcal'
                        : ' g'
                    }
                    withInnerLines={false}
                    fromZero={true}
                    showValuesOnTopOfBars={true}
                    chartConfig={this.state.chartConfig}
                    verticalLabelRotation={0}
                    style={{ paddingVertical: 10 }}
                  />
                </ScrollView>
                <Paragraph
                  style={{
                    color: '#fff',
                    fontSize: 13,
                    marginTop: '4%',
                    paddingHorizontal: 10,
                  }}>
                  {this.getFoodStatusSentence()}
                </Paragraph>
              </Card.Content>
            </Card>
          </View>
        ) : null}
      </>
    );
  }
}

/*

<Card
              style={{
                ...styles.statusCard,
                borderColor:
                  this.state.colorSchemes[this.props.foodContentType](),
              }}>
              <Card.Content>
                <View style={styles.container}>
                  

                  
                </View>
              </Card.Content>
            </Card>
*/
