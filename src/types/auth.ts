export type UserRole = "admin" | "parent" | "teacher" | "accountant";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  approved: boolean;
  assignedClasses?: string[];
  childrenIds?: string[];
}

export interface SignupRequest extends User {
  requestedRole: UserRole;
  requestDate: string;
}

export type SubscriptionPlan = "monthly" | "termly" | "yearly";

export interface SchoolInfo {
  name: string;
  logo: string;
  principalName: string;
  address: string;
  phone: string;
  email: string;
  plan: SubscriptionPlan;
  isSubscribed: boolean;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  classId: string;
  rollNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  admissionDate: string;
  status: "active" | "inactive";
  performanceScore: number;
  passportPhoto?: string;
  parentId?: string;
}

export interface Class {
  id: string;
  name: string;
  teacherId?: string;
  capacity: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  joinDate: string;
  status: "active" | "on-leave" | "terminated";
  performanceScore?: number;
}

export interface StaffHistory {
  id: string;
  staffId: string;
  date: string;
  event: string;
  type: "promotion" | "disciplinary" | "leave" | "hiring" | "termination" | "other";
  details: string;
}

export interface ParentPerformance {
  id: string;
  name: string;
  studentNames: string[];
  engagementScore: number;
}

export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: string;
  date: string;
  status: "Paid" | "Pending";
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "absent" | "late";
  remarks?: string;
}

export interface TimetableEntry {
  id: string;
  classId: string;
  subject: string;
  teacherId: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  startTime: string;
  endTime: string;
  room: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  subject: string;
  teacherId: string;
  dueDate: string;
  status: "active" | "archived";
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "exam" | "pta" | "holiday" | "event";
  description?: string;
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  classRequested: string;
  dateOfBirth: string;
  previousSchool?: string;
  applicationDate: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}

export interface EmploymentApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  portfolio: string;
  experience: string;
  professionalQuestions: {
    motivation: string;
    philosophy: string;
  };
  cvUrl?: string;
  passportUrl?: string;
  certificates: string[];
  applicationDate: string;
  status: "pending" | "shortlisted" | "rejected";
}

export interface StudentGrade {
  studentId: string;
  subject: string;
  classScore: number;
  homeworkScore: number;
  examScore: number;
  totalMark: number;
  grade: string;
  remarks: string;
}

export interface BehavioralAttributes {
  studentId: string;
  punctuality: string;
  neatness: string;
  politeness: string;
  cooperation: string;
  leadership: string;
  emotionalStability: string;
}

export interface TerminalReport {
  studentId: string;
  term: string;
  session: string;
  grades: StudentGrade[];
  behavior: BehavioralAttributes;
  teacherRemark: string;
  principalRemark: string;
  promotionStatus: "promoted" | "retained" | "probation";
  nextTermStart: string;
}

export interface WebsiteContent {
  events: { id: string; title: string; date: string; image: string; description: string }[];
  gallery: { id: string; url: string; title: string }[];
  programs: { id: string; title: string; description: string; icon: string }[];
  portfolios: string[]; // Editable list of jobs
}