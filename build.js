const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync('css/style.css', 'utf8');
const printCss = fs.readFileSync('css/print.css', 'utf8');

const toB64 = (rel) => 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, rel)).toString('base64');

const imgs = {
  face: toB64('assets/manoj_face_opt.jpg'),
  portrait: toB64('assets/manoj_arora_portrait_opt.jpg'),
  pan: toB64('assets/pan_card_opt.jpg'),
  aadhaarFront: toB64('assets/aadhaar_card_front_opt.jpg'),
  aadhaarBack: toB64('assets/aadhaar_card_back_opt.jpg'),
  cheque: toB64('assets/uco_bank_cheque_opt.jpg')
};

fs.writeFileSync('js/embedded_images.js', 'window.EMBEDDED_ASSETS = ' + JSON.stringify(imgs, null, 2) + ';');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>Personalised website for you manoj</title>
  <meta name="title" content="Personalised website for you manoj" />
  <meta name="description" content="Personalised website for you manoj • Official Profile & Verified Details" />
  
  <!-- Open Graph / Facebook / WhatsApp / Telegram Meta Tags -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Personalised website for you manoj" />
  <meta property="og:title" content="Personalised website for you manoj" />
  <meta property="og:description" content="Personalised website for you manoj • Official Profile & Verified Details" />
  <meta property="og:image" content="https://raw.githubusercontent.com/keshavgandhi871/manoj-catch/main/assets/manoj_arora_portrait_opt.jpg" />
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Personalised website for you manoj" />
  <meta name="twitter:description" content="Personalised website for you manoj • Official Profile & Verified Details" />
  <meta name="twitter:image" content="https://raw.githubusercontent.com/keshavgandhi871/manoj-catch/main/assets/manoj_arora_portrait_opt.jpg" />

  <!-- Google Fonts: Plus Jakarta Sans & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <style>
${cssContent}
${printCss}

.dues-breakdown-box {
  background: #ffffff;
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  margin-top: 14px;
  width: 100%;
}

.breakdown-title {
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent-rose);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  padding: 4px 0;
  border-bottom: 1px dashed #fee2e2;
}

.breakdown-item:last-child {
  border-bottom: none;
}

.breakdown-item .reason {
  color: var(--text-main);
  font-weight: 600;
}

.breakdown-item .amt {
  font-family: var(--font-mono);
  font-weight: 800;
  color: #b91c1c;
}
  </style>
