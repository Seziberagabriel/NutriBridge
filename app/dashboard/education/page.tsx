import { Suspense } from 'react'
import { EducationHubClient } from './client'
import EducationLoading from './loading'

export default function EducationHubPage() {
  return (
    <Suspense fallback={<EducationLoading />}>
      <EducationHubClient />
    </Suspense>
  )
}
