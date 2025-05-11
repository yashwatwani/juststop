import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card as PaperCard, Text } from 'react-native-paper';

interface CardProps {
  title?: string;
  children: ReactNode;
  onPress?: () => void;
  icon?: string;
}

export function Card({ title, children, onPress, icon }: CardProps) {
  return (
    <PaperCard style={styles.card} onPress={onPress}>
      {title && (
        <PaperCard.Title
          title={title}
          left={icon ? (props) => <PaperCard.Cover {...props} source={{ uri: icon }} /> : undefined}
        />
      )}
      <PaperCard.Content>
        <View style={styles.content}>{children}</View>
      </PaperCard.Content>
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  content: {
    paddingVertical: 8,
  },
});