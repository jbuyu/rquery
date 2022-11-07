import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getElections } from "../api";



export default function Elections() {
  const { data, isLoading, isError, is } = useQuery({
    queryKey: ["Elections"],
    queryFn: getElections,
    staleTime:5000
  });

  console.log('data', data)




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
