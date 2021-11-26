import React from 'react';
import { styles } from './HealthStatusComponent.styles';
import { Surface, Title, Paragraph, FAB } from 'react-native-paper';
import { View } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { HealthStatusMessages } from '../../Constants';

export default function HealthStatusComponent({
  hasDaibeties,
  hasHypertension,
  hasHighCholestrol
}) {

  if (hasDaibeties || hasHypertension || hasHighCholestrol)
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
          Your health issues{' '}
        </Title>
        {hasDaibeties && (
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
              <Title>{HealthStatusMessages.isDiabetic.title}</Title>
              <Paragraph>{HealthStatusMessages.isDiabetic.body}</Paragraph>
            </View>
          </Surface>
        )}

        {hasHypertension && (
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
              <Title>{HealthStatusMessages.hasHypertension.title}</Title>
              <Paragraph>{HealthStatusMessages.hasHypertension.body}</Paragraph>
            </View>
          </Surface>
        )}
      </View>
    );

  return <></>;
}
