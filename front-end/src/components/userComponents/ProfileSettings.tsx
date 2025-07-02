import { Button } from "@/components/shadcnComponents/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../shadcnComponents/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";

export function ProfileButton() {
	const { logout } = useAuth();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>Profile</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-40'
				align='end'>
				<Link to={`/modify-account`}>
					<DropdownMenuItem>Update profile</DropdownMenuItem>
				</Link>
				<Link to={`/disconnected`}>
					<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
