import React from "react";
import Navbar from "./navbar";
import Add_Task_Form from "./adding_task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



export default function Home() {
  return (
    <main className="place-items-center">
      <Add_Task_Form />
      <div className="flex py-80 justify-center items-center">
        <Navbar/>
      </div>
    </main>


    
  );
}