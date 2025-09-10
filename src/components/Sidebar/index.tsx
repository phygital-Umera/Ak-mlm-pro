import React, {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from '@tanstack/react-router';
import SidebarLinkGroup from './SidebarLinkGroup';
import {SidebarProps} from '@/types';
import {
  PiEnvelopeSimpleLight,
  PiFileTextLight,
  PiNavigationArrowFill,
  PiShareLight,
  PiSquaresFourLight,
} from 'react-icons/pi';
import {FaArrowLeftLong, FaUnderline} from 'react-icons/fa6';
import {IoIosArrowDown} from 'react-icons/io';
import {NetworkIcon, ProfileIcon, RegistrationIcon, ReportIcon} from '@/icons';
import {useAuthContext} from '@/context/AuthContext';
import {BiAward, BiListUl, BiRupee} from 'react-icons/bi';
import {MdApproval} from 'react-icons/md';
import {FaHistory, FaNetworkWired} from 'react-icons/fa';
import {GiTargetPoster} from 'react-icons/gi';
import {LuAlignVerticalDistributeEnd} from 'react-icons/lu';
import Logo from '../../../public/tmslogo.png';
import {TbBinaryTree2Filled} from 'react-icons/tb';
const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
  const {user} = useAuthContext();

  const role = user?.role;

  const sidebarRoutes =
    role === 'ADMIN'
      ? [
          {
            label: 'Dashboard',
            path: '/dashboard',
            icon: <PiSquaresFourLight size={22} />,
          },
          // {
          //   label: 'Laverage Tree',
          //   path: '/admin/autopool',
          //   icon: <NetworkIcon size={22} />,
          // },
          {
            label: 'Binary Tree',
            path: '/admin/binarytree',
            icon: <NetworkIcon size={22} />,
          },
          {
            label: 'Generation Tree',
            path: '/admin/network',
            icon: <FaNetworkWired size={22} />,
          },
          // {
          //   label: 'Registeration',
          //   path: '/admin/customerregister',
          //   icon: <RegistrationIcon size={22} />,
          // },

          {
            label: 'Customer List',
            path: '/admin/customerlist',
            icon: <BiListUl size={22} />,
          },
          {
            label: 'Epin Request',
            path: '/admin/epinrequest',
            icon: <MdApproval size={22} />,
          },
          {
            label: 'Topup',
            path: '/admin/topup',
            icon: <MdApproval size={22} />,
          },
          {
            label: 'Recall E-pin',
            path: '/admin/recallepin',
            icon: <MdApproval size={22} />,
          },
          {
            label: 'Share Link',
            path: '/admin/sharelink',
            icon: <PiShareLight size={22} />,
          },
          {
            label: 'Product Report',
            path: '/admin/productreport',
            icon: <PiShareLight size={22} />,
          },
          {
            label: 'Delivered Products',
            path: '/admin/deliverdproducts',
            icon: <PiShareLight size={22} />,
          },
          {
            label: 'Level Income',
            path: '/admin/roi',
            icon: <PiShareLight size={22} />,
          },
          {
            label: 'My Invoice',
            path: '/admin/invoice',
            icon: <PiFileTextLight size={22} />,
          },
          {
            label: 'Welcome Letter',
            path: '/admin/wlcmletter',
            icon: <PiEnvelopeSimpleLight size={22} />,
          },
          // {
          //   label: 'Wallet Report',
          //   path: '/admin/wallethistory',
          //   icon: <FaHistory size={20} />,
          // },

          // {
          //   label: 'Sales Report',
          //   path: '/admin/productsalesreport',
          //   icon: <ReportIcon size={22} />,
          // },
          // {
          //   label: 'Bussiness Development Fund',
          //   path: '/admin/retirement',
          //   icon: <FaUnderline size={22} />,
          // },
          // {
          //   label: 'Gold Reward',
          //   path: '/admin/gold',
          //   icon: <GiOldKing size={22} />,
          // },
          // {
          //   label: 'Award Reward',
          //   path: '/admin/awardreward',
          //   icon: <BiAward size={22} />,
          // },
          // {
          //   label: 'Leadership Fund',
          //   path: '/admin/leadership',
          //   icon: <LuAlignVerticalDistributeEnd size={22} />,
          // },
          // {
          //   label: 'Repurchase Report',
          //   path: '/admin/repurchaseproduct',
          //   icon: <BiRupee size={22} />,
          // },
          // {
          //   label: 'Banner',
          //   path: '/admin/banner',
          //   icon: <GiTargetPoster size={22} />,
          // },
          {
            label: 'Payout',
            path: '/admin/commisionreport',
            icon: <BiRupee size={22} />,
            subRoutes: [
              {
                label: 'Paid Commission ',
                path: '/admin/commisionreport',
              },
              {
                label: 'Pending Commission ',
                path: '/admin/pendingcommisionreport',
              },
              // {
              //   label: 'Flashout Commission ',
              //   path: '/admin/flashoutcommision',
              // },
            ],
          },

          {
            label: 'E-Pin',
            icon: <PiSquaresFourLight size={22} />,
            subRoutes: [
              {
                label: 'Admin E-Pin',
                path: '/admin/Epin',
              },
              {
                label: 'Customer E-Pin',
                path: '/admin/customerepin',
              },
            ],
          },
          // {
          //   label: 'Power Leg',
          //   path: '/admin/powerlegcustlist',
          //   icon: <TbBinaryTree2Filled size={22} />,
          // },
          // {
          //   label: 'Change Email',
          //   path: '/admin/editemail',
          //   icon: <MdEmail size={22} />,
          // },
        ]
      : // Customer
        role === 'CUSTOMER'
        ? [
            {
              label: 'Dashboard',
              path: '/customer/dashboard',
              icon: <PiSquaresFourLight size={22} />,
            },
            {
              label: 'Registeration',
              path: '/customer/customerregisterc',
              icon: <RegistrationIcon size={22} />,
            },
            {
              label: 'Customer Profile',
              path: '/customer/profile',
              icon: <ProfileIcon size={22} />,
            },
            {
              label: 'Binary Tree',
              path: '/admin/binarytree',
              icon: <NetworkIcon size={22} />,
            },
            // {
            //   label: 'Direct Customer',
            //   path: '/customer/directcustomer',
            //   icon: <NetworkIcon size={22} />,
            // },
            {
              label: 'Generation Tree',
              path: '/customer/gentree',
              icon: <FaNetworkWired size={22} />,
            },
            {
              label: 'Topup',
              path: '/customer/topup',
              icon: <PiSquaresFourLight size={22} />,
            },
            // {
            //   label: 'Award Reward',
            //   path: '/customer/awardreward',
            //   icon: <BiAward size={22} />,
            // },
            // {
            //   label: 'Report',
            //   path: '/customer/reportc',
            //   icon: <ReportIcon size={22} />,
            // },
            // {
            //   label: 'Lavrage',
            //   path: '/customer/helping',
            //   icon: <ReportIcon size={22} />,
            // },
            // {
            //   label: 'BDF',
            //   path: '/customer/royelty',
            //   icon: <PiSquaresFourLight size={22} />,
            // },
            {
              label: 'Share Link',
              path: '/customer/customersidesharelink',
              icon: <PiSquaresFourLight size={22} />,
            },
            {
              label: 'Wallet',
              path: '/customer/walletc',
              icon: <PiSquaresFourLight size={22} />,
            },
            {
              label: ' Payout History',
              path: '/customer/historypayout',
              icon: <PiSquaresFourLight size={22} />,
            },
            // {
            //   label: 'Withdraw Amount',
            //   path: '/customer/withdraw',
            //   icon: <PiSquaresFourLight size={22} />,
            // },
            // {
            //   label: 'Send Amount',
            //   path: '/customer/sendamount',
            //   icon: <PiSquaresFourLight size={22} />,
            // },
            {
              label: 'E-Pin',
              path: '/customer/epinc',
              icon: <PiNavigationArrowFill size={22} />,
            },
            // {
            //   label: 'Product E-Pin',
            //   path: '/customer/productepin',
            //   icon: <PiNavigationArrowFill size={22} />,
            // },
            // {
            //   label: 'Repurchase Product',
            //   path: '/customer/repurchaseproduct',
            //   icon: <MdOutlineProductionQuantityLimits size={22} />,
            // },
          ]
        : [];

  const location = useLocation();
  const {pathname} = location;

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );
  const handleLinkClick = () => {
    // Close the sidebar when a link is clicked
    setSidebarOpen(false);
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const {target} = event;

      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-1 pt-4">
        <Link
          to="/"
          className="bg-gray-300 hover:bg-gray-400 flex h-16 w-auto items-center justify-start space-x-4 rounded-full px-2 py-2 transition-all"
        >
          {/* <div className="flex h-15 w-20 items-center justify-center overflow-hidden rounded-full">
             <img
              src={Logo}
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </div> */}
          <div className="flex flex-col text-center">
            <h1 className="text-2xl font-semibold text-blue-500">SJC</h1>
            <p className="text-2xl font-semibold text-blue-500">GROUP</p>
          </div>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <FaArrowLeftLong className="fill-current" size={20} />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {sidebarRoutes.map((route, index) =>
                route.subRoutes ? (
                  <SidebarLinkGroup
                    key={index}
                    activeCondition={pathname.includes(route.path!)}
                  >
                    {(handleClick, open) => (
                      <>
                        <Link
                          to=""
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes(route.path!) &&
                            'bg-graydark dark:bg-meta-4'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          {route.icon}
                          {route.label}
                          <IoIosArrowDown
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            size={20}
                          />
                        </Link>
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            {route.subRoutes.map((subRoute, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subRoute.path}
                                  className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                  activeProps={{className: '!text-white'}}
                                  onClick={handleLinkClick} // Add click handler here
                                >
                                  {subRoute.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </SidebarLinkGroup>
                ) : (
                  <li key={index}>
                    <Link
                      to={route.path}
                      className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes(route.path) &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                      onClick={handleLinkClick} // Add click handler here
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
