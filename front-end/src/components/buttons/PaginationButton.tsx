import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../shadcnComponents/button";

type PaginationButtonsProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export function PaginationButtons({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationButtonsProps) {
	return (
		<div className='flex justify-center items-center gap-4 mt-6 mb-10'>
			<Button
				variant='outline'
				onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
				disabled={currentPage === 1}
				className='px-1 py-1  disabled:opacity-50'>
				<ArrowLeft />
			</Button>

			<span className=''>
				Page {currentPage} / {totalPages}{" "}
			</span>

			<Button
				variant='outline'
				onClick={() =>
					onPageChange(Math.min(currentPage + 1, totalPages))
				}
				disabled={currentPage === totalPages}
				className='px-1 py-1 disabled:opacity-50'>
				<ArrowRight />
			</Button>
		</div>
	);
}
