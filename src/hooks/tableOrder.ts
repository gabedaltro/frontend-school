import { useCallback, useState } from "react";

type OrderDirection = "asc" | "desc";

export type OrderIndexData = {
  index: string;
  direction: OrderDirection;
};

type FunctionHandleSort = <T>(index: string, source: Array<T>) => Array<T>;

type TableOrder = [OrderIndexData, FunctionHandleSort];

export default function useTableOrder(): TableOrder {
  const [indexFiltered, setIndexFiltered] = useState<OrderIndexData>({
    index: "",
    direction: "asc",
  });

  const handleSort = useCallback(
    (index: string, source: Array<any>): Array<any> => {
      const direction =
        indexFiltered.direction === "asc" && index === indexFiltered.index
          ? "desc"
          : "asc";

      source = JSON.parse(JSON.stringify(source));

      setIndexFiltered({
        index,
        direction,
      });

      if (direction === "asc") {
        const sorted = source.sort((a, b) => {
          if (a[index] < b[index]) return -1;
          if (a[index] > b[index]) return 1;
          return 0;
        });

        return sorted;
      }

      const sorted = source.sort((a, b) => {
        if (a[index] < b[index]) return 1;
        if (a[index] > b[index]) return -1;
        return 0;
      });

      return sorted;
    },
    [indexFiltered]
  );

  return [indexFiltered, handleSort];
}
