"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Plus, Rocket, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type Subtask = {
  id: string;
  text: string;
  completed: boolean;
};

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  subtasks: Subtask[];
  expanded: boolean;
};

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  // const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  // const [newSubtask, setNewSubtask] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Erro ao parsear os dados do localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      subtasks: [],
      expanded: false,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              subtasks: todo.subtasks.map((st) => ({
                ...st,
                completed: !todo.completed,
              })),
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col border rounded-xl border-zinc-800 p-6 flex-1">
      <div className="flex items-center justify-between border-b-[1px] border-zinc-800 pb-6">
        <div>
          <h3 className="text-zinc-400 text-2xl font-bold">Lista de tarefas</h3>
          <p className="text-zinc-500 text-base font-normal">
            Seus objetivos para essa sessão
          </p>
        </div>

        <div className="bg-zinc-800 p-2 rounded-sm">
          <Rocket className="text-zinc-500" />
        </div>
      </div>

      <ScrollArea className="h-full max-h-[436px] py-6">
        <div className="pr-6">
          {todos.length === 0 ? (
            <div className="flex justify-center">
              <span className="text-zinc-500 text-base font-medium">Nenhuma task cadastrada</span>
            </div>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <div className="flex items-center gap-2 p-2">
                    <Button
                      className={` w-5 h-5 p-0 transition-all ${
                        todo.completed
                          ? "bg-primary/10 hover:bg-primary/5 border border-primary"
                          : "bg-zinc-800 border border-zinc-700"
                      }`}
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.completed && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </Button>
                    <span
                      className={`flex-1 text-base font-medium ${
                        todo.completed
                          ? " line-through text-zinc-600"
                          : "text-zinc-500"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent p-0 mr-2"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <Trash2 className="text-red-500 w-5 h-5" />
                    </Button>
                    <Button className="bg-primary/10 hover:bg-primary/5 border border-primary text-primary p-2">
                      <Plus className="w-5 h-5" />
                      Subtask
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>

      <div className="flex w-full items-center gap-3">
        <Input
          type="text"
          placeholder="Nova tarefa"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
          className="flex-1 border-none bg-zinc-800 text-zinc-400 h-10"
        />
        <Button
          onClick={addTodo}
          type="submit"
          className="bg-primary/10 hover:bg-primary/5 border border-primary text-primary h-10"
        >
          <Plus />
          Adicionar
        </Button>
      </div>
    </div>
  );
}
