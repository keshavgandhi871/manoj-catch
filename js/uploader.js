/**
 * Document Uploader & PAN Card Manager
 */
class DocumentUploader {
  constructor() {
    this.panModal = null;
    this.customDocModal = null;
    this.init();
  }

  init() {
    this.createPanModal();
    this.createCustomDocModal();
  }

  createPanModal() {
    let modal = document.getElementById("pan-upload-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "pan-upload-modal";
      modal.className = "modal-backdrop";
      modal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="badge badge-accent">Income Tax KYC</span>
              <h3>Upload & Add PAN Card</h3>
            </div>
            <button class="btn btn-icon btn-close" onclick="window.docUploader.closePanModal()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-secondary mb-4">You can enter the PAN Card number and attach a scanned image or photo of the PAN card.</p>
            
            <div class="form-group mb-4">
              <label class="form-label" for="pan-input-number">Permanent Account Number (PAN) *</label>
              <div class="input-with-icon">
                <input type="text" id="pan-input-number" class="form-control text-uppercase" placeholder="e.g. ABCDE1234F" maxlength="10" />
                <span class="input-icon">💳</span>
              </div>
              <small class="form-hint">10-character alphanumeric PAN format (e.g. ABCDE1234F)</small>
            </div>

            <div class="form-group mb-4">
              <label class="form-label">PAN Card Image (Optional / Recommended)</label>
              <div class="dropzone" id="pan-dropzone">
                <input type="file" id="pan-file-input" accept="image/*,.pdf" style="display:none;" />
                <div class="dropzone-content" id="pan-dropzone-content">
                  <div class="dropzone-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <h5>Drag & drop PAN image here</h5>
                  <p class="text-muted">or <span class="text-primary cursor-pointer font-medium">browse from device</span> (JPG, PNG, WebP)</p>
                </div>
                <div class="dropzone-preview" id="pan-preview-box" style="display:none;">
                  <img id="pan-preview-img" src="" alt="PAN Preview" />
                  <button type="button" class="btn btn-sm btn-danger remove-preview-btn" id="pan-remove-img">Remove</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="window.docUploader.closePanModal()">Cancel</button>
            <button class="btn btn-primary" id="pan-save-btn">Save PAN Details</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    this.panModal = modal;
    this.bindPanEvents();
  }

  createCustomDocModal() {
    let modal = document.getElementById("custom-doc-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "custom-doc-modal";
      modal.className = "modal-backdrop";
      modal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="badge badge-accent">Document Vault</span>
              <h3>Upload Additional Document</h3>
            </div>
            <button class="btn btn-icon btn-close" onclick="window.docUploader.closeCustomDocModal()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-3">
              <label class="form-label" for="custom-doc-title">Document Title *</label>
              <input type="text" id="custom-doc-title" class="form-control" placeholder="e.g. Salary Slip / Form 16 / Medical Report" />
            </div>
            <div class="form-group mb-3">
              <label class="form-label" for="custom-doc-cat">Category *</label>
              <select id="custom-doc-cat" class="form-control">
                <option value="Income Proof">Income Proof (Salary Slip / Form 16)</option>
                <option value="Medical Report">Medical Examination / Lab Report</option>
                <option value="KYC & Identity">Identity / Address Proof</option>
                <option value="Insurance Policy">Existing Insurance Policy</option>
                <option value="Other">Other Document</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <label class="form-label" for="custom-doc-desc">Description / Notes</label>
              <input type="text" id="custom-doc-desc" class="form-control" placeholder="e.g. 3 Months Salary slip Sun Pharma" />
            </div>
            <div class="form-group mb-3">
              <label class="form-label">Upload File / Image *</label>
              <div class="dropzone" id="custom-dropzone">
                <input type="file" id="custom-file-input" accept="image/*,.pdf" style="display:none;" />
                <div class="dropzone-content" id="custom-dropzone-content">
                  <h5>Click to select image file</h5>
                  <p class="text-muted">JPG, PNG, WebP supported</p>
                </div>
                <div class="dropzone-preview" id="custom-preview-box" style="display:none;">
                  <img id="custom-preview-img" src="" alt="Preview" />
                  <button type="button" class="btn btn-sm btn-danger remove-preview-btn" id="custom-remove-img">Remove</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" onclick="window.docUploader.closeCustomDocModal()">Cancel</button>
            <button class="btn btn-primary" id="custom-save-btn">Add to Vault</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    this.customDocModal = modal;
    this.bindCustomEvents();
  }

  bindPanEvents() {
    const fileInput = document.getElementById("pan-file-input");
    const dropzone = document.getElementById("pan-dropzone");
    const previewBox = document.getElementById("pan-preview-box");
    const previewImg = document.getElementById("pan-preview-img");
    const contentBox = document.getElementById("pan-dropzone-content");
    const removeBtn = document.getElementById("pan-remove-img");
    const saveBtn = document.getElementById("pan-save-btn");
    let currentBase64 = null;

    dropzone.addEventListener("click", (e) => {
      if (e.target !== removeBtn) {
        fileInput.click();
      }
    });

    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("drag-over");
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("drag-over");
    });

    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("drag-over");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    });

    const handleFile = (file) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file (JPG, PNG, WebP).");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        currentBase64 = e.target.result;
        previewImg.src = currentBase64;
        previewBox.style.display = "flex";
        contentBox.style.display = "none";
      };
      reader.readAsDataURL(file);
    };

    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentBase64 = null;
      fileInput.value = "";
      previewImg.src = "";
      previewBox.style.display = "none";
      contentBox.style.display = "flex";
    });

    saveBtn.addEventListener("click", () => {
      const panNum = document.getElementById("pan-input-number").value.trim().toUpperCase();
      if (!panNum) {
        alert("Please enter a PAN card number.");
        return;
      }
      window.store.setPanCard(panNum, currentBase64);
      this.closePanModal();
      window.showToast("PAN Card details saved successfully! 🎉");
    });
  }

  bindCustomEvents() {
    const fileInput = document.getElementById("custom-file-input");
    const dropzone = document.getElementById("custom-dropzone");
    const previewBox = document.getElementById("custom-preview-box");
    const previewImg = document.getElementById("custom-preview-img");
    const contentBox = document.getElementById("custom-dropzone-content");
    const removeBtn = document.getElementById("custom-remove-img");
    const saveBtn = document.getElementById("custom-save-btn");
    let currentBase64 = null;

    dropzone.addEventListener("click", (e) => {
      if (e.target !== removeBtn) fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          currentBase64 = ev.target.result;
          previewImg.src = currentBase64;
          previewBox.style.display = "flex";
          contentBox.style.display = "none";
        };
        reader.readAsDataURL(file);
      }
    });

    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentBase64 = null;
      fileInput.value = "";
      previewImg.src = "";
      previewBox.style.display = "none";
      contentBox.style.display = "flex";
    });

    saveBtn.addEventListener("click", () => {
      const title = document.getElementById("custom-doc-title").value.trim();
      const cat = document.getElementById("custom-doc-cat").value;
      const desc = document.getElementById("custom-doc-desc").value.trim();

      if (!title) {
        alert("Please enter a document title.");
        return;
      }
      if (!currentBase64) {
        alert("Please select a document image file.");
        return;
      }

      const docId = `custom_doc_${Date.now()}`;
      window.store.addDocument({
        id: docId,
        title: title,
        category: cat,
        number: `DOC-${Date.now().toString().slice(-4)}`,
        status: "Uploaded",
        src: currentBase64,
        rawSrc: currentBase64,
        description: desc || `${title} uploaded by user`,
        extractedData: {
          "Title": title,
          "Category": cat,
          "Uploaded On": new Date().toLocaleDateString()
        }
      });

      this.closeCustomDocModal();
      window.showToast(`Document "${title}" added to vault! 📁`);
    });
  }

  openPanModal() {
    const pan = window.store.data.kyc.panNumber || "";
    document.getElementById("pan-input-number").value = pan;
    this.panModal.classList.add("active");
  }

  closePanModal() {
    this.panModal.classList.remove("active");
  }

  openCustomDocModal() {
    document.getElementById("custom-doc-title").value = "";
    document.getElementById("custom-doc-desc").value = "";
    this.customDocModal.classList.add("active");
  }

  closeCustomDocModal() {
    this.customDocModal.classList.remove("active");
  }
}

window.docUploader = new DocumentUploader();
