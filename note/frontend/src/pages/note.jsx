import { useState, useEffect } from "react"
import { json, useParams } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";    
import "../App.css"
import Header from "../components/header";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Note = () =>{

    let navigate = useNavigate()
    let {id} = useParams()

    let [note, setnote] = useState(null)

    useEffect(()=>{
        getnote()

    },[id])


    const getnote = async ()=>{
        if (id === "new") return
        let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}`)
        let data = await response.json()
        setnote(data)
    }


    let updateNote = async ()=>{
       fetch(`http://127.0.0.1:8000/api/notes/${id}/update/`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(note)

       })
        
    }

    let deleteNote = async ()=>{
        fetch(`http://127.0.0.1:8000/api/notes/${id}/delete/`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            }

        })
        navigate('/')
    }


    let handleSubmit = ()=>{
        if(id !== "new" && !note.body){
            deleteNote()
        }
        else if(id !== "new"){

            updateNote()

        }
        else if (id === "new" && note!== null){
            createNote()
        }
       
        navigate('/')
    }


    let createNote = async()=>{
        fetch('http://127.0.0.1:8000/api/notes/create/',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })

        navigate('/')
    }

    let handleChange = (value)=>{
        setnote({...note, "body":value})
        
    }



   

    return <>

<div className="component">

<div className="header">
<Header></Header>

</div>

        <div className="shead">
            
            <IoIosArrowBack onClick={handleSubmit}/>
            
          
        

        <div className="heads">

            {id === "new" ?  <div className="send">
            <IoSend onClick={updateNote} />

            </div> :

            <MdDelete onClick={deleteNote} />

             }
           
        
        

        </div>

        </div>


    <textarea className="pnote snotes" onChange={ (e)=>{handleChange(e.target.value)}} value={note?.body}></textarea>

    </div>
    

      
    
    </>
}

export default Note