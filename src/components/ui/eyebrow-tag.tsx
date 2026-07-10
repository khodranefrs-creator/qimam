interface EyebrowTagProps {
  label: string
  className?: string
}

export function EyebrowTag({ label, className = '' }: EyebrowTagProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <span className="w-8 h-px bg-accent-gold/60 shrink-0" />
      <span className="text-accent-gold text-sm font-medium uppercase tracking-[0.15em] whitespace-nowrap">
        {label}
      </span>
      <span className="w-8 h-px bg-accent-gold/60 shrink-0" />
    </div>
  )
}
