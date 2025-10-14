import { Trash } from "lucide-react";
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
import { useState } from "react";
import { bookApi } from "../../libraries/axios";
import { toast } from "sonner";
import axios from "axios";

type DeleteReviewProps = {
	reviewId: string;
	onReviewDeleted: (reviewId: string) => void;
};

export default function DeleteReview({
	reviewId,
	onReviewDeleted,
}: DeleteReviewProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			await bookApi.delete(`/reviews/${reviewId}`);
			setIsOpen(false);
			onReviewDeleted(reviewId);
			toast.success("Your review has been successfully deleted", {
				duration: 4000,
			});
		} catch (error) {
			console.error("Error during deletion", error);

			// Clearer axios error codes
			if (axios.isAxiosError(error)) {
				const status = error.response?.status;

				if (status === 401) {
					toast.error(
						"You are not authorized to delete this review",
						{ duration: 4000 }
					);
				} else if (status === 404) {
					toast.error(
						"Review has either not been found or you are unauthorized",
						{ duration: 4000 }
					);
				} else {
					toast.error(
						"Error during deletion, please try again later",
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
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant='ghost'
					size='sm'>
					<Trash className='h-4 w-4' />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>
						This action is permanent. Once the review has been
						deleted you will no longer be able to retrieve it.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<div className='grid w-full grid-cols-2 gap-4 mt-5'>
						<DialogClose
							className={buttonVariants({ variant: "outline" })}
							disabled={isDeleting}>
							Cancel
						</DialogClose>
						<Button
							variant='destructive'
							onClick={handleDelete}
							disabled={isDeleting}>
							{isDeleting ? "Deleting..." : "Confirm"}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
