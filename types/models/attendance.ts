import { AttendanceStatus } from "../enums/common"

// Thông tin học sinh
export interface Student {
  id: string
  name: string
  className: string
}

// Một ngày điểm danh
export interface AttendanceRecord {
  date: string          // YYYY-MM-DD
  status: AttendanceStatus
  lateMinutes?: number  // chỉ có khi đi trễ
  note?: string         // lý do vắng / ghi chú
}

// Điểm danh theo tháng
export interface MonthlyAttendance {
  student: Student
  month: string         // YYYY-MM
  records: AttendanceRecord[]
}
