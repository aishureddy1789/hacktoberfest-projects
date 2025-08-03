'use client';

import { Button } from '@/app/(public)/_components/button';
import { ArrowUpAZ, Code } from 'lucide-react';
import Link from 'next/link';
import languages from '@/assets/languages.json';
import { usePathname, useSearchParams } from 'next/navigation';
import { sortByName } from '@/lib/utils';

const { mainLanguages } = languages;

enum SortTypes {
  BestMatch = 'Best match',
  MostStars = 'Most stars',
  FewestStars = 'Fewest stars',
  MostForks = 'Most forks',
  FewestForks = 'Fewest forks',
  MostHelpWantedIssues = 'Most help wanted issues',
  RecentlyUpdated = 'Recently updated',
  LeastRecentlyUpdated = 'Least recently updated'
}

export function Sorter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const navigationItems = [
    {
      name: 'Best match',
      onSelect(sp: URLSearchParams) {
        sp.delete('o');
        sp.delete('s');
        return sp;
      }
    },
    {
      name: 'Most stars',
      onSelect(sp: URLSearchParams) {
        sp.set('s', 'stars');
        sp.set('o', 'desc');
        return sp;
      }
    },
    {
      name: 'Fewest stars',
      onSelect(sp: URLSearchParams) {
        sp.set('s', 'stars');
        sp.set('o', 'asc');
        return sp;
      }
    },
    {
      name: 'Most forks',
      onSelect(sp: URLSearchParams) {
        sp.set('s', 'forks');
        sp.set('o', 'desc');
        return sp;
      }
    },
    {
      name: 'Fewest forks',
      onSelect(sp: URLSearchParams) {
        sp.set('s', 'forks');
        sp.set('o', 'asc');
        return sp;
      }
    },
    {
      name: 'Most help wanted issues',
      onSelect(sp: URLSearchParams) {
        sp.set('s', 'help-wanted-issues');
        sp.set('o', 'desc');
        return sp;
      }
    },
    {
      name: 'Recently updated',
      onSelect(sp: URLSearchParams) {
        sp.set('s', 'updated');
        sp.set('o', 'desc');
        return sp;
      }
    },
    {
      name: 'Least recently updated',
      onSelect(sp: URLSearchParams) {
        sp.set('s', 'updated');
        sp.set('o', 'asc');
        return sp;
      }
    }
  ];

  function selectedSort(): SortTypes {
    if (searchParams.get('o') === 'asc') {
      if (searchParams.get('s') === 'stars') return SortTypes.FewestStars;
      if (searchParams.get('s') === 'forks') return SortTypes.FewestForks;
      if (searchParams.get('s') === 'updated')
        return SortTypes.LeastRecentlyUpdated;
      return SortTypes.BestMatch;
    } else if (searchParams.get('o') === 'desc') {
      if (searchParams.get('s') === 'stars') return SortTypes.MostStars;
      if (searchParams.get('s') === 'forks') return SortTypes.MostForks;
      if (searchParams.get('s') === 'updated') return SortTypes.RecentlyUpdated;
      if (searchParams.get('s') === 'help-wanted-issues')
        return SortTypes.MostHelpWantedIssues;
      return SortTypes.BestMatch;
    } else {
      return SortTypes.BestMatch;
    }
  }

  function handleClick() {
    const elem = document.activeElement as HTMLElement;
    elem?.blur();
  }

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="dropdown group dropdown-hover">
        <Button tabIndex={0}>
          <Code className="w-6 h-6 mr-2" />
          Language
        </Button>
        <div className="z-[9999] h-64 p-2 overflow-y-auto shadow-lg dropdown-content hidden group-hover:block bg-white/95 backdrop-blur-sm rounded-xl w-60 border border-gray-200/50">
          <ul tabIndex={0} className="menu menu-vertical">
            {mainLanguages.sort(sortByName).map(language => {
              const sp = new URLSearchParams(searchParams);
              sp.delete('p');
              return (
                <li key={language} onClick={handleClick}>
                  <Link
                    href={`/repos/${language.toLowerCase()}?${sp.toString()}`}
                    className="text-gray-700 hover:text-white hover:bg-hacktoberfest-light-blue rounded-lg transition-colors duration-200 px-3 py-2"
                  >
                    {language}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="dropdown dropdown-hover group">
        <Button tabIndex={0}>
          <ArrowUpAZ className="w-6 h-6 mr-2" />
          {selectedSort()}
        </Button>
        <div className="z-[9999] h-64 p-2 overflow-y-auto shadow-lg dropdown-content hidden group-hover:block -ml-16 bg-white/95 backdrop-blur-sm rounded-xl w-60 border border-gray-200/50">
          <ul tabIndex={0} className="menu menu-vertical">
            {navigationItems.map((item, index) => {
              const sp = item.onSelect(new URLSearchParams(searchParams));
              sp.delete('p');
              if (item.name === SortTypes.BestMatch) {
                sp.delete('o');
                sp.delete('s');
              }
              return (
                <li key={index} onClick={handleClick}>
                  <Link
                    href={`${pathname}?${sp.toString()}`}
                    className="text-gray-700 hover:text-white hover:bg-hacktoberfest-light-blue rounded-lg transition-colors duration-200 px-3 py-2"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
