import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as FiStar from 'react-icons/fi';
import { IoPersonAdd } from "react-icons/io5";
import { RiInboxArchiveFill} from "react-icons/ri";
import { GiReceiveMoney} from "react-icons/gi";

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Category',
    path: '/Category',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
  },
    
  {
    title: 'Create Table',
    path: '/CreateTable',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
  },

  {
    title: 'Orders',
    path: '/Order',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'View Manager',
    path: '/ViewManager',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'View Cook',
    path: '/ViewCook',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'View Waiter',
    path: '/ViewWaiter',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'View User',
    path: '/ViewUser',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },

  {
    title: 'Ratings',
    path: '/Ratings',
    icon: <FiStar.FiStar/>,
    cName: 'nav-text'
  },

  {
    title: 'Add Staff',
    path: '/AddStaff',
    icon: <IoPersonAdd/>,
    cName: 'nav-text'
  },

  {
    title: 'Complaints',
    path: '/Complaints',
    icon: <RiInboxArchiveFill/>,
    cName: 'nav-text'
  },

  {
    title: 'Revenue',
    path: '/Revenue',
    icon: <GiReceiveMoney/>,
    cName: 'nav-text'
  },
]