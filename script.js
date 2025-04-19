document.getElementById('diabetes-form').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
  
    // Convert strings to floats
    Object.keys(data).forEach(key => {
      data[key] = parseFloat(data[key]);
    });
  
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) throw new Error('Prediction failed');
  
      const result = await response.json();
      document.getElementById('result').innerHTML = `
        <strong>Prediction:</strong> ${result.prediction} <br>
        <strong>Probability:</strong> ${result.probability}%
      `;
    } catch (error) {
      document.getElementById('result').textContent = 'Error: Could not get prediction.';
      console.error(error);
    }
  });

  
 //health tips

 
 document.getElementById('diabetes-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const form = e.target;
    const data = {
      Pregnancies: parseFloat(form.Pregnancies.value),
      Glucose: parseFloat(form.Glucose.value),
      BloodPressure: parseFloat(form.BloodPressure.value),
      SkinThickness: parseFloat(form.SkinThickness.value),
      Insulin: parseFloat(form.Insulin.value),
      BMI: parseFloat(form.BMI.value),
      DiabetesPedigreeFunction: parseFloat(form.DiabetesPedigreeFunction.value),
      Age: parseFloat(form.Age.value),
    };
  
    // Fake prediction result (replace with actual fetch to Flask backend)
    const prediction = Math.random() > 0.5 ? "Positive" : "Negative";
    document.getElementById('result').textContent = `Prediction: ${prediction}`;
  
    // Generate Health Tips
    const tips = [];
  
    if (data.BMI > 30) {
      tips.push("Your BMI is high. Try adding 30 minutes of walking to your daily routine.");
    } else if (data.BMI < 18.5) {
      tips.push("Your BMI is low. Consider a balanced diet with enough calories.");
    }
  
    if (data.Glucose > 140) {
      tips.push("Your glucose level is elevated. Limit sugary foods and monitor your diet.");
    }
  
    if (data.BloodPressure > 90) {
      tips.push("High blood pressure detected. Try reducing salt intake and managing stress.");
    }
  
    if (data.Insulin < 16) {
      tips.push("Low insulin levels may indicate an issue. Consult a healthcare provider.");
    }
  
    if (data.Age > 45) {
      tips.push("Regular checkups are important as you age. Keep monitoring your health.");
    }
  
    // Display tips
    const tipsDiv = document.getElementById('health-tips');
    tipsDiv.innerHTML = "<h3>Health Tips:</h3>";
    if (tips.length > 0) {
      tipsDiv.innerHTML += `<ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul>`;
    } else {
      tipsDiv.innerHTML += "<p>Your inputs look within healthy ranges. Keep up the good work!</p>";
    }
  });



  //progress bar
  const inputs = document.querySelectorAll("#diabetes-form input");
const progressBar = document.getElementById("progress-bar");

inputs.forEach(input => {
  input.addEventListener("input", updateProgress);
});

function updateProgress() {
  const total = inputs.length;
  let filled = 0;

  inputs.forEach(input => {
    if (input.value.trim() !== "") {
      filled++;
    }
  });

  const percent = (filled / total) * 100;
  progressBar.style.width = `${percent}%`;
}


//toggle switch for dark and light mode

const darkToggle = document.getElementById('dark-mode-toggle');

darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});


//language change

