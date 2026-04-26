"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider@1.2.3";

import { cn } from "./utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(() => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(defaultValue)) return defaultValue;
    return [min];
  }, [value, defaultValue, min]);

  const fillPercent = React.useMemo(() => {
    const current = _values[0] ?? min;
    const clamped = Math.min(max, Math.max(min, current));
    if (max === min) return 0;
    return (clamped - min) / (max - min);
  }, [_values, min, max]);

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-gray-200 dark:bg-gray-700 border border-gray-300/70 dark:border-gray-600 relative grow overflow-hidden rounded-full h-4 w-full",
        )}
      >
        {_values.length <= 1 ? (
          <div
            data-slot="slider-fill"
            className="absolute inset-y-0 left-0 rounded-full bg-purple-600 dark:bg-purple-400"
            style={{ width: `${fillPercent * 100}%` }}
          />
        ) : (
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "bg-purple-600 dark:bg-purple-400 absolute inset-y-0 rounded-full",
            )}
          />
        )}
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="bg-purple-600 dark:bg-purple-400 ring-ring/50 block size-4 shrink-0 rounded-full shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
