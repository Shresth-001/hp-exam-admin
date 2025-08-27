'use client';

// import {
//   UserGroupIcon,
//   HomeIcon,
//   DocumentDuplicateIcon,
// } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard' },
  {
    name: 'Candidates',
    href: '/dashboard/candidates',
    // icon: DocumentDuplicateIcon,
  },
  { name: 'Questions', href: '/dashboard/questions' },
];

export default function NavLinks() {
  const pathname=usePathname();
  // console.log(pathname)
  return (
    <>
      {links.map((link) => {
        // const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:from-[#ff5e7b] hover:to-[#ff9b7c] hover:shadow-lg hover:shadow-pink-400/50 transition-all duration-300 hover:text-[#ff3c59] md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gradient-to-r from-[#ff3c57] to-[#ff7861] text-white hover:text-black':pathname===link.href
              }
            )}
            // className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'
          >
            {/* <LinkIcon className="w-6" /> */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
