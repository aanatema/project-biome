// username
// add book

import NavigationMenuDemo from "@/components/websiteComponents/Navbar";
import { ModifyUserForm } from "@/forms/ModifyUserForm";
import { TermsConditions } from "@/components/websiteComponents/TermsConditions";
import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
} from "@/components/shadcnComponents/card";
import { LegalMentions } from "@/components/websiteComponents/LegalMentions";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

// list of all books linked to this account
export default function AccountPage() {
	return (
		<>
			<NavigationMenuDemo />
			<div className='flex flex-col items-center justify-center'>
				<ModifyUserForm />
			</div>
			<Card className='mt-10'>
				<CardTitle>INFOS</CardTitle>
					<CardHeader>
						Here you can find information concerning the terms and conditions of use as well as the legal mentions of the Biome application.
					</CardHeader>
				<CardContent>
					<Accordion
						type='single'
						collapsible
						className='w-full bg-background text-foreground '
						defaultValue='item-1'>
              <AccordionItem value='item-1 '>
							<AccordionTrigger className="font-bold">TERMS AND CONDITIONS </AccordionTrigger>
							<AccordionContent className='flex flex-col gap-4 text-balance'>
								<TermsConditions/>
							</AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2 '>
							<AccordionTrigger className="font-bold"> LEGAL MENTIONS</AccordionTrigger>
							<AccordionContent className='flex flex-col gap-4 text-balance'>
								<LegalMentions/>
							</AccordionContent>
            </AccordionItem>
					</Accordion>
				</CardContent>
			</Card>
		</>
	);
}
