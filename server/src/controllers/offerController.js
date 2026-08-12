const OfferLetter = require('../models/OfferLetter');
const Employee = require('../models/Employee');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET /api/onboarding
const getOfferLetters = async (req, res, next) => {
  try {
    const offerLetters = await OfferLetter.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: offerLetters.length,
      offerLetters,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/onboarding/offer-letter
const createOfferLetter = async (req, res, next) => {
  try {
    const { candidateName, email, designation, department, salary, joiningDate, letterContent } = req.body;

    const basicSalary = Number(salary.basicSalary) || 30000;
    const allowances = Number(salary.allowances) || 5000;
    const deductions = Number(salary.deductions) || 2000;
    const netSalary = basicSalary + allowances - deductions;

    const defaultLetterContent = letterContent || `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>OFFER OF EMPLOYMENT</h2>
      <p>Dear <strong>${candidateName}</strong>,</p>
      <p>We are pleased to extend an offer of employment for the position of <strong>${designation}</strong> in the <strong>${department}</strong> department at <strong>NEUZEN AI</strong>.</p>
      <p><strong>Joining Date:</strong> ${new Date(joiningDate).toLocaleDateString()}</p>
      <p><strong>Compensation Structure:</strong></p>
      <ul>
        <li>Basic Salary: ₹${basicSalary.toLocaleString()}</li>
        <li>Allowances: ₹${allowances.toLocaleString()}</li>
        <li>Deductions: ₹${deductions.toLocaleString()}</li>
        <li><strong>Net Salary: ₹${netSalary.toLocaleString()} / month</strong></li>
      </ul>
      <p>We look forward to welcoming you to NEUZEN AI.</p>
    </div>
    `;

    const offerLetter = await OfferLetter.create({
      candidateName,
      email: email.toLowerCase(),
      designation,
      department,
      salary: {
        basicSalary,
        allowances,
        deductions,
        netSalary,
      },
      joiningDate,
      letterContent: defaultLetterContent,
      createdBy: req.user._id,
      status: 'draft',
    });

    return res.status(201).json({
      success: true,
      message: 'Offer letter created successfully',
      offerLetter,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/onboarding/offer-letter/:id
const getOfferLetterById = async (req, res, next) => {
  try {
    const offerLetter = await OfferLetter.findById(req.params.id);
    if (!offerLetter) {
      return res.status(404).json({
        success: false,
        message: 'Offer letter not found',
      });
    }

    return res.status(200).json({
      success: true,
      offerLetter,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/onboarding/offer-letter/:id
const updateOfferLetter = async (req, res, next) => {
  try {
    const { status, convertToEmployee } = req.body;
    let offerLetter = await OfferLetter.findById(req.params.id);

    if (!offerLetter) {
      return res.status(404).json({
        success: false,
        message: 'Offer letter not found',
      });
    }

    if (status) {
      offerLetter.status = status;
    }
    await offerLetter.save();

    // If converted to employee, automatically generate User & Employee account!
    let createdEmployee = null;
    if (convertToEmployee || status === 'accepted') {
      const existingUser = await User.findOne({ email: offerLetter.email });
      if (!existingUser) {
        const count = await Employee.countDocuments();
        const employeeCode = `NZ-${String(count + 101).padStart(4, '0')}`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Employee@123', salt);

        const names = offerLetter.candidateName.split(' ');
        const firstName = names[0] || offerLetter.candidateName;
        const lastName = names.slice(1).join(' ') || 'User';

        const user = await User.create({
          name: offerLetter.candidateName,
          email: offerLetter.email,
          password: hashedPassword,
          role: 'employee',
        });

        createdEmployee = await Employee.create({
          user: user._id,
          employeeCode,
          firstName,
          lastName,
          department: offerLetter.department,
          designation: offerLetter.designation,
          joiningDate: offerLetter.joiningDate,
          employmentStatus: 'active',
          salary: {
            basicSalary: offerLetter.salary.basicSalary,
            allowances: offerLetter.salary.allowances,
            deductions: offerLetter.salary.deductions,
          },
        });

        user.employeeId = createdEmployee._id;
        await user.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Offer letter updated successfully',
      offerLetter,
      createdEmployee,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOfferLetters,
  createOfferLetter,
  getOfferLetterById,
  updateOfferLetter,
};
