// components/staff/StaffSection.tsx
import { useState } from "react";
import { useStaff, type StaffGroupKey } from "@/lib/staffStore";
import { DocSection } from "@/components/DocSection";

interface StaffSectionProps {
  title: string;
  group: StaffGroupKey;
  slug: string;
}

export function StaffSection({ title, group, slug }: StaffSectionProps) {
  const members = useStaff(group);
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-brand">{title}</h2>
          <p className="text-xs text-muted-foreground">Staff members of Rajashri Ayurvedic Medical College</p>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground italic">No staff members listed yet.</p>
        </div>
      ) : (
        <>
          {/* Mobile View - Card Layout */}
          <div className="block md:hidden space-y-3">
            {members.map((m, i) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <button onClick={() => setActive(i)} className="flex-shrink-0">
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      className="h-16 w-16 rounded-full object-cover border-2 border-brand hover:scale-110 transition-transform"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-brand">{m.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">#{i + 1}</p>
                      </div>
                    </div>
                    <p className="text-sm mt-1">{m.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-brand w-16">Sr.No</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand">PHOTO</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand">Position</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={m.id} className="border-t border-border hover:bg-secondary/40 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setActive(i)} className="block">
                        <img
                          src={m.photo}
                          alt={m.name}
                          loading="lazy"
                          className="h-12 w-12 rounded-full object-cover border-2 border-brand hover:scale-110 transition-transform"
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 font-semibold text-brand">{m.name}</td>
                    <td className="px-4 py-3">{m.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <DocSection slug={slug} />

      {/* Lightbox Modal */}
      {active !== null && members[active] && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            {/* Image Container */}
            <div className="relative rounded-xl overflow-hidden bg-black/50">
              <img
                src={members[active].photo}
                alt={members[active].name}
                className="w-full aspect-square object-cover"
              />
              <button
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full text-white text-xl hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* Info Bar */}
            <div className="bg-white/10 backdrop-blur rounded-lg mt-3 p-3">
              <div className="text-center mb-3">
                <p className="text-white font-semibold text-lg">{members[active].name}</p>
                <p className="text-white/70 text-sm">{members[active].designation}</p>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setActive((active - 1 + members.length) % members.length)}
                  className="px-4 py-2 bg-white/20 rounded-lg text-white text-sm hover:bg-white/30 transition-colors flex items-center gap-1"
                >
                  ‹ Prev
                </button>
                <div className="text-white/60 text-xs">
                  {active + 1} of {members.length}
                </div>
                <button
                  onClick={() => setActive((active + 1) % members.length)}
                  className="px-4 py-2 bg-white/20 rounded-lg text-white text-sm hover:bg-white/30 transition-colors flex items-center gap-1"
                >
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffSection;