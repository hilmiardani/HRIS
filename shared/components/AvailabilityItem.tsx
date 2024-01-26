"use client"

import React from 'react'
import { AvailabilityMatrix } from '../@types'
import { Tooltip } from '@mantine/core'

interface AvailabilityItemProps {
  availability: AvailabilityMatrix
  diffDay: number
  monthly?: boolean
}

export const AvailabilityItem = ({ availability, diffDay, monthly }: AvailabilityItemProps) => (
  <Tooltip label={`${availability.customer != undefined ? availability.customer.name : ""} ${availability.checkInDate} ${availability.checkOutDate} ${availability.units[0].name}`} multiline withArrow w={300}>
    <div className={`absolute top-1 left-4 ${monthly ? 'bg-red-500' : 'bg-white'} h-[14px] overflow-hidden border border-primary rounded`} style={{ width: `${diffDay > 0 ? (diffDay * 48) : (48 / 2)}px` }}>
      <div className="flex w-full">
        <span className="text-xs">
          {availability.customer != undefined ? availability.customer.name : ""}
        </span>
      </div>
    </div>
  </Tooltip>
)

export default AvailabilityItem
