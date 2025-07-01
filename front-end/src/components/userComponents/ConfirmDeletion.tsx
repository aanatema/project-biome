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
import { AuthContext } from "@/context/AuthContext";
import { authApi, userApi } from "@/libraries/axios";
import { DialogClose } from "@radix-ui/react-dialog";
import { useContext } from "react";
import { toast } from "sonner";

export function ConfirmDeletionDialog() {
	const auth = useContext(AuthContext);

	const handleDelete = async () => {
		if (!auth) return;

		try {
			const refreshRes = await authApi.post("/refresh");
			const accessToken = refreshRes.data.token;

			await userApi.delete("/delete_user", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			auth.logout();
			toast.success("Your account has been successfully deleted");
		} catch (err) {
			console.error("Error while deleting account", err);
			toast.error("Fail for account deletion");
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive'>Delete account</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Are you sure ?</DialogTitle>
					<DialogDescription>
						This action is permanent. All of your data will be
						deleted and cannot be retrieved.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<div className='grid w-full grid-cols-2 gap-4 mt-5'>
						<DialogClose
							className={buttonVariants({ variant: "default" })}>
							Cancel
						</DialogClose>
						<Button
							variant='destructive'
							type='submit'
							onClick={handleDelete}>
							Confirm
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
