import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

export const useGetGovState: any = (govContract: string) => {
  const { client } = useTerraWebapp();

  return useQuery(["govState", govContract], () => {
    return client.wasm.contractQuery(govContract, {
      state: {},
    });
  });
};

export default useGetGovState;
