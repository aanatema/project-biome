import { Button } from "@/components/shadcnComponents/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../shadcnComponents/dropdown-menu";
import { useAuth } from "@/Hooks/useAuth";

export function ProfileButton() {
    const {logout} = useAuth();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>Profile</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-40'
				align='end'>
				<DropdownMenuItem>
					<a href='/modify-account'>Update profile</a>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
