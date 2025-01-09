import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f7f7",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
        textAlign: "center",
    },
    calendar: {
        marginBottom: 20,
    },
    taskList: {
        flex: 1,
    },
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        marginBottom: 10,
        padding: 15,
        borderRadius: 10,
    },
    taskTextContainer: {
        flex: 1,
    },
    taskText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    completedTaskText: {
        textDecorationLine: "line-through",
        color: "gray",
    },
    taskDescription: {
        fontSize: 16,
        color: "#666",
    },
    taskStatus: {
        fontSize: 16,
        color: "#666",
    },
    buttonContainer: {
        flexDirection: "row", // Align buttons horizontally
        alignItems: "center", // Center the icons vertically
    },
    buttonContainer: {
        flexDirection: 'row', // Align buttons horizontally
        justifyContent: 'space-between', // Space out buttons evenly
        marginTop: 10, // Add top margin
        paddingHorizontal: 20,
        marginHorizontal:10 ,// Add horizontal padding
    },
    editButton: {
        borderRadius: 5,
        padding: 5,
        marginRight: 5, // Space between buttons
        width: 40, // Set fixed width for buttons
        justifyContent: "center",
        alignItems: "center",
    },
    buttonRow: {
        flexDirection: 'row', // Arrange buttons horizontally
        justifyContent: 'space-between', // Space between buttons
        marginTop: 10, // Add spacing above the buttons
    },
    buttonWrapper: {
        flex: 1, // Allows buttons to grow equally
        marginRight: 10, // Add margin between buttons
    },

    completeButton: {
       
        borderRadius: 5,
        padding: 10,
        marginRight: 10, // Space between buttons
         // Set fixed width for buttons
        justifyContent: "center",
        alignItems: "center",
    },
    completedButton: {
        backgroundColor: "white",
    },
    deleteButton: {
        color: "red",
        borderRadius: 5,
        padding: 10,
        width: 40, // Set fixed width for buttons
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
    },
    addButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007BFF",
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    addButtonText: {
        color: "green",
        fontSize: 18,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        fontSize: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "#FF3B30",
        fontSize: 16,
        marginBottom: 10,
    },
    taskDeadline: {
        color: "#FF3B12",
    },
    taskCreatedAt: {
        color: "#5497FF",
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    input: {
        width: "100%",
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    dateText: {
        fontSize: 16,
        color: "#555",
        marginTop: 10,
    },
    errorText: {
        color: "#FF3B30",
        marginTop: 10,
    },
});

export default styles;
