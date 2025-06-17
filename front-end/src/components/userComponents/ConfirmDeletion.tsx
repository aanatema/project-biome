import { Button, buttonVariants } from "@/components/shadcnComponents/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcnComponents/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export function ConfirmDeletionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure ?</DialogTitle>
          <DialogDescription>
            This action is permanent. All of your data will be deleted and
            cannot be retrieved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="grid w-full grid-cols-2 gap-6 mt-5">
            <DialogClose className={buttonVariants({ variant: "default" })}>Cancel</DialogClose>
            <Button variant="destructive" type="submit">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
