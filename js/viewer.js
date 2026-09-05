/**
 * Lightbox & Document Viewer with Pan, Zoom, Rotate, and OCR Panel
 */
class DocumentViewer {
  constructor() {
    this.modal = null;
    this.img = null;
    this.currentDoc = null;
    this.scale = 1;
    this.rotation = 0;
    this.flipH = 1;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.posX = 0;
    this.posY = 0;

    this.init();
  }

  init() {
    // Create lightbox DOM elements if not already present
    let container = document.getElementById("document-viewer-modal");
    if (!container) {
      container = document.createElement("div");
      container.id = "document-viewer-modal";
      container.className = "viewer-modal-backdrop";
      container.innerHTML = `
        <div class="viewer-container">
          <div class="viewer-header">
            <div class="viewer-title-group">
              <span class="viewer-badge" id="viewer-badge">KYC</span>
              <h3 id="viewer-title">Document Title</h3>
            </div>
            <div class="viewer-actions">
              <button class="btn btn-icon" id="viewer-rotate-ccw" title="Rotate Counter-Clockwise (-90°)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              <button class="btn btn-icon" id="viewer-rotate-cw" title="Rotate Clockwise (+90°)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
              </button>
              <button class="btn btn-icon" id="viewer-zoom-in" title="Zoom In (+)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </button>
              <button class="btn btn-icon" id="viewer-zoom-out" title="Zoom Out (-)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </button>
              <button class="btn btn-icon" id="viewer-reset" title="Reset View">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                <span class="sr-only">Reset</span>
              </button>
              <a class="btn btn-icon" id="viewer-download" download="document.png" title="Download Image">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
              <button class="btn btn-icon btn-close" id="viewer-close" title="Close (Esc)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          <div class="viewer-body">
            <div class="viewer-canvas" id="viewer-canvas">
              <img id="viewer-img" src="" alt="Document Preview" />
            </div>
            <div class="viewer-sidebar" id="viewer-sidebar">
              <div class="sidebar-header">
                <h4>Extracted KYC Details</h4>
                <p id="viewer-desc" class="text-muted"></p>
              </div>
              <div class="sidebar-meta" id="viewer-extracted-table">
                <!-- Extracted details rows -->
              </div>
            </div>
          </div>
          <div class="viewer-footer">
            <span class="viewer-hint">💡 Use Mouse Wheel to Zoom, Click & Drag to Pan, Buttons to Rotate</span>
            <span id="viewer-zoom-level" class="badge">100%</span>
          </div>
        </div>
      `;
      document.body.appendChild(container);
    }

    this.modal = container;
    this.img = document.getElementById("viewer-img");
    this.canvas = document.getElementById("viewer-canvas");
    this.bindEvents();
  }

  bindEvents() {
    document.getElementById("viewer-close").addEventListener("click", () => this.close());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close();
    });

    document.getElementById("viewer-zoom-in").addEventListener("click", () => this.zoom(0.2));
    document.getElementById("viewer-zoom-out").addEventListener("click", () => this.zoom(-0.2));
    document.getElementById("viewer-rotate-cw").addEventListener("click", () => this.rotate(90));
    document.getElementById("viewer-rotate-ccw").addEventListener("click", () => this.rotate(-90));
    document.getElementById("viewer-reset").addEventListener("click", () => this.resetTransform());

    // Mouse wheel zoom
    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.15 : -0.15;
      this.zoom(delta);
    }, { passive: false });

    // Drag to pan
    this.canvas.addEventListener("mousedown", (e) => {
      if (e.target === this.img || e.target === this.canvas) {
        this.isDragging = true;
        this.startX = e.clientX - this.posX;
        this.startY = e.clientY - this.posY;
        this.canvas.style.cursor = "grabbing";
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      this.posX = e.clientX - this.startX;
      this.posY = e.clientY - this.startY;
      this.applyTransform();
    });

    window.addEventListener("mouseup", () => {
      this.isDragging = false;
      if (this.canvas) this.canvas.style.cursor = "grab";
    });

    // Keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      if (this.modal && this.modal.classList.contains("active")) {
        if (e.key === "Escape") this.close();
        if (e.key === "+" || e.key === "=") this.zoom(0.2);
        if (e.key === "-" || e.key === "_") this.zoom(-0.2);
        if (e.key === "r" || e.key === "R") this.rotate(90);
      }
    });
  }

  open(doc) {
    this.currentDoc = doc;
    this.scale = 1;
    this.rotation = 0;
    this.flipH = 1;
    this.posX = 0;
    this.posY = 0;

    document.getElementById("viewer-title").textContent = doc.title || "Document";
    document.getElementById("viewer-badge").textContent = doc.category || "Document";
    document.getElementById("viewer-desc").textContent = doc.description || "";
    
    const downloadBtn = document.getElementById("viewer-download");
    downloadBtn.href = doc.src || doc.rawSrc;
    downloadBtn.download = `${(doc.title || "document").toLowerCase().replace(/\s+/g, "_")}.png`;

    // Render extracted details
    const tableContainer = document.getElementById("viewer-extracted-table");
    tableContainer.innerHTML = "";
    if (doc.extractedData && Object.keys(doc.extractedData).length > 0) {
      let tableHtml = `<table class="viewer-meta-table">`;
      for (const [key, val] of Object.entries(doc.extractedData)) {
        tableHtml += `
          <tr>
            <th>${key}</th>
            <td>
              <span>${val}</span>
              <button class="btn-copy-small" onclick="window.copyToClipboard('${val.replace(/'/g, "\\'")}', '${key}')" title="Copy ${key}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </td>
          </tr>
        `;
      }
      tableHtml += `</table>`;
      tableContainer.innerHTML = tableHtml;
      document.getElementById("viewer-sidebar").style.display = "block";
    } else {
      document.getElementById("viewer-sidebar").style.display = "none";
    }

    this.img.src = doc.src || doc.rawSrc;
    this.applyTransform();
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  zoom(factor) {
    this.scale = Math.min(Math.max(0.3, this.scale + factor), 4);
    this.applyTransform();
  }

  rotate(degrees) {
    this.rotation = (this.rotation + degrees) % 360;
    this.applyTransform();
  }

  resetTransform() {
    this.scale = 1;
    this.rotation = 0;
    this.flipH = 1;
    this.posX = 0;
    this.posY = 0;
    this.applyTransform();
  }

  applyTransform() {
    if (this.img) {
      this.img.style.transform = `translate(${this.posX}px, ${this.posY}px) scale(${this.scale}) rotate(${this.rotation}deg)`;
      const zoomBadge = document.getElementById("viewer-zoom-level");
      if (zoomBadge) {
        zoomBadge.textContent = `${Math.round(this.scale * 100)}%`;
      }
    }
  }
}

window.documentViewer = new DocumentViewer();
