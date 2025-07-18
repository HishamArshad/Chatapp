import { ReactNode } from "react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomTooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export function CustomTooltip({ content, children }: CustomTooltipProps) {
  return (
    <UITooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {content}
      </TooltipContent>
    </UITooltip>
  );
}
