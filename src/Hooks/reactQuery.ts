import { QueryKeys } from "@/Enums";
import { getAllSets } from "@/services/pokemon.services";
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

// export const useUpdateSetName = (initialSets?: Set[]) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ setId, setName }: { setId: string; setName: string }) =>
//       editSetName(setId, setName),
//     onSuccess: (params, variables) => {
//       console.log("Successful");
//       if (initialSets) {
//         queryClient.setQueryData([QueryKeys.CardSets], () => {
//           let foundset = initialSets?.find((set) => set.id === variables.setId);
//           if (foundset) {
//             foundset.name = variables.setName;
//           }
//           console.log(initialSets);
//           return [...initialSets];
//         });
//       }
//     },
//     // queryClient.invalidateQueries({ queryKey: [QueryKeys.CardSets] });
//     onError: (err) => {
//       console.log(err);
//     },
//   });
// };
