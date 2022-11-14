import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateElection, useDeleteElection, useElections } from "../api";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function CreateElection() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const {mutateAsync, isLoading, isError} = useCreateElection()

  const onSubmit = (data) => {
    mutateAsync(data);
  };

  const {data, isLoading:isElectionsLoading} = useElections()

  const {
    mutateAsync: deleteMutateAsync,
    isError: deleteIsError,
    isLoading: deleteIsloading,
  } = useDeleteElection()

  const deleteAnElection = (id) => {
     deleteMutateAsync(id);
  };

  if (isElectionsLoading) {
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
  };
  

  
  return (
    <div className="create-election">
      <h3>Create Election</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="candidate">Candidate</label>
        <input defaultValue="" {...register("candidate")} />
        <label htmlFor="votes">Votes</label>
        <input defaultValue="" {...register("votes")} />
        <label htmlFor="party">Party</label>
        <input defaultValue="" {...register("party")} />
        <button type="submit">
          {isLoading ? "loading" : "Create Election"}
        </button>
      </form>
      <div className="elections">
        {data?.data?.data?.map((election) => (
          <div className="single-election" key={election._id}>
            <p key={election._id}>{election.candidate}</p>
            <button onClick={() => deleteAnElection(election._id)}>
              Delete
            </button>
            {
              deleteIsloading ? (
                <p>.....</p>
              ): null
            }
          </div>
        ))}
      </div>
    </div>
  );
}
