import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios"

let electionsData = [
   {
            "_id": "63729678dcd9ef63e0648e0f",
            "candidate": "Moana almu",
            "votes": "200",
            "party": "ODM",
            "createdAt": "2022-11-14T19:26:48.575Z",
            "updatedAt": "2022-11-14T19:26:48.575Z",
            "__v": 0
        },
        {
            "_id": "6372a3972a85bdd3adde2ff5",
            "candidate": "ooorrr Milan",
            "votes": "1000",
            "party": "KRA",
            "createdAt": "2022-11-14T20:22:47.172Z",
            "updatedAt": "2022-11-14T20:22:47.172Z",
            "__v": 0
        }
]

const getElections = async ()=>{
  const response = await axios.get("http://localhost:3000/elections")
  return response;
}

export const useGetElections = ()=>{
  return useQuery({
    queryKey:["elections"],
    queryFn:getElections
  })
}

const createElection = async (data)=>{
  const response = await axios.post("http://localhost:3000/elections", data)
  return response
}

export const useCreateElection = ()=>{
  const queryClient = useQueryClient()
  return useMutation(createElection, {
    onError:(error)=>{
      console.log('error', error)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries("elections")
      console.log('success')
    }
  })
}
const deleteElection = async (id)=>{
  const response = await axios.delete(`http://localhost:3000/elections/${id}`)
  return response
}

export const useDeleteElection = ()=>{
  const queryClient = useQueryClient()
  return useMutation(deleteElection, {
    onError:(error)=>{
      console.log('error', error)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries("elections")
    }
  })
}

