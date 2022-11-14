import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDeleteElection, useElections } from "../api";

export default function Elections() {

  const {isLoading, data} = useElections();
  console.log('data', data)
  const {
    mutateAsync,
    isError: deleteIsError,
    isLoading: deleteIsloading,
  } = useDeleteElection()

  const deleteAnElection =  (id) => {
     mutateAsync(id);
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="election-container">
      {data?.data?.data?.map((election) => (
        <div className="posts" key={election._id}>
          <p key={election._id}>{election.candidate}</p>
          <button onClick={() => deleteAnElection(election._id)}>Delete</button>
          <Toaster />
        </div>
      ))}
    </div>
  );
}
