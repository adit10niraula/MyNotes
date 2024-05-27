import { useState, useEffect } from "react"
import Listitem from "../components/listitem"
import { FaBarsStaggered } from "react-icons/fa6";

import "../App.css"
import AddBtn from "../components/addbtn";

const NoteLIstPage = () =>{

    let [notes, setNotes] = useState([])
   

    useEffect(()=>{
        getNotes()
        

    },[])

    let getNotes = async ()=>{
        let response = await fetch("http://127.0.0.1:8000/api/notes/")
        let data = await response.json()
       
        
        setNotes(data)
    }



    return <>
   
    <div>
        <div className="tophead">
        <div className="head">
        <FaBarsStaggered />
        <p className="pnote">Note</p>
       
        </div>
        <div className="create">

        <AddBtn/>

        </div>

        </div>
        {notes.map((item,index)=>(
           
           <Listitem key={index} note={item}/>
            
        ))}
    </div>



    
    
    </>
}

export default NoteLIstPage