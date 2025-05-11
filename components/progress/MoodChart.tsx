import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { Card } from '../ui/Card';

interface MoodChartProps {
  data: number[];
  labels: string[];
}

export function MoodChart({ data, labels }: MoodChartProps) {
  const screenWidth = Dimensions.get('window').width - 32;

  const chartData = {
    labels,
    datasets: [
      {
        data,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.7,
  };

  return (
    <Card>
      <View style={styles.container}>
        <Text variant="titleMedium" style={styles.title}>
          Mood Distribution
        </Text>
        <BarChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
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