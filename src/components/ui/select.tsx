import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value

export const SelectTrigger = ({ className, children, ...props }: SelectPrimitive.SelectTriggerProps) => (
  <SelectPrimitive.Trigger className={cn('flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-sm', className)} {...props}>
    {children}
    <SelectPrimitive.Icon><ChevronDown className="h-4 w-4 text-slate-500" /></SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)

export const SelectContent = ({ className, ...props }: SelectPrimitive.SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content className={cn('z-50 min-w-[8rem] rounded-lg border border-slate-200 bg-white p-1 shadow-md', className)} {...props}>
      <SelectPrimitive.Viewport>{props.children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)

export const SelectItem = ({ className, children, ...props }: SelectPrimitive.SelectItemProps) => (
  <SelectPrimitive.Item className={cn('relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-slate-100', className)} {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"><SelectPrimitive.ItemIndicator><Check className="h-4 w-4" /></SelectPrimitive.ItemIndicator></span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)
