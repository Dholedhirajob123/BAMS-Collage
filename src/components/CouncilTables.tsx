import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold text-brand mb-2">{children}</h2>
  );
}

function YearTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground mb-4">{children}</p>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      {children}
    </div>
  );
}

export function IQACTable() {
  const rows = [
    ["1", "Dr. Aware Milind B.", "Chairperson: Head of the Institute", "Principal"],
    ["2", "Dr. Pawale Pritam S.", "IQAC Coordinator", "Professor - Dept. of Dravyaguna"],
    ["3", "Dr. Patil (Aher) Gayatri S.", "Senior Faculty Member", "A Senior faculty member from Management & Health Dept."],
    ["4", "Dr Patil Sandip", "Member", "Nominees from Employers"],
    ["5", "Dr. Raut Aparna A.", "Faculty Member", "Senior Faculty Member"],
    ["6", "Dr. Pawar Parshuram S.", "Senior Faculty Member", "PG Director"],
  ];
  return (
    <div>
      <SectionTitle>IQAC – Internal Quality Assurance Cell</SectionTitle>
      <YearTag>Academic Year 2025-26</YearTag>
      <Wrap>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="w-16">Sr. No</TableHead>
              <TableHead>Name of Member</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r[0]}>
                {r.map((c, i) => (
                  <TableCell key={i} className={i === 1 ? "font-medium" : ""}>{c}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrap>
    </div>
  );
}

export function CollegeCouncilTable() {
  const members: [string, string, string[]][] = [
    ["1", "Vd. Dande Bhavana Sumit", ["H.O.D. & Professor", "Sanskrit Samhita & Siddhanta Dept."]],
    ["2", "Vd. Lahare Kunal Harishchandra", ["H.O.D. & Professor", "Rachana Sharir Dept."]],
    ["3", "Vd. Chondikar Prakash Ramkishan", ["H.O.D. & Professor", "Kriya Sharir Dept."]],
    ["4", "Vd. Shahane Vijay Chandrakant", ["H.O.D. & Professor", "Swasthavritta & Yoga Dept."]],
    ["5", "Vd. Pawale Pritam Subhash", ["H.O.D. & Professor", "Dravyaguna Vidnyan Dept."]],
    ["6", "Vd. Wagh Sucheta Sushilkumar", ["H.O.D. & Professor", "Rog Nidan Dept."]],
    ["7", "Vd. Pagar Manisha Mukund", ["H.O.D. & Professor", "Prasuti Tantra & Streerog Dept."]],
    ["8", "Vd. Pawar Parshuram Shivaji", ["H.O.D. & Professor", "Kayachikitsa Dept."]],
    ["9", "Vd. Raut Aparna Anil", ["H.O.D. & Professor", "Shalya Tantra Dept."]],
    ["10", "Vd. Patil (Aher) Gayatri Sandip", ["H.O.D. & Professor", "Panchakarma Dept."]],
  ];
  return (
    <div>
      <SectionTitle>College Council</SectionTitle>
      <YearTag>Academic Year 2025-26</YearTag>
      <Wrap>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead colSpan={3} className="text-center text-base font-semibold text-foreground">
                Chairperson of Council
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-16"></TableCell>
              <TableCell className="font-medium">Vd. Aware Milind Babarao</TableCell>
              <TableCell>Principal – Chairman of Council</TableCell>
            </TableRow>
            <TableRow className="bg-secondary">
              <TableCell colSpan={3} className="text-center font-semibold text-foreground">
                Members of Council
              </TableCell>
            </TableRow>
            {members.map(([sr, name, deptLines]) => (
              <TableRow key={sr}>
                <TableCell className="w-16 align-top">{sr}</TableCell>
                <TableCell className="font-medium align-top">{name}</TableCell>
                <TableCell>
                  {deptLines.map((l, i) => (
                    <div key={i} className={i === 0 ? "" : "text-muted-foreground text-sm"}>{l}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrap>
    </div>
  );
}

export function GrievancesCellTable() {
  const rows = [
    ["1.", "Dr. Aware Milind B.", "Chairperson: Head of the Institute", "Principal"],
    ["2.", "Dr. Raut Aparna A.", "Faculty Member", "Senior Faculty Member"],
    ["3.", "Dr. Wagh Sucheta", "Faculty Member", "Professor, Rog Nidan Dept."],
    ["4.", "Ms. Kadam Ashwini B.", "Administrative staff Member", "Administration Clerk"],
  ];
  return (
    <div>
      <SectionTitle>Grievance Redressal Cell</SectionTitle>
      <YearTag>Academic Year 2025-26</YearTag>
      <Wrap>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="w-16">Sr. No</TableHead>
              <TableHead>Name of Member</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r[0]}>
                {r.map((c, i) => (
                  <TableCell key={i} className={i === 1 ? "font-medium" : ""}>{c}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrap>
    </div>
  );
}

export function AntiRaggingTable() {
  const rows = [
    ["1", "Dean / Principal", "Dr. Milind Aware", "Principal"],
    ["2", "Representative of Civil Administration", "Mr. Ruchi Kumbharkar", "Corporator"],
    ["3", "Representative of Police Administration", "Mr. Shekhar Phartale", "Police Inspector"],
    ["4", "Representative of Local Media", "Mr. Nagare Santosh", "Media Representative"],
    ["5", "Representative of NGO involved in Youth Activity", "Vyakti Vikar Kendra, India (Reg. Charity No.-3255/IV/95-96)", "—"],
    ["6", "Member", "Vrushali Sonawane", "NGO Representative"],
  ];
  return (
    <div>
      <SectionTitle>Anti-Ragging Committee</SectionTitle>
      <YearTag>Academic Year 2025-26</YearTag>
      <Wrap>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="w-16">Sr. No</TableHead>
              <TableHead>Committee Designation</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r[0]}>
                {r.map((c, i) => (
                  <TableCell key={i} className={i === 2 ? "font-medium" : ""}>{c}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrap>
    </div>
  );
}

export function VishakhaTable() {
  const rows = [
    ["Chairperson (Preceding Officer)", "Smt. Himgauri B. Aher", "Chairman"],
    ["Secretory", "Dr. Aware Milind", "Principal"],
    ["Co-ordinater", "Dr. Raut Aparna", "Professor"],
    ["NGO Member", "Vrushali Sonawane", "NGO Member"],
    ["Member", "Dr. Pagar Manisha", "Medical Superintendent"],
  ];
  return (
    <div>
      <SectionTitle>Internal Complaint Committee</SectionTitle>
      <p className="text-sm text-muted-foreground -mt-1 mb-1">(Vishakha – Womens Complaint Committee)</p>
      <YearTag>Academic Year 2025-26</YearTag>
      <Wrap>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead>Committee Designation</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-medium">{r[0]}</TableCell>
                <TableCell>{r[1]}</TableCell>
                <TableCell>{r[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrap>
    </div>
  );
}

export function ReservationCellTable() {
  const rows = [
    ["Chairman", "Dr. Milind Babarao Aware", "Principal", "OBC"],
    ["Member", "Dr. Popat Jagtap", "Professor", "SC"],
    ["Member", "Dr. Thakur Deepali", "Associate Professor", "ST"],
    ["Member", "Dr. Yogesh Surse", "Professor", "OBC"],
    ["Member", "Dr. Sunil More", "Professor", "NT"],
    ["Member", "Mr. Akshay Khairnar", "Student Representative", "OBC"],
  ];
  return (
    <div>
      <SectionTitle>Reservation Cell</SectionTitle>
      <YearTag>Academic Year 2025-26</YearTag>
      <Wrap>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead>Committee Designation</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{r[0]}</TableCell>
                <TableCell>{r[1]}</TableCell>
                <TableCell>{r[2]}</TableCell>
                <TableCell>{r[3]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrap>
    </div>
  );
}

export function StudentCouncilTable() {
  const rows: [string, string, string, string][] = [
    ["1", "General Secretary", "Mr. Anurag Nikam", "Final Year UG"],
    ["2", "Members : (Class representatives of all batches)", "Mr. Anad Lad", "1st Year New"],
    ["", "", "Mr. Pratik Gawali", "1st Year Old"],
    ["", "", "Mr. Piyush Nalwade", "2nd Year"],
    ["", "", "Mr. Mukundraj Channe", "Final Year"],
    ["3", "Literary Secretary", "Mr Pramod Khatal", "Final Year UG"],
    ["", "", "Miss. Purva Jangle", "Final Year UG"],
  ];
  return (
    <div>
      <SectionTitle>Student Council 2026-27</SectionTitle>
      <YearTag>Date: 11/05/2026</YearTag>
      <Wrap>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="w-16">Sr. No</TableHead>
              <TableHead>Post</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r[0]}</TableCell>
                <TableCell>{r[1]}</TableCell>
                <TableCell className="font-medium">{r[2]}</TableCell>
                <TableCell>{r[3]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrap>
    </div>
  );
}

export const COUNCIL_CONTENT: Record<string, React.FC> = {
  iqac: IQACTable,
  "college-council-curriculum": CollegeCouncilTable,
  "grievances-cell": GrievancesCellTable,
  "anti-ragging-cell": AntiRaggingTable,
  "internal-grievances-vishakha": VishakhaTable,
  "reservation-cell": ReservationCellTable,
  "student-council": StudentCouncilTable,
};
