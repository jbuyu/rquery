import React from 'react'
import { useForm  } from 'react-hook-form'
import { useCreateElection, useGetElections } from '../hooks';


export default function CreateElection() {
  const {mutateAsync, isError, isLoading:isCreateLoading} = useCreateElection();
  const {isLoading, data} = useGetElections()
    const { register, handleSubmit } = useForm();


  const onSubmit = (data)=>{
    mutateAsync(data)
    // console.log('data', data)
  }


  if(isLoading){
    return (
      <p>Loading Elections on create</p>
    )
  }
  
    return (
      <div className="create-election">
        <h3>Create Election</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="candidate">Candidate</label>
          <input defaultValue="candidate" {...register("candidate")} />
          <label htmlFor="votes">Votes</label>
          <input defaultValue="votes" {...register("votes")} />
          <label htmlFor="party">Party</label>
          <input defaultValue="party" {...register("party")} />
          <button type="submit">
            Create Election
          </button>
        </form>
        <div className="">
      {
        data?.data?.data.map(item=>(
        <div>{item.candidate}</div>
      ))
     }
        </div>
      </div>
    );
}