</head>
<body>

  <!-- Top Sticky Header -->
  <header class="top-header">
    <div class="container header-content">
      <div class="brand-badge-group">
        <img class="brand-avatar" src="${imgs.face}" alt="Manoj Arora" />
        <div class="brand-titles">
          <h1>Manoj Arora <span class="badge badge-verified">✓ KYC Verified</span></h1>
          <p>Area Sales Manager • Sun Pharmaceutical pvt ltd • Chandigarh</p>
        </div>
      </div>

      <div class="header-actions">
        <span class="badge badge-rose" id="header-dues-badge" style="font-size: 0.82rem; padding: 6px 12px;">
          ⚠️ Total Due: <strong id="header-dues-val" style="margin-left: 4px;">₹10,000</strong>
        </span>

        <a href="tel:+917508304834" class="btn btn-success" title="Direct Phone Call">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>Call: 7508304834</span>
        </a>

        <a href="https://wa.me/917508304834" target="_blank" rel="noopener" class="btn btn-white" title="WhatsApp Chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>WhatsApp</span>
        </a>

        <button onclick="window.copyAllDetails()" class="btn btn-primary" title="Copy Full Text Details">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>Copy All Details</span>
        </button>

        <button onclick="window.print()" class="btn btn-white" title="Print Profile Sheet">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          <span>Print</span>
        </button>
      </div>
    </div>
  </header>

  <main class="container">

    <!-- 1. HERO SECTION: Big Photo of Manoj + Side-by-Side Details -->
    <section class="hero-section">
      <div class="hero-grid">
        
        <!-- Left: Big Isolated Portrait of Manoj Arora -->
        <div class="manoj-photo-card">
          <div class="photo-wrapper" onclick="window.openViewer(window.EMBEDDED_ASSETS.portrait, 'Manoj Arora - Official Portrait', 'Manoj Arora (Area Sales Manager, Sun Pharma)')">
            <img class="manoj-large-img" src="${imgs.portrait}" alt="Manoj Arora Portrait" />
            <div class="photo-overlay-badge">
              <span>🛡️ Verified Identity</span>
            </div>
          </div>
          <div class="photo-caption-bar">
            <div class="photo-caption-text">
              <h4>Manoj Arora</h4>
              <p>Chandigarh, India • Age 47</p>
            </div>
            <button class="btn btn-sm btn-white" onclick="window.openViewer(window.EMBEDDED_ASSETS.portrait, 'Manoj Arora - Portrait', 'Official Photo')">
              🔍 Full Photo
            </button>
          </div>
        </div>

        <!-- Right: Side-by-Side Personal Details & 3 Distinct Mobile Numbers -->
        <div class="manoj-details-card">
          
          <div class="hero-profile-header">
            <div class="name-title-row">
              <h2>Manoj Arora</h2>
              <span class="hindi-name">मनोज अरोड़ा</span>
              <span class="badge badge-sky">Resident Indian</span>
            </div>
            <p class="designation-lead">💼 Area Sales Manager — Sun Pharmaceutical pvt ltd</p>
          </div>

          <!-- 3 Distinct Mobile Numbers Row -->
          <div class="mobile-numbers-container">
            <div class="mobile-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Contact Mobile Numbers (All 3 Manoj Numbers)</span>
            </div>

            <div class="mobile-cards-grid">
              
              <!-- Mobile 1: 7508304834 -->
              <div class="mobile-box">
                <div class="mobile-tag">📱 Mobile 1 (Primary)</div>
                <div class="mobile-num">75083 04834</div>
                <div class="mobile-actions">
                  <a href="tel:7508304834" class="btn btn-sm btn-primary">Call</a>
                  <a href="https://wa.me/917508304834" target="_blank" rel="noopener" class="btn btn-sm btn-white">WhatsApp</a>
                  <button onclick="window.copyText('7508304834', 'Mobile 1')" class="btn btn-sm btn-white">Copy</button>
                </div>
              </div>

              <!-- Mobile 2: 9803106100 -->
              <div class="mobile-box">
                <div class="mobile-tag">📱 Mobile 2</div>
                <div class="mobile-num">98031 06100</div>
                <div class="mobile-actions">
                  <a href="tel:9803106100" class="btn btn-sm btn-primary">Call</a>
                  <a href="https://wa.me/919803106100" target="_blank" rel="noopener" class="btn btn-sm btn-white">WhatsApp</a>
                  <button onclick="window.copyText('9803106100', 'Mobile 2')" class="btn btn-sm btn-white">Copy</button>
                </div>
              </div>

              <!-- Mobile 3: 6284202226 -->
              <div class="mobile-box">
                <div class="mobile-tag">📱 Mobile 3</div>
                <div class="mobile-num">62842 02226</div>
                <div class="mobile-actions">
                  <a href="tel:6284202226" class="btn btn-sm btn-primary">Call</a>
                  <a href="https://wa.me/916284202226" target="_blank" rel="noopener" class="btn btn-sm btn-white">WhatsApp</a>
                  <button onclick="window.copyText('6284202226', 'Mobile 3')" class="btn btn-sm btn-white">Copy</button>
                </div>
              </div>

            </div>
          </div>

          <!-- Personal Details Table -->
          <div class="details-table-grid">
            <div class="detail-item">
              <span class="detail-label">Date of Birth & Age</span>
              <span class="detail-value">🎂 02.01.1979 (47 Years)</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Gender</span>
              <span class="detail-value">👤 Male</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Father's Name</span>
              <span class="detail-value">Ajit Singh Arora (अजित सिंह अरोड़ा)</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Mother's Name</span>
              <span class="detail-value">Sunita Arora</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Place of Birth</span>
              <span class="detail-value">📍 Chandigarh</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Identification Mark</span>
              <span class="detail-value">🏷️ Mole on left feet</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Education / Qualification</span>
              <span class="detail-value">🎓 D Pharma</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Height & Weight</span>
              <span class="detail-value">📏 5'9" (175 cm), 73 kg</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Email ID</span>
              <span class="detail-value font-mono">
                arora.manoj80@gmail.com
                <button onclick="window.copyText('arora.manoj80@gmail.com', 'Email')" class="btn-copy-mini">📋</button>
              </span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Health & Lifestyle</span>
              <span class="detail-value text-success">✨ Non-Smoker, Standard Risk</span>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- PENDING PAYMENT & DUES HIGH-VISIBILITY CARD (Positioned under Manoj image & details, above verified KYC documents) -->
    <section class="pending-dues-section">
      <div class="pending-dues-card" id="pending-dues-card">
        
        <div style="width: 100%; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
          
          <div class="dues-info-left">
            <div class="dues-alert-icon">⚠️</div>
            <div class="dues-texts-group">
              <h3>Pending Payment Manoj Arora Has to Pay <span class="badge badge-rose" id="dues-status-pill">Payment Overdue</span></h3>
              <p id="dues-desc-text">Total pending money of <strong>₹10,000</strong> to be paid by Manoj Arora immediately.</p>
            </div>
          </div>

          <div class="dues-amount-center">
            <span class="dues-label-small">Total Pending Amount to Pay</span>
            <div class="dues-big-amount" id="display-dues-amount">₹10,000</div>
            <span class="text-secondary" style="font-size: 0.78rem;" id="display-dues-words">(Ten Thousand Rupees Only)</span>
          </div>

        </div>

        <!-- Breakdown Section -->
        <div class="dues-breakdown-box">
          <div class="breakdown-title">
            <span>📋 Specific Breakdown of Pending Dues:</span>
          </div>
          <div class="breakdown-list">
            <div class="breakdown-item">
              <span class="reason">1. Penalty for not paying money on time (Delayed Payment Charge):</span>
              <span class="amt">₹5,000</span>
            </div>
            <div class="breakdown-item">
              <span class="reason">2. Compensation for mental harassment and time waste:</span>
              <span class="amt">₹5,000</span>
            </div>
            <div class="breakdown-item" style="border-top: 2px solid #ef4444; padding-top: 8px; margin-top: 4px;">
              <span class="reason" style="font-size: 0.95rem; font-weight: 800; color: #b91c1c;">Total Amount Manoj Must Pay:</span>
              <span class="amt" style="font-size: 1.1rem;">₹10,000/-</span>
            </div>
          </div>
        </div>

        <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 14px;">
          <span style="font-size: 0.85rem; color: var(--text-secondary);">
            🏦 Settlement Bank: <strong>UCO Bank (A/C: 02360110051771, IFSC: UCBA0000236)</strong>
          </span>

          <div class="dues-actions-right">
            <button class="btn btn-danger" onclick="window.openEditDuesModal()">
              ✏️ Edit / Adjust Dues
            </button>
            <button class="btn btn-white" onclick="window.copyText('₹10,000 (Rs 5,000 for non-payment on time + Rs 5,000 for mental harassment & time waste)', 'Pending Dues Breakdown')">
              📋 Copy Breakdown
            </button>
            <button class="btn btn-white" onclick="window.copyBankSettlement()">
              🏦 Copy Bank A/C
            </button>
          </div>
        </div>

      </div>
    </section>

    <!-- 2. BIG DOCUMENTS SHOWCASE (PAN, Aadhaar Front, Aadhaar Back, Cheque) -->
    <section class="section-wrapper" id="documents-section">
      <div class="section-header">
        <span class="badge badge-amber">Official Identification Proofs</span>
        <h3>Verified KYC Documents & Identity Cards</h3>
        <p>High-resolution original document records of Manoj Arora</p>
      </div>

      <div class="documents-grid">
        
        <!-- 1. PAN Card -->
        <div class="doc-big-card">
          <div class="doc-image-holder" onclick="window.openViewer(window.EMBEDDED_ASSETS.pan, 'PAN Card - APVPA5577L', 'Income Tax Department - Manoj Arora, Father: Ajit Singh Arora, DOB: 02/01/1979')">
            <img src="${imgs.pan}" alt="PAN Card of Manoj Arora" />
            <div class="doc-overlay-hover">
              <span class="btn-zoom-pill">🔍 Zoom & Inspect</span>
            </div>
          </div>
          <div class="doc-info-block">
            <div class="doc-tag-row">
              <span class="badge badge-verified">Income Tax Verified</span>
              <span class="badge badge-sky">APVPA5577L</span>
            </div>
            <h4 class="doc-title">PAN Card (Permanent Account Number)</h4>
            <div class="doc-extracted-box">
              <div class="doc-extracted-row">
                <span class="k">PAN Number:</span>
                <span class="v text-primary">APVPA5577L</span>
              </div>
              <div class="doc-extracted-row">
                <span class="k">Name:</span>
                <span class="v">MANOJ ARORA</span>
              </div>
              <div class="doc-extracted-row">
                <span class="k">Father:</span>
                <span class="v">AJIT SINGH ARORA</span>
              </div>
              <div class="doc-extracted-row">
                <span class="k">DOB:</span>
                <span class="v">02/01/1979</span>
              </div>
            </div>
            <div class="doc-btn-row">
              <button class="btn btn-sm btn-primary" onclick="window.copyText('APVPA5577L', 'PAN Number')">Copy PAN</button>
              <button class="btn btn-sm btn-white" onclick="window.openViewer(window.EMBEDDED_ASSETS.pan, 'PAN Card - APVPA5577L', 'Income Tax Department')">View Big</button>
              <a href="${imgs.pan}" download="Manoj_Arora_PAN_Card.jpg" class="btn btn-sm btn-white">Download</a>
            </div>
          </div>
        </div>

        <!-- 2. Aadhaar Card (Front) -->
        <div class="doc-big-card">
          <div class="doc-image-holder" onclick="window.openViewer(window.EMBEDDED_ASSETS.aadhaarFront, 'Aadhaar Card (Front) - 9183 9303 9252', 'UIDAI Govt of India - Manoj Arora, YOB 1979, Male')">
            <img src="${imgs.aadhaarFront}" alt="Aadhaar Card Front" />
            <div class="doc-overlay-hover">
              <span class="btn-zoom-pill">🔍 Zoom & Inspect</span>
            </div>
          </div>
          <div class="doc-info-block">
            <div class="doc-tag-row">
              <span class="badge badge-verified">UIDAI Verified</span>
              <span class="badge badge-sky">9183 9303 9252</span>
            </div>
            <h4 class="doc-title">Aadhaar Card (Front)</h4>
            <div class="doc-extracted-box">
              <div class="doc-extracted-row">
                <span class="k">Aadhaar No:</span>
                <span class="v text-primary">9183 9303 9252</span>
              </div>
              <div class="doc-extracted-row">
                <span class="k">Name:</span>
                <span class="v">Manoj Arora (मनोज अरोड़ा)</span>
              </div>
              <div class="doc-extracted-row">
                <span class="k">Birth Year:</span>
                <span class="v">1979 (Male)</span>
              </div>
            </div>
            <div class="doc-btn-row">
              <button class="btn btn-sm btn-primary" onclick="window.copyText('9183 9303 9252', 'Aadhaar Number')">Copy Aadhaar</button>
              <button class="btn btn-sm btn-white" onclick="window.openViewer(window.EMBEDDED_ASSETS.aadhaarFront, 'Aadhaar Card Front', 'UIDAI')">View Big</button>
              <a href="${imgs.aadhaarFront}" download="Manoj_Arora_Aadhaar_Front.jpg" class="btn btn-sm btn-white">Download</a>
            </div>
          </div>
        </div>

        <!-- 3. Aadhaar Card (Back - Address) -->
        <div class="doc-big-card">
          <div class="doc-image-holder" onclick="window.openViewer(window.EMBEDDED_ASSETS.aadhaarBack, 'Aadhaar Card (Back - Address)', 'House No 2276, Mari Wala Town, Manimajra, Chandigarh - 160101')">
            <img src="${imgs.aadhaarBack}" alt="Aadhaar Card Back" />
            <div class="doc-overlay-hover">
              <span class="btn-zoom-pill">🔍 Zoom & Inspect</span>
            </div>
          </div>
          <div class="doc-info-block">
            <div class="doc-tag-row">
              <span class="badge badge-verified">Address Proof</span>
              <span class="badge badge-amber">PIN: 160101</span>
            </div>
            <h4 class="doc-title">Aadhaar Card (Back)</h4>
            <div class="doc-extracted-box">
              <div class="doc-extracted-row">
                <span class="k">Guardian:</span>
                <span class="v">S/O Ajit Singh Arora</span>
              </div>
              <div class="doc-extracted-row">
                <span class="k">House:</span>
                <span class="v">House No 2276, Mari Wala Town</span>
              </div>
              <div class="doc-extracted-row">
                <span class="k">Locality:</span>
                <span class="v">Manimajra, Chandigarh - 160101</span>
              </div>
            </div>
            <div class="doc-btn-row">
              <button class="btn btn-sm btn-primary" onclick="window.copyText('House No 2276, Mari Wala Town, Manimajra, Daria, Chandigarh, Chandigarh - 160101', 'Aadhaar Address')">Copy Address</button>
              <button class="btn btn-sm btn-white" onclick="window.openViewer(window.EMBEDDED_ASSETS.aadhaarBack, 'Aadhaar Back', 'Address Proof')">View Big</button>
              <a href="${imgs.aadhaarBack}" download="Manoj_Arora_Aadhaar_Back.jpg" class="btn btn-sm btn-white">Download</a>
            </div>
          </div>
        </div>

        <!-- 4. UCO Bank Cheque Leaf -->
        <div class="doc-big-card">
          <div class="doc-image-holder" onclick="window.openViewer(window.EMBEDDED_ASSETS.cheque, 'UCO Bank Cheque Leaf - Manoj Arora', 'A/C: 02360110051771 | IFSC: UCBA0000236 | Sector 17B Chandigarh')">
            <img src="${imgs.cheque}" alt="UCO Bank Cheque Leaf" />
            <div class="doc-overlay-hover">
              <span class="btn-zoom-pill">🔍 Zoom & Inspect</span>
            </div>
          </div>
          <div class="doc-info-block">
            <div class="doc-tag-row">
              <span class="badge badge-verified">Bank Account</span>
              <span class="badge badge-sky">UCO Bank</span>
            </div>
            <h4 class="doc-title">UCO Bank Cheque Leaf</h4>
            <div class="doc-extracted-box">
              <div class="doc-extracted-row">
                <span class="k">A/C No:</span>
                <span class="v font-mono text-primary">02360110051771</span>
              </div>
              <div class="doc-extracted-row">
                <span class="k">IFSC:</span>
                <span class="v font-mono">UCBA0000236</span>
              </div>
              <div class="doc-extracted-row">
                <span class="k">Branch:</span>
                <span class="v">Sector 17 B, Chandigarh</span>
              </div>
              <div class="doc-extracted-row">
                <span class="k">Cheque No:</span>
                <span class="v font-mono">000044</span>
              </div>
            </div>
            <div class="doc-btn-row">
              <button class="btn btn-sm btn-primary" onclick="window.copyText('02360110051771', 'Bank Account Number')">Copy A/C</button>
              <button class="btn btn-sm btn-white" onclick="window.openViewer(window.EMBEDDED_ASSETS.cheque, 'Bank Cheque', 'UCO Bank')">View Big</button>
              <a href="${imgs.cheque}" download="Manoj_Arora_Cheque.jpg" class="btn btn-sm btn-white">Download</a>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- 3. WRITTEN AADHAAR ADDRESS + GOOGLE MAP LOCATION -->
    <section class="section-wrapper" id="location-section">
      <div class="section-header">
        <span class="badge badge-verified">Aadhaar Verified Address</span>
        <h3>Residential Address & Live Google Map Location</h3>
        <p>Exact written address from Aadhaar card with interactive navigation pin in Chandigarh</p>
      </div>

      <div class="address-map-grid">
        
        <!-- Left: Aadhaar Written Address -->
        <div class="address-info-card">
          <div class="address-header">
            <span class="badge badge-sky mb-3">📍 Permanent Residence</span>
            <h4>Official Aadhaar Address</h4>
          </div>

          <div class="address-lead-text">
            “ House No 2276, Mari Wala Town, Manimajra, Daria, Chandigarh, Chandigarh - 160101 ”
          </div>

          <div class="address-breakdown-list">
            <div><strong>🏠 House Number:</strong> House No 2276</div>
            <div><strong>🛣️ Street / Area:</strong> Mari Wala Town</div>
            <div><strong>📍 Locality:</strong> Manimajra, Daria</div>
            <div><strong>🏙️ City / UT:</strong> Chandigarh (Union Territory)</div>
            <div><strong>📮 PIN Code:</strong> 160101</div>
            <div><strong>👨‍👦 Guardian / Father:</strong> S/O Ajit Singh Arora</div>
          </div>

          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="window.copyText('House No 2276, Mari Wala Town, Manimajra, Daria, Chandigarh, Chandigarh - 160101', 'Full Address')">
              📋 Copy Full Address
            </button>
            <a href="https://www.google.com/maps/search/?api=1&query=Mari+Wala+Town+Manimajra+Chandigarh+160101" target="_blank" rel="noopener" class="btn btn-white">
              🗺️ Open in Google Maps App
            </a>
          </div>
        </div>

        <!-- Right: Interactive Google Map -->
        <div class="map-card">
          <div class="map-iframe-container">
            <iframe 
              src="https://maps.google.com/maps?q=Mari+Wala+Town+Manimajra+Chandigarh+160101&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              title="Google Map location of Manoj Arora">
            </iframe>
          </div>
          <div class="map-bar">
            <span>📍 <strong>Location Pin:</strong> Mari Wala Town, Manimajra, Chandigarh 160101</span>
            <a href="https://www.google.com/maps/search/?api=1&query=Mari+Wala+Town+Manimajra+Chandigarh+160101" target="_blank" rel="noopener" class="btn btn-sm btn-primary">
              Get Directions ↗
            </a>
          </div>
        </div>

      </div>
    </section>

    <!-- 4. COMPANY & EMPLOYMENT SECTION (Down Below) -->
    <section class="section-wrapper" id="company-section">
      <div class="company-showcase-card">
        
        <div class="company-header-row">
          <div class="company-title-group">
            <div class="company-logo-avatar">💊</div>
            <div>
              <h3>Sun Pharmaceutical Industries Pvt Ltd</h3>
              <p>Area Sales Manager • Pharmaceutical Sector</p>
            </div>
          </div>

          <span class="badge badge-verified" style="font-size: 0.9rem; padding: 6px 16px;">
            Gross Annual Income: ₹8.60 Lakh (8,60,000/-)
          </span>
        </div>

        <div class="company-metrics-grid">
          
          <div class="comp-metric-box">
            <span class="comp-metric-k">Current Employer</span>
            <span class="comp-metric-v">Sun Pharmaceutical pvt ltd</span>
          </div>

          <div class="comp-metric-box">
            <span class="comp-metric-k">Designation</span>
            <span class="comp-metric-v">Area Sales Manager</span>
          </div>

          <div class="comp-metric-box">
            <span class="comp-metric-k">Gross Yearly Income</span>
            <span class="comp-metric-v text-success">₹8.60 Lakh / Annum</span>
          </div>

          <div class="comp-metric-box">
            <span class="comp-metric-k">Industry Type</span>
            <span class="comp-metric-v">Pharmaceutical</span>
          </div>

          <div class="comp-metric-box">
            <span class="comp-metric-k">Education / Background</span>
            <span class="comp-metric-v">D Pharma</span>
          </div>

          <div class="comp-metric-box">
            <span class="comp-metric-k">Settlement Bank</span>
            <span class="comp-metric-v">UCO Bank (Sec 17B CHD)</span>
          </div>

        </div>

        <div style="margin-top: 24px; padding: 18px; background: #ffffff; border: 1px solid rgba(16, 185, 129, 0.25); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
          <div>
            <strong>🏢 Office / Company Address:</strong>
            <p class="text-secondary" style="margin-top: 2px;">SCO 124, Sector 26 Madhya Marg, Chandigarh</p>
          </div>
          <button class="btn btn-sm btn-white" onclick="window.copyText('SCO 124, Sector 26 Madhya Marg, Chandigarh', 'Company Address')">
            📋 Copy Office Address
          </button>
        </div>

      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="footer-bar">
    <div class="container">
      <p><strong>Manoj Arora</strong> • Area Sales Manager • Sun Pharmaceutical pvt ltd • Chandigarh</p>
      <p class="text-muted" style="font-size: 0.78rem; margin-top: 4px;">PAN: APVPA5577L • Aadhaar: 9183 9303 9252 • Mobiles: 7508304834 / 9803106100 / 6284202226 • Bank: UCO Bank</p>
    </div>
  </footer>

  <!-- Edit Pending Dues Modal -->
  <div id="dues-edit-modal" class="modal-overlay" onclick="if(event.target === this) window.closeEditDuesModal()">
    <div class="modal-dialog-sm">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="font-size: 1.2rem; font-weight: 800;">Update Pending Dues Amount</h3>
        <button class="btn btn-sm btn-white" onclick="window.closeEditDuesModal()">✕</button>
      </div>
      <p class="text-secondary" style="font-size: 0.88rem;">Enter the exact amount of money that is pending for Manoj Arora:</p>
      
      <div>
        <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px; display: block;">Total Pending Amount (in ₹ INR)</label>
        <input type="text" id="dues-amount-input" class="form-control-lg" placeholder="e.g. ₹10,000" />
      </div>

      <div>
        <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px; display: block;">Note / Purpose (Optional)</label>
        <input type="text" id="dues-note-input" class="form-control-lg" placeholder="e.g. ₹5,000 non-payment on time + ₹5,000 mental harassment & time waste" />
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px;">
        <button class="btn btn-white" onclick="window.closeEditDuesModal()">Cancel</button>
        <button class="btn btn-danger" onclick="window.saveDuesAmount()">Save Amount</button>
      </div>
    </div>
  </div>

  <!-- Interactive Lightbox Modal -->
  <div id="image-viewer-modal" class="modal-overlay" onclick="if(event.target === this) window.closeViewer()">
    <div class="modal-content-box">
      <div class="modal-top-bar">
        <div>
          <h3 id="modal-viewer-title">Document Preview</h3>
          <p id="modal-viewer-subtitle" class="text-secondary" style="font-size: 0.8rem;"></p>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="btn btn-sm btn-white" onclick="window.rotateViewer(-90)" title="Rotate Counter-Clockwise">↺ Rotate -90°</button>
          <button class="btn btn-sm btn-white" onclick="window.rotateViewer(90)" title="Rotate Clockwise">↻ Rotate +90°</button>
          <button class="btn btn-sm btn-white" onclick="window.zoomViewer(0.2)" title="Zoom In">🔍 +</button>
          <button class="btn btn-sm btn-white" onclick="window.zoomViewer(-0.2)" title="Zoom Out">🔍 -</button>
          <button class="btn btn-sm btn-white" onclick="window.resetViewer()" title="Reset">Reset</button>
          <a id="modal-viewer-download" href="" download class="btn btn-sm btn-primary">Download</a>
          <button class="btn btn-sm btn-white" onclick="window.closeViewer()" style="font-size: 1.1rem; padding: 4px 10px;">✕</button>
        </div>
      </div>
      <div class="modal-img-stage" id="modal-img-stage">
        <img id="modal-viewer-img" src="" alt="Zoomed Document" />
      </div>
      <div class="modal-bottom-bar">
        <span class="text-secondary" style="font-size: 0.8rem;">💡 Tip: Click & drag to pan, use buttons above to rotate & zoom.</span>
        <span id="modal-viewer-zoom-level" class="badge badge-sky">100%</span>
      </div>
    </div>
  </div>

  <!-- Toast Notification Container -->
  <div id="toast-box" class="toast-box">
    <span>✓</span>
    <span id="toast-message">Copied to clipboard!</span>
  </div>

  <script src="js/data.js"></script>
  <script src="js/embedded_images.js"></script>
  <script>
    // Pending Dues State Management
    const DUES_KEY = "MANOJ_PENDING_DUES_AMOUNT_V2";
    const DUES_NOTE_KEY = "MANOJ_PENDING_DUES_NOTE_V2";

    function loadDues() {
      const savedAmount = localStorage.getItem(DUES_KEY) || "₹10,000";
      const savedNote = localStorage.getItem(DUES_NOTE_KEY) || "Total pending money of ₹10,000 (₹5,000 for delayed payment + ₹5,000 for mental harassment and time waste) to be paid by Manoj Arora.";
      
      document.getElementById('display-dues-amount').innerText = savedAmount;
      document.getElementById('header-dues-val').innerText = savedAmount;
      document.getElementById('dues-desc-text').innerHTML = \`Total pending money of <strong>\${savedAmount}</strong> to be paid by Manoj Arora immediately.\`;
    }

    window.openEditDuesModal = function() {
      const cur = document.getElementById('display-dues-amount').innerText;
      const note = document.getElementById('dues-desc-text').innerText;
      document.getElementById('dues-amount-input').value = cur;
      document.getElementById('dues-note-input').value = note;
      document.getElementById('dues-edit-modal').classList.add('active');
    };

    window.closeEditDuesModal = function() {
      document.getElementById('dues-edit-modal').classList.remove('active');
    };

    window.saveDuesAmount = function() {
      let val = document.getElementById('dues-amount-input').value.trim();
      let note = document.getElementById('dues-note-input').value.trim();
      if (!val) val = "₹0";
      if (!val.startsWith("₹") && !isNaN(val.replace(/,/g, ''))) {
        val = "₹" + Number(val.replace(/,/g, '')).toLocaleString('en-IN');
      }
      localStorage.setItem(DUES_KEY, val);
      if (note) localStorage.setItem(DUES_NOTE_KEY, note);
      
      document.getElementById('display-dues-amount').innerText = val;
      document.getElementById('header-dues-val').innerText = val;
      if (note) document.getElementById('dues-desc-text').innerHTML = \`Total pending money of <strong>\${val}</strong> to be paid by Manoj Arora immediately.\`;

      window.closeEditDuesModal();
      window.showToast("Pending dues amount updated: " + val);
    };

    window.copyBankSettlement = function() {
      const bankDetails = "BANK SETTLEMENT DETAILS FOR MANOJ ARORA:\\nBank: UCO Bank\\nBranch: Sector 17 B, Bank Square, Chandigarh\\nA/C No: 02360110051771\\nIFSC Code: UCBA0000236\\nAccount Holder: MANOJ ARORA\\n\\nPending Amount to Pay: ₹10,000\\nBreakdown:\\n- ₹5,000 for delayed payment on time\\n- ₹5,000 for mental harassment and time waste";
      window.copyText(bankDetails, "Bank Account Details");
    };

    // Copy Helper
    window.copyText = function(text, label = "Item") {
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        window.showToast(\`Copied \${label}: \${text}\`);
      }).catch(() => {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        window.showToast(\`Copied \${label}!\`);
      });
    };

    // Toast
    window.showToast = function(msg) {
      const toast = document.getElementById("toast-box");
      const textEl = document.getElementById("toast-message");
      if (toast && textEl) {
        textEl.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2600);
      }
    };

    // Copy All Profile
    window.copyAllDetails = function() {
      const dues = document.getElementById('display-dues-amount').innerText;
      const p = window.MANOJ_PROFILE || {
        personal: { fullName: 'Manoj Arora', hindiName: 'मनोज अरोड़ा', dob: '02.01.1979', age: '47 Years', gender: 'Male', fatherName: 'Ajit Singh Arora', motherName: 'Sunita Arora', placeOfBirth: 'Chandigarh', identificationMark: 'Mole on left feet', education: 'D Pharma', height: "5'9\\"", weight: '73 kg' },
        contact: { mobile1Formatted: '+91 75083 04834', mobile1: '7508304834', mobile2Formatted: '+91 98031 06100', mobile2: '9803106100', mobile3Formatted: '+91 62842 02226', mobile3: '6284202226', email: 'arora.manoj80@gmail.com' },
        address: { fullAadhaarAddress: 'House No 2276, Mari Wala Town, Manimajra, Daria, Chandigarh, Chandigarh - 160101' },
        employment: { companyName: 'Sun Pharmaceutical pvt ltd', designation: 'Area Sales Manager', grossAnnualIncome: '₹8.60 Lakh', grossAnnualIncomeNumeric: 'INR 8,60,000/-', officeAddress: 'SCO 124, Sector 26 Madhya Marg, Chandigarh' },
        kyc: { panNumber: 'APVPA5577L', aadhaarNumber: '9183 9303 9252', bankName: 'UCO Bank', branch: 'Sector 17 B - Chandigarh', accountNumber: '02360110051771', ifscCode: 'UCBA0000236' }
      };

      const allText = \`MANOJ ARORA - PERSONALISED WEBSITE FOR YOU MANOJ
===========================================
TOTAL PENDING MONEY MANOJ HAS TO PAY: \${dues}
BREAKDOWN:
1. ₹5,000 - For not payment of money on time
2. ₹5,000 - For mental harassment and time waste
Total Amount: ₹10,000/-
-------------------------------------------
Full Name: \${p.personal.fullName} (\${p.personal.hindiName})
DOB: \${p.personal.dob} (Age: \${p.personal.age})
Gender: \${p.personal.gender}
Father's Name: \${p.personal.fatherName}
Mother's Name: \${p.personal.motherName}
Place of Birth: \${p.personal.placeOfBirth}
Identification Mark: \${p.personal.identificationMark}
Education: \${p.personal.education}
Height & Weight: \${p.personal.height}, \${p.personal.weight}

CONTACT MOBILE NUMBERS (ALL 3 NUMBERS):
1. Primary Mobile: \${p.contact.mobile1Formatted} (\${p.contact.mobile1})
2. Mobile 2: \${p.contact.mobile2Formatted} (\${p.contact.mobile2})
3. Mobile 3: \${p.contact.mobile3Formatted} (\${p.contact.mobile3})
Email: \${p.contact.email}

OFFICIAL ADDRESS (AADHAAR):
\${p.address.fullAadhaarAddress}

COMPANY & EMPLOYMENT:
Company: \${p.employment.companyName}
Designation: \${p.employment.designation}
Gross Income: \${p.employment.grossAnnualIncome} (\${p.employment.grossAnnualIncomeNumeric})
Company Address: \${p.employment.officeAddress}

VERIFIED KYC & SETTLEMENT BANK:
- PAN Card: \${p.kyc.panNumber}
- Aadhaar Card: \${p.kyc.aadhaarNumber}
- Settlement Bank: \${p.kyc.bankName} (\${p.kyc.branch})
- Account No: \${p.kyc.accountNumber} | IFSC: \${p.kyc.ifscCode}
===========================================\`;

      window.copyText(allText, "All Manoj Arora Details");
    };

    // Viewer Logic
    let viewerScale = 1;
    let viewerRotation = 0;

    window.openViewer = function(src, title, subtitle) {
      const modal = document.getElementById("image-viewer-modal");
      const img = document.getElementById("modal-viewer-img");
      const titleEl = document.getElementById("modal-viewer-title");
      const subEl = document.getElementById("modal-viewer-subtitle");
      const downloadEl = document.getElementById("modal-viewer-download");

      img.src = src;
      titleEl.textContent = title || "Document";
      subEl.textContent = subtitle || "";
      downloadEl.href = src;
      downloadEl.download = \`\${title.replace(/\\s+/g, '_')}.jpg\`;

      viewerScale = 1;
      viewerRotation = 0;
      applyViewerTransform();

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    window.closeViewer = function() {
      const modal = document.getElementById("image-viewer-modal");
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    window.zoomViewer = function(delta) {
      viewerScale = Math.min(Math.max(0.3, viewerScale + delta), 4);
      applyViewerTransform();
    };

    window.rotateViewer = function(deg) {
      viewerRotation = (viewerRotation + deg) % 360;
      applyViewerTransform();
    };

    window.resetViewer = function() {
      viewerScale = 1;
      viewerRotation = 0;
      applyViewerTransform();
    };

    function applyViewerTransform() {
      const img = document.getElementById("modal-viewer-img");
      const zoomBadge = document.getElementById("modal-viewer-zoom-level");
      if (img) {
        img.style.transform = \`scale(\${viewerScale}) rotate(\${viewerRotation}deg)\`;
      }
      if (zoomBadge) {
        zoomBadge.textContent = \`\${Math.round(viewerScale * 100)}%\`;
      }
    }

    // Keyboard support
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        window.closeViewer();
        window.closeEditDuesModal();
      }
    });

    document.addEventListener("DOMContentLoaded", loadDues);
  </script>
</body>
</html>`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('Self-contained index.html with Personalised website for you manoj generated successfully');
