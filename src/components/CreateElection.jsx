import React from 'react'
import { useForm  } from 'react-hook-form'


export default function CreateElection() {
    const { register, handleSubmit } = useForm();


  const onSubmit = (data)=>{
    console.log('data', data)
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
         
        </div>
      </div>
    );
}
