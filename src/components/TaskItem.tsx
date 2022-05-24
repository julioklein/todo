import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import { Task } from "./TasksList";

interface ITaskItem {
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (params: { taskId: number; taskNewTitle: string }) => void;
  item: Task;
}

export default function TaskItem({
  index,
  toggleTaskDone,
  removeTask,
  editTask,
  item,
}: ITaskItem) {
  const [editing, setEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditing(true);
  }

  function handleCancelEditing() {
    const oldTitle = item.title;
    setTaskTitle(oldTitle);
    setEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: item.id, taskNewTitle: taskTitle });
    setEditing(false);
  }

  useEffect(() => {
    if (editing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [editing]);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.editingContainer}>
        {editing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={16} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Icon name="edit" size={16} color="#B2B2B2" />
          </TouchableOpacity>
        )}

        <View style={styles.divisor} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24, opacity: editing ? 0.2 : 1 }}
          onPress={() => removeTask(item.id)}
          disabled={editing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  divisor: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196,196,196, 0.24)",
  },
  editingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
