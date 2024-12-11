import { useSize } from "ahooks";

export function usePad() {
  const size = useSize(document.querySelector("body"));
  return size.width <= 992;
}

export function useMobile() {
  const size = useSize(document.querySelector("body"));
  return size.width <= 768;
}
