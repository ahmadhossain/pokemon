import { QueryKeys } from "@/Enums";
import { editSetName, getAllSets, getSet } from "@/services/pokemon.services";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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
    queryKey: [QueryKeys.CardSet],
    queryFn: async () => {
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
  // queryClient.invalidateQueries({ queryKey: [QueryKeys.CardSets] });

  return useMutation({
    mutationFn: ({ setId, setName }: { setId: string; setName: string }) =>
      editSetName(setId, setName),
    onSuccess: (params, variables) => {
      console.log("Successful");
      if (initialSet) {
        // queryClient.setQueryData([QueryKeys.CardSets], () => {
        //   let foundset = initialSets?.find((set) => set.id === variables.setId);
        //   if (foundset) {
        //     foundset.name = variables.setName;
        //   }
        //   console.log(initialSets);
        //   return [...initialSets];
        // });
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

// export const useUpdateSetName = (initialSets?: Set[]) => {
//   const queryClient = useQueryClient();
//   // queryClient.invalidateQueries({ queryKey: [QueryKeys.CardSets] });

//   return useMutation({
//     mutationFn: ({ setId, setName }: { setId: string; setName: string }) =>
//       editSetName(setId, setName),
//     onSuccess: (params, variables) => {
//       console.log("Successful");
//       if (initialSets) {
//         // queryClient.setQueryData([QueryKeys.CardSets], () => {
//         //   let foundset = initialSets?.find((set) => set.id === variables.setId);
//         //   if (foundset) {
//         //     foundset.name = variables.setName;
//         //   }
//         //   console.log(initialSets);
//         //   return [...initialSets];
//         // });
//         queryClient.setQueryData([QueryKeys.CardSets], (oldData: Set[]) => {
//           const newData = structuredClone(oldData);
//           const objIndex = oldData.findIndex(
//             (item) => item.id === variables.setId
//           );
//           if (objIndex != -1) {
//             newData[objIndex].name = variables.setName;
//           }
//           return newData;
//         });
//       }
//     },
//     onError: (err) => {
//       console.log(err);
//     },
//   });
// };
