import React from 'react';
import { styles } from './FoodEffectsComponent.styles';
import { Surface, Title, Paragraph, FAB } from 'react-native-paper';
import { View } from 'react-native';

export default function FoodEffectsComponent({
  EFFECT_ON_SUGAR,
  EFFECT_ON_CHOL,
  EFFECT_ON_BP,
}) {
  if (EFFECT_ON_SUGAR || EFFECT_ON_CHOL || EFFECT_ON_BP)
    return (
      <View
        style={{
          ...styles.container,
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'space-between',
          flexDirection: 'column',
          padding: 10,
        }}>
        <Title
          style={{
            marginTop: 10,
            marginBottom: 10,
            fontSize: 23,
            paddingHorizontal: 10,
          }}>
          Foods status{' '}
        </Title>

        {EFFECT_ON_SUGAR && (
          <Surface style={{ ...styles.healthStatusCard }}>
            <FAB
              icon="exclamation"
              color="#fff"
              small
              style={{ elevation: 0, backgroundColor: '#e5ad48' }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'transparent',
                marginLeft: '5%',
              }}>
              <Title>Not good for Diabeties</Title>
            </View>
          </Surface>
        )}

        {EFFECT_ON_CHOL && (
          <Surface style={{ ...styles.healthStatusCard }}>
            <FAB
              icon="exclamation"
              color="#fff"
              small
              style={{ elevation: 0, backgroundColor: '#e5ad48' }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'transparent',
                marginLeft: '5%',
              }}>
              <Title>Not good for Cholestrol</Title>
            </View>
          </Surface>
        )}

        {EFFECT_ON_BP && (
          <Surface style={{ ...styles.healthStatusCard }}>
            <FAB
              icon="exclamation"
              color="#fff"
              small
              style={{ elevation: 0, backgroundColor: '#e5ad48' }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'transparent',
                marginLeft: '5%',
              }}>
              <Title>Not good for high BP</Title>
            </View>
          </Surface>
        )}
      </View>
    );

  return <></>;
}
