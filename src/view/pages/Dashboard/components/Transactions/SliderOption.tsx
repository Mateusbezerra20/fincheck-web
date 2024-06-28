import { useSwiper } from "swiper/react";
import { cn } from "../../../../../utils/cn";

interface SliderOptionProps {
  isActive: boolean;
  month: string;
  index: number;
}

export function SliderOption({ isActive, month, index } : SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      className={cn(
        "w-full rounded-full h-12 text-gray-800 text-sm font-medium tracking-[-0.5px]",
        isActive && "bg-white",
      )}
      onClick={() => swiper.slideTo(index)}
    >
      { month }
    </button>
  )
}