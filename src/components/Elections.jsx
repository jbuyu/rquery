import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { deleteElection, getElections } from "../api";

export default function Elections() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["Elections"],
    queryFn: getElections,
    // staleTime:5000,
    // cacheTime: 3000 * 1000,
  });

  // const onDeleteError = () => {
  //   toast.error("Do not delete");
  // };

  const {
    mutateAsync,
    isError: deleteIsError,
    isLoading: deleteIsloading,
  } = useMutation(deleteElection, {
    onSuccess: () => {
      queryClient.invalidateQueries("elections");
    },
  });

  const deleteAnElection = async (id) => {
    await mutateAsync(id);
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
