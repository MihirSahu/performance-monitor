import { BaseChart } from "./BaseChart"
import { useMemo } from "react";

export type ChartProps = {
  data: number[],
  maxDataPoints: number,
}

export const Chart = (props: ChartProps) => {
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({value: point * 100}));
    return [...points, ...Array.from({length: props.maxDataPoints - points.length}).map(() => ({value: undefined}))];

  }, [props.data, props.maxDataPoints]);

  return <BaseChart data={preparedData} />
}