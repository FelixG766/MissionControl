import { useTasks } from "@/context/task/taskContext";
import React, { useState } from "react";

const Filter = () => {
    const { priority, setPriority } = useTasks();
    const priorities = ["All", "Low", "Medium", "High"];
    const [activeIndex, setActiveIndex] = useState(0);


    return (
        <div className="relative py-2 px-2 grid grid-cols-4 items-center gap-3 bg-[#F9F9F9] border-2 border-white rounded-md">
            <span className="absolute left-[5px] bg-[#EDEDED] rounded-md transition-all duration-300"
                style={{
                    width: "calc(100% / 4 - 10px)",
                    height: "calc(100% - 10px)",
                    top: "50%",
                    transform: `translate(calc(${activeIndex * 100}% + ${activeIndex * 10}px), -50%)`,
                    transition: "transform 100ms cubic-bezier(.95, .03, 1, 1)"
                }}></span>
            {priorities.map((p, i) => (
                <button
                    key={i}
                    className={`relative px-1 z-10 font-medium text-sm ${priority === p ? "text-[#3aafae]" : "text-gray-500"}`}
                    onClick={() => {
                        setPriority(p);
                        setActiveIndex(i);
                    }}>
                    {p}
                </button>
            ))}
        </div>
    );
}

export default Filter;