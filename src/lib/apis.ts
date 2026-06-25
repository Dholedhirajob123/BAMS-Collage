import { API_BASE_URL } from "../lib/config";

const getHeaders = () => ({
  "Content-Type": "application/json",
});

// ================= AUTH =================
export const login = async (phone: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      phone,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid phone or password");
  }

  return response.json();
};

export const register = async (
  name: string,
  phone: string,
  password: string
) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      phone,
      password,
    }),
  });

  return response.json();
};

// ================= USERS =================

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users`);
  return response.json();
};

export const getUser = async (phone: string) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${phone}`);
  return response.json();
};

export const createUser = async (user: any) => {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });

  return response.json();
};

export const updateUser = async (phone: string, user: any) => {
  const response = await fetch(`${API_BASE_URL}/api/users/${phone}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });

  return response.json();
};

export const deleteUser = async (phone: string) => {
  return fetch(`${API_BASE_URL}/api/users/${phone}`, {
    method: "DELETE",
  });
};

// ================= STAFF =================

export const getStaff = async (groupKey: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/staff?groupKey=${groupKey}`
  );

  return response.json();
};

export const getStaffMember = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/staff/${id}`);
  return response.json();
};

export const createStaff = async (staff: any) => {
  const response = await fetch(`${API_BASE_URL}/api/staff`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(staff),
  });

  return response.json();
};

export const updateStaff = async (id: number, staff: any) => {
  const response = await fetch(`${API_BASE_URL}/api/staff/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(staff),
  });

  return response.json();
};

export const deleteStaff = async (id: number) => {
  return fetch(`${API_BASE_URL}/api/staff/${id}`, {
    method: "DELETE",
  });
};

// ================= COUNCIL =================

export const getCouncilMembers = async (groupKey: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/council?groupKey=${groupKey}`
  );

  return response.json();
};

export const getCouncilMember = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/council/${id}`);
  return response.json();
};

export const createCouncilMember = async (member: any) => {
  const response = await fetch(`${API_BASE_URL}/api/council`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(member),
  });

  return response.json();
};

export const updateCouncilMember = async (id: number, member: any) => {
  const response = await fetch(`${API_BASE_URL}/api/council/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(member),
  });

  return response.json();
};

export const deleteCouncilMember = async (id: number) => {
  return fetch(`${API_BASE_URL}/api/council/${id}`, {
    method: "DELETE",
  });
};
// ================= PHOTO CATEGORIES =================

export interface PhotoCategory {
  id?: number;
  categoryId: string;   // e.g., 'campus', 'academic'
  label: string;        // e.g., 'Campus'
  color?: string;       // optional, e.g., 'amber', 'blue'
}

export const getPhotoCategories = async (): Promise<PhotoCategory[]> => {
  const response = await fetch(`${API_BASE_URL}/api/photo-categories`);
  if (!response.ok) throw new Error('Failed to fetch photo categories');
  return response.json();
};

export const getPhotoCategory = async (id: number): Promise<PhotoCategory> => {
  const response = await fetch(`${API_BASE_URL}/api/photo-categories/${id}`);
  if (!response.ok) throw new Error('Photo category not found');
  return response.json();
};

export const createPhotoCategory = async (category: Partial<PhotoCategory>): Promise<PhotoCategory> => {
  const response = await fetch(`${API_BASE_URL}/api/photo-categories`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error('Failed to create photo category');
  return response.json();
};

export const updatePhotoCategory = async (id: number, category: Partial<PhotoCategory>): Promise<PhotoCategory> => {
  const response = await fetch(`${API_BASE_URL}/api/photo-categories/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error('Failed to update photo category');
  return response.json();
};

export const deletePhotoCategory = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/photo-categories/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete photo category');
};

// ================= PHOTOS (extended) =================
// If your backend supports filtering photos by category:
export const getPhotosByCategory = async (categoryId: string): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/api/photos?categoryId=${categoryId}`);
  if (!response.ok) throw new Error('Failed to fetch photos for category');
  return response.json();
};

// ================= TYPES =================

export interface DepartmentDetails {
  shortDescription: string;
  about: string[];
  aim: string[];
  imageUrl: string;
}

export interface Department {
  id?: number;
  slug: string;
  name: string;
  shortDescription: string;   // ✅ changed from short_description
  // details and faculties are not in the database, remove or leave optional
}
export interface FacultyMember {
  id?: number;
  name: string;
  designation: string;
  qualification: string;
  departmentSlug?: string;    // ✅ already matches backend
  photo?: string;             // optional
}
export interface Photo {
  id?: number;
  src: string;
  caption?: string;
  date?: string;
  categoryId?: string;
  place?: string;
  isDefault?: boolean;
  hidden?: boolean;
  // if your backend stores category relationship, add:
  // categoryId?: string;
}

// ================= DEPARTMENT =================

export const getDepartments = async (): Promise<Department[]> => {
  const response = await fetch(`${API_BASE_URL}/api/departments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch departments: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const getDepartment = async (id: number): Promise<Department> => {
  const response = await fetch(`${API_BASE_URL}/api/departments/${id}`);
  return response.json();
};

