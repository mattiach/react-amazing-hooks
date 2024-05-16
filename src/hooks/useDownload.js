import jsPDF from 'jspdf';

// custom hook to download text and pdf files using Blob and jsPDF
const useDownload = () => {
  const downloadTxt = (fileName, content) => {
    const file = new Blob([content], { type: "text/plain" });
    const href = URL.createObjectURL(file);

    const link = document.createElement("a");
    link.setAttribute("href", href);
    if (fileName) {
      link.setAttribute("download", `${fileName}.txt`);
    }
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  const downloadPDF = (fileName, content) => {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    const pdfDataUri = doc.output('datauristring');

    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.download = `${fileName}.pdf`;
    link.click();
  };

  return { downloadTxt, downloadPDF };
};

export default useDownload;
