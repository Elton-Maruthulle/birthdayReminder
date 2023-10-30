import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ReminderList({ reminders, onDeleteReminder }) {
  return (
    <View>
      {reminders.map((reminder, index) => (
        <View key={index}>
          <Text>{reminder.name}</Text>
          <Text>{reminder.date}</Text>
          <Button
            title="Delete"
            onPress={() => onDeleteReminder(reminder)}
          />
        </View>
      ))}
    </View>
  );
}
