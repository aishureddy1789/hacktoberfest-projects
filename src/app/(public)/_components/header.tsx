import Link from 'next/link';

import { IoLogoGithub } from 'react-icons/io';
import { BsPeopleFill } from 'react-icons/bs';

import { SearchForm } from './search-form';
import { auth } from '@/auth';
import { signInAction, signOutAction } from '../../actions';
import { LogoIconsSvg } from '@/components/Icons';
import { Button } from './button';
import { MobileMenu } from './mobile-menu';

export async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-3 px-4 sm:px-6">
      <div className="border border-hacktoberfest-light-blue rounded-lg py-4 px-4 sm:px-6 container mx-auto backdrop-blur-md shadow-lg">
        <div className="flex justify-between items-center">
          <Link href="/" className="z-5">
            <LogoIconsSvg />
          </Link>

          {/* Desktop Search - Hidden on mobile */}
          <div className="hidden md:block">
            <SearchForm />
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex gap-2 lg:ml-40">
            <form action={session ? signOutAction : signInAction}>
              <Button className="text-xs sm:text-sm">
                {session && session.user ? 'Sign Out' : 'Sign In'}
              </Button>
            </form>
            <Link
              href="/contributors"
              className="btn btn-square btn-ghost umami--click--contributors-button hover:text-hacktoberfest-light transition-colors"
            >
              <BsPeopleFill size="1.5rem" color="white" title="Contributors" />
            </Link>

            <a
              href="https://github.com/max-programming/hacktoberfest-projects"
              target="_blank"
              rel="noreferrer"
              className="btn btn-square btn-ghost umami--click--github-button hover:text-hacktoberfest-light transition-colors"
            >
              <IoLogoGithub size="1.5rem" color="white" title="GitHub" />
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          <MobileMenu session={session} />
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="md:hidden md:mt-4">
          <SearchForm />
        </div>
      </div>
    </header>
  );
}
