import React from "react";
import { useDeleteElection, useGetElections } from "../hooks";



export default function Elections() {

  const {isLoading:isDeleteLoading, data:deleteData, mutateAsync } = useDeleteElection();

  const handleDelete=(id)=>{
    mutateAsync(id)
  }

  const {isLoading, data} = useGetElections();

  if(isLoading){
    return (
      <p>Elections loading</p>
    )
  }
  return (
    <div className="election-container">
     <h3>Elections</h3>
     {
      data?.data?.data.map(item=>(
        <div key={item._id} className="election">
          {item.candidate}
          <button onClick={()=> handleDelete(item._id)} >Delete</button>
          </div>
      ))
     }
    </div>
  );
}
