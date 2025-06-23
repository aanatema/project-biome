import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shadcnComponents/accordion";

export function LegalMentions() {
	return (
		<>
			<p>
				In accordance with the provisions of Law No. 2004-575 of 21 June
				2004 on confidence in the digital economy in France, users of
				the Biome website are informed of the identity of the various
				parties involved in its creation and monitoring.
			</p>
			<Accordion
				type='single'
				collapsible
				className='w-full bg-background text-foreground '
				defaultValue='item-1'>
				<AccordionItem value='item-1 '>
					<AccordionTrigger>WEBSITE EDITOR</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						<p>
							This website, accessible at the URL
							project-biome.fr, is published by : Romane Boireau,
							residing at 3 Bd de Stalingrad, 44000 Nantes, of
							French nationality (France).
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-2'>
					<AccordionTrigger>HOSTING</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						<p>
							The Site is hosted by OVH SAS, located at 2 rue
							Kellermann - BP 80157 - 59053 Roubaix Cedex 1,
							(telephone contact or email: 1007).
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-3'>
					<AccordionTrigger>DIRECTOR OF PUBLICATION</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						<p>
							The Site's Publication Director is Romane Boireau.
						</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-4'>
					<AccordionTrigger>CONTACT</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						<p>By email: project-biome@gmail.com</p>
						<p>By post: 3 Bd de Stalingrad, 44000 Nantes</p>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-5'>
					<AccordionTrigger>PERSONAL DATA</AccordionTrigger>
					<AccordionContent className='flex flex-col gap-4 text-balance'>
						<p>
							The processing of your personal data is governed by
							our Privacy Charter, available from the "Personal
							Data Protection Charter" section, in accordance with
							the General Data Protection Regulation 2016/679 of
							27 April 2016 ("GDPR").
						</p>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
}
