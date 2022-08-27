import {
  RiHome5Fill,
  RiHome5Line,
  RiSettings4Fill,
  RiSettings4Line,
  RiUserFill,
  RiUserLine,
  RiWallet3Fill,
  RiWallet3Line,
} from "react-icons/ri";
import { IoHeadsetOutline, IoHeadsetSharp } from "react-icons/io5";

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const accountMenuOptions = [
  {
    name: "Activity",
    href: "/account",
    lineIcon: RiHome5Line,
    filledIcon: RiHome5Fill,
  },
  {
    name: "My team",
    href: "/account/team",
    lineIcon: RiUserLine,
    filledIcon: RiUserFill,
  },
  {
    name: "Subscription",
    href: "/account/subscription",
    lineIcon: RiWallet3Line,
    filledIcon: RiWallet3Fill,
  },
  {
    name: "Settings",
    href: "/account/settings",
    lineIcon: RiSettings4Line,
    filledIcon: RiSettings4Fill,
  },

  {
    name: "Support",
    href: "/account/support",
    lineIcon: IoHeadsetOutline,
    filledIcon: IoHeadsetSharp,
  },
];

export const exploreMenuOptions = [
  {
    name: "Account",
    href: "/account",
    isProtected: true,
  },
  {
    name: "Explore spaces",
    href: "/",
    isProtected: false,
  },
  {
    name: "For teams",
    href: "https://www.trybase.co/for-team",
    isProtected: false,
  },
  {
    name: "Check in to a space",
    href: "/check-in",
    isProtected: false,
  },

  {
    name: "Support",
    href: "/account/support",
    isProtected: true,
  },
];
