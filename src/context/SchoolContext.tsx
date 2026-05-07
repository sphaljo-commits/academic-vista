import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  AdmissionApplication, 
  EmploymentApplication, 
  WebsiteContent, 
  SchoolInfo,
  Student,
  Class,
  StaffMember,
  Transaction,
  Assignment,
  StudentGrade,
  User
} from "@/types/auth";

interface SchoolContextType {
  school: SchoolInfo | null;
  updateSchool: (info: SchoolInfo) => void;
  clearSchool: () => void;
  websiteContent: WebsiteContent;
  updateWebsiteContent: (content: WebsiteContent) => void;
  admissions: AdmissionApplication[];
  updateAdmission: (id: string, app: Partial<AdmissionApplication>) => void;
  addAdmission: (app: AdmissionApplication) => void;
  employmentApps: EmploymentApplication[];
  updateEmploymentApp: (id: string, app: Partial<EmploymentApplication>) => void;
  addEmploymentApp: (app: EmploymentApplication) => void;
  students: Student[];
  updateStudent: (id: string, student: Partial<Student>) => void;
  addStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  staff: StaffMember[];
  updateStaff: (id: string, staff: Partial<StaffMember>) => void;
  addStaff: (staff: StaffMember) => void;
  deleteStaff: (id: string) => void;
  classes: Class[];
  updateClass: (id: string, cls: Partial<Class>) => void;
  addClass: (cls: Class) => void;
  deleteClass: (id: string) => void;
  transactions: Transaction[];
  updateTransaction: (id: string, tx: Partial<Transaction>) => void;
  addTransaction: (tx: Transaction) => void;
  assignments: Assignment[];
  updateAssignment: (id: string, assignment: Partial<Assignment>) => void;
  addAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string) => void;
  grades: StudentGrade[];
  updateGrade: (studentId: string, subject: string, grade: Partial<StudentGrade>) => void;
}

export const DEFAULT_SCHOOL: SchoolInfo = {
  name: "Academix International",
  logo: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/school-logo-e52ad723-1778094555108.webp",
  email: "admin@academix.edu",
  phone: "+233 24 123 4567",
  address: "University Road, Legon, Accra",
  principalName: "Dr. Sarah Mitchell",
  plan: "termly",
  isSubscribed: true
};

const INITIAL_CLASSES: Class[] = [
  { id: "c1", name: "Primary 1A", capacity: 30 },
  { id: "c2", name: "Primary 2B", capacity: 25 },
  { id: "c3", name: "Secondary 1", capacity: 40 },
  { id: "c4", name: "Secondary 2", capacity: 35 },
  { id: "c5", name: "Grade 10A", capacity: 30 },
];

const INITIAL_STUDENTS: Student[] = [
  { 
    id: "s1", name: "Alice Johnson", email: "alice@example.com", classId: "c1", 
    rollNumber: "STU-001", dateOfBirth: "2015-05-12", gender: "female", 
    address: "123 Maple St", guardianName: "Robert Johnson", guardianPhone: "555-0101", 
    admissionDate: "2023-09-01", status: "active", performanceScore: 92,
    passportPhoto: "https://images.unsplash.com/photo-1544717297-fa95b3ee51f3?auto=format&fit=crop&q=80&w=200&h=200"
  },
  { 
    id: "s2", name: "Bob Smith", email: "bob@example.com", classId: "c1", 
    rollNumber: "STU-002", dateOfBirth: "2015-08-22", gender: "male", 
    address: "456 Oak Ave", guardianName: "Jane Smith", guardianPhone: "555-0102", 
    admissionDate: "2023-09-01", status: "active", performanceScore: 78,
    passportPhoto: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200&h=200"
  },
];

