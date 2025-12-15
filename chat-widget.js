// ===== RESUME MODAL =====
const resumeModal = document.getElementById("resumeModal");
const viewResumeBtn = document.getElementById("viewResumeBtn");
const closeResume = document.getElementById("closeResume");

viewResumeBtn.onclick = () => resumeModal.style.display = "block";
closeResume.onclick = () => resumeModal.style.display = "none";

// ===== CERTIFICATE MODAL =====
const certModal = document.getElementById("certModal");
const certFrame = document.getElementById("certFrame");
const closeCert = document.getElementById("closeCert");

function openCert(pdfPath) {
    certFrame.src = pdfPath + "#navpanes=0";
    certModal.style.display = "block";
}

closeCert.onclick = () => {
    certModal.style.display = "none";
    certFrame.src = "";
};

// ===== CLOSE ON OUTSIDE CLICK =====
window.onclick = function (event) {
    if (event.target === resumeModal) resumeModal.style.display = "none";
    if (event.target === certModal) {
        certModal.style.display = "none";
        certFrame.src = "";
    }
};
