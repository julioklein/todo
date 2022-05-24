import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find((task) => task.title === newTaskTitle);
    if (taskExists) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((prev) => [...prev, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const taskFound = tasks.find((task) => task.id === id);
    if (taskFound) {
      updatedTasks.map((task) => {
        if (task.id === taskFound.id) {
          task.done = !task.done;
        }
        return task;
      });
    }
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [{ text: "Não" }, { text: "Sim", onPress: () => removeTask(id) }]
    );
  }

  function removeTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function handleEditTask(params: { taskId: number; taskNewTitle: string }) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const taskFound = tasks.find((task) => task.id === params.taskId);
    if (taskFound) {
      updatedTasks.map((task) => {
        if (task.id === taskFound.id) {
          task.title = params.taskNewTitle;
        }
        return task;
      });
    }
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
