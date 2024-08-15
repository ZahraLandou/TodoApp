import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useTodos } from '../components/TodosContext';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootTabParamList, Priority } from '../assets/types';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For icons
import Icon from 'react-native-vector-icons/Feather'; // For icons

import { colors } from '../assets/theme';

type AddTodoScreenRouteProp = RouteProp<RootTabParamList, 'Add'>;

const AddTodoScreen: React.FC = () => {
  const { addTodo } = useTodos();
  const navigation = useNavigation();
  const route = useRoute<AddTodoScreenRouteProp>();
  const selectedDate = route.params?.selectedDate;

  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Low);
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setDeadline(new Date(selectedDate));
    }
  }, [selectedDate]);

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    addTodo(inputValue.trim(), deadline, priority);
    setInputValue('');
    navigation.goBack();
  };

  return (
    <ImageBackground 
      source={require('../assets/backgrounds/lavenderss.jpeg')}
      style={styles.backgroundImage}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInputValue}
          value={inputValue}
          placeholder="Write a task"
          placeholderTextColor={colors.inputText}
        />
        <TouchableOpacity
          style={styles.deadlineButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.deadlineButtonText}>DEADLINE</Text>
          <Icon name="calendar" size={24} color={colors.buttonText}/>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDeadline(selectedDate);
              }
            }}
          />
        )}
        <Text style={styles.label}>Priority:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={priority}
            onValueChange={(itemValue) => setPriority(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="High" value={Priority.High} />
            <Picker.Item label="Medium" value={Priority.Medium} />
            <Picker.Item label="Low" value={Priority.Low} />
          </Picker>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={handleAddTodo}>
          <Text style={styles.createButtonText}>CREATE</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    elevation: 5,
  },
  input: {
    backgroundColor: colors.inputBackground,
    color: colors.inputText,
    borderBottomColor: '#bcbcf2',
    borderBottomWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  deadlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#bcbcf2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  deadlineButtonText: {
    color: colors.buttonText,
    fontSize: 16,
  },
  label: {
    color: colors.labelText,
    marginBottom: 10,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    color: colors.inputText,
  },
  createButton: {
    backgroundColor: '#bcbcf2',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  createButtonText: {
    color: colors.buttonText,
    fontSize: 16,
  },
});

export default AddTodoScreen;
