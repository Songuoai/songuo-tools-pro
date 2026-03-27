'use client'

import { adSlots, baiduUnionConfig } from '@/config/ads'

interface AdSlotProps {
  slotId: string
  className?: string
}

export default function AdSlot({ slotId, className = '' }: AdSlotProps) {
  const slot = adSlots.find(s => s.id === slotId)
  
  if (!slot) {
    return null
  }

  return (
    <div
      className={`bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}
      style={{
        minHeight: slot.size.desktop.includes('x') ? slot.size.desktop.split('x')[1] + 'px' : '250px',
      }}
    >
      <div className="text-center text-gray-400 p-4">
        <div className="text-sm font-semibold mb-1">广告位</div>
        <div className="text-xs">{slot.name}</div>
        <div className="text-xs mt-2 text-gray-300">百度联盟广告（上线后显示）</div>
      </div>
    </div>
  )
}
