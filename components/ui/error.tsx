import { AlertTriangle } from "lucide-react"

interface ErrorProps {
  message?: string
}

export function Error({ message = "Er is een fout opgetreden" }: ErrorProps) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-600">
      <AlertTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}

export function ErrorBoundary({ error, children }: { error?: Error | null, children: React.ReactNode }) {
  if (error) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Error message={error.message} />
      </div>
    )
  }

  return <>{children}</>
} 