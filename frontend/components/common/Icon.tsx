'use client'

import { useDesignStore } from '@/stores/designStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  lucideRegistry,
  faRegistry,
  faRegularRegistry,
  materialRegistry,
  type IconName,
} from '@/lib/iconRegistry'

export type { IconName }

interface IconProps {
  name: IconName
  size?: number
  className?: string
  style?: React.CSSProperties
  filled?: boolean
}

export function Icon({ name, size = 16, className, style, filled }: IconProps) {
  const { system } = useDesignStore()
  const { provider, strokeWidth, sizeScale, style: iconStyle } = system.icons
  const scaledSize = size * sizeScale

  if (provider === 'lucide') {
    const LucideIcon = lucideRegistry[name]
    if (!LucideIcon) return null
    const isFilled = filled !== undefined ? filled : iconStyle === 'filled'
    return (
      <LucideIcon
        style={{
          width: `${scaledSize}px`,
          height: `${scaledSize}px`,
          strokeWidth,
          flexShrink: 0,
          ...style,
        }}
        className={className}
        fill={isFilled ? 'currentColor' : 'none'}
      />
    )
  }

  if (provider === 'fontawesome') {
    const isFilled = filled !== undefined ? filled : iconStyle === 'filled'
    const faIcon = (!isFilled && faRegularRegistry[name]) ? faRegularRegistry[name]! : faRegistry[name]
    if (!faIcon) return null
    return (
      <FontAwesomeIcon
        icon={faIcon}
        style={{
          width: `${scaledSize}px`,
          height: `${scaledSize}px`,
          flexShrink: 0,
          ...style,
        }}
        className={className}
      />
    )
  }

  if (provider === 'material') {
    const matName = materialRegistry[name]
    if (!matName) return null
    const isFilled = filled !== undefined ? filled : iconStyle === 'filled'
    const wght = Math.round((strokeWidth - 1) * 250 + 200)
    return (
      <span
        className={`material-symbols-outlined${className ? ` ${className}` : ''}`}
        style={{
          fontSize: `${scaledSize}px`,
          lineHeight: 1,
          display: 'inline-flex',
          alignItems: 'center',
          flexShrink: 0,
          userSelect: 'none',
          fontVariationSettings: `'FILL' ${isFilled ? 1 : 0}, 'wght' ${wght}, 'GRAD' 0, 'opsz' 24`,
          ...style,
        }}
      >
        {matName}
      </span>
    )
  }

  return null
}
