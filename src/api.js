import axios from "axios";

export const getElections = async () => {
  console.log("fetching elections");
  const response = await axios.get("http://localhost:3000/elections");
  return response;
};

//fns
export const createElection = async electionDetails => {
  const response = await axios.post(
    `http://localhost:3000/elections`,
    electionDetails
  );
  return response;
};
