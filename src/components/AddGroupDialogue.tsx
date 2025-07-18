"use client"

import { addGroupAction } from "@/actions/serverActions"
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
import { toast } from "sonner"
import { UserPlus } from "lucide-react"
import { useActionState, useTransition } from "react"
import { useEffect, useState } from "react"

const initialState = {
  message: "",
  error: ""
}

const AddGroupDialogue = () => {
  const [emails, setEmails] = useState<string[]>([""])
  const [state, formAction] = useActionState(addGroupAction, initialState)
  const [isPending] = useTransition()

  useEffect(() => {
    if (state?.message) toast.success(state.message)
    if (state?.error) toast.error(state.error)
  }, [state])

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails]
    newEmails[index] = value
    setEmails(newEmails)
  }

  const addEmailField = () => setEmails([...emails, ""])
  const removeEmailField = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index)
    setEmails(newEmails.length ? newEmails : [""])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
       <Button className="flex" variant={'ghost'}>
          <UserPlus size={20}/>  <h1>Create a Group</h1>
    </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Create Group Chat</DialogTitle>
            <DialogDescription>Add members by their emails.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Group Name</Label>
              <Input id="name" name="name" placeholder="e.g. Study Buddies" required />
            </div>

            {emails.map((email, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  type="email"
                  name="emails"
                  placeholder="user@example.com"
                  value={email}
                  required
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeEmailField(index)}
                >
                  X
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={addEmailField}
              className="w-fit"
            >
              + Add Another
            </Button>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              Create Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddGroupDialogue
