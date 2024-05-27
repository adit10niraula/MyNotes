import {Link} from 'react-router-dom'
import "../App.css"
const Listitem = ({note})=>{

    let getTitle = (note) =>{

        let title = note.body.split('\n')[0]
        if(title.length > 45){
            return title.slice(0,45)
        }

        return title
    }

    let getTime=()=>{
        return new Date(note.updated).toLocaleDateString()

    }

    let getContent = (note)=>{
        let title = getTitle(note)
        let content = note.body.replaceAll('\n', "")
        content = content.replaceAll(title, "")

        if(content.length > 45){
            return content.slice(0,45) + "..."
        }
        else {
            return content
        }
    }


    return <>

    <div className="listitem">

   

    {/* <div className='list'><Link to={`/note/${note.id}`} >{note.body}</Link></div> */}
    <div className='list'><Link to={`/note/${note.id}`} >{getTitle(note)}</Link>
    

    <p><span>{getTime(note)}</span> {getContent(note)}</p>
    </div>
    

    </div>
    
    
    </>


}

export default Listitem