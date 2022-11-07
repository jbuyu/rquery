import axios from "axios";

export const getElections = async () => {
  console.log("fetching elections");
  const response = await axios.get("http://localhost:3000/elections");
  return response;
};

//fns
export const deleteElection = async id => {
  const response = await axios.delete(`http://localhost:3000/elections/${id}`);
};
