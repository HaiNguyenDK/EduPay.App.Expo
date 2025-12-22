import { AttendanceStatus } from "@/types/enums/common";
import { MonthlyAttendance } from "@/types/models/attendance";

export const billData = [
  {
    id: 1,
    title: "Phiếu thu kỳ 01 - 2023",
    desc: "Học phí",
    price: 1500000,
    status: "Chưa đóng"
  },
  {
    id: 2,
    title: "Phiếu thu kỳ 02 - 2023",
    desc: "Học phí",
    price: 1400000,
    status: "Đang đóng"
  },
  {
    id: 3,
    title: "Phiếu thu kỳ 03 - 2023",
    desc: "Học phí",
    price: 1300000,
    status: "Đã đóng"
  },
  {
    id: 4,
    title: "Phiếu thu kỳ 04 - 2023",
    desc: "Học phí",
    price: 15600000,
    status: "Đã đóng"
  },
]

export const packagePaymentData = [
  {
    id: "1",
    count: 1,
    title: "Đóng 1 đợt",
    price: 1500000
  },
  {
    id: "2",
    count: 2,
    title: "Đóng 2 đợt",
    price: 1500000
  },
  {
    id: "3",
    count: 3,
    title: "Đóng 3 đợt",
    price: 1500000
  },
  {
    id: "4",
    count: 4,
    title: "Đóng 4 đợt",
    price: 1500000
  },
]

export const ATTENDANCE_UI = {
  PRESENT: {
    label: "Có mặt",
    color: "bg-[#ECF6F1]",
    textColor: "text-[#0C793F]",
    borderColor: "border-[#B3DAC7]",
    iconBg: "bg-[#4AA879]"
  },
  ABSENT: {
    label: "Vắng ",
    color: "bg-[#FFE8ED]",
    textColor: "text-[#FF0000]",
    borderColor: "border-[#fad7d7]",
    iconBg: "bg-[#EB6C86]"
  },
  LATE: {
    label: "Trễ",
    color: "bg-[#FFE1D0]",
    textColor: "text-[#F6662D]",
    borderColor: "border-[#f1d5c5]",
    iconBg: "bg-[#FDA270]"
  }
}

export const mockMonthlyAttendance: MonthlyAttendance = {
  student: {
    id: "HS001",
    name: "Nguyễn Văn A",
    className: "10A1"
  },
  month: "2025-12",
  records: [
    { date: "2025-12-01", status: AttendanceStatus.PRESENT },
    { date: "2025-12-02", status: AttendanceStatus.PRESENT },
    { date: "2025-12-03", status: AttendanceStatus.LATE, lateMinutes: 10 },
    { date: "2025-12-04", status: AttendanceStatus.PRESENT },
    { date: "2025-12-05", status: AttendanceStatus.ABSENT, note: "Ốm" },

    { date: "2025-12-08", status: AttendanceStatus.PRESENT },
    { date: "2025-12-09", status: AttendanceStatus.PRESENT },
    { date: "2025-12-10", status: AttendanceStatus.LATE, lateMinutes: 5 },
    { date: "2025-12-11", status: AttendanceStatus.PRESENT },
    { date: "2025-12-12", status: AttendanceStatus.PRESENT },

    { date: "2025-12-15", status: AttendanceStatus.ABSENT, note: "Việc gia đình" },
    { date: "2025-12-16", status: AttendanceStatus.PRESENT },
    { date: "2025-12-17", status: AttendanceStatus.PRESENT },
    { date: "2025-12-18", status: AttendanceStatus.LATE, lateMinutes: 15 },
    { date: "2025-12-19", status: AttendanceStatus.PRESENT },

    { date: "2025-12-22", status: AttendanceStatus.PRESENT },
    { date: "2025-12-23", status: AttendanceStatus.PRESENT },
    { date: "2025-12-24", status: AttendanceStatus.ABSENT },
    { date: "2025-12-25", status: AttendanceStatus.PRESENT },
    { date: "2025-12-26", status: AttendanceStatus.LATE, lateMinutes: 8 }
  ]
}


export default {
  billData,
  packagePaymentData,
  mockMonthlyAttendance,
  ATTENDANCE_UI
};