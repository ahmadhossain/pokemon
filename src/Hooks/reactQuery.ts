import { QueryKeys } from "@/Enums";
import { editSetName, getAllSets, getSet } from "@/services/pokemon.services";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSets = () => {
  return useQuery({
    queryKey: [QueryKeys.CardSets],
    queryFn: async () => {
      const sets = await getAllSets();
      return sets;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: true,
  });
};

export const useSet = (setId: string) => {
  return useQuery({
    queryKey: [QueryKeys.CardSet, setId],
    queryFn: async () => {
      if (!setId) {
        return;
      }
      const set = await getSet(setId);
      return set;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true,
  });
};

export const useUpdateSetName = (initialSet?: Set) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ setId, setName }: { setId: string; setName: string }) =>
      editSetName(setId, setName),
    onSuccess: (params, variables) => {
      console.log("Successful");
      if (initialSet) {
        queryClient.setQueryData([QueryKeys.CardSet], (oldSet: Set) => {
          const newData = structuredClone(oldSet);
          if (newData !== null) {
            newData.name = variables.setName;
          }
          return newData;
        });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
