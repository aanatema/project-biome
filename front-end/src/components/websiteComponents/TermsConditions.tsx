import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shadcnComponents/accordion";

export function TermsConditions() {
	return (
		<Accordion
			type='single'
			collapsible
			className='w-full bg-background text-foreground '
			defaultValue='item-1'>
			<AccordionItem value='item-1 '>
				<AccordionTrigger>REGISTRATION CONDITIONS</AccordionTrigger>
				<AccordionContent className='flex flex-col gap-4 text-balance'>
					<ul className=' pl-6 pb-4 pt-4'>
						<li>
							Users must be at least 15 years old in France (or
							the required age in their country).
						</li>
						<li>
							Registration requires a valid email address and a
							secure password.
						</li>
						<li>
							Users are responsible for keeping their login
							credentials confidential.
						</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionTrigger>PERSONNAL DATA</AccordionTrigger>
				<AccordionContent className='flex flex-col gap-4 text-balance'>
					<ul className=' pl-6 pb-4 pt-4'>
						<li>
							Only limited data is collected such as email,
							username, written reviews, and added books.
						</li>
						<li>
							No sensitive information (e.g. address, credit card)
							is collected.
						</li>
						<li>
							Data is securely stored (e.g. passwords are hashed).
						</li>
						<li>
							Cookies may be used to manage user sessions
							(authentication).
						</li>
						<li>
							Users can request the deletion of their account and
							personal data at any time.
						</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-3'>
				<AccordionTrigger>USER-GENERATED CONTENT</AccordionTrigger>
				<AccordionContent className='flex flex-col gap-4 text-balance'>
					<ul className=' pl-6 pb-4 pt-4'>
						<li>
							Users agree to publish respectful content (no hate
							speech, defamation, or inappropriate language).
						</li>
						<li>
							Biome reserves the right to moderate or remove any
							content deemed inappropriate.
						</li>
						<li>
							Users retain rights to their reviews but grant Biome
							the right to publicly display them on the platform.
						</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-4'>
				<AccordionTrigger>USE OF SERVICES</AccordionTrigger>
				<AccordionContent className='flex flex-col gap-4 text-balance'>
					<ul className=' pl-6 pb-4 pt-4'>
						<li>
							Users must not disrupt the platform’s operation in
							any way.
						</li>
						<li> Access to Biome is free of charge.</li>
						<li>
							The application can be updated or modified without
							prior notice
						</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-5'>
				<AccordionTrigger>INTELLECTUAL PROPERTY</AccordionTrigger>
				<AccordionContent className='flex flex-col gap-4 text-balance'>
					<ul className=' pl-6 pb-4 pt-4'>
						<li>
							The design, logo, source code, and core features of
							the app are the property of the creator, Romane
							Boireau.
						</li>
						<li>
							Any unauthorized reproduction or use is prohibited.
						</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-6'>
				<AccordionTrigger>CHANGES IN TERMS</AccordionTrigger>
				<AccordionContent className='flex flex-col gap-4 text-balance'>
					<ul className=' pl-6 pb-4 pt-4'>
						<li>
							These terms can be updated or modified at any time.
						</li>
						<li>
							Users will recieve notice of signifiant changes.
						</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-7'>
				<AccordionTrigger>CONTACT</AccordionTrigger>
				<AccordionContent className='flex flex-col gap-4 text-balance'>
					<ul className=' pl-6 pb-4 pt-4'>
						<li>
							For any question about these terms or this project,
							feel free to contact me at project-biome@gmail.com
						</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
