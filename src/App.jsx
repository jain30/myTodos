import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";



function App() {

 const [todo, setTodo] = useState("")
 const [todos, setTodos] = useState([])
const [showFinished, setshowFinished] = useState(true)

 useEffect(() =>{
  let todoString = localStorage.getItem("todos")
  if(todoString){
    let todos =JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
},[])
 // local storage
 const saveToLS = (params) => {
  localStorage.setItem("todos", JSON.stringify(todos))
 }

 const toggleFinished =(params) => {
   setshowFinished(!showFinished)
 }

  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id === id )
    setTodo(t[0].todo)

    let neTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(neTodos)
    saveToLS()
  }

  const handleDelete = (e,id) => {
    let neTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(neTodos)
    saveToLS()
  }

  const handleAdd = ()=>{
    setTodos([...todos,{id: uuidv4(),todo,isCompleted:false }])
    setTodo("")
   // console.log(todos)
    saveToLS()
  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  
const handleCheckbox = (e) => {
 let id = e.target.name;
 let index = todos.findIndex(item =>{
   return item.id === id;

 })
 let neTodos =[...todos];
 neTodos[index].isCompleted = !neTodos[index].isCompleted
 setTodos(neTodos)
 saveToLS()
 //todos.filter()


}


  return (
    <>
    <Navbar/>
     <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2">
        <h1 className='font-bold text-center text-xl'>iTask Manage your Todos at one Place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full' />
          <button onClick={handleAdd} disabled = {todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 text-sm font-bold p-3 py-1 rounded-xl text-white'>Save</button>
        </div>

        <input onClick={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No Todos to Display</div>}
        {todos.map(item=>{

          
        return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
          <div className='flex gap-5'>
           <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
            <div className={item.isCompleted?"line-through":""}> {item.todo} </div>
         </div>
            <div className="buttons flex h-full">
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold p-3 py-1 rounded-xl text-white mx-1'><FaEdit />
            </button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold p-3 py-1 rounded-xl text-white mx-1'><AiFillDelete />
            </button>

            </div>
          </div>
       })}
        </div>       
     </div>
    </>
  )
}

export default App
