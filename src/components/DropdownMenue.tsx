"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical} from 'lucide-react'; 
import { LogOut } from 'lucide-react';
import { Users } from 'lucide-react';
import AddGroupDialogue from "./AddGroupDialogue"
 
type Checked = DropdownMenuCheckboxItemProps["checked"]

export function DropdownMenue() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

 
 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><EllipsisVertical /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Create</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-3 w-fit">
          <div className="flex gap-2 ">
             
<AddGroupDialogue />
 
          </div>

   
      
 <div   className="flex gap-2 items-center">
  <Button className="flex" variant={'ghost'}>
<LogOut size={20}/> Logout

              </Button>
     </div>
     </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
