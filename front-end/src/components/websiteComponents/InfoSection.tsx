import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../shadcnComponents/accordion";
import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
} from "../shadcnComponents/card";
import { LegalMentions } from "./LegalMentions";
import { TermsConditions } from "./TermsConditions";

export default function InfoSection() {
	return (
		<Card className='mt-10 mb-10 w-140'>
			<CardTitle>INFOS</CardTitle>
			<CardHeader>
				Here you can find information concerning txhe terms and
				conditions of use as well as the legal mentions of the Biome
				application.
			</CardHeader>
			<CardContent>
				<Accordion
					type='single'
					collapsible
					className='w-full bg-background text-foreground '
					defaultValue='item-1'>
					<AccordionItem value='item-1 '>
						<AccordionTrigger className='font-bold '>
							TERMS AND CONDITIONS{" "}
						</AccordionTrigger>
						<AccordionContent className='flex flex-col gap-4 text-balance'>
							<TermsConditions />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-2 '>
						<AccordionTrigger className='font-bold'>
							{" "}
							LEGAL MENTIONS
						</AccordionTrigger>
						<AccordionContent className='flex flex-col gap-4 text-balance'>
							<LegalMentions />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	);
}
