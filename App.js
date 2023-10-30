import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';

import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(() => {
      // Handle notification received
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const addReminder = ({ name, date }) => {
    setReminders([...reminders, { name, date }]);
    scheduleNotification(name, date);
  };

  const scheduleNotification = (name, date) => {
    const currentDate = new Date();
    const reminderDate = new Date(date);

    if (currentDate < reminderDate) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Birthday Reminder',
          body: `Don't forget ${name}'s birthday on ${date}!`,
        },
        trigger: {
          date: reminderDate,
        },
      });
    }
  };

  const deleteReminder = (reminderToDelete) => {
    const updatedReminders = reminders.filter(
      (reminder) => reminder !== reminderToDelete
    );
    setReminders(updatedReminders);
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Birthday Reminders</Text>
      <ReminderForm onAddReminder={addReminder} />
      <ReminderList reminders={reminders} onDeleteReminder={deleteReminder} />
    </View>
  );
}
