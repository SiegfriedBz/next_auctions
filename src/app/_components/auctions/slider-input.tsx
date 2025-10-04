import type { ComponentProps, FC } from "react";
import { Slider } from "@/components/ui/slider";

type Props = Omit<
  ComponentProps<typeof Slider>,
  "value" | "onValueChange" | "defaultValue" | "max" | "min"
> & {
  className?: string;
  min: number;
  value: number;
  onChange: (value: number) => void;
};

export const SliderInput: FC<Props> = (props) => {
  const { value, onChange, min, step = 1, className = "py-2" } = props;

  const sliderMax = Math.max(value, min + 20, 100);

  return (
    <Slider
      className={className}
      value={[value]}
      onValueChange={(val) => onChange(val[0])}
      min={min}
      max={sliderMax}
      step={step}
    />
  );
};
