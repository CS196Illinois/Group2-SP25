import Add_Task_Form from "../adding_task";
import Navbar from "../navbar";


export default function TasksPage() {
  return (
    <main className="place-items-center">
      <Add_Task_Form />
      <div className="flex py-80 justify-center items-center">
        <Navbar/>
      </div>
    </main>
  );
}