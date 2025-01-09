import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Ensure you have this installed
import styles from "../styles";

const TaskModal = ({
    modalVisible,
    task,
    setTask,
    handleAddTask,
    handleCancel,
    validationError,
}) => {
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(false); // Close the picker
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
            setTask({ ...task, deadline: formattedDate });
        }
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={false}>
            
            <View style={styles.modalContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={task.title}
                    onChangeText={(text) =>
                        setTask({ ...task, title: text })
                    }
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={task.description}
                    onChangeText={(text) =>
                        setTask({
                            ...task,
                            description: text,
                        })
                    }
                />
                
                <Text style={styles.inputLabel}>Deadline:</Text>
                <View style={{ marginBottom: 20 }}>
                    <Button
                        title="Select Date"
                        onPress={() => setShowPicker(true)}
                        color="#007BFF"
                    />
                    {task.deadline && (
                        <Text style={styles.dateText}>
                            Selected Date: {task.deadline}
                        </Text>
                    )}
                </View>
                {showPicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                {validationError && (
                    <Text style={styles.errorText}>
                        Please fill in all fields correctly.
                    </Text>
                )}

                <Button
                    title={task.id ? "Update" : "Add"}
                    onPress={handleAddTask}
                    color="#007BFF"
                />
                
                <Button
                    title="Cancel"
                    onPress={handleCancel}
                    color="#FF3B30"
                />
            </View>
        </Modal>
    );
};

export default TaskModal;
