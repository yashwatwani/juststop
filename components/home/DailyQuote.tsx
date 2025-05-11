import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { quotes, Quote } from '../../constants/quotes';

export function DailyQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    // Get a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  if (!quote) return null;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="bodyLarge" style={styles.quoteText}>
          "{quote.text}"
        </Text>
        <Text variant="bodySmall" style={styles.author}>
          — {quote.author}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
    borderRadius: 12,
  },
  quoteText: {
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  author: {
    textAlign: 'right',
    opacity: 0.7,
  },
});