const INITIAL_STAFF: StaffMember[] = [
  { id: "st1", name: "John Miller", role: "Senior Teacher", email: "miller@school.com", phone: "555-2020", department: "Science", joinDate: "2020-01-15", status: "active", performanceScore: 95 },
  { id: "st2", name: "Sarah Jenkins", role: "Class Teacher", email: "jenkins@school.com", phone: "555-3030", department: "English", joinDate: "2021-09-01", status: "active", performanceScore: 92 },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "t1", name: "Alex Sterling", category: "Tuition Fee", amount: "GHS 1,200", date: "2024-03-20", status: "Paid" },
  { id: "t2", name: "Cleaners Co.", category: "Service", amount: "GHS 450", date: "2024-03-19", status: "Pending" },
];

const INITIAL_ASSIGNMENTS: Assignment[] = [
  { id: "a1", title: "Algebra Basics", description: "Solve exercises 1-10", classId: "c1", subject: "Mathematics", teacherId: "3", dueDate: "2024-04-05", status: "active" },
  { id: "a2", title: "Photosynthesis", description: "Read chapter 4 and summarize", classId: "c2", subject: "Science", teacherId: "3", dueDate: "2024-04-10", status: "active" },
];

const INITIAL_GRADES: StudentGrade[] = [
  { studentId: "s1", subject: "Mathematics", classScore: 25, homeworkScore: 15, examScore: 52, totalMark: 92, grade: "A", remarks: "Excellent" },
  { studentId: "s1", subject: "English", classScore: 22, homeworkScore: 14, examScore: 46, totalMark: 82, grade: "B+", remarks: "Very Good" },
  { studentId: "s2", subject: "Mathematics", classScore: 18, homeworkScore: 12, examScore: 48, totalMark: 78, grade: "B", remarks: "Good effort" },
];

