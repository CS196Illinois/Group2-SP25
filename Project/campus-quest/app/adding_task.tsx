'use client'
import React from "react"
import { useState } from "react";
import "./App.css";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ICAL from 'ical.js';
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";


const Add_Task_Form = () => {

    const [firstOpen, setFirstOpen] = useState(false)
    const [secondurlOpen, setSecondurlOpen] = useState(false)
    const [thirdurl_PL_Open, setThirdurl_PLOpen] = useState(false)
    const [thirdurl_gradeOpen, setThirdurl_gradeOpen] = useState(false)
    const [thirdurl_canvasOpen, setThirdurl_canvasOpen] = useState(false)
    const [finalsubmission, setFinalsubmission] = useState(false)
    const [secondpdfOpen, setSecondpdfOpen] = useState(false)
    const [secondmanualOpen, setSecondmanualOpen] = useState(false)
    const [confirmManualOpen, setConfirmManualOpen] = useState(false);
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [taskList, setTaskList] = useState<any[]>([]);
    const [lastSubmittedTask, setLastSubmittedTask] = useState<null | typeof taskData>(null);
    const removeTask = (indexToRemove: number) => {
        setTaskList((prev) => prev.filter((_, i) => i !== indexToRemove));
    };
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
    const [taskData, setTaskData] = useState({
        name: "",
        comments: "",
        dueDate: "",
        dueTime: "",
        category: ""
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            const jcalData = ICAL.parse(content);
            const comp = new ICAL.Component(jcalData);
            const vevents = comp.getAllSubcomponents("vevent");

            const parsedTasks = vevents.map((vevent) => {
                const event = new ICAL.Event(vevent);
                const start = event.startDate.toJSDate(); // Handles both DATE and DATE-TIME
                const name = event.summary || "Untitled";

                const dueDate = start.toISOString().split("T")[0];
                const dueTime = event.startDate.isDate
                    ? "" // all-day
                    : start.toTimeString().split(":").slice(0, 2).join(":");

                return {
                    name,
                    dueDate,
                    dueTime,
                    comments: event.description || "",
                    category: "", // You could extract course code from name if needed
                };
            });

            setTaskList((prev) => [...prev, ...parsedTasks]);
        };

        reader.readAsText(file);
    };




    /*export const saveAllTasksToSupabase = async (tasks: typeof taskList) => {
        if (tasks.length === 0) return;

        const { error } = await supabase.from("tasks").insert(
            tasks.map((task) => ({
                name: task.name,
                comments: task.comments,
                due_date: task.dueDate,
                due_time: task.dueTime,
                category: task.category,
            }))
        );

        if (error) {
            console.error("❌ Failed to submit tasks:", error.message);
            alert("Something went wrong while submitting tasks.");
        } else {
            console.log("✅ All tasks submitted!");
            alert("All tasks submitted successfully.");
            setTaskList([]); // ✅ clear task list
            setReviewDialogOpen(false);
        }
    };
    */




    /*const [values, setValues] = useState({
        course_name_SP_PL:'',
        Smartphys_or_PL_url:'',
        course_ID_gradescope:'',
        gradescope_url:'',
        canvas_url:'',
        PDF_file: '',
        task_name:'',
        due_time:'',
        due_date:'',
        comments: '',
        category: '',
      })
    */



    return (
        <>
            {/* First Popup Page */}
            <Dialog open={firstOpen} onOpenChange={setFirstOpen}>
                <DialogTrigger onClick={() => setFirstOpen(true)} className="absolute top-10 right-10 bg-blue-950 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-200">
                    Add Task
                </DialogTrigger>
                <DialogContent className="text-center">
                    <h2 className="text-xl font-bold mb-4">How would you like to add your task ?</h2>
                    <h1>Guidelines :</h1>
                    <ol>
                        <li>
                            <h1>For Gradescope or PrairieLearn, Click on <b>PDF</b> </h1>
                            <h1>For Canvas or SmartPhysics, Click on <b>URL</b> </h1>
                        </li>
                    </ol>

                    <button
                        className="bg-orange-500 text-white px-5 py-4 rounded-md"
                        onClick={() => {
                            setFirstOpen(false)
                            setSecondpdfOpen(true)
                        }}
                    >
                        SCREENSHOT/PDF
                    </button>
                    <button className="bg-orange-500 text-white px-5 py-4 rounded-md"
                        onClick={() => {
                            setFirstOpen(false)
                            setSecondurlOpen(true)
                        }}
                    >
                        URL
                    </button>
                    <button className="bg-orange-500 text-white px-5 py-4 rounded-md"
                        onClick={() => {
                            setFirstOpen(false)
                            setSecondmanualOpen(true)
                        }}
                    >
                        MANUAL TASK
                    </button>
                </DialogContent>
            </Dialog>

            {/* Second Popup URL */}
            <Dialog open={secondurlOpen} onOpenChange={setSecondurlOpen}>
                <DialogContent className="text-center">
                    <h2 className="text-xl font-bold mb-4">Which website do you want to extract from ?</h2>
                    <button
                        className="bg-orange-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            setSecondurlOpen(false)
                            setThirdurl_canvasOpen(true)
                        }}
                    >
                        Smart Physics
                    </button>
                    <button
                        className="bg-orange-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            setSecondurlOpen(false)
                            setThirdurl_canvasOpen(true)
                        }}
                    >
                        Canvas
                    </button>
                </DialogContent>
            </Dialog>

            {/* If PrairieLearn is clicked Popup URL */}
            <Dialog open={thirdurl_PL_Open} onOpenChange={setThirdurl_PLOpen}>
                <DialogContent className="text-center">
                    <h2 className="text-xl font-bold mb-4">Upload your PDF</h2>
                    <input type="file" name="PDF_file" />
                    <button
                        className="bg-blue-950 text-white px-3 py-2 rounded-md"
                        onClick={() => {
                            setThirdurl_PLOpen(false)
                            setReviewDialogOpen(true)
                        }}
                    >
                        Extract
                    </button>
                </DialogContent>
            </Dialog>

            {/* If Canvas or SmartPhys is clicked Popup URL */}
            <Dialog open={thirdurl_canvasOpen} onOpenChange={setThirdurl_canvasOpen} >
                <DialogContent className="w-screen max-w-none p-5">
                    <h2 className="text-2xl font-bold text-center">
                        Provide the ICS file of your Calendar
                    </h2>
                    <h2 className="text-2xl font-bold text-center">
                        Extraction Guidelines :
                    </h2>

                    <div className="flex justify-center items-start">
                        <img
                            src="/smartphysinstruction.png"
                            alt="Instruction 1"
                            className="w-[1000px] h-auto rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="flex justify-center items-start">
                        <img
                            src="/Instructioncanvas.png"
                            alt="Instruction 1"
                            className="w-[1000px] h-auto rounded-lg shadow-lg"
                        />
                    </div>
                    <input type="file" name="canvas_calendar" accept=".ics" onChange={handleFileUpload} />
                    <button
                        className="bg-blue-950 text-white px-3 py-2 rounded-md"
                        onClick={() => {
                            setThirdurl_canvasOpen(false)
                            setReviewDialogOpen(true)
                        }}
                    >
                        Extract
                    </button>
                </DialogContent>
            </Dialog>

            {/* If PDF is clicked */}
            <Dialog open={secondpdfOpen} onOpenChange={setSecondpdfOpen}>
                <DialogContent className="text-center">
                    <h2 className="text-2xl font-bold text-center">
                        Which website do you want to extract from?
                    </h2>
                    <button
                        className="bg-orange-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            setSecondpdfOpen(false)
                            setThirdurl_PLOpen(true)
                        }}
                    >
                        Gradescope
                    </button>
                    <button
                        className="bg-orange-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            setSecondpdfOpen(false)
                            setThirdurl_PLOpen(true)
                        }}
                    >
                        Prairie Learn
                    </button>
                </DialogContent>
            </Dialog>

            {/* If Manual is clicked */}

            <Dialog open={secondmanualOpen} onOpenChange={(open) => {
                setSecondmanualOpen(open);
                if (!open) setEditingTaskIndex(null); // clear editing state if closed
            }}>
                <DialogContent className="text-center">
                    <h2 className="text-xl font-bold mb-4">Add a Task Manually</h2>

                    <input
                        type="text"
                        placeholder="Task name"
                        className="mb-2"
                        value={taskData.name}
                        onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
                    />
                    <input
                        type="date"
                        className="mb-4"
                        value={taskData.dueDate}
                        onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                    />
                    <input
                        type="time"
                        className="mb-4"
                        value={taskData.dueTime}
                        onChange={(e) => setTaskData({ ...taskData, dueTime: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Course/ Category"
                        className="mb-2"
                        value={taskData.category}
                        onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
                    />
                    <textarea
                        placeholder="Comments"
                        className="mb-2"
                        value={taskData.comments}
                        onChange={(e) => setTaskData({ ...taskData, comments: e.target.value })}
                    />

                    <button
                        className="bg-blue-950 text-white px-3 py-2 rounded-md"
                        onClick={() => {
                            const isEditing = editingTaskIndex !== null;
                            const taskSnapshot = { ...taskData };

                            if (isEditing) {
                                const updatedTasks = [...taskList];
                                updatedTasks[editingTaskIndex] = taskSnapshot;
                                setTaskList(updatedTasks);
                                setEditingTaskIndex(null);
                            } else {
                                setTaskList((prev) => [...prev, taskSnapshot]);
                            }

                            setLastSubmittedTask(taskSnapshot); // 🆕 store for confirmation popup
                            setSecondmanualOpen(false);
                            setConfirmManualOpen(true); // now uses `lastSubmittedTask`

                            setTaskData({
                                name: "",
                                comments: "",
                                dueDate: "",
                                dueTime: "",
                                category: "",
                            });
                        }}
                    >
                        {editingTaskIndex !== null ? "Update Task" : "Create Task"}
                    </button>
                </DialogContent>
            </Dialog>

            {/*Confirmation Page for Manual Task*/}
            <Dialog open={confirmManualOpen} onOpenChange={setConfirmManualOpen}>
                <DialogContent className="text-center">
                    <h2 className="text-xl font-bold mb-4">Task Created</h2>

                    <p className="mb-2"><strong>Name:</strong> {lastSubmittedTask?.name}</p>
                    <p className="mb-2"><strong>Comments:</strong> {lastSubmittedTask?.comments}</p>
                    <p className="mb-4"><strong>Due Date:</strong> {lastSubmittedTask?.dueDate}</p>
                    <p className="mb-4"><strong>Due Time:</strong> {lastSubmittedTask?.dueTime}</p>
                    <p className="mb-2"><strong>Course/Category</strong> {lastSubmittedTask?.category}</p>

                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-gray-300 text-black px-3 py-2 rounded-md"
                            onClick={() => setConfirmManualOpen(false)}
                        >
                            Close
                        </button>
                        <button
                            className="bg-blue-950 text-white px-3 py-2 rounded-md"
                            onClick={() => {
                                setConfirmManualOpen(false);
                                setTaskData({
                                    name: "",
                                    comments: "",
                                    dueDate: "",
                                    dueTime: "",
                                    category: ""
                                });
                                setSecondmanualOpen(true);
                            }}
                        >
                            Add Another Task
                        </button>
                        <button
                            className="bg-gray-300 text-black px-3 py-2 rounded-md"
                            onClick={() => {
                                setConfirmManualOpen(false);
                                setReviewDialogOpen(true); // View all tasks
                            }}
                        >
                            Review All Tasks
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
            {/*Review Page*/}
            <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                <DialogContent className="max-h-[80vh] overflow-y-auto text-left">
                    <h2 className="text-xl font-bold mb-4 text-center">Task Summary</h2>

                    {taskList.length === 0 ? (
                        <p className="text-center">No tasks added yet.</p>
                    ) : (
                        <ul className="space-y-3">
                            {taskList.map((task, index) => (
                                <li key={index} onClick={() => {
                                    setEditingTaskIndex(index);
                                    setTaskData(task);
                                    setReviewDialogOpen(false);
                                    setSecondmanualOpen(true);
                                }} className="relative border p-3 rounded-md bg-white shadow-md cursor-pointer hover:bg-gray-100 transition">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeTask(index); }}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    <p><strong>Task #{index + 1}</strong></p>
                                    <p><strong>Name:</strong> {task.name}</p>
                                    <p><strong>Comments:</strong> {task.comments}</p>
                                    <p><strong>Due Date:</strong> {task.dueDate}</p>
                                    <p><strong>Due Time:</strong> {task.dueTime}</p>
                                    <p><strong>Course/Category:</strong> {task.category}</p>

                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-6 flex justify-center">
                        <button
                            className="bg-blue-950 text-white px-4 py-2 rounded-md"
                            onClick={() => setSecondmanualOpen(true)}
                        >
                            Add More Tasks
                        </button>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded-md"
                        >
                            Submit All Tasks
                        </button>
                    </div>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default Add_Task_Form
