import { useState } from "react";


const Home = () => {


   const [values,setValues]=useState(0);
   const [history,setHistory]=useState([]);
   const [redolist,setRedolist]=useState([]);
   const  maintainHistory=(key,pre,curr)=>{
      //  console.log(key,pre,curr);
        const obj={
          action:key,
          pre,
          curr
        }
        const copyHistory=[...history]
        copyHistory.unshift(obj);
        setHistory(copyHistory);
   }
   const handlUndo=()=>{
    if(history.length)
      {
        let copyHistory=[...history];
        let firstItem=copyHistory.shift();
        setHistory(copyHistory);
        setValues(firstItem.pre);
        let copyredolist=[...redolist];
        copyredolist.push(firstItem);
        setRedolist(copyredolist);
      }
   }
   console.log(redolist);
    const handlClick=(key)=>{
     let vl=parseInt(key);
     maintainHistory(key,values,vl+values);
     setValues((existingvalue)=>existingvalue+vl)
    }
    const handlRedo=()=>{
      if(redolist.length)
        {
          let copyRdolist=[...redolist];
            let popRdo=copyRdolist.pop();
            setRedolist(copyRdolist)
            const {action,pre,curr}=popRdo;
            setValues(curr);
            maintainHistory(action,pre,curr);
        }
    }
  return(
   <>
  <div className="container">
    <h1 >couter undoRedo</h1>
   
      <div className="action-btn">
        <button onClick={handlUndo}>Undo</button>
        <button onClick={handlRedo}>Redo</button>
      </div>
      <div className="user-action">
        {
          ['-100','-10','-1'].map((key)=>{
            return(
              <>
              <button onClick={()=>{handlClick(key)}}>{key}</button>
              </>
            )
          })
        }
        <div className="val">{values}</div>
        {
          ['+1','+10','+100'].map((key)=>{
            return(
              <>
              <button onClick={()=>{handlClick(key)}}>{key}</button>
              </>
            )
          })
        }
      </div>
      <div className="history">
        {
          history.map((item)=>{
            return(
              <>
              <div className="row">
                <div>{item.action}</div>
                <div>{item.pre}{'->'}{item.curr}</div>
              </div>
              </>
            )
          })
        }
      </div>
     
  </div>
   </>
  )
}

export default Home;