// Recommended: add this endpoint in backend
export const getDepartmentBySlug = async (slug: string): Promise<Department> => {
  const response = await fetch(`${API_BASE_URL}/api/departments/slug/${slug}`);
  return response.json();
};

export const createDepartment = async (department: Partial<Department>): Promise<Department> => {
  const response = await fetch(`${API_BASE_URL}/api/departments`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(department),
  });
  return response.json();
};

export const updateDepartment = async (id: number, department: Partial<Department>): Promise<Department> => {
  const response = await fetch(`${API_BASE_URL}/api/departments/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(department),
  });
  return response.json();
};

export const deleteDepartment = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/api/departments/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
};

// ================= FACULTY =================

export const getFacultyMembers = async (departmentSlug: string): Promise<FacultyMember[]> => {
  const response = await fetch(`${API_BASE_URL}/api/faculty?departmentSlug=${departmentSlug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch faculty: ${response.status} ${response.statusText}`);
  }
  return response.json();
};


export const getFacultyMember = async (id: number): Promise<FacultyMember> => {
  const response = await fetch(`${API_BASE_URL}/api/faculty/${id}`);
  return response.json();
};

export const createFacultyMember = async (faculty: FacultyMember): Promise<FacultyMember> => {
  const response = await fetch(`${API_BASE_URL}/api/faculty`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(faculty),
  });
  return response.json();
};

export const updateFacultyMember = async (id: number, faculty: FacultyMember): Promise<FacultyMember> => {
  const response = await fetch(`${API_BASE_URL}/api/faculty/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(faculty),
  });
  return response.json();
};

export const deleteFacultyMember = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/api/faculty/${id}`, {
    method: 'DELETE',
  });
};

// ================= PHOTOS =================

export const getPhotos = async () => {
  const response = await fetch(`${API_BASE_URL}/api/photos`);
  return response.json();
};

export const getPhoto = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/photos/${id}`);
  return response.json();
};

export const uploadPhoto = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/photos`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const updatePhoto = async (id: number, photo: any) => {
  const response = await fetch(`${API_BASE_URL}/api/photos/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(photo),
  });

  return response.json();
};

export const deletePhoto = async (id: number) => {
  return fetch(`${API_BASE_URL}/api/photos/${id}`, {
    method: "DELETE",
  });
};

// ================= DOCUMENTS =================

export const getDocuments = async (sectionKey: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/documents?sectionKey=${sectionKey}`
  );

  return response.json();
};

export const getDocument = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/api/documents/${id}`);
  return response.json();
};

export const uploadDocument = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/documents`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export const updateDocument = async (id: number, document: any) => {
  const response = await fetch(`${API_BASE_URL}/api/documents/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(document),
  });

  return response.json();
};

export const deleteDocument = async (id: number) => {
  return fetch(`${API_BASE_URL}/api/documents/${id}`, {
    method: "DELETE",
  });
};

// ================= SECTION INFO =================

export const getSectionInfo = async (sectionKey: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/documents/sections/${sectionKey}/info`
  );

  return response.json();
};

export const updateSectionInfo = async (
  sectionKey: string,
  sectionInfo: any
) => {
  const response = await fetch(
    `${API_BASE_URL}/api/documents/sections/${sectionKey}/info`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(sectionInfo),
    }
  );

  return response.json();
};

// ================= SECTIONS =================

export const getSections = async () => {
  const response = await fetch(`${API_BASE_URL}/api/sections`);

  if (!response.ok) {
    throw new Error("Failed to load sections");
  }

  return response.json();
};

// ================= COUNCIL GROUPS =================

export const getCouncilGroups = async () => {
  const response = await fetch(`${API_BASE_URL}/api/council-groups`);

  if (!response.ok) {
    throw new Error("Failed to load council groups");
  }

  return response.json();
};

export const getCouncilGroupByKey = async (groupKey: string) => {
  const response = await fetch(`${API_BASE_URL}/api/council-groups/${groupKey}`);
  if (!response.ok) {
    throw new Error('Council group not found');
  }
  return response.json();
};

// ================= STAFF GROUPS =================

export const getStaffGroups = async () => {
  const response = await fetch(`${API_BASE_URL}/api/staff-groups`);
  if (!response.ok) {
    throw new Error('Failed to load staff groups');
  }
  return response.json();
};
