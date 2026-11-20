import React from 'react';
import { Award, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { VerificationStatus } from '../types';

interface Props {
  status: VerificationStatus;
  size?: 'sm' | 'md';
}

export const VerificationBadge: React.FC<Props> = ({ status, size = 'sm' }) => {
  const isSmall = size === 'sm';

  switch (status) {
    case 'Winner - 1st Place':
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-amber-50 text-amber-800 border border-amber-200 ${isSmall ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'}`}>
          <Award className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-600`} />
          <span>Winner (1st Place)</span>
        </span>
      );
    case 'Winner - 2nd Place':
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-slate-100 text-slate-800 border border-slate-300 ${isSmall ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'}`}>
          <Award className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-slate-500`} />
          <span>Runner Up (2nd Place)</span>
        </span>
      );
    case 'Winner - 3rd Place':
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-orange-50 text-orange-800 border border-orange-200 ${isSmall ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'}`}>
          <Award className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-700`} />
          <span>3rd Place</span>
        </span>
      );
    case 'Finalist':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${isSmall ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'}`}>
          <CheckCircle2 className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-blue-600`} />
          <span>Verified Finalist</span>
        </span>
      );
    case 'Verified Submission':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${isSmall ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'}`}>
          <ShieldCheck className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-emerald-600`} />
          <span>Public Submission</span>
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 font-normal rounded-full bg-gray-100 text-gray-700 border border-gray-200 ${isSmall ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'}`}>
          <HelpCircle className={`${isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-gray-500`} />
          <span>Community Project</span>
        </span>
      );
  }
};
