import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query";
import React from "react";
import { deleteElection, getElections } from "../api";



export default function Elections() {
  const queryClient = useQueryClient()
  const { data, isLoading, isError, is } = useQuery({
    queryKey: ["Elections"],
    queryFn: getElections,
    staleTime:5000
  });


  const {mutateAsync, isError:deleteIsError, isLoading:deleteIsloading} = useMutation(deleteElection, {
    onSuccess:()=>{
    queryClient.invalidateQueries("elections");
    }
  })



  const deleteAnElection = async(id) =>{
    await mutateAsync(id)
  }


  if (isError) {
    return <p>Errored out</p>;
  }

  if (isLoading) {
    return <p>Loading</p>;
  }
  return (
    <div className="election-container">
      {data?.data?.data?.map(election => (
        <div className="posts" key={election._id}>
          <p key={election._id}>{election.candidate}</p>
          <button onClick={() => deleteAnElection(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
