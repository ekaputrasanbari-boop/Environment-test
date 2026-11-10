
const questions = [
    {
        question: "Manakah yang merupakan contoh Environmental Aspect di fasilitas manufaktur?",
        options: [
          "Emisi gas rumah kaca",
          "Penurunan kualitas air",
          "Penggunaan bahan bakar pada boiler",
          "Pencemaran tanah",
          "Peningkatan suhu udara"
        ],
        answer: 2,
        explanation: "Pengelolaan lingkungan bertujuan melindungi lingkungan hidup, mencegah pencemaran, dan menjaga keberlanjutan sumber daya alam."
    },
    {
        question: "Apa kepanjangan dari WWTP?",
        options: [
            "Water Waste Treatment Program",
            "Waste Water Transfer Process",
            "Wastewater Treatment Plant",
            "Water Working Treatment Plant"
        ],
        answer: 2,
        explanation: "WWTP adalah Wastewater Treatment Plant, yaitu instalasi pengolahan air limbah."
    },
    {
        question: "Parameter yang digunakan untuk mengukur kebutuhan oksigen secara biologis adalah?",
        options: [
            "BOD",
            "TDS",
            "pH",
            "TSS"
        ],
        answer: 0,
        explanation: "BOD atau Biochemical Oxygen Demand menunjukkan kebutuhan oksigen untuk menguraikan bahan organik yang dapat terbiodegradasi."
    },
    {
        question: "Apa fungsi utama sedimentasi dalam pengolahan air limbah?",
        options: [
            "Menaikkan suhu air",
            "Menghilangkan gas terlarut",
            "Memisahkan partikel berdasarkan pengendapan gravitasi",
            "Meningkatkan kandungan COD"
        ],
        answer: 2,
        explanation: "Sedimentasi memisahkan padatan yang dapat mengendap dengan memanfaatkan gaya gravitasi."
    },
    {
        question: "Apa kepanjangan dari LB3?",
        options: [
            "Limbah Bahan Berbahaya dan Beracun",
            "Limbah Baku Bahan Beracun",
            "Lingkungan Bebas Bahan Berbahaya",
            "Limbah Bersih dan Berkelanjutan"
        ],
        answer: 0,
        explanation: "LB3 adalah Limbah Bahan Berbahaya dan Beracun."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

document.getElementById("startButton").addEventListener("click", startQuiz);
document.getElementById("nextButton").addEventListener("click", nextQuestion);
document.getElementById("restartButton").addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;

    home.classList.add("hidden");
    result.classList.add("hidden");
    quiz.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Soal ${currentQuestion + 1} dari ${questions.length}`;

    document.getElementById("question").textContent = q.question;

    document.getElementById("progressBar").style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    document.getElementById("explanation").classList.add("hidden");

    q.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent =
            String.fromCharCode(65 + index) + ". " + option;

        button.className = "option";

        button.addEventListener("click", () => selectAnswer(index));

        optionsDiv.appendChild(button);
    });

    const nextButton = document.getElementById("nextButton");

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "Lihat Hasil"
        : "Soal Berikutnya";
}

function selectAnswer(selected) {
    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];

    const buttons = document.querySelectorAll(".option");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === q.answer) {
            button.classList.add("correct");
        }

        if (index === selected && selected !== q.answer) {
            button.classList.add("wrong");
        }
    });

    if (selected === q.answer) {
        score++;
    }

    const explanation = document.getElementById("explanation");

    explanation.textContent =
        (selected === q.answer ? "BENAR! " : "BELUM TEPAT. ") +
        q.explanation;

    explanation.classList.remove("hidden");

    document.getElementById("nextButton").disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quiz.classList.add("hidden");
    result.classList.remove("hidden");

    const finalScore = Math.round(
        score / questions.length * 100
    );

    document.getElementById("finalScore").textContent = finalScore;

    document.getElementById("resultMessage").textContent =
        finalScore >= 70 ? "Selamat! Hasil Anda baik." : "Terus tingkatkan kemampuan Anda!";

    document.getElementById("scoreDetail").textContent =
        `Jawaban benar: ${score} dari ${questions.length} soal.`;
}

function restartQuiz() {
    startQuiz();
}
