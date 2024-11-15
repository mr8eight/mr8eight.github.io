import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { Kanban } from "types/kanban";
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp();
  
    return useQuery<Kanban[]>(["kanbans", cleanObject(param)], () =>
      client("kanbans", { data: param })
    );
  };

  export const useAddKanban = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      (params: Partial<Kanban>) =>
        client(`kanbans`, {
          data: params,
          method: "POST",
        }),
      useAddConfig(queryKey)
    );
  };
   
  export const useDeleteKanban = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      ({ id }: { id: number }) =>
        client(`kanbans/${id}`, {
          method: "DELETE",
        }),
      useDeleteConfig(queryKey)
    );
  };
  
  export interface SortProps {
    fromId: number
    referenceId: number;
    type: 'before' | 'after'

    fromKanbanId ?: number
    toKanbanId?: number
  }

  export const useReorderKanban = (queryKey:QueryKey) => {
    const client = useHttp()
    return useMutation(
      (param:SortProps) => {
        return client('kanbans/reorder',{
          data: param,
          method: 'POST'
        })
      },
      useReorderKanbanConfig(queryKey)
    )
  }