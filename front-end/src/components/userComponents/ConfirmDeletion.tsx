import { useAuth } from "@/hooks/useAuth";
import { userApi } from "@/libraries/axios";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button, buttonVariants } from "../shadcnComponents/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../shadcnComponents/dialog";

export function ConfirmDeletionDialog() {
	const [isDeleting, setIsDeleting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleDeleteAccount = async () => {
		setIsDeleting(true);

		try {
			await userApi.delete("/delete_user");

			// close dialog
			setIsOpen(false);
			toast.success("Account deleted successfully", { duration: 4000 });

			// clean auth context
			logout();
			navigate("/not-connected", { replace: true });
		} catch (error) {
			console.error("Error during account deletion:", error);

			if (axios.isAxiosError(error)) {
				const status = error.response?.status;

				if (status === 401) {
					toast.error(
						"You must be logged in to delete your account",
						{
							duration: 4000,
						}
					);
				} else if (status === 404) {
					toast.error("User account not found", { duration: 4000 });
				} else {
					toast.error(
						"Error during account deletion, please try again later",
						{ duration: 4000 }
					);
				}
			} else {
				toast.error("Network error, please check your connection", {
					duration: 4000,
				});
			}
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className='mt-10'>
			<Dialog
				open={isOpen}
				onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button variant='destructive'>Delete account</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle className='text-center'>
							Are you sure?
						</DialogTitle>
						<DialogDescription className='mt-5 mb-5'>
							<p>
								This action is permanent and cannot be undone.
							</p>
							<div className='pt-4'>
								<p className='font-semibold'>
									This will permanently delete:
									<ul className='font-normal text-sm mt-1 ml-4 list-disc'>
										<li>Your user account</li>
										<li>All your reviews</li>
										<li>All associated data</li>
									</ul>
								</p>
							</div>
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<div className='grid w-full grid-cols-2 gap-4'>
							<DialogClose
								className={buttonVariants({
									variant: "outline",
								})}
								disabled={isDeleting}
								type='button'>
								Cancel
							</DialogClose>
							<Button
								variant='destructive'
								onClick={handleDeleteAccount}
								disabled={isDeleting}>
								{isDeleting ? "Deleting..." : "Delete Forever"}
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
