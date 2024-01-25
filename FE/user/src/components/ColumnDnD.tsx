import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

interface ColumnDnDProps {
  isOver: boolean
}

export function ColumnDnD({ isOver, children }: ColumnDnDProps & PropsWithChildren) {
  return <Box bgcolor={isOver ? 'secondary.200' : ''}>{children}</Box>
}
