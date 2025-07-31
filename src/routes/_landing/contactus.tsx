import ContactUs from '@/components/website/ContactUs';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/contactus')({
  component: ContactUs,
});
