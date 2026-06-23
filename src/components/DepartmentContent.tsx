// components/DepartmentContent.tsx
import React, { useEffect, useState } from 'react';
import {
  getDepartmentBySlug,
  getFacultyMembers,
  Department,
  FacultyMember,
} from '@/lib/apis';

function FacultiesCard({ faculty }: { faculty: FacultyMember }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border border-border hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-700 dark:text-amber-200 text-xl font-semibold">
        {faculty.name ? faculty.name.charAt(0).toUpperCase() : 'F'}
      </div>
      <div>
        <h4 className="font-semibold text-foreground">{faculty.name}</h4>
        <p className="text-sm text-amber-600 dark:text-amber-400">{faculty.designation}</p>
        <p className="text-xs text-muted-foreground">{faculty.qualification}</p>
      </div>
    </div>
  );
}

export function DepartmentPage({ slug }: { slug: string }) {
  const [department, setDepartment] = useState<Department | null>(null);
  const [faculties, setFaculties] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const dept = await getDepartmentBySlug(slug);
        setDepartment(dept);
        const facs = await getFacultyMembers(slug);
        setFaculties(facs);
      } catch (err) {
        setError('Failed to load department details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !department) {
    return <div className="text-red-500 text-center p-8">{error || 'Department not found'}</div>;
  }

  const { details } = department;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">About the Department</h2>
          </div>
          <div className="space-y-4">
            {details.about.map((paragraph, idx) => (
              <p key={idx} className="text-muted-foreground leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-amber-500/30 group">
                <img
                  src={details.imageUrl}
                  alt={department.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800 mt-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <span className="text-purple-600 text-lg">🎯</span>
              </div>
              <h2 className="text-xl font-bold">Aim & Objectives</h2>
            </div>
            <div className="space-y-3">
              {details.aim.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 dark:text-purple-400 text-xs">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-blue-600 text-lg">👨‍🏫</span>
          </div>
          <h2 className="text-xl font-bold">Faculties Members</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
          <span className="text-sm text-muted-foreground">{faculties.length} Members</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {faculties.map((faculty) => (
            <FacultiesCard key={faculty.id} faculty={faculty} />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-5 text-center border border-amber-100 dark:border-amber-800">
        <p className="text-sm text-muted-foreground">
          For more information about the {department.name} department, please contact the administrative office.
        </p>
      </div>
    </div>
  );
}