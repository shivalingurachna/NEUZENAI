import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import FormInput from '../../components/common/FormInput';
import ErrorState from '../../components/common/ErrorState';
import { Plus, Search } from 'lucide-react';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    department: 'Engineering',
    designation: 'Software Engineer',
    basicSalary: 40000,
    allowances: 6000,
    deductions: 2000,
    role: 'employee',
  });

  const fetchEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axiosClient.get('/employees', {
        params: { search, department },
      });
      if (res.data.success) {
        setEmployees(res.data.employees);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch employee records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [department]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEmployees();
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        department: formData.department,
        designation: formData.designation,
        role: formData.role,
        salary: {
          basicSalary: Number(formData.basicSalary),
          allowances: Number(formData.allowances),
          deductions: Number(formData.deductions),
        },
      };

      const res = await axiosClient.post('/employees', payload);
      if (res.data.success) {
        setIsModalOpen(false);
        fetchEmployees();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create employee');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      header: 'Code',
      cell: (row) => <span className="font-mono font-bold text-sky-700">{row.employeeCode}</span>,
    },
    {
      header: 'Employee Name',
      cell: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.firstName} {row.lastName}</p>
          <p className="text-xs text-slate-500">{row.phone || 'No phone'}</p>
        </div>
      ),
    },
    {
      header: 'Department & Designation',
      cell: (row) => (
        <div>
          <p className="font-semibold text-slate-800">{row.designation}</p>
          <span className="text-xs text-sky-700 font-bold">{row.department}</span>
        </div>
      ),
    },
    {
      header: 'Salary Breakdown',
      cell: (row) => (
        <div className="text-xs">
          <p className="text-emerald-700 font-bold">
            Basic: ₹{(row.salary?.basicSalary || 0).toLocaleString()}
          </p>
          <p className="text-slate-500">Net Est: ₹{((row.salary?.basicSalary || 0) + (row.salary?.allowances || 0) - (row.salary?.deductions || 0)).toLocaleString()}</p>
        </div>
      ),
    },
    {
      header: 'Joining Date',
      cell: (row) => new Date(row.joiningDate).toLocaleDateString(),
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.employmentStatus} />,
    },
  ];

  if (error) return <ErrorState message={error} onRetry={fetchEmployees} />;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-outfit">Employee Directory</h1>
          <p className="text-sm text-slate-500">Manage employee profiles, designations, and compensation</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-sky-600/20"
        >
          <Plus className="w-4 h-4" /> Add New Employee
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-2xl border border-sky-100 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, code, or designation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-sky-500"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-slate-100 text-xs font-bold text-slate-700 rounded-xl hover:bg-slate-200">
            Search
          </button>
        </form>

        <div className="sm:w-48">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-sky-500"
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="Design">Design</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
      </div>

      <DataTable columns={columns} data={employees} isLoading={loading} emptyTitle="No Employee Records Found" />

      {/* Add Employee Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Employee Profile">
        <form onSubmit={handleAddEmployee} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="First Name" name="firstName" value={formData.firstName} onChange={handleFormChange} required />
            <FormInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleFormChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleFormChange} required />
            <FormInput label="Temporary Password" name="password" type="password" value={formData.password} onChange={handleFormChange} placeholder="Default: Employee@123" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Phone Number" name="phone" value={formData.phone} onChange={handleFormChange} />
            <FormInput
              label="Role"
              name="role"
              type="select"
              value={formData.role}
              onChange={handleFormChange}
              options={[
                { value: 'employee', label: 'Employee' },
                { value: 'hr', label: 'HR Manager' },
                { value: 'admin', label: 'Admin' },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Department" name="department" value={formData.department} onChange={handleFormChange} required />
            <FormInput label="Designation" name="designation" value={formData.designation} onChange={handleFormChange} required />
          </div>

          <div className="grid grid-cols-3 gap-3 p-3 bg-sky-50/50 rounded-xl border border-sky-100">
            <FormInput label="Basic Salary (₹)" name="basicSalary" type="number" value={formData.basicSalary} onChange={handleFormChange} required />
            <FormInput label="Allowances (₹)" name="allowances" type="number" value={formData.allowances} onChange={handleFormChange} />
            <FormInput label="Deductions (₹)" name="deductions" type="number" value={formData.deductions} onChange={handleFormChange} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-sky-600/20">
              {submitting ? 'Creating...' : 'Create Employee Record'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
