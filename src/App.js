import { useEffect, useState } from "react";
import Tasks from "./components/Tasks/Tasks";
import TaskForm from "./components/NewTasks/TaskForm";
function App() {
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);
  const [tasks,setTasks]=useState([]);

  const fetchHandler=async(taskText)=>{
    setIsLoading(true);
    setError(null);
    try {
      const response=await fetch("https://mod-15-2-default-rtdb.firebaseio.com/items.json");
      if(!response.ok){
        throw new Error("something disturbing!")
      }
      const data=await response.json();
      const loadedTasks=[];
      for(const tasksItems in data){
        loadedTasks.push({
          id:tasksItems,text:data[tasksItems].text
        })
      }
      setTasks(loadedTasks);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    fetchHandler()
  },[])





  const enterTaskHandler = async (taskText) => {
    setIsLoading(true);
    setError(null);
    if (taskText.trim().length <= 2) {
      ; // Set the error message.
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        'https://mod-15-2-default-rtdb.firebaseio.com/items.json',
        {
          method: 'POST',
          body: JSON.stringify({ text: taskText }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      const newTask = {
        id: data.name, 
        text: taskText,
      };

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      
      setIsLoading(false);
      
    } catch (error) {
      setError(error.message || 'Something went wrong!');
      setIsLoading(false);
    }
    
  };


  return (
    <>
    <div style={{backgroundImage: 'linear-gradient(rgb(215, 247, 242), rgb(207, 167, 218))',height:'1000px',padding:'0'}}>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}/>
      <Tasks
        items={tasks}
        onFetch={fetchHandler}
        error={error}
        loading={isLoading}
      />
      </div>
    </>
  );
}

export default App;
