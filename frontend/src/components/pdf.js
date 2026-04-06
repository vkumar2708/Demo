import jsPDF from "jspdf";

export const downloadPDF = (emi, sip) => {
  const doc = new jsPDF();
  doc.text(`EMI: ₹${emi}`, 20, 20);
  doc.text(`SIP: ₹${sip}`, 20, 40);
  doc.save("report.pdf");
};