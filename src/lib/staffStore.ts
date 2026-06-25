// lib/staffStore.ts
import { create } from "zustand";
import { getStaff } from "./apis"; // adjust path if needed
import React from "react"; // for useEffect in hooks

export type StaffGroupKey = "teaching" | "non-teaching" | "hospital";

export const STAFF_GROUPS: StaffGroupKey[] = ["teaching", "non-teaching", "hospital"];

export interface StaffMember {
  id: number;
  name: string;
  designation: string;
  groupKey: StaffGroupKey;
  // teaching fields
  teacherCode?: string;
  qualification?: string;
  experience?: string;
  registrationNumber?: string;
  dateOfJoining?: string;
  dob?: string;
  email?: string;
  mobile?: string;
  photo?: string;
  // non-teaching / hospital fields
  fatherName?: string;
  workingDepartment?: string;
  dateOfAppointment?: string;
  natureOfAppointment?: string;
  payScale?: string;
  education?: string;
  year?: string;
  [key: string]: any;
}

interface StaffStore {
  data: Record<StaffGroupKey, StaffMember[]>;
  loading: Record<StaffGroupKey, boolean>;
  error: Record<StaffGroupKey, string | null>;
  fetchStaff: (groupKey: StaffGroupKey) => Promise<void>;
}

// Map API response (snake_case or camelCase) to our interface
const mapStaffFromApi = (item: any): StaffMember => ({
  id: item.id,
  name: item.name,
  designation: item.designation,
  groupKey: item.groupKey || item.group_key || "teaching",
  teacherCode: item.teacherCode ?? item.teacher_code ?? "",
  qualification: item.qualification ?? "",
  experience: item.experience ?? "",
  registrationNumber: item.registrationNumber ?? item.registration_number ?? "",
  dateOfJoining: item.dateOfJoining ?? item.date_of_joining ?? "",
  dob: item.dob ?? "",
  email: item.email ?? "",
  mobile: item.mobile ?? "",
  photo: item.photo ?? "",
  fatherName: item.fatherName ?? item.father_name ?? "",
  workingDepartment: item.workingDepartment ?? item.working_department ?? "",
  dateOfAppointment: item.dateOfAppointment ?? item.date_of_appointment ?? "",
  natureOfAppointment: item.natureOfAppointment ?? item.nature_of_appointment ?? "",
  payScale: item.payScale ?? item.pay_scale ?? "",
  education: item.education ?? "",
  year: item.year ?? "",
  ...item, // keep any extra fields
});

export const useStaffStore = create<StaffStore>((set, get) => ({
  data: {
    teaching: [],
    "non-teaching": [],
    hospital: [],
  },
  loading: {
    teaching: false,
    "non-teaching": false,
    hospital: false,
  },
  error: {
    teaching: null,
    "non-teaching": null,
    hospital: null,
  },

  fetchStaff: async (groupKey: StaffGroupKey) => {
    if (get().loading[groupKey]) return;
    // Optionally skip if data already exists – comment out to force refetch
    // if (get().data[groupKey].length > 0) return;

    set((state) => ({
      loading: { ...state.loading, [groupKey]: true },
      error: { ...state.error, [groupKey]: null },
    }));

    try {
      const response = await getStaff(groupKey);
      const members = Array.isArray(response) ? response.map(mapStaffFromApi) : [];
      set((state) => ({
        data: { ...state.data, [groupKey]: members },
        loading: { ...state.loading, [groupKey]: false },
      }));
    } catch (error: any) {
      set((state) => ({
        loading: { ...state.loading, [groupKey]: false },
        error: { ...state.error, [groupKey]: error.message || "Failed to load staff" },
      }));
    }
  },
}));

// ===== React Hooks =====

export const useStaff = (groupKey: StaffGroupKey) => {
  const data = useStaffStore((state) => state.data[groupKey]);
  const loading = useStaffStore((state) => state.loading[groupKey]);

  React.useEffect(() => {
    if (data.length === 0 && !loading) {
      useStaffStore.getState().fetchStaff(groupKey);
    }
  }, [groupKey, data.length, loading]);

  return data;
};

export const useStaffStatus = (groupKey: StaffGroupKey) => {
  const loading = useStaffStore((state) => state.loading[groupKey]);
  const error = useStaffStore((state) => state.error[groupKey]);
  return { loading, error };
};

export const refetchStaff = (groupKey: StaffGroupKey) => {
  // Clear the data for this group so it will refetch
  useStaffStore.setState((state) => ({
    data: { ...state.data, [groupKey]: [] },
  }));
  // Then fetch
  useStaffStore.getState().fetchStaff(groupKey);
};