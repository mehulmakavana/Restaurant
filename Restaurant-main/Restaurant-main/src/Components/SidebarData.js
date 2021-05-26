import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import {AiFillStar} from "react-icons/ai";
import { IoPersonAdd } from "react-icons/io5";
import { RiInboxArchiveFill } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import * as RiIcons from 'react-icons/ri';
import { RiTableFill } from "react-icons/ri";


export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Category",
    path: "/Category",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },

  {
    title: "Ingredients",
    path: "/Ingredients",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },

  {
    title: "Create Table",
    path: "/CreateTable",
    icon: <RiTableFill />,
    cName: "nav-text",
  },

  {
    title: "Table Wise Order",
    path: "/TableOrder",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },

  {
    title: "Restaurants Offer",
    path: "/Offer",
    icon: <GiReceiveMoney />,
    cName: "nav-text",
  },

  {
    title: "Orders History",
    path: "/OrdersHistory",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Staff Details",
    path: "/ViewManager",
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    cName: "nav-text",

    subNav: [
      {
        title: "View Manager",
        path: "/ViewManager/ViewManager",
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
      },
      {
        title: "View Cook",
        path: "/ViewManager/ViewCook",
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
      },
      {
        title: "View Waiter",
        path: "/ViewManager/ViewWaiter",
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
      },
      {
        title: "View User",
        path: "/ViewManager/ViewUser",
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
      },
    ],
  },

  {
    title: "Ratings",
    path: "/Ratings",
    icon: <AiFillStar />,
    cName: "nav-text",
  },

  {
    title: "Add Staff",
    path: "/AddStaff",
    icon: <IoPersonAdd />,
    cName: "nav-text",
  },

  {
    title: "Complaints",
    path: "/Complaints",
    icon: <RiInboxArchiveFill />,
    cName: "nav-text",
  },

  {
    title: "Payments",
    path: "/Payment",
    icon: <RiInboxArchiveFill />,
    cName: "nav-text",
  },

  {
    title: "Revenue",
    path: "/Revenue",
    icon: <GiReceiveMoney />,
    cName: "nav-text",
  },

  {
    title: "Restaurants Details",
    path: "/RDetails",
    icon: <GiReceiveMoney />,
    cName: "nav-text",
  },
];
