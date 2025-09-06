import RegistrationForm from '@/components/Registration/Registrationlanding'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/admin/registrationlanding')({
  component: RegistrationForm,
})
