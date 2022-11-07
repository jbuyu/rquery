import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { deleteElection, getElections } from "../api";



export default function Elections() {
  const { data, isLoading, isError, is } = useQuery({
    queryKey: ["Elections"],
    queryFn: getElections,
    staleTime:5000
  });

  console.log('data', data)

const { mutateAsync, isLoading: isDeleteLoading, isError:isDeleteError } = useMutation(deleteElection);

const deleteAnElection = async (id)=>{
  console.log('id', id)
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
          <button onClick={() => deleteElectioned(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
