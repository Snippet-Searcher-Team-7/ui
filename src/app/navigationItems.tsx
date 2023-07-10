'use client'

import {FC, useCallback} from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home'
import {useRouter} from 'next/navigation'

export const SidebarItems: FC = () => {
  const router = useRouter()

  const handleSnippetsClick = useCallback(() => router.push('/snippets'), [router])

  const handleSettingsClick = useCallback(() => router.push('/settings'), [router])

    const handleHomeClick = useCallback(() => router.push('/'), [router])

  return (
    <>
        <ListItemButton onClick={handleHomeClick}>
            <ListItemIcon>
                <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
        </ListItemButton>
      <ListItemButton onClick={handleSnippetsClick}>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <ListItemText primary="Snippets"/>
      </ListItemButton>
      <ListItemButton onClick={handleSettingsClick}>
        <ListItemIcon>
          <SettingsIcon/>
        </ListItemIcon>
        <ListItemText primary="Settings"/>
      </ListItemButton>
    </>
  )
}
