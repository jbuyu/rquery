import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm  } from 'react-hook-form'
import { createElection, deleteElection, getElections } from '../api'
import ClipLoader from "react-spinners/ClipLoader";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



export default function CreateElection() {
   let [loading, setLoading] = useState(true);
   let [color, setColor] = useState("#ffffff");
  const queryClient = useQueryClient()
  const {register, handleSubmit} = useForm()

  const onSubmit = (data)=>{
    createAnElection(data);
  }

  const {
    mutateAsync,
    isLoading,
    isError,
  } = useMutation(createElection, {
    onSuccess: ()=>{
      console.log('mm')
      queryClient.invalidateQueries("elections");
    }
  });

  const createAnElection = async(data) => {
    await mutateAsync(data);
  };


  const {isLoading:isElectionsLoading, isError:electionError, data} = useQuery({queryKey:["elections"], queryFn:getElections})


  const {
    mutateAsync: deleteMutateAsync,
    isError: deleteIsError,
    isLoading: deleteIsloading,
  } = useMutation(deleteElection, {
    onSuccess: () => {
      queryClient.invalidateQueries("elections");
    },
  });

  const deleteAnElection = async id => {
    console.log('id', id)
    await deleteMutateAsync(id);
  };

  if (isElectionsLoading){
    return (
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
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
          <button type="submit">Create Election</button>
        </form>
        <div className="elections">
          {data?.data?.data?.map(election => (
            <div className="single-election" key={election._id}>
              <p key={election._id}>{election.candidate}</p>
              <button onClick={() => deleteAnElection(election._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        {/* <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> */}
      </div>
    );
}
