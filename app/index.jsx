import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Alert, Platform, TouchableOpacity } from "react-native";
import * as Calendar from "expo-calendar";
import { Calendar as RNCalendar } from "react-native-calendars"; // Importing the calendar component
import TaskModal from "../components/TaskModal"; // Your TaskModal component
import TaskList from "../components/TaskList"; // Your TaskList component
import styles from "../styles"; // Your custom styles

const App = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [calendarId, setCalendarId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    deadline: new Date(),
    createdAt: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [validationError, setValidationError] = useState(false);

  // Request Calendar Permissions and Initialize Calendar
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Cannot access calendars.");
          return;
        }
        setHasPermission(true);

        const calendars = await Calendar.getCalendarsAsync();
        console.log("Available Calendars:", calendars);

        if (calendars.length === 0) {
          const newCalendarId = await createCalendar();
          setCalendarId(newCalendarId);
        } else {
          const firstCalendar = calendars[0];
          console.log("Selected Calendar:", firstCalendar);
          setCalendarId(firstCalendar.id);
        }
      } catch (error) {
        console.error("Error fetching calendars:", error);
      }
    })();
  }, []);

  // Create a Calendar Programmatically (if none exists)
  const createCalendar = async () => {
    try {
      const defaultCalendarSource =
        Platform.OS === "ios"
          ? await Calendar.getDefaultCalendarSourceAsync()
          : { isLocalAccount: true, name: "Default" };

      const newCalendarId = await Calendar.createCalendarAsync({
        title: "Demo Calendar",
        color: "#FF0000",
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: "Demo Calendar",
        ownerAccount: "personal",
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });

      Alert.alert("Calendar Created", "A new calendar has been created.");
      return newCalendarId;
    } catch (error) {
      console.error("Error creating calendar:", error);
      Alert.alert("Error", "Unable to create a new calendar.");
      return null;
    }
  };

  // Function to add or update tasks
  const handleAddTask = () => {
    if (task.title.trim() !== "" && task.deadline !== "") {
      const deadlineDate = new Date(task.deadline);
  
      if (isNaN(deadlineDate)) {
        Alert.alert("Invalid Date", "The deadline provided is not a valid date.");
        return;
      }
  
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();
  
      if (editingTask) {
        const updatedTasks = tasks.map((t) =>
          t.id === editingTask.id ? { ...t, ...task } : t
        );
        setTasks(updatedTasks);
        setEditingTask(null);
      } else {
        const newTask = {
          id: Date.now(),
          ...task,
          createdAt: formattedDate,
        };
        setTasks([...tasks, newTask]);
  
        // Add task to the calendar
        addTaskToCalendar(newTask);
      }
  
      setTask({
        title: "",
        description: "",
        status: "Pending",
        deadline: "",
        createdAt: "",
      });
      setModalVisible(false);
      setValidationError(false);
    } else {
      setValidationError(true);
      Alert.alert("Validation Error", "Please fill in both title and deadline.");
    }
  };
  

  // Add Task to Calendar
  const addTaskToCalendar = async (newTask) => {
    const deadline = new Date(newTask.deadline);
  
    if (isNaN(deadline.getTime())) {
      Alert.alert("Invalid Date", "The deadline provided is not a valid date");
      return;
    }
  
    try {
      const eventDetails = {
        title: newTask.title,
        startDate: deadline,
        endDate: new Date(deadline.getTime() + 60 * 60 * 1000), // 1 hour later
        timeZone: "Asia/Calcutta",
        location: "Online",
      };
  
      await Calendar.createEventAsync(calendarId, eventDetails);
      Alert.alert("Success", "Task added to your calendar!");
    } catch (error) {
      console.error("Error adding task:", error);
      Alert.alert("Error", "Failed to add task to the calendar.");
    }
  };
  
  
  

  // Generate the marked dates for the calendar
  const generateMarkedDates = () => {
    let markedDates = {};
    tasks.forEach((task) => {
      // Ensure that the deadline is a valid date string
      if (task.deadline && !isNaN(new Date(task.deadline))) {
        markedDates[task.deadline] = {
          marked: true,
          dotColor: "#00BFFF", // Customize dot color
          selected: true,
          selectedColor: "#00BFFF", // Customize selected date color
        };
      }
    });
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      {/* Calendar component with marked dates */}
      <RNCalendar
        markedDates={generateMarkedDates()}
        markingType="simple"
        style={styles.calendar}
        onDayPress={(day) => {
          // Show tasks for the selected date
          const tasksForDay = tasks.filter((task) => task.deadline === day.dateString);
          if (tasksForDay.length > 0) {
            alert(`Tasks for ${day.dateString}: ${tasksForDay.map((task) => task.title).join(", ")}`);
          }
        }}
      />

      {/* Task List Component */}
      <TaskList
        tasks={tasks}
        handleEditTask={(task) => {
          setEditingTask(task);
          setTask(task);
          setModalVisible(true);
        }}
        handleDeleteTask={(taskId) => {
          const updatedTasks = tasks.filter((t) => t.id !== taskId);
          setTasks(updatedTasks);
        }}
      />

      {/* Add or Edit Task Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditingTask(null);
          setTask({
            title: "",
            description: "",
            status: "Pending",
            deadline: "",
            createdAt: "",
          });
          setModalVisible(true);
          setValidationError(false);
        }}
      >
        <Text style={styles.addButtonText}>
          {editingTask ? "Edit Task" : "Add Task"}
        </Text>
      </TouchableOpacity>

      {/* Task Modal for Adding/Editing Tasks */}
      <TaskModal
        modalVisible={modalVisible}
        task={task}
        setTask={setTask}
        handleAddTask={handleAddTask}
        handleCancel={() => {
          setEditingTask(null);
          setTask({
            title: "",
            description: "",
            status: "Pending",
            deadline: "",
            createdAt: "",
          });
          setModalVisible(false);
          setValidationError(false);
        }}
        validationError={validationError}
      />
    </View>
  );
};

export default App;
