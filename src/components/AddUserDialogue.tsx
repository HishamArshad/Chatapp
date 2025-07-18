"use client"

import { addUserAction } from "@/actions/serverActions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffectOnce } from "@legendapp/state/react"
import { UserPlus } from "lucide-react"
import { useActionState, useTransition } from "react"
import { toast } from "sonner"
import { CustomTooltip } from "@/components/Tooltip";
const initialState = {
  message: "",
  error: ""
}

const AddUserDialogue = () => {
  const [state, formAction] = useActionState(addUserAction, initialState)
  const [isPending] = useTransition()
useEffectOnce(() => {
    if (state?.message) {
      toast.success(state.message)
    }
    if (state?.error) {
      toast.error(state.error)
    }
}, [state])
  return (
    <Dialog>
      
        <DialogTrigger asChild>
                  {/* <CustomTooltip content={<p>Add New User</p>}>   */}
                        
                  <Button variant="outline">
            <UserPlus />
          </Button>
                     {/* </CustomTooltip>  
           */}
        </DialogTrigger>
     
        <DialogContent className="sm:max-w-[425px]">
               <form action={formAction}>
          <DialogHeader>
            <div className="flex gap-5 items-center">
            <DialogTitle>Add User </DialogTitle> {state?.error && <p className="text-red-600">{state.error}</p>}
            </div>
            <DialogDescription>
              {state?.message && <p className="text-green-600">{state.message}</p>}
              
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mb-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" placeholder="m@gmail.com" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
        
            </DialogClose>
              <Button type="submit" disabled={isPending}>
              Add User
            </Button>
          </DialogFooter>
         
              
      </form>
        </DialogContent>
    
    </Dialog>
  )
}

export default AddUserDialogue
