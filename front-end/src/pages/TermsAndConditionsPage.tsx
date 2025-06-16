import { LegalMentions } from "@/components/websiteComponents/LegalMentions";
import NavigationMenuDemo from "@/components/websiteComponents/Navbar";
import { TermsConditions } from "@/components/websiteComponents/TermsConditions";

export default function TermsAndConditionsPage() {
  return (
    <>
      <NavigationMenuDemo />
      <TermsConditions />
      <LegalMentions/>
    </>
  );
}