'use client';

import { Button } from '@/app/(public)/_components/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/app/(public)/_components/dropdown-menu';
import { ArrowUpAZ, Code } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import languages from '@/assets/languages.json';
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

type Pathname = '/repos' | `/repos/${string}`;

export function Sorter() {
  const searchParams = useSearchParams();
  const pathname = usePathname() as Pathname;

  const navigationItems = [
    { name: 'Best match', s: '', o: '' },
    { name: 'Most stars', s: 'stars', o: 'desc' },
    { name: 'Fewest stars', s: 'stars', o: 'asc' },
    { name: 'Most forks', s: 'forks', o: 'desc' },
    { name: 'Fewest forks', s: 'forks', o: 'asc' },
    { name: 'Most help wanted issues', s: 'help-wanted-issues', o: 'desc' },
    { name: 'Recently updated', s: 'updated', o: 'desc' },
    { name: 'Least recently updated', s: 'updated', o: 'asc' }
  ];

  function selectedSort(): SortTypes {
    const s = searchParams.get('s');
    const o = searchParams.get('o');
    if (!s && !o) return SortTypes.BestMatch;
    if (s === 'stars' && o === 'desc') return SortTypes.MostStars;
    if (s === 'stars' && o === 'asc') return SortTypes.FewestStars;
    if (s === 'forks' && o === 'desc') return SortTypes.MostForks;
    if (s === 'forks' && o === 'asc') return SortTypes.FewestForks;
    if (s === 'help-wanted-issues') return SortTypes.MostHelpWantedIssues;
    if (s === 'updated' && o === 'desc') return SortTypes.RecentlyUpdated;
    if (s === 'updated' && o === 'asc') return SortTypes.LeastRecentlyUpdated;
    return SortTypes.BestMatch;
  }

  return (
    <div className="flex lg:flex-col w-full gap-4 px-4 py-2 mb-4 lg:mb-0">
      {/* Language Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Language
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="max-h-64 overflow-y-auto w-60 bg-hacktoberfest-blue border-neutral-800 shadow-md rounded-xl"
        >
          {mainLanguages.sort(sortByName).map(language => {
            const sp = new URLSearchParams(searchParams);
            sp.delete('p');
            return (
              <DropdownMenuItem key={language} asChild>
                <Link
                  href={`/repos/${language.toLowerCase()}?${sp.toString()}`}
                  className="w-full"
                >
                  {language}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2">
            <ArrowUpAZ className="w-5 h-5" />
            {selectedSort()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="max-h-64 overflow-y-auto w-60 bg-hacktoberfest-blue border-neutral-800 shadow-md rounded-xl"
        >
          {navigationItems.map(item => {
            const sp = new URLSearchParams(searchParams);
            if (item.s) sp.set('s', item.s);
            else sp.delete('s');
            if (item.o) sp.set('o', item.o);
            else sp.delete('o');
            sp.delete('p');

            return (
              <DropdownMenuItem key={item.name} asChild>
                <Link href={`${pathname}?${sp.toString()}`} className="w-full">
                  {item.name}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
