import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function ReminderForm({ onAddReminder }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const addReminder = () => {
    if (name && date) {
      onAddReminder({ name, date });
      setName('');
      setDate('');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={(text) => setDate(text)}
      />
      <Button title="Add Reminder" onPress={addReminder} />
    </View>
  );
}
