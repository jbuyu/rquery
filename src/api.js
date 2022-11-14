import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import toast from "react-hot-toast";


 const getElections = async () => {
  console.log("fetching elections");
  const response = await axios.get("http://localhost:3000/elections");
  return response;
};

export const useElections = () =>{
return useQuery({
  queryKey:["elections"],
  queryFn:getElections
}, {
  onError:()=>{
    console.log('error')
  }
}) 
}

//fns
 const createElection = async electionDetails => {
  const response = await axios.post(
    `http://localhost:3000/elections`,
    electionDetails
  );
  return response;
};

export const useCreateElection =()=>{
  const queryClient = useQueryClient()
  return useMutation( createElection, {
    onSuccess:(success)=>{
      console.log('success', success)
      queryClient.invalidateQueries("elections")
    },
    onError:(error)=>{
      // console.log('error', error)
      toast.error("nope")
    }
  })
}

 const deleteElection = async electionID => {
  const response = await axios.delete(
    `http://localhost:3000/elections/${electionID}`
  );
  return response;
};

export const useDeleteElection = ()=>{
  const queryClient = useQueryClient()
  return useMutation(deleteElection, {
    onSuccess:()=>{
      queryClient.invalidateQueries("elections")
    },
    onError:(error)=>{
      console.log('error', error)
    }
  })
}