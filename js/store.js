/**
 * Store - State Management & LocalStorage Synchronization
 */
const STORAGE_KEY = "MANOJ_ARORA_PROPOSAL_DATA_V1";
const THEME_KEY = "PROPOSAL_DOSSIER_THEME";

class ProposalStore {
  constructor() {
    this.listeners = [];
    this.data = this.loadData();
    this.theme = localStorage.getItem(THEME_KEY) || "dark";
    this.applyTheme(this.theme);
  }

  loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge deep with default data in case new keys exist
        return this.deepMerge(JSON.parse(JSON.stringify(window.DEFAULT_PROPOSAL_DATA)), parsed);
      }
    } catch (e) {
      console.error("Failed to parse saved proposal data", e);
    }
    return JSON.parse(JSON.stringify(window.DEFAULT_PROPOSAL_DATA));
  }

  deepMerge(target, source) {
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object && key in target && !(source[key] instanceof Array)) {
        Object.assign(source[key], this.deepMerge(target[key], source[key]));
      }
    }
    Object.assign(target || {}, source);
    return target;
  }

  saveData(newData) {
    if (newData) {
      this.data = newData;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      this.notifyListeners();
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      if (e.name === 'QuotaExceededError') {
        alert("Local storage is full. Please remove large uploaded images or reduce file size.");
      }
    }
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(window.DEFAULT_PROPOSAL_DATA));
    localStorage.removeItem(STORAGE_KEY);
    this.notifyListeners();
  }

  updateField(section, key, value) {
    if (this.data[section]) {
      this.data[section][key] = value;
      this.saveData();
    }
  }

  addDocument(doc) {
    if (!this.data.documents) {
      this.data.documents = [];
    }
    this.data.documents.push(doc);
    this.saveData();
  }

  updateDocument(id, updatedFields) {
    const doc = this.data.documents.find(d => d.id === id);
    if (doc) {
      Object.assign(doc, updatedFields);
      this.saveData();
    }
  }

  removeDocument(id) {
    this.data.documents = this.data.documents.filter(d => d.id !== id);
    this.saveData();
  }

  setPanCard(panNumber, imageBase64) {
    this.data.kyc.panNumber = panNumber.toUpperCase();
    this.data.kyc.panStatus = "Uploaded & Verified";
    
    // Check if pan document already exists
    let panDoc = this.data.documents.find(d => d.id === "pan_card");
    if (panDoc) {
      panDoc.number = panNumber.toUpperCase();
      if (imageBase64) {
        panDoc.src = imageBase64;
        panDoc.rawSrc = imageBase64;
      }
    } else {
      this.data.documents.unshift({
        id: "pan_card",
        title: "PAN Card (Permanent Account Number)",
        category: "Income Tax / KYC",
        number: panNumber.toUpperCase(),
        status: "Active",
        src: imageBase64 || "assets/pan_placeholder.png",
        rawSrc: imageBase64 || "assets/pan_placeholder.png",
        description: `Income Tax Department - PAN: ${panNumber.toUpperCase()} (Manoj Arora)`,
        extractedData: {
          "Name": this.data.personal.clientName,
          "Father's Name": this.data.personal.fatherName,
          "Date of Birth": this.data.personal.dob,
          "PAN Number": panNumber.toUpperCase()
        }
      });
    }
    this.saveData();
  }

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, this.theme);
    this.applyTheme(this.theme);
    this.notifyListeners();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners() {
    for (const cb of this.listeners) {
      try {
        cb(this.data);
      } catch (e) {
        console.error("Error notifying store listener", e);
      }
    }
  }
}

window.store = new ProposalStore();