const translations = {
  en: {
    title: "Diabetes Prediction",
    Pregnancies: "Pregnancies",
    Glucose: "Glucose",
    BloodPressure: "Blood Pressure",
    SkinThickness: "Skin Thickness",
    Insulin: "Insulin",
    BMI: "BMI",
    DiabetesPedigreeFunction: "Diabetes Pedigree Function",
    Age: "Age",
    Predict: "Predict",
    DarkMode: "Dark Mode",
    Language: "Language:",
    Prediction: "Prediction",
    Positive: "Positive",
    Negative: "Negative",
    HealthTips: "Health Tips:",
    Tips: {
      bmiHigh: "Your BMI is high. Try adding 30 minutes of walking to your daily routine.",
      bmiLow: "Your BMI is low. Consider a balanced diet with enough calories.",
      glucoseHigh: "Your glucose level is elevated. Limit sugary foods and monitor your diet.",
      bpHigh: "High blood pressure detected. Try reducing salt intake and managing stress.",
      insulinLow: "Low insulin levels may indicate an issue. Consult a healthcare provider.",
      ageHigh: "Regular checkups are important as you age. Keep monitoring your health.",
      healthy: "Your inputs look within healthy ranges. Keep up the good work!"
    }
  },
  hi: {
    title: "मधुमेह की भविष्यवाणी",
    Pregnancies: "गर्भधारण",
    Glucose: "ग्लूकोज",
    BloodPressure: "रक्तचाप",
    SkinThickness: "त्वचा की मोटाई",
    Insulin: "इंसुलिन",
    BMI: "बीएमआई",
    DiabetesPedigreeFunction: "मधुमेह वंशानुगत कार्य",
    Age: "आयु",
    Predict: "भविष्यवाणी करें",
    DarkMode: "डार्क मोड",
    Language: "भाषा:",
    Prediction: "भविष्यवाणी",
    Positive: "सकारात्मक",
    Negative: "नकारात्मक",
    HealthTips: "स्वास्थ्य सुझाव:",
    Tips: {
      bmiHigh: "आपका बीएमआई अधिक है। रोजाना 30 मिनट पैदल चलने की कोशिश करें।",
      bmiLow: "आपका बीएमआई कम है। पर्याप्त कैलोरी के साथ संतुलित आहार लें।",
      glucoseHigh: "आपका ग्लूकोज स्तर उच्च है। मीठे खाद्य पदार्थों को सीमित करें।",
      bpHigh: "उच्च रक्तचाप पाया गया। नमक कम करें और तनाव प्रबंधन करें।",
      insulinLow: "इंसुलिन का स्तर कम है। कृपया डॉक्टर से सलाह लें।",
      ageHigh: "जैसे-जैसे उम्र बढ़ती है, नियमित जांच आवश्यक है।",
      healthy: "आपका डाटा सामान्य है। इसी तरह ध्यान रखें!"
    }
  },
  gu: {
    title: "ડાયાબિટીસની આગાહી",
    Pregnancies: "ગર્ભધારણ",
    Glucose: "ગ્લૂકોઝ",
    BloodPressure: "રક્ત દબાણ",
    SkinThickness: "ચામડીની જાડાઈ",
    Insulin: "ઇન્સ્યુલિન",
    BMI: "બીએમઆઈ",
    DiabetesPedigreeFunction: "ડાયાબિટીસ વંશાવળી કાર્ય",
    Age: "ઉમર",
    Predict: "અનુમાન",
    DarkMode: "ડાર્ક મોડ",
    Language: "ભાષા:",
    Prediction: "અનુમાન",
    Positive: "હકારાત્મક",
    Negative: "નકારાત્મક",
    HealthTips: "આરોગ્ય સલાહ:",
    Tips: {
      bmiHigh: "તમારું બીએમઆઈ વધુ છે. દરરોજ 30 મિનિટ ચાલવાની કોશિશ કરો.",
      bmiLow: "તમારું બીએમઆઈ ઓછું છે. પૂરતું આહાર લો.",
      glucoseHigh: "તમારું ગ્લૂકોઝ લેવલ વધુ છે. મીઠી વસ્તુઓથી બચો.",
      bpHigh: "ઉચ્ચ રક્ત દબાણ મળ્યું. મીઠું ઓછું કરો અને તણાવ ઓછો કરો.",
      insulinLow: "ઇન્સ્યુલિન લેવલ ઓછી છે. ડૉક્ટરનો સંપર્ક કરો.",
      ageHigh: "ઉમર વધે ત્યારે નિયમિત તપાસ મહત્વપૂર્ણ છે.",
      healthy: "તમારા ઇનપુટ્સ સામાન્ય છે. આમ જ આગળ વધો!"
    }
  }
};



const languageSelector = document.getElementById("language");

languageSelector.addEventListener("change", function () {
  const lang = this.value;
  applyLanguage(lang);
});

function applyLanguage(lang) {
  const t = translations[lang];

  document.querySelector("h1").textContent = t.title;
  document.querySelector('label[for="language"]').textContent = t.Language;
  document.querySelector(".toggle-label").textContent = t.DarkMode;

  const labels = document.querySelectorAll("#diabetes-form label");
  const inputs = document.querySelectorAll("#diabetes-form input");

  const keys = [
    "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
    "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
  ];

  labels.forEach((label, i) => {
    label.textContent = t[keys[i]];
  });

  document.querySelector(".btn").textContent = t.Predict;
}


window.addEventListener("DOMContentLoaded", () => {
  applyLanguage("en");
});


//health tips in other language
document.getElementById('diabetes-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const lang = document.getElementById("language").value;
  const t = translations[lang];

  const form = e.target;
  const data = {
    Pregnancies: parseFloat(form.Pregnancies.value),
    Glucose: parseFloat(form.Glucose.value),
    BloodPressure: parseFloat(form.BloodPressure.value),
    SkinThickness: parseFloat(form.SkinThickness.value),
    Insulin: parseFloat(form.Insulin.value),
    BMI: parseFloat(form.BMI.value),
    DiabetesPedigreeFunction: parseFloat(form.DiabetesPedigreeFunction.value),
    Age: parseFloat(form.Age.value),
  };

  const prediction = Math.random() > 0.5 ? t.Positive : t.Negative;
  document.getElementById('result').textContent = `${t.Prediction}: ${prediction}`;

  const tips = [];

  if (data.BMI > 30) tips.push(t.Tips.bmiHigh);
  else if (data.BMI < 18.5) tips.push(t.Tips.bmiLow);

  if (data.Glucose > 140) tips.push(t.Tips.glucoseHigh);
  if (data.BloodPressure > 90) tips.push(t.Tips.bpHigh);
  if (data.Insulin < 16) tips.push(t.Tips.insulinLow);
  if (data.Age > 45) tips.push(t.Tips.ageHigh);

  const tipsDiv = document.getElementById('health-tips');
  tipsDiv.innerHTML = `<h3>${t.HealthTips}</h3>`;
  if (tips.length > 0) {
    tipsDiv.innerHTML += `<ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
  } else {
    tipsDiv.innerHTML += `<p>${t.Tips.healthy}</p>`;
  }
});


//pie chart
document.getElementById("diabetes-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = parseFloat(value);
  });


  // Draw Pie Chart
  showPieChart(data);
});

let pieChartInstance;

function showPieChart(data) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const ctx = document.getElementById("featurePieChart").getContext("2d");

  // Destroy previous chart if exists
  if (pieChartInstance) {
    pieChartInstance.destroy();
  }

  pieChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        label: "Patient Features",
        data: values,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56",
          "#4BC0C0", "#9966FF", "#FF9F40",
          "#E7E9ED", "#76C7C0"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right"
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw}`;
            }
          }
        }
      }
    }
  });
}

  