const DEFAULT_WEBSITE: WebsiteContent = {
  events: [
    { id: "1", title: "Inter-House Sports Festival", date: "2024-05-15", image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/school-sports-day-98886eac-1778106726074.webp", description: "Our annual showcase of athletic talent and team spirit." },
    { id: "2", title: "Annual Science & Tech Expo", date: "2024-06-10", image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/science-lab-26c1bb96-1778107461301.webp", description: "Exploring the frontiers of innovation." },
  ],
  gallery: [
    { id: "g1", url: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/modern-campus-hero-25c13473-1778107460291.webp", title: "Executive Campus" },
  ],
  programs: [
    { id: "p1", title: "Primary Excellence", description: "Foundation-building through inquiry-based learning.", icon: "GraduationCap" },
  ],
  portfolios: ["Senior Academic Head", "Mathematics Instructor", "STEM Laboratory Lead", "School Bursar"]
};

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [school, setSchool] = useState<SchoolInfo | null>(() => {
    const saved = localStorage.getItem("school_branding");
    return saved ? JSON.parse(saved) : DEFAULT_SCHOOL;
  });

  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(() => {
    const saved = localStorage.getItem("school_website");
    return saved ? JSON.parse(saved) : DEFAULT_WEBSITE;
  });

  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(() => {
    const saved = localStorage.getItem("school_admissions");
    return saved ? JSON.parse(saved) : [];
  });

  const [employmentApps, setEmploymentApps] = useState<EmploymentApplication[]>(() => {
    const saved = localStorage.getItem("school_employment");
    return saved ? JSON.parse(saved) : [];
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem("school_students");
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem("school_staff");
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [classes, setClasses] = useState<Class[]>(() => {
    const saved = localStorage.getItem("school_classes");
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("school_transactions");
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem("school_assignments");
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [grades, setGrades] = useState<StudentGrade[]>(() => {
    const saved = localStorage.getItem("school_grades");
    return saved ? JSON.parse(saved) : INITIAL_GRADES;
  });

  useEffect(() => { localStorage.setItem("school_website", JSON.stringify(websiteContent)); }, [websiteContent]);
  useEffect(() => { localStorage.setItem("school_admissions", JSON.stringify(admissions)); }, [admissions]);
  useEffect(() => { localStorage.setItem("school_employment", JSON.stringify(employmentApps)); }, [employmentApps]);
  useEffect(() => { localStorage.setItem("school_students", JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem("school_staff", JSON.stringify(staff)); }, [staff]);
  useEffect(() => { localStorage.setItem("school_classes", JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem("school_transactions", JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem("school_assignments", JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem("school_grades", JSON.stringify(grades)); }, [grades]);

  const updateSchool = (info: SchoolInfo) => {
    setSchool(info);
    localStorage.setItem("school_branding", JSON.stringify(info));
  };

  const clearSchool = () => {
    setSchool(null);
    localStorage.removeItem("school_branding");
  };

  const updateWebsiteContent = (content: WebsiteContent) => setWebsiteContent(content);
  const addAdmission = (app: AdmissionApplication) => setAdmissions(prev => [app, ...prev]);
  const updateAdmission = (id: string, app: Partial<AdmissionApplication>) => setAdmissions(prev => prev.map(a => a.id === id ? { ...a, ...app } : a));
  const addEmploymentApp = (app: EmploymentApplication) => setEmploymentApps(prev => [app, ...prev]);
  const updateEmploymentApp = (id: string, app: Partial<EmploymentApplication>) => setEmploymentApps(prev => prev.map(a => a.id === id ? { ...a, ...app } : a));
  
  const updateStudent = (id: string, student: Partial<Student>) => setStudents(prev => prev.map(s => s.id === id ? { ...s, ...student } : s));
  const addStudent = (student: Student) => setStudents(prev => [student, ...prev]);
  const deleteStudent = (id: string) => setStudents(prev => prev.filter(s => s.id !== id));

  const updateStaff = (id: string, s: Partial<StaffMember>) => setStaff(prev => prev.map(x => x.id === id ? { ...x, ...s } : x));
  const addStaff = (s: StaffMember) => setStaff(prev => [s, ...prev]);
  const deleteStaff = (id: string) => setStaff(prev => prev.filter(x => x.id !== id));

  const updateClass = (id: string, c: Partial<Class>) => setClasses(prev => prev.map(x => x.id === id ? { ...x, ...c } : x));
  const addClass = (c: Class) => setClasses(prev => [c, ...prev]);
  const deleteClass = (id: string) => setClasses(prev => prev.filter(x => x.id !== id));

  const updateTransaction = (id: string, tx: Partial<Transaction>) => setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...tx } : t));
  const addTransaction = (tx: Transaction) => setTransactions(prev => [tx, ...prev]);

  const updateAssignment = (id: string, a: Partial<Assignment>) => setAssignments(prev => prev.map(x => x.id === id ? { ...x, ...a } : x));
  const addAssignment = (a: Assignment) => setAssignments(prev => [a, ...prev]);
  const deleteAssignment = (id: string) => setAssignments(prev => prev.filter(x => x.id !== id));

  const updateGrade = (studentId: string, subject: string, g: Partial<StudentGrade>) => {
    setGrades(prev => {
      const exists = prev.find(x => x.studentId === studentId && x.subject === subject);
      if (exists) {
        return prev.map(x => x.studentId === studentId && x.subject === subject ? { ...x, ...g } : x);
      }
      return [...prev, { studentId, subject, ...g } as StudentGrade];
    });
  };

  return (
    <SchoolContext.Provider value={{ 
      school, updateSchool, clearSchool, 
      websiteContent, updateWebsiteContent,
      admissions, addAdmission, updateAdmission,
      employmentApps, addEmploymentApp, updateEmploymentApp,
      students, updateStudent, addStudent, deleteStudent,
      staff, updateStaff, addStaff, deleteStaff,
      classes, updateClass, addClass, deleteClass,
      transactions, updateTransaction, addTransaction,
      assignments, updateAssignment, addAssignment, deleteAssignment,
      grades, updateGrade
    }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error("useSchool must be used within a SchoolProvider");
  }
  return context;
}