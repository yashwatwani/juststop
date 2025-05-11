import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { Card } from '../ui/Card';

interface TriggerData {
  name: string;
  count: number;
  color: string;
}

interface TriggerPieChartProps {
  data: TriggerData[];
}

export function TriggerPieChart({ data }: TriggerPieChartProps) {
  const screenWidth = Dimensions.get('window').width - 32;

  const chartData = data.map((item) => ({
    name: item.name,
    population: item.count,
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <Card>
      <View style={styles.container}>
        <Text variant="titleMedium" style={styles.title}>
          Common Triggers
        </Text>
        <PieChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
});