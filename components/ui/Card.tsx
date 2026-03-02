import React from 'react'

export interface CardProps {
  variant?: 'default' | 'glass'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
}

const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'card',
  glass: 'card-glass',
}

const paddingClasses: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  as: Tag = 'div',
}: CardProps): React.JSX.Element {
  const classes = [
    variantClasses[variant],
    paddingClasses[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}
