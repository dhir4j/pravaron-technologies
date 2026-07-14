I have updated the document with the correct company name: Pravaron Technologies.

Pravaron Technologies Website & Hiring Management System Requirements

Project Overview

Update the Pravaron Technologies website with a modern UI/UX redesign, new visual theme, complete backend infrastructure, and an integrated hiring management system.

The website should be redesigned with the discussed vertical light red theme, improved content structure, updated layouts, and a complete career management platform for applicants and administrators.

---

1. Website UI/UX Redesign

Theme Update

Requirements

- Change the complete Pravaron Technologies website theme to:
  - Vertical layout design
  - Light red color palette
  - Modern technology company aesthetic
  - Professional and clean interface
  - Fully responsive design

UI/UX Improvements

- Redesign website components and sections.
- Improve navigation and user flow.
- Add modern animations and interactions.
- Improve typography and spacing.
- Optimize mobile and desktop experience.
- Create a premium technology brand identity.

Website Content & Layout Updates

Update and restructure:

- Homepage
- About Pravaron Technologies
- Services section
- Technology stack section
- Solutions/products section
- Careers page
- Contact page

Content should clearly represent:

- Company expertise
- Technology capabilities
- Services offered
- Career opportunities

---

2. Backend Development

Develop a complete backend system for:

- User authentication
- Applicant management
- Job posting management
- Application tracking
- Email notifications
- Admin operations

---

3. Applicant Account System

User Registration With OTP Verification

Applicants should be able to create an account using mobile OTP verification.

Registration Flow

1. Applicant enters:
   
   - Full name
   - Email address
   - Mobile number
   - Required profile information

2. OTP verification:
   
   - OTP is sent through SMS gateway.
   - User verifies OTP.
   - Account is activated.

OTP Requirements

- Integrate purchased SMS provider.
- Secure OTP generation.
- OTP expiry handling.
- OTP resend functionality.
- Rate limiting for OTP requests.

---

4. Applicant Dashboard

Applicants should have their own dashboard.

Features

Users can view:

- Profile information
- Applied jobs
- Application history
- Current application status
- Status updates
- Company notifications

Application Status Examples

Available statuses:

- Applied
- Under Review
- Shortlisted
- Document Review
- Interview Scheduled
- Selected
- Rejected

Example:

Admin changes:

Application Status:
Applied → Selected

Applicant dashboard updates:

Status: Selected

Admin changes:

Application Status:
Applied → Document Review

Applicant dashboard updates:

Status: Document Review

---

5. Admin Dashboard

Create a complete hiring management dashboard for Pravaron Technologies.

Career Management

Admin can:

- Create job openings
- Update job postings
- Remove job postings
- Upload job descriptions
- Add requirements and skills
- Manage active/inactive jobs

---

Applicant Management

Admin can:

- View all applicants
- Search applicants
- Filter applications
- View applicant details
- Review resumes/documents
- Update application status

---

6. Application Status Synchronization

Requirement

Application status changes made by admin should automatically reflect for applicants.

Example:

Admin Dashboard:

Applicant: XYZ

Status Updated:
Applied → Selected

System Actions:

Applicant Dashboard

Shows:

Application Status:
Selected

Email Notification

Applicant receives:

Your Pravaron Technologies application status has been updated.

Current Status:
Selected

---

7. Email Notification System

Admin Email Updates

Admin should receive emails for:

- New applicant registration
- New job application
- Application updates
- Hiring activities

---

Applicant Email Updates

Applicants should receive emails for:

- Account verification
- Successful application submission
- Status changes
- Interview updates
- Selection/rejection updates

---

8. Real-Time Updates

The system should support real-time status updates.

Possible implementation:

- WebSocket
- Server-Sent Events (SSE)
- Real-time database listener

When admin updates application status:

- Applicant dashboard updates automatically.
- Email notification is triggered.
- Notification history is stored.

---

9. Database Requirements

Users

Fields:

- User ID
- Full Name
- Email
- Mobile Number
- OTP Verification Status
- Created Date

---

Jobs

Fields:

- Job ID
- Job Title
- Description
- Required Skills
- Experience
- Location
- Employment Type
- Status
- Created Date

---

Applications

Fields:

- Application ID
- User ID
- Job ID
- Resume/Documents
- Current Status
- Applied Date
- Updated Date

---

Status History

Fields:

- Application ID
- Previous Status
- New Status
- Updated By
- Timestamp

---

10. SMS & Email Integration

SMS Gateway

Integrate SMS service for:

- OTP verification
- Important applicant alerts

---

Email Service

Integrate email service for:

- Applicant communication
- Admin alerts
- Status update notifications

---

11. Final Deliverables

The completed Pravaron Technologies platform should include:

- Redesigned company website
- Vertical light red theme
- Updated content and layouts
- Complete backend system
- OTP-based applicant registration
- Applicant dashboard
- Admin hiring dashboard
- Career/job management system
- Application tracking system
- Real-time status updates
- SMS OTP integration
- Email notification system
- Complete recruitment workflow

---

Acceptance Criteria

- [ ] Pravaron Technologies website redesigned.
- [ ] New light red vertical theme implemented.
- [ ] UI/UX improved across all pages.
- [ ] Backend APIs developed.
- [ ] Applicant OTP registration works.
- [ ] Applicants can track application status.
- [ ] Admin can manage jobs and candidates.
- [ ] Status updates reflect automatically.
- [ ] Email notifications work.
- [ ] SMS OTP verification works.
- [ ] Complete hiring workflow is functional.