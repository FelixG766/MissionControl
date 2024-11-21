"use client";

import useRedirect from "@/hooks/useRedirect";
import { useTasks } from "@/context/task/taskContext";
import Filter from "../component/Filter/Filter";
import TaskItem from "../component/TaskItem/TaskItem";
import { Task } from "@/utils/types";
import { useEffect } from "react";

export default function Home() {

  useRedirect("/login");

  const { setPriorityFilter, setMiniBarOptionFilter, filteredTasks, showCreateTaskDialog } = useTasks();

  useEffect(() => {
    setMiniBarOptionFilter("Completed");
    setPriorityFilter("All");
  }, [setMiniBarOptionFilter]);

  return (
    <main className="m-6 h-full overflow-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filter />
      </div>
      <div className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
        {filteredTasks?.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={showCreateTaskDialog}
        >
          Create Task
        </button>
      </div>
    </main >
  )
}