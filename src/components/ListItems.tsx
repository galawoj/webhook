import { ReactNode } from "react";

export default function ListItems<T extends { id: number }>({
  array,
  children,
}: {
  array: T[];
  children: (item: T) => ReactNode;
}) {
  return <>{array?.map((item) => children(item))}</>;
}
