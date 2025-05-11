import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { Card } from '../ui/Card';

interface StreakChartProps {
  data: number[];
  labels: string[];
}

export function StreakChart({ data, labels }: StreakChartProps) {
  const screenWidth = Dimensions.get('window').width - 32;

  const chartData = {
    labels,
    datasets: [
      {
        data,
        color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#3498db',
    },
  };

  return (
    <Card>
      <View style={styles.container}>
        <Text variant="titleMedium" style={styles.title}>
          Streak Progress
        </Text>
        <LineChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
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
  chart: {
    borderRadius: 16,
  },
});