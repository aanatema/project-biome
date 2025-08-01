"use client";

import * as React from "react";

import { cn } from "@/libraries/tailwind";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/shadcnComponents/navigation-menu";
import { Link } from "react-router";

export default function Navbar() {
	return (
		<NavigationMenu className='sticky top-0 pt-2 pb-2 shadow-sm bg-background'>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link to='/'>
						<NavigationMenuLink
							className={navigationMenuTriggerStyle()}>
							Homepage
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link to='/new-book'>
						<NavigationMenuLink
							className={navigationMenuTriggerStyle()}>
							Add a book
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link to='/account'>
						<NavigationMenuLink
							className={navigationMenuTriggerStyle()}>
							Account
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}>
					<div className='text-sm font-medium leading-none'>
						{title}
					</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
