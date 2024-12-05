import { useSize } from "ahooks";

export function useMobile() {
  const size = useSize(document.querySelector("body"));
  return size.width <= 1064;
}
