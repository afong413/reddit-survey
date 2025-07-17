"use client"

import { Root as LabelPrimitive } from "@radix-ui/react-label"
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react"

import { cva, type VariantProps } from "cva"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

const Label = forwardRef<
  ComponentRef<typeof LabelPrimitive>,
  ComponentPropsWithoutRef<typeof LabelPrimitive> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.displayName

export { Label }
