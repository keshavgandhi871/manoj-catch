/**
 * Main Application Logic & UI Renderer
 */

// Global toast function
window.showToast = function (message, type = "success") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      ${type === "success" ? "✓" : "ℹ"}
    </div>
    <div class="toast-message">${message}</div>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2800);
};

// Global copy to clipboard
window.copyToClipboard = function (text, label = "Value") {
  if (!text) {
    window.showToast(`No ${label} available to copy`, "info");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    window.showToast(`Copied ${label}: "${text.length > 25 ? text.substring(0, 25) + '...' : text}"`);
  }).catch(() => {
    // Fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    window.showToast(`Copied ${label}!`);
  });
};

class ProposalApp {
  constructor() {
    this.activeTab = "dossier";
    this.searchQuery = "";
    this.init();
  }

  init() {
    this.renderHeader();
    this.renderAll();
    this.bindEvents();

    // Subscribe to store updates
    window.store.subscribe(() => {
      this.renderHeader();
      this.renderAll();
    });
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll(".nav-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        const target = tab.dataset.tab;
        this.switchTab(target);
      });
    });

    // Theme Toggle
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        window.store.toggleTheme();
        this.updateThemeButton();
      });
    }
    this.updateThemeButton();

    // Global Search
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.applySearchFilter();
      });
    }

    // Header Quick Actions
    const printBtn = document.getElementById("btn-print-dossier");
    if (printBtn) {
      printBtn.addEventListener("click", () => window.print());
    }

    const copyAllBtn = document.getElementById("btn-copy-all");
    if (copyAllBtn) {
      copyAllBtn.addEventListener("click", () => this.copyAllTextProposal());
    }

    const exportJsonBtn = document.getElementById("btn-export-json");
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener("click", () => this.exportJsonFile());
    }

    const resetBtn = document.getElementById("btn-reset-data");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Reset all details back to original default proposal data?")) {
          window.store.resetToDefault();
          window.showToast("Proposal data reset to original details.");
        }
      });
    }
  }

  updateThemeButton() {
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      const isDark = window.store.theme === "dark";
      themeBtn.innerHTML = isDark
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><span>Light Mode</span>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg><span>Dark Mode</span>`;
    }
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll(".nav-tab").forEach(t => {
      t.classList.toggle("active", t.dataset.tab === tabId);
    });
    document.querySelectorAll(".tab-content-panel").forEach(panel => {
      panel.classList.toggle("active", panel.id === `panel-${tabId}`);
    });

    if (tabId === "edit") {
      this.populateEditForm();
    }
  }

  renderHeader() {
    const data = window.store.data;
    
    // Header Avatar / Client info
    const nameEl = document.getElementById("header-client-name");
    const roleEl = document.getElementById("header-client-role");
    const avatarEl = document.getElementById("header-avatar-img");
    
    if (nameEl) nameEl.textContent = data.personal.clientName;
    if (roleEl) roleEl.textContent = `${data.employment.designation} • ${data.employment.companyName}`;
    if (avatarEl) avatarEl.src = "assets/couple_pink_dress.jpg";

    // Quick Stats Bar
    const statAge = document.getElementById("stat-age");
    const statIncome = document.getElementById("stat-income");
    const statCity = document.getElementById("stat-city");
    const statHealth = document.getElementById("stat-health");
    const statAadhaar = document.getElementById("stat-aadhaar");
    const statPan = document.getElementById("stat-pan");

    if (statAge) statAge.textContent = "47 Yrs (02.01.1979)";
    if (statIncome) statIncome.textContent = `₹${data.employment.grossYearlyIncome}`;
    if (statCity) statCity.textContent = data.contact.city;
    if (statHealth) statHealth.textContent = "Standard / Non-Smoker";
    if (statAadhaar) statAadhaar.textContent = data.kyc.aadhaarNumber;
    if (statPan) statPan.textContent = data.kyc.panNumber || "Pending Upload";
  }

  renderAll() {
    this.renderDossierView();
    this.renderDocumentVault();
    this.renderPortalCopy();
    this.renderPrintableSummary();
  }

  // --- TAB 1: DOSSIER VIEW ---
  renderDossierView() {
    const data = window.store.data;
    const container = document.getElementById("dossier-grid");
    if (!container) return;

    const sections = [
      {
        title: "Personal & Demographic Identity",
        icon: "👤",
        badge: "Verified KYC",
        items: [
          { label: "Full Name", val: data.personal.clientName, key: "Name" },
          { label: "Date of Birth (DOB)", val: data.personal.dob, key: "DOB" },
          { label: "Gender", val: data.personal.gender, key: "Gender" },
          { label: "Identification Mark", val: data.personal.identificationMark, key: "ID Mark" },
          { label: "Place of Birth", val: data.personal.placeOfBirth, key: "Place of Birth" },
          { label: "Father's Name", val: data.personal.fatherName, key: "Father's Name" },
          { label: "Mother's Name", val: data.personal.motherName, key: "Mother's Name" },
          { label: "Education / Qualification", val: data.personal.education, key: "Education" },
          { label: "Marital Status", val: data.personal.maritalStatus, key: "Marital Status" },
          { label: "Nationality & Status", val: `${data.personal.nationality} (${data.personal.residentialStatus})`, key: "Nationality" },
        ],
        fullWidthItems: [
          { label: "Permanent Address (Aadhaar Verified)", val: data.personal.permanentAddress, key: "Address" }
        ]
      },
      {
        title: "Contact & Communication",
        icon: "📞",
        badge: "Primary",
        items: [
          { label: "Mobile Number", val: data.contact.mobileNo, key: "Mobile" },
          { label: "Alternate Mobile Number", val: data.contact.altMobileNo, key: "Alt Mobile" },
          { label: "Email Address", val: data.contact.emailId, key: "Email" },
          { label: "City & State", val: `${data.contact.city}, ${data.contact.state}`, key: "City" },
          { label: "Postal PIN Code", val: data.personal.pincode, key: "PIN Code" }
        ]
      },
      {
        title: "Employment, Profession & Income",
        icon: "💼",
        badge: "Sun Pharma",
        items: [
          { label: "Company Name", val: data.employment.companyName, key: "Company" },
          { label: "Designation", val: data.employment.designation, key: "Designation" },
          { label: "Gross Annual Income", val: `₹${data.employment.grossYearlyIncome} (INR 8,60,000/-)`, key: "Gross Income" },
          { label: "Industry / Sector", val: data.employment.industryType, key: "Industry" },
          { label: "Occupation Type", val: data.personal.occupation, key: "Occupation" },
          { label: "Nature of Duties", val: data.employment.natureOfDuties, key: "Duties" },
        ],
        fullWidthItems: [
          { label: "Company / Work Address", val: data.employment.companyAddress, key: "Company Address" }
        ]
      },
      {
        title: "Spouse & Family Profile",
        icon: "💍",
        badge: "Married",
        items: [
          { label: "Spouse Full Name", val: data.spouse.spouseName, key: "Spouse Name" },
          { label: "Spouse Date of Birth", val: data.spouse.spouseDob, key: "Spouse DOB" },
          { label: "Spouse Qualification", val: data.spouse.spouseQualification, key: "Spouse Qualification" },
          { label: "Spouse Occupation", val: data.spouse.spouseOccupation, key: "Spouse Occupation" }
        ]
      },
      {
        title: "Nominee & Beneficiary Details",
        icon: "🛡️",
        badge: "100% Share",
        items: [
          { label: "Nominee Name", val: data.nominee.nomineeName, key: "Nominee Name" },
          { label: "Relationship with Proposer", val: data.nominee.nomineeRelation, key: "Nominee Relation" },
          { label: "Nominee Date of Birth", val: data.nominee.nomineeDob, key: "Nominee DOB" },
          { label: "Nominee Contact Number", val: data.nominee.nomineeMobile, key: "Nominee Mobile" },
          { label: "Share Percentage", val: data.nominee.nomineeShare, key: "Nominee Share" },
          { label: "Nominee Email", val: data.nominee.nomineeEmail || data.contact.emailId, key: "Nominee Email" }
        ]
      },
      {
        title: "Medical & Lifestyle Declaration",
        icon: "🩺",
        badge: "All Negative / Standard Life",
        items: [
          { label: "Smoking Habit", val: `${data.medical.smoking} (${data.medical.smokingDetails})`, key: "Smoking" },
          { label: "Alcohol Consumption", val: `${data.medical.alcohol} (${data.medical.alcoholDetails})`, key: "Alcohol" },
          { label: "Height & Weight", val: `${data.medical.height}, ${data.medical.weight}`, key: "Height & Weight" },
          { label: "Calculated Body Mass Index", val: data.medical.bmi, key: "BMI" },
          { label: "Diabetes History", val: data.medical.diabetes, key: "Diabetes" },
          { label: "Hypertension / Blood Pressure", val: data.medical.bloodPressure, key: "Blood Pressure" },
          { label: "Any Existing Health Issues", val: data.medical.anyHealthIssue, key: "Health Issues" },
          { label: "Past 5 Yrs Surgeries / Hospitalization", val: data.medical.pastSurgeries5Yrs, key: "Surgery History" },
          { label: "Family Medical History Issues", val: data.medical.familyMedicalHistory, key: "Family Health" },
          { label: "Family History of Critical Illnesses", val: data.medical.familyMajorDiseaseDeath, key: "Family Critical Illness" },
          { label: "Previous Insurance Policies", val: data.medical.previousPolicy, key: "Previous Policy" },
          { label: "Overall Medical Status", val: data.medical.currentHealthStatus, key: "Overall Health" }
        ]
      },
      {
        title: "Banking & Settlement Information",
        icon: "🏦",
        badge: "UCO Bank Verified",
        items: [
          { label: "Bank Name", val: data.banking.bankName, key: "Bank Name" },
          { label: "Branch Name", val: data.banking.branchName, key: "Branch" },
          { label: "Account Number", val: data.banking.accountNumber, key: "Account Number" },
          { label: "IFSC Code", val: data.banking.ifscCode, key: "IFSC Code" },
          { label: "Account Type", val: data.banking.accountType, key: "Account Type" },
          { label: "Cheque Number", val: data.banking.chequeNumber, key: "Cheque Number" },
          { label: "MICR Code", val: data.banking.micrCode, key: "MICR Code" }
        ],
        fullWidthItems: [
          { label: "Bank Branch Full Address", val: data.banking.branchAddress, key: "Bank Address" }
        ]
      },
      {
        title: "Identity Cards & KYC Status",
        icon: "🆔",
        badge: "UIDAI Linked",
        items: [
          { label: "Aadhaar Card Number", val: data.kyc.aadhaarNumber, key: "Aadhaar Number" },
          { label: "Aadhaar Verification Status", val: data.kyc.aadhaarStatus, key: "Aadhaar Status" },
          { label: "PAN Card Number", val: data.kyc.panNumber || "Pending Upload (Click to Add)", key: "PAN Number", isActionable: !data.kyc.panNumber },
          { label: "PAN Card Status", val: data.kyc.panStatus, key: "PAN Status" }
        ]
      }
    ];

    let html = "";
    sections.forEach(sec => {
      html += `
        <div class="dossier-card" data-section="${sec.title.toLowerCase()}">
          <div class="card-header">
            <div class="card-title-group">
              <span class="card-icon">${sec.icon}</span>
              <h3>${sec.title}</h3>
            </div>
            <span class="badge badge-accent">${sec.badge}</span>
          </div>
          <div class="card-body">
            <div class="dossier-fields-grid">
              ${sec.items.map(item => `
                <div class="dossier-item">
                  <div class="item-label">${item.label}</div>
                  <div class="item-value-row">
                    <span class="item-value ${item.isActionable ? 'text-warning font-medium' : ''}">${item.val}</span>
                    <button class="btn-copy-mini" onclick="window.copyToClipboard('${item.val.replace(/'/g, "\\'")}', '${item.key}')" title="Copy ${item.key}">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
            ${sec.fullWidthItems ? sec.fullWidthItems.map(fw => `
              <div class="dossier-item full-width mt-3">
                <div class="item-label">${fw.label}</div>
                <div class="item-value-row">
                  <span class="item-value">${fw.val}</span>
                  <button class="btn-copy-mini" onclick="window.copyToClipboard('${fw.val.replace(/'/g, "\\'")}', '${fw.key}')" title="Copy ${fw.key}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                </div>
              </div>
            `).join("") : ""}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // --- TAB 2: DOCUMENT VAULT & GALLERY ---
  renderDocumentVault() {
    const data = window.store.data;
    const container = document.getElementById("vault-grid");
    if (!container) return;

    let html = "";

    // Upload Action Card for PAN Card / Additional Documents
    const panUploaded = Boolean(data.kyc.panNumber);
    html += `
      <div class="doc-card upload-slot-card ${panUploaded ? 'is-completed' : 'is-pending'}">
        <div class="upload-slot-content">
          <div class="upload-slot-icon">💳</div>
          <div class="upload-slot-info">
            <span class="badge ${panUploaded ? 'badge-success' : 'badge-warning'}">
              ${panUploaded ? 'PAN Card Attached' : 'PAN Card Required'}
            </span>
            <h4>${panUploaded ? `PAN: ${data.kyc.panNumber}` : 'Add / Upload PAN Card'}</h4>
            <p class="text-secondary">${panUploaded ? 'Click to view or replace PAN card details' : 'User note: "pan card i will give neste" — Click to upload image or enter PAN'}</p>
          </div>
          <button class="btn ${panUploaded ? 'btn-secondary' : 'btn-primary'}" onclick="window.docUploader.openPanModal()">
            ${panUploaded ? 'Edit PAN Details' : 'Upload PAN Now'}
          </button>
        </div>
      </div>
    `;

    // Render all documents
    data.documents.forEach(doc => {
      html += `
        <div class="doc-card" data-doc-id="${doc.id}">
          <div class="doc-card-media" onclick='window.documentViewer.open(${JSON.stringify(doc)})'>
            <img src="${doc.src || doc.rawSrc}" alt="${doc.title}" loading="lazy" />
            <div class="doc-media-overlay">
              <span class="overlay-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg> Click to Inspect & Zoom</span>
            </div>
            <span class="doc-category-badge">${doc.category}</span>
          </div>
          <div class="doc-card-details">
            <div class="doc-card-title-row">
              <h4>${doc.title}</h4>
              <span class="badge badge-success">${doc.status}</span>
            </div>
            <p class="doc-card-desc">${doc.description}</p>
            
            ${doc.extractedData ? `
              <div class="doc-extracted-tags">
                ${Object.entries(doc.extractedData).slice(0, 3).map(([k, v]) => `
                  <div class="doc-tag">
                    <span class="tag-k">${k}:</span>
                    <span class="tag-v">${v}</span>
                  </div>
                `).join("")}
              </div>
            ` : ""}

            <div class="doc-card-actions">
              <button class="btn btn-sm btn-secondary" onclick='window.documentViewer.open(${JSON.stringify(doc)})'>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Inspect
              </button>
              <a class="btn btn-sm btn-secondary" href="${doc.src || doc.rawSrc}" download="${doc.title.replace(/\s+/g, '_')}.png">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download
              </a>
              ${doc.id.startsWith("custom_doc_") ? `
                <button class="btn btn-sm btn-danger-outline" onclick="window.store.removeDocument('${doc.id}')" title="Delete custom document">
                  ✕
                </button>
              ` : ""}
            </div>
          </div>
        </div>
      `;
    });

    // Add extra document upload card
    html += `
      <div class="doc-card upload-slot-card add-custom-card">
        <div class="upload-slot-content">
          <div class="upload-slot-icon">📁</div>
          <div class="upload-slot-info">
            <span class="badge badge-secondary">Custom Attachments</span>
            <h4>Attach More Documents</h4>
            <p class="text-secondary">Upload Salary Slips, Form 16, Medical Reports, or KYC records</p>
          </div>
          <button class="btn btn-secondary" onclick="window.docUploader.openCustomDocModal()">+ Upload Document</button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  // --- TAB 3: PORTAL FAST-COPY ---
  renderPortalCopy() {
    const data = window.store.data;
    const container = document.getElementById("portal-copy-grid");
    if (!container) return;

    const copyBlocks = [
      {
        title: "1. Personal Information Block",
        desc: "Ready to paste into Proposer Demographics section",
        text: `Client Name: ${data.personal.clientName}
DOB: ${data.personal.dob}
Gender: ${data.personal.gender}
Identification Mark: ${data.personal.identificationMark}
Place of Birth: ${data.personal.placeOfBirth}
Father's Name: ${data.personal.fatherName}
Mother's Name: ${data.personal.motherName}
Education: ${data.personal.education}
Occupation: ${data.personal.occupation}
Marital Status: ${data.personal.maritalStatus}`
      },
      {
        title: "2. Contact & Address Block",
        desc: "Ready to paste into Proposer Address & Contact section",
        text: `Mobile No: ${data.contact.mobileNo}
Alternate Mobile No: ${data.contact.altMobileNo}
Email ID: ${data.contact.emailId}
Permanent Address: ${data.personal.permanentAddress}
Current Address: ${data.personal.currentAddress}
PIN Code: ${data.personal.pincode}
City: ${data.contact.city}
State: ${data.contact.state}`
      },
      {
        title: "3. Employment & Income Block",
        desc: "Ready to paste into Financial / Underwriting section",
        text: `Company Name: ${data.employment.companyName}
Company Address: ${data.employment.companyAddress}
Designation: ${data.employment.designation}
Gross Yearly Income: ${data.employment.grossYearlyIncome}
Industry Type: ${data.employment.industryType}
Nature of Duties: ${data.employment.natureOfDuties}`
      },
      {
        title: "4. Spouse & Nominee Block",
        desc: "Ready to paste into Spouse & Nominee section",
        text: `Spouse Name: ${data.spouse.spouseName}
Spouse DOB: ${data.spouse.spouseDob}
Spouse Qualification: ${data.spouse.spouseQualification}
Spouse Occupation: ${data.spouse.spouseOccupation}
Nominee Name: ${data.nominee.nomineeName}
Nominee DOB: ${data.nominee.nomineeDob}
Nominee Relation: ${data.nominee.nomineeRelation}
Nominee Mobile: ${data.nominee.nomineeMobile}
Nominee Email: ${data.nominee.nomineeEmail}
Nominee Share: ${data.nominee.nomineeShare}`
      },
      {
        title: "5. Medical & Lifestyle Declaration Block",
        desc: "Ready to paste into Health / Underwriting Questionnaire",
        text: `Smoking: ${data.medical.smoking}
Alcohol: ${data.medical.alcohol}
Height: ${data.medical.height}
Weight: ${data.medical.weight}
BMI: ${data.medical.bmi}
Diabetes: ${data.medical.diabetes}
Blood Pressure: ${data.medical.bloodPressure}
Any Health Issue: ${data.medical.anyHealthIssue}
Past 5 Years Medical/Surgery History: ${data.medical.pastSurgeries5Yrs}
Family Medical History or Health Issue: ${data.medical.familyMedicalHistory}
Family Major Disease/Death History: ${data.medical.familyMajorDiseaseDeath}
Previous Policy: ${data.medical.previousPolicy}`
      },
      {
        title: "6. Banking & KYC Numbers Block",
        desc: "Ready to paste into Payout Bank & Identification section",
        text: `Bank Name: ${data.banking.bankName}
Branch: ${data.banking.branchName}
Account Number: ${data.banking.accountNumber}
IFSC Code: ${data.banking.ifscCode}
Account Type: ${data.banking.accountType}
Cheque Number: ${data.banking.chequeNumber}
Aadhaar Number: ${data.kyc.aadhaarNumber}
PAN Number: ${data.kyc.panNumber || "Pending"}`
      }
    ];

    let html = "";
    copyBlocks.forEach((block, idx) => {
      html += `
        <div class="copy-card">
          <div class="copy-card-header">
            <div>
              <h4>${block.title}</h4>
              <p class="text-secondary">${block.desc}</p>
            </div>
            <button class="btn btn-sm btn-primary" onclick="window.copyToClipboard('${block.text.replace(/'/g, "\\'").replace(/\n/g, "\\n")}', '${block.title}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Block
            </button>
          </div>
          <div class="copy-card-body">
            <pre class="code-preview">${block.text}</pre>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // --- TAB 4: EDIT FORM POPULATION & SAVE ---
  populateEditForm() {
    const data = window.store.data;
    const form = document.getElementById("proposal-edit-form");
    if (!form) return;

    // Map input fields by name
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || "";
    };

    setVal("edit-clientName", data.personal.clientName);
    setVal("edit-dob", data.personal.dob);
    setVal("edit-gender", data.personal.gender);
    setVal("edit-identificationMark", data.personal.identificationMark);
    setVal("edit-placeOfBirth", data.personal.placeOfBirth);
    setVal("edit-fatherName", data.personal.fatherName);
    setVal("edit-motherName", data.personal.motherName);
    setVal("edit-education", data.personal.education);
    setVal("edit-occupation", data.personal.occupation);
    setVal("edit-maritalStatus", data.personal.maritalStatus);
    setVal("edit-permanentAddress", data.personal.permanentAddress);

    setVal("edit-mobileNo", data.contact.mobileNo);
    setVal("edit-altMobileNo", data.contact.altMobileNo);
    setVal("edit-emailId", data.contact.emailId);

    setVal("edit-companyName", data.employment.companyName);
    setVal("edit-companyAddress", data.employment.companyAddress);
    setVal("edit-designation", data.employment.designation);
    setVal("edit-grossYearlyIncome", data.employment.grossYearlyIncome);
    setVal("edit-industryType", data.employment.industryType);

    setVal("edit-spouseName", data.spouse.spouseName);
    setVal("edit-spouseDob", data.spouse.spouseDob);
    setVal("edit-spouseQualification", data.spouse.spouseQualification);
    setVal("edit-spouseOccupation", data.spouse.spouseOccupation);

    setVal("edit-nomineeName", data.nominee.nomineeName);
    setVal("edit-nomineeDob", data.nominee.nomineeDob);
    setVal("edit-nomineeRelation", data.nominee.nomineeRelation);
    setVal("edit-nomineeMobile", data.nominee.nomineeMobile);

    setVal("edit-smoking", data.medical.smoking);
    setVal("edit-alcohol", data.medical.alcohol);
    setVal("edit-height", data.medical.height);
    setVal("edit-weight", data.medical.weight);
    setVal("edit-diabetes", data.medical.diabetes);
    setVal("edit-bloodPressure", data.medical.bloodPressure);
    setVal("edit-anyHealthIssue", data.medical.anyHealthIssue);
    setVal("edit-pastSurgeries5Yrs", data.medical.pastSurgeries5Yrs);
    setVal("edit-familyMedicalHistory", data.medical.familyMedicalHistory);
    setVal("edit-familyMajorDiseaseDeath", data.medical.familyMajorDiseaseDeath);
    setVal("edit-previousPolicy", data.medical.previousPolicy);

    setVal("edit-bankName", data.banking.bankName);
    setVal("edit-branchName", data.banking.branchName);
    setVal("edit-accountNumber", data.banking.accountNumber);
    setVal("edit-ifscCode", data.banking.ifscCode);
    setVal("edit-accountType", data.banking.accountType);
    setVal("edit-chequeNumber", data.banking.chequeNumber);

    setVal("edit-aadhaarNumber", data.kyc.aadhaarNumber);
    setVal("edit-panNumber", data.kyc.panNumber);

    // Bind form submit
    form.onsubmit = (e) => {
      e.preventDefault();
      this.saveEditForm();
    };
  }

  saveEditForm() {
    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : "";
    };

    const data = window.store.data;

    data.personal.clientName = getVal("edit-clientName");
    data.personal.dob = getVal("edit-dob");
    data.personal.gender = getVal("edit-gender");
    data.personal.identificationMark = getVal("edit-identificationMark");
    data.personal.placeOfBirth = getVal("edit-placeOfBirth");
    data.personal.fatherName = getVal("edit-fatherName");
    data.personal.motherName = getVal("edit-motherName");
    data.personal.education = getVal("edit-education");
    data.personal.occupation = getVal("edit-occupation");
    data.personal.maritalStatus = getVal("edit-maritalStatus");
    data.personal.permanentAddress = getVal("edit-permanentAddress");

    data.contact.mobileNo = getVal("edit-mobileNo");
    data.contact.altMobileNo = getVal("edit-altMobileNo");
    data.contact.emailId = getVal("edit-emailId");

    data.employment.companyName = getVal("edit-companyName");
    data.employment.companyAddress = getVal("edit-companyAddress");
    data.employment.designation = getVal("edit-designation");
    data.employment.grossYearlyIncome = getVal("edit-grossYearlyIncome");
    data.employment.industryType = getVal("edit-industryType");

    data.spouse.spouseName = getVal("edit-spouseName");
    data.spouse.spouseDob = getVal("edit-spouseDob");
    data.spouse.spouseQualification = getVal("edit-spouseQualification");
    data.spouse.spouseOccupation = getVal("edit-spouseOccupation");

    data.nominee.nomineeName = getVal("edit-nomineeName");
    data.nominee.nomineeDob = getVal("edit-nomineeDob");
    data.nominee.nomineeRelation = getVal("edit-nomineeRelation");
    data.nominee.nomineeMobile = getVal("edit-nomineeMobile");

    data.medical.smoking = getVal("edit-smoking");
    data.medical.alcohol = getVal("edit-alcohol");
    data.medical.height = getVal("edit-height");
    data.medical.weight = getVal("edit-weight");
    data.medical.diabetes = getVal("edit-diabetes");
    data.medical.bloodPressure = getVal("edit-bloodPressure");
    data.medical.anyHealthIssue = getVal("edit-anyHealthIssue");
    data.medical.pastSurgeries5Yrs = getVal("edit-pastSurgeries5Yrs");
    data.medical.familyMedicalHistory = getVal("edit-familyMedicalHistory");
    data.medical.familyMajorDiseaseDeath = getVal("edit-familyMajorDiseaseDeath");
    data.medical.previousPolicy = getVal("edit-previousPolicy");

    data.banking.bankName = getVal("edit-bankName");
    data.banking.branchName = getVal("edit-branchName");
    data.banking.accountNumber = getVal("edit-accountNumber");
    data.banking.ifscCode = getVal("edit-ifscCode");
    data.banking.accountType = getVal("edit-accountType");
    data.banking.chequeNumber = getVal("edit-chequeNumber");

    data.kyc.aadhaarNumber = getVal("edit-aadhaarNumber");
    const newPan = getVal("edit-panNumber").toUpperCase();
    if (newPan) {
      window.store.setPanCard(newPan, null);
    }

    window.store.saveData(data);
    window.showToast("All proposal changes saved successfully! 💾");
    this.switchTab("dossier");
  }

  // --- TAB 5: PRINTABLE PROPOSAL SUMMARY ---
  renderPrintableSummary() {
    const data = window.store.data;
    const container = document.getElementById("print-sheet-content");
    if (!container) return;

    container.innerHTML = `
      <div class="print-proposal-page">
        <div class="print-header">
          <div class="print-title-area">
            <h2>LIFE INSURANCE PROPOSAL FORM DOSSIER</h2>
            <p>Confidential Client Information & KYC Summary</p>
          </div>
          <div class="print-meta-box">
            <div><strong>Client ID:</strong> MA-1979-CHD</div>
            <div><strong>Date:</strong> ${new Date().toLocaleDateString('en-GB')}</div>
            <div><strong>Status:</strong> Verified Complete</div>
          </div>
        </div>

        <div class="print-section-title">1. Proposer / Client Details</div>
        <table class="print-table">
          <tr>
            <th width="20%">Client Full Name</th>
            <td width="30%"><strong>${data.personal.clientName}</strong></td>
            <th width="20%">Date of Birth & Age</th>
            <td width="30%">${data.personal.dob} (47 Yrs)</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>${data.personal.gender}</td>
            <th>Marital Status</th>
            <td>${data.personal.maritalStatus}</td>
          </tr>
          <tr>
            <th>Place of Birth</th>
            <td>${data.personal.placeOfBirth}</td>
            <th>Identification Mark</th>
            <td>${data.personal.identificationMark}</td>
          </tr>
          <tr>
            <th>Father's Name</th>
            <td>${data.personal.fatherName}</td>
            <th>Mother's Name</th>
            <td>${data.personal.motherName}</td>
          </tr>
          <tr>
            <th>Education / Qualification</th>
            <td>${data.personal.education}</td>
            <th>Occupation</th>
            <td>${data.personal.occupation}</td>
          </tr>
          <tr>
            <th>Permanent Address</th>
            <td colspan="3">${data.personal.permanentAddress}</td>
          </tr>
          <tr>
            <th>Mobile Number</th>
            <td>${data.contact.mobileNo}</td>
            <th>Email Address</th>
            <td>${data.contact.emailId}</td>
          </tr>
        </table>

        <div class="print-section-title">2. Employment & Financial Particulars</div>
        <table class="print-table">
          <tr>
            <th width="20%">Employer / Company</th>
            <td width="30%"><strong>${data.employment.companyName}</strong></td>
            <th width="20%">Designation</th>
            <td width="30%">${data.employment.designation}</td>
          </tr>
          <tr>
            <th>Industry Type</th>
            <td>${data.employment.industryType}</td>
            <th>Gross Annual Income</th>
            <td><strong>₹${data.employment.grossYearlyIncome}</strong> (INR 8,60,000/-)</td>
          </tr>
          <tr>
            <th>Office Address</th>
            <td colspan="3">${data.employment.companyAddress}</td>
          </tr>
        </table>

        <div class="print-section-title">3. Spouse & Nominee Particulars</div>
        <table class="print-table">
          <tr>
            <th width="20%">Spouse Full Name</th>
            <td width="30%">${data.spouse.spouseName}</td>
            <th width="20%">Spouse DOB</th>
            <td width="30%">${data.spouse.spouseDob}</td>
          </tr>
          <tr>
            <th>Spouse Qualification</th>
            <td>${data.spouse.spouseQualification}</td>
            <th>Spouse Occupation</th>
            <td>${data.spouse.spouseOccupation}</td>
          </tr>
          <tr>
            <th>Nominee Full Name</th>
            <td><strong>${data.nominee.nomineeName}</strong></td>
            <th>Nominee Relation</th>
            <td>${data.nominee.nomineeRelation}</td>
          </tr>
          <tr>
            <th>Nominee DOB & Share</th>
            <td>${data.nominee.nomineeDob} (100% Share)</td>
            <th>Nominee Mobile</th>
            <td>${data.nominee.nomineeMobile}</td>
          </tr>
        </table>

        <div class="print-section-title">4. Medical & Lifestyle Declaration</div>
        <table class="print-table">
          <tr>
            <th width="25%">Height & Weight</th>
            <td width="25%">${data.medical.height}, ${data.medical.weight} (BMI: 23.8)</td>
            <th width="25%">Smoking / Tobacco</th>
            <td width="25%">${data.medical.smoking}</td>
          </tr>
          <tr>
            <th>Alcohol Consumption</th>
            <td>${data.medical.alcohol}</td>
            <th>Diabetes History</th>
            <td>${data.medical.diabetes}</td>
          </tr>
          <tr>
            <th>Hypertension / BP</th>
            <td>${data.medical.bloodPressure}</td>
            <th>Past 5 Yrs Surgeries</th>
            <td>${data.medical.pastSurgeries5Yrs}</td>
          </tr>
          <tr>
            <th>Family Major Diseases</th>
            <td>${data.medical.familyMajorDiseaseDeath}</td>
            <th>Existing Policies</th>
            <td>${data.medical.previousPolicy}</td>
          </tr>
        </table>

        <div class="print-section-title">5. Bank & Identification (KYC)</div>
        <table class="print-table">
          <tr>
            <th width="20%">Bank Name & Branch</th>
            <td width="30%">${data.banking.bankName}, ${data.banking.branchName}</td>
            <th width="20%">Account Number</th>
            <td width="30%"><strong>${data.banking.accountNumber}</strong></td>
          </tr>
          <tr>
            <th>IFSC Code</th>
            <td>${data.banking.ifscCode}</td>
            <th>Cheque Leaf No</th>
            <td>${data.banking.chequeNumber}</td>
          </tr>
          <tr>
            <th>Aadhaar Number</th>
            <td>${data.kyc.aadhaarNumber}</td>
            <th>PAN Number</th>
            <td>${data.kyc.panNumber || "Pending Upload"}</td>
          </tr>
        </table>

        <div class="print-signatures">
          <div class="sig-box">
            <div class="sig-line"></div>
            <p><strong>Manoj Arora</strong><br/>Signature of Proposer / Client</p>
          </div>
          <div class="sig-box">
            <div class="sig-line"></div>
            <p><strong>Insurance Advisor / Agent</strong><br/>Signature & Agency Code</p>
          </div>
        </div>
      </div>
    `;
  }

  // --- ACTIONS & UTILS ---
  copyAllTextProposal() {
    const data = window.store.data;
    const fullSummary = `=====================================================
PROPOSAL FORM DETAILS - MANOJ ARORA
=====================================================
1. Client Name: ${data.personal.clientName}
2. DOB: ${data.personal.dob}
3. Gender: ${data.personal.gender}
4. Identification mark: ${data.personal.identificationMark}
5. Place of Birth: ${data.personal.placeOfBirth}
6. Mother Name: ${data.personal.motherName}
7. Father Name: ${data.personal.fatherName}
8. Permanent Address: ${data.personal.permanentAddress}
9. Education: ${data.personal.education}
10. Occupation: ${data.personal.occupation}
11. Marital Status: ${data.personal.maritalStatus}
12. Spouse Name: ${data.spouse.spouseName}
13. Spouse DOB: ${data.spouse.spouseDob}
14. Spouse Qualification: ${data.spouse.spouseQualification}
15. Spouse Occupation: ${data.spouse.spouseOccupation}
16. Mob No: ${data.contact.mobileNo}
17. Alternate Mobile No: ${data.contact.altMobileNo}
18. Email Id: ${data.contact.emailId}
19. Company Name: ${data.employment.companyName}
20. Company Address: ${data.employment.companyAddress}
21. Designation: ${data.employment.designation}
22. Gross Yearly Income: ${data.employment.grossYearlyIncome}
23. Industry / Company Type: ${data.employment.industryType}
24. Smoking: ${data.medical.smoking}
25. Alcohol: ${data.medical.alcohol}
26. Height & Weight: ${data.medical.height}, Weight ${data.medical.weight}
27. Diabetes: ${data.medical.diabetes}
28. Blood Pressure: ${data.medical.bloodPressure}
29. Any health Issue: ${data.medical.anyHealthIssue}
30. Past 5 years medical history (Surgery): ${data.medical.pastSurgeries5Yrs}
31. Family Medical History or Health issue: ${data.medical.familyMedicalHistory}
32. Have anyone died in family any major disease: ${data.medical.familyMajorDiseaseDeath}
33. Previous Policy: ${data.medical.previousPolicy}
34. Nominee Name: ${data.nominee.nomineeName}
35. Nominee DOB: ${data.nominee.nomineeDob}
36. Nominee Relation: ${data.nominee.nomineeRelation}
37. Nominee Mobile Number: ${data.nominee.nomineeMobile}
38. Bank Name: ${data.banking.bankName} (${data.banking.branchName})
39. Bank Account No: ${data.banking.accountNumber} | IFSC: ${data.banking.ifscCode} | Chq: ${data.banking.chequeNumber}
40. Aadhaar Number: ${data.kyc.aadhaarNumber}
41. PAN Number: ${data.kyc.panNumber || "Pending Upload"}
=====================================================`;

    window.copyToClipboard(fullSummary, "Full Proposal Data Sheet");
  }

  exportJsonFile() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.store.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `proposal_manoj_arora_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    window.showToast("Proposal JSON file downloaded successfully!");
  }

  applySearchFilter() {
    if (!this.searchQuery) {
      document.querySelectorAll(".dossier-card, .doc-card, .copy-card").forEach(el => el.style.display = "");
      return;
    }

    const q = this.searchQuery;

    // Filter Dossier items
    document.querySelectorAll(".dossier-card").forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? "" : "none";
    });

    // Filter Docs
    document.querySelectorAll(".doc-card").forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? "" : "none";
    });

    // Filter Copy cards
    document.querySelectorAll(".copy-card").forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? "" : "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new ProposalApp();
});
