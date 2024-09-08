// import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WalletIcon from '@mui/icons-material/Wallet';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarLink = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/home",
    },
    {
        title: "Mail",
        icon: <EmailIcon />,
        link: "/mail",
    },
    {
        title: "Analytics",
        icon: <EqualizerIcon />,
        link: "/analytics",
    },
    {
        title: "Add Friends",
        icon: <PersonAddIcon />,
        link: "/add-friends",
    },
    {
        title: "Payment",
        icon: <WalletIcon />,
        link: "/payment",
    },
    {
        title: "Upload",
        icon: <CloudUploadIcon />,
        link: "/upload",
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/settings",
    }
]