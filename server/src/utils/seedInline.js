const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const LeaveRequest = require('../models/LeaveRequest');
const OfferLetter = require('../models/OfferLetter');
const Payroll = require('../models/Payroll');
const CalendarEvent = require('../models/CalendarEvent');

const runSeedInline = async () => {
  try {
    // Clear existing dataset
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Attendance.deleteMany({});
    await LeaveRequest.deleteMany({});
    await OfferLetter.deleteMany({});
    await Payroll.deleteMany({});
    await CalendarEvent.deleteMany({});

    console.log('[Inline Seed] Seeding Indian workforce & multi-month payroll management records...');

    const salt = await bcrypt.genSalt(10);
    const adminHashedPass = await bcrypt.hash('admin@123', salt);
    const hrHashedPass = await bcrypt.hash('hr@123', salt);
    const empHashedPass = await bcrypt.hash('employee@123', salt);

    // 1. Primary Admin Accounts (Password: admin@123)
    const adminUser = await User.create({
      name: 'Rajesh Verma',
      email: 'rajesh.verma@neuzenai.com',
      password: adminHashedPass,
      role: 'admin',
    });

    await User.create({
      name: 'Rajesh Verma (Admin Alias)',
      email: 'admin@neuzenai.com',
      password: adminHashedPass,
      role: 'admin',
    });

    // 2. Primary HR Accounts (Password: hr@123)
    const hrUser = await User.create({
      name: 'Sunita Sharma',
      email: 'sunita.sharma@neuzenai.com',
      password: hrHashedPass,
      role: 'hr',
    });

    await User.create({
      name: 'Sunita Sharma (HR Alias)',
      email: 'hr@neuzenai.com',
      password: hrHashedPass,
      role: 'hr',
    });

    // 3. Primary Employee Account (Password: employee@123)
    const empUser = await User.create({
      name: 'Aarav Mehta',
      email: 'aarav.mehta@neuzenai.com',
      password: empHashedPass,
      role: 'employee',
    });

    await User.create({
      name: 'Aarav Mehta (Employee Alias)',
      email: 'employee@neuzenai.com',
      password: empHashedPass,
      role: 'employee',
    });

    // Core Employee Records
    const adminEmp = await Employee.create({
      user: adminUser._id,
      employeeCode: 'NZ-0001',
      firstName: 'Rajesh',
      lastName: 'Verma',
      phone: '+91 98765 43210',
      department: 'Executive',
      designation: 'Chief Technology Officer & System Admin',
      salary: { basicSalary: 120000, allowances: 20000, deductions: 10000 },
      bankDetails: { accountNumber: '998877665544', bankName: 'HDFC Bank', ifscCode: 'HDFC0001234' },
    });
    adminUser.employeeId = adminEmp._id;
    await adminUser.save();

    const hrEmp = await Employee.create({
      user: hrUser._id,
      employeeCode: 'NZ-0002',
      firstName: 'Sunita',
      lastName: 'Sharma',
      phone: '+91 98765 43211',
      department: 'Human Resources',
      designation: 'HR Lead Specialist',
      salary: { basicSalary: 65000, allowances: 8000, deductions: 4000 },
      bankDetails: { accountNumber: '887766554433', bankName: 'ICICI Bank', ifscCode: 'ICIC0005678' },
    });
    hrUser.employeeId = hrEmp._id;
    await hrUser.save();

    const aaravEmp = await Employee.create({
      user: empUser._id,
      employeeCode: 'NZ-0003',
      firstName: 'Aarav',
      lastName: 'Mehta',
      phone: '+91 98765 43212',
      department: 'Engineering',
      designation: 'Senior Frontend Developer',
      salary: { basicSalary: 55000, allowances: 6000, deductions: 3000 },
      bankDetails: { accountNumber: '776655443322', bankName: 'State Bank of India', ifscCode: 'SBIN0009876' },
    });
    empUser.employeeId = aaravEmp._id;
    await empUser.save();

    // 4. Add 20 Workforce Employee Profiles (Password: employee@123)
    const employeeData = [
      { firstName: 'Maya', lastName: 'Patel', dept: 'AI & Data Science', desig: 'ML Research Engineer', sal: 75000 },
      { firstName: 'Rohan', lastName: 'Gupta', dept: 'Engineering', desig: 'DevOps Lead', sal: 70000 },
      { firstName: 'Priya', lastName: 'Sharma', dept: 'Design', desig: 'UI/UX Product Designer', sal: 58000 },
      { firstName: 'Karan', lastName: 'Singhania', dept: 'Engineering', desig: 'Full Stack Engineer', sal: 62000 },
      { firstName: 'Ananya', lastName: 'Deshmukh', dept: 'Human Resources', desig: 'HR Specialist', sal: 50000 },
      { firstName: 'Aditya', lastName: 'Joshi', dept: 'Finance', desig: 'Financial Analyst', sal: 54000 },
      { firstName: 'Kavya', lastName: 'Reddy', dept: 'Marketing', desig: 'Marketing Director', sal: 80000 },
      { firstName: 'Rahul', lastName: 'Kapoor', dept: 'Engineering', desig: 'Backend Developer', sal: 60000 },
      { firstName: 'Sneha', lastName: 'Kulkarni', dept: 'Product', desig: 'Lead Product Manager', sal: 85000 },
      { firstName: 'Vikram', lastName: 'Rao', dept: 'Engineering', desig: 'Cybersecurity Specialist', sal: 72000 },
      { firstName: 'Neha', lastName: 'Banerjee', dept: 'Engineering', desig: 'QA Automation Engineer', sal: 52000 },
      { firstName: 'Arjun', lastName: 'Nambiar', dept: 'Engineering', desig: 'Systems Architect', sal: 90000 },
      { firstName: 'Pooja', lastName: 'Agarwal', dept: 'Marketing', desig: 'Content Strategist', sal: 48000 },
      { firstName: 'Vivek', lastName: 'Malhotra', dept: 'AI & Data Science', desig: 'Data Engineer', sal: 68000 },
      { firstName: 'Deepika', lastName: 'Iyer', dept: 'Operations', desig: 'Operations Manager', sal: 65000 },
      { firstName: 'Siddharth', lastName: 'Nair', dept: 'Engineering', desig: 'Cloud Infrastructure Engineer', sal: 71000 },
      { firstName: 'Meera', lastName: 'Mukherjee', dept: 'Human Resources', desig: 'HR Associate', sal: 45000 },
      { firstName: 'Ishaan', lastName: 'Trivedi', dept: 'AI & Data Science', desig: 'AI Ethics Researcher', sal: 78000 },
      { firstName: 'Ritu', lastName: 'Bhattacharya', dept: 'Finance', desig: 'Business Analyst', sal: 56000 },
      { firstName: 'Devansh', lastName: 'Saxena', dept: 'Engineering', desig: 'Frontend Architect', sal: 88000 },
    ];

    const createdEmployees = [adminEmp, hrEmp, aaravEmp];

    for (let i = 0; i < employeeData.length; i++) {
      const item = employeeData[i];
      const email = `${item.firstName.toLowerCase()}.${item.lastName.toLowerCase()}@neuzenai.com`;

      const u = await User.create({
        name: `${item.firstName} ${item.lastName}`,
        email,
        password: empHashedPass,
        role: 'employee',
      });

      const emp = await Employee.create({
        user: u._id,
        employeeCode: `NZ-${String(i + 4).padStart(4, '0')}`,
        firstName: item.firstName,
        lastName: item.lastName,
        phone: `+91 98765 ${43213 + i}`,
        department: item.dept,
        designation: item.desig,
        joiningDate: new Date(2024, i % 12, (i + 1) * 2),
        salary: {
          basicSalary: item.sal,
          allowances: Math.round(item.sal * 0.15),
          deductions: Math.round(item.sal * 0.05),
        },
        bankDetails: {
          accountNumber: `9000${1000 + i}`,
          bankName: i % 2 === 0 ? 'HDFC Bank' : 'ICICI Bank',
          ifscCode: i % 2 === 0 ? 'HDFC00099' : 'ICIC00088',
        },
      });

      u.employeeId = emp._id;
      await u.save();
      createdEmployees.push(emp);
    }

    console.log(`[Inline Seed] Created ${createdEmployees.length} total employee profiles!`);

    // 5. Seed Attendance Records
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const attendanceDocs = [];
    createdEmployees.forEach((emp, index) => {
      if (index % 5 !== 0) {
        attendanceDocs.push({
          employee: emp._id,
          date: todayStr,
          checkIn: new Date(new Date().setHours(9, 10 + index, 0, 0)),
          status: 'present',
          remarks: 'Punctual Daily Check-In',
        });
      }

      attendanceDocs.push({
        employee: emp._id,
        date: yesterdayStr,
        checkIn: new Date(new Date(yesterday).setHours(9, 0 + index, 0, 0)),
        checkOut: new Date(new Date(yesterday).setHours(17, 30 + index, 0, 0)),
        status: 'present',
        remarks: 'Normal Shift Completed',
      });
    });

    await Attendance.insertMany(attendanceDocs);

    // 6. Seed Leave Applications
    const leave1 = await LeaveRequest.create({
      employee: createdEmployees[2]._id, // Aarav Mehta
      leaveType: 'casual',
      startDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 4)),
      reason: 'Attending technical conference & family event in Bengaluru.',
      status: 'approved',
      reviewedBy: hrUser._id,
      reviewedAt: Date.now(),
      reviewComment: 'Approved by Sunita Sharma (HR Lead)',
    });

    await LeaveRequest.create({
      employee: createdEmployees[3]._id, // Maya Patel
      leaveType: 'sick',
      startDate: new Date(new Date().setDate(new Date().getDate() + 6)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      reason: 'Medical checkup and rest.',
      status: 'pending',
    });

    await LeaveRequest.create({
      employee: createdEmployees[5]._id, // Priya Sharma
      leaveType: 'earned',
      startDate: new Date(new Date().setDate(new Date().getDate() + 10)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
      reason: 'Annual family vacation.',
      status: 'pending',
    });

    // 7. Shared Team Calendar Events
    await CalendarEvent.create([
      {
        title: `Approved Leave: Aarav Mehta (Casual)`,
        type: 'leave',
        startDate: leave1.startDate,
        endDate: leave1.endDate,
        description: 'Approved Casual Leave for Aarav Mehta',
        createdBy: hrUser._id,
        visibility: 'all',
      },
      {
        title: 'NEUZEN AI Innovation Summit - Mumbai',
        type: 'meeting',
        startDate: new Date('2026-08-20'),
        endDate: new Date('2026-08-22'),
        description: 'All-hands tech strategy & product roadmap alignment',
        createdBy: adminUser._id,
        visibility: 'all',
      },
      {
        title: 'Independence Day Holiday',
        type: 'holiday',
        startDate: new Date('2026-08-15'),
        endDate: new Date('2026-08-15'),
        description: 'National Public Holiday',
        createdBy: adminUser._id,
        visibility: 'all',
      },
    ]);

    // 8. Onboarding Candidates
    await OfferLetter.create([
      {
        candidateName: 'Varun Choudhury',
        email: 'varun.choudhury@example.com',
        designation: 'Senior Cloud Architect',
        department: 'Engineering',
        salary: { basicSalary: 85000, allowances: 10000, deductions: 5000, netSalary: 90000 },
        joiningDate: new Date('2026-09-01'),
        status: 'sent',
        createdBy: hrUser._id,
        letterContent: '<p>Official offer letter issued to Varun Choudhury for Senior Cloud Architect position.</p>',
      },
      {
        candidateName: 'Anshika Saxena',
        email: 'anshika.saxena@example.com',
        designation: 'Product Marketing Manager',
        department: 'Marketing',
        salary: { basicSalary: 62000, allowances: 7000, deductions: 3000, netSalary: 66000 },
        joiningDate: new Date('2026-09-15'),
        status: 'draft',
        createdBy: hrUser._id,
        letterContent: '<p>Draft offer letter for Anshika Saxena.</p>',
      },
    ]);

    // 9. Multi-Month Payroll Records (Month 6 = Paid, Month 7 = Processed, Month 8 = Pending/Processed)
    const payrollDocs = [];

    // Month 6 (June 2026) - All Employees Paid
    createdEmployees.forEach((emp) => {
      payrollDocs.push({
        employee: emp._id,
        month: 6,
        year: 2026,
        basicSalary: emp.salary.basicSalary,
        allowances: emp.salary.allowances,
        deductions: emp.salary.deductions,
        netSalary: emp.salary.basicSalary + emp.salary.allowances - emp.salary.deductions,
        paymentStatus: 'paid',
        processedBy: hrUser._id,
      });
    });

    // Month 7 (July 2026) - All Employees Processed
    createdEmployees.forEach((emp) => {
      payrollDocs.push({
        employee: emp._id,
        month: 7,
        year: 2026,
        basicSalary: emp.salary.basicSalary,
        allowances: emp.salary.allowances,
        deductions: emp.salary.deductions,
        netSalary: emp.salary.basicSalary + emp.salary.allowances - emp.salary.deductions,
        paymentStatus: 'processed',
        processedBy: hrUser._id,
      });
    });

    // Month 8 (August 2026) - Current Month In Progress
    createdEmployees.slice(0, 12).forEach((emp) => {
      payrollDocs.push({
        employee: emp._id,
        month: 8,
        year: 2026,
        basicSalary: emp.salary.basicSalary,
        allowances: emp.salary.allowances,
        deductions: emp.salary.deductions,
        netSalary: emp.salary.basicSalary + emp.salary.allowances - emp.salary.deductions,
        paymentStatus: 'processed',
        processedBy: hrUser._id,
      });
    });

    await Payroll.insertMany(payrollDocs);

    console.log('\n======================================================');
    console.log(`✅ NEUZEN AI HRMS PAYROLL SEED COMPLETE (${payrollDocs.length} Monthly Payslip Records)!`);
    console.log('Months Seeded: June 2026 (Paid), July 2026 (Processed), August 2026 (Active)');
    console.log('======================================================');
  } catch (err) {
    console.error('[Inline Seed Error]:', err.message);
  }
};

module.exports = runSeedInline;
