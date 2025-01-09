import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome for icons
import styles from "../styles";

const TaskItem = ({
    task,
    handleEditTask,
    handleToggleCompletion,
    handleDeleteTask,
}) => {
    return (
        <View style={styles.taskItem}>
            <View style={styles.taskTextContainer}>
                <Text
                    style={[
                        styles.taskText,
                        task.status === "Completed" &&
                            styles.completedTaskText,
                    ]}
                >
                    {task.title}
                </Text>
                <Text style={styles.taskDescription}>{task.description}</Text>
                
                <Text style={styles.taskDeadline}>Deadline: {task.deadline}</Text>
            </View>

            <View style={styles.buttonContainer}>
                {/* Edit Button with Icon */}
                <TouchableOpacity
                    onPress={() => handleEditTask(task)}
                    style={[styles.editButton]}
                >
                    <Icon name="edit" size={20} color="green" />
                    
                </TouchableOpacity>

                {/* Complete/Pending Button with Icon */}
                <TouchableOpacity
                    onPress={() => handleToggleCompletion(task.id)}
                    style={[
                        styles.completeButton,
                        task.status === "Completed" && styles.completedButton,
                    ]}
                >
                    <Icon
                        name={task.status === "Completed" ? "check" : "hourglass-half"}
                        size={20}
                        color="blue"
                    />
                    
                </TouchableOpacity>

                {/* Delete Button with Icon */}
                <TouchableOpacity
                    onPress={() => handleDeleteTask(task.id)}
                    style={[styles.deleteButton]}
                >
                    <Icon name="trash" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaskItem;
