/**
 * Manoj Arora - Personal Dossier & Verified Identity Data
 */
const MANOJ_PROFILE = {
  personal: {
    fullName: "Manoj Arora",
    hindiName: "मनोज अरोड़ा",
    dob: "02.01.1979",
    age: "47 Years",
    gender: "Male",
    identificationMark: "Mole on left feet",
    placeOfBirth: "Chandigarh",
    fatherName: "Ajit Singh Arora",
    motherName: "Sunita Arora",
    maritalStatus: "Married",
    education: "D Pharma",
    occupation: "Area Sales Manager",
    nationality: "Indian",
    bloodGroup: "B+ (Standard)",
    height: "5'9\" (175 cm)",
    weight: "73 kg",
    bmi: "23.8 (Normal & Healthy)",
    medicalStatus: "Standard Life / Non-Smoker / No Diabetes or BP"
  },
  contact: {
    mobile1: "7508304834",
    mobile1Formatted: "+91 75083 04834",
    mobile2: "9803106100",
    mobile2Formatted: "+91 98031 06100",
    mobile3: "6284202226",
    mobile3Formatted: "+91 62842 02226",
    email: "arora.manoj80@gmail.com",
    city: "Chandigarh",
    state: "Chandigarh (UT)",
    pincode: "160101"
  },
  address: {
    fullAadhaarAddress: "House No 2276, Mari Wala Town, Manimajra, Daria, Chandigarh, Chandigarh - 160101",
    houseNo: "House No 2276",
    street: "Mari Wala Town",
    locality: "Manimajra, Daria",
    city: "Chandigarh",
    pincode: "160101",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13715.112999479366!2d76.8347372421379!3d30.72478330756778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93282b8b937d%3A0xe54d89a27bb1c2c3!2sMani%20Majra%2C%20Chandigarh%2C%20160101!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=Mari+Wala+Town+Manimajra+Chandigarh+160101"
  },
  employment: {
    companyName: "Sun Pharmaceutical pvt ltd",
    designation: "Area Sales Manager",
    industry: "Pharmaceutical",
    grossAnnualIncome: "₹8.60 Lakh",
    grossAnnualIncomeNumeric: "INR 8,60,000/-",
    officeAddress: "SCO 124, Sector 26 Madhya Marg, Chandigarh",
    duties: "Regional Sales & Operations Management"
  },
  kyc: {
    panNumber: "APVPA5577L",
    panStatus: "Verified Income Tax Card",
    aadhaarNumber: "9183 9303 9252",
    aadhaarFormatted: "9183 9303 9252",
    aadhaarStatus: "Verified UIDAI",
    bankName: "UCO Bank",
    branch: "Sector 17 B - Chandigarh",
    accountNumber: "02360110051771",
    ifscCode: "UCBA0000236",
    accountType: "Savings Bank A/c",
    chequeNumber: "000044",
    micrCode: "160028001"
  },
  documents: [
    {
      id: "pan_card",
      title: "PAN Card (Income Tax Dept)",
      docNumber: "APVPA5577L",
      type: "Tax / Identification Proof",
      status: "Verified",
      src: "assets/pan_card_upright.jpg",
      rawSrc: "assets/pan_card.jpg",
      desc: "Permanent Account Number card issued by Income Tax Department, Govt. of India",
      extracted: {
        "PAN Number": "APVPA5577L",
        "Name": "MANOJ ARORA",
        "Father's Name": "AJIT SINGH ARORA",
        "DOB": "02/01/1979",
        "Govt Dept": "Income Tax Department"
      }
    },
    {
      id: "aadhaar_front",
      title: "Aadhaar Card (Front)",
      docNumber: "9183 9303 9252",
      type: "UIDAI National Identity",
      status: "Verified",
      src: "assets/aadhaar_card_front_upright.png",
      rawSrc: "assets/aadhaar_card_front.png",
      desc: "Unique Identification Authority of India (UIDAI) Card",
      extracted: {
        "Aadhaar Number": "9183 9303 9252",
        "Name": "Manoj Arora (मनोज अरोड़ा)",
        "Year of Birth": "1979",
        "Gender": "Male"
      }
    },
    {
      id: "aadhaar_back",
      title: "Aadhaar Card (Back - Address)",
      docNumber: "PIN: 160101",
      type: "Official Address Proof",
      status: "Verified",
      src: "assets/aadhaar_card_back_upright.png",
      rawSrc: "assets/aadhaar_card_back.png",
      desc: "Permanent Address proof with UIDAI QR code",
      extracted: {
        "Father / Guardian": "S/O Ajit Singh Arora",
        "House": "House No 2276, Mari Wala Town",
        "Town / Locality": "Manimajra, Daria",
        "City & PIN": "Chandigarh - 160101"
      }
    },
    {
      id: "bank_cheque",
      title: "UCO Bank Cheque Leaf",
      docNumber: "A/C: 02360110051771",
      type: "Banking & Settlement Proof",
      status: "Verified",
      src: "assets/uco_bank_cheque_upright.png",
      rawSrc: "assets/uco_bank_cheque.png",
      desc: "Original Cheque leaf from UCO Bank Sector 17B Chandigarh",
      extracted: {
        "Account Holder": "MANOJ ARORA",
        "Bank": "UCO Bank",
        "Branch": "Sector 17 B Bank Square, Chandigarh",
        "A/C No": "02360110051771",
        "IFSC": "UCBA0000236",
        "Cheque No": "000044"
      }
    }
  ]
};

window.MANOJ_PROFILE = MANOJ_PROFILE;
