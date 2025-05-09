import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export function ConfirmDeletionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete account</Button>
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
          <div className="grid w-full grid-cols-2 gap-6 m-5">
            <DialogClose className={buttonVariants({ variant: "default" })}>Cancel</DialogClose>
            <Button variant="outline" type="submit">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
