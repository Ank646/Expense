const { jsPDF } = require("jspdf");
const nodemailer = require("nodemailer");
const dataParserForItems = require("./dataParser");
require("jspdf-autotable");


function generatePDF(data) {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text("Your Expenses In Last One Month!", 105, 20, { align: "center" });
    doc.setLineWidth(1);
    doc.line(15, 25, 195, 25);

    doc.autoTable({
        head: [["S.No", "Date", "Amount", "Category"]],
        body: data.body,
        foot: [["", "Total", data.total, ""]],
        theme: "grid",
        startY: 40,
        styles: {
            fontSize: 14,
            cellPadding: 5,
        },
    });

    console.log("PDF Generated Successfully!");
    return doc.output("dataurlstring").split(",")[1]; 
}


async function sendEmailWithAttachment(recipient, items) {
    console.log("Processing Email Sending...");

    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: '',
            pass: ''
             },
    });

    let body = dataParserForItems(items);
    const pdfContent = generatePDF(body);
console.log(body);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: "Expense Report for This Month",
        text: "Please find your expense report attached.",
        attachments: [
            {
                filename: "expense_report.pdf",
                content: pdfContent,
                encoding: "base64",
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        // console.log(" Email Sent Successfully:", info.response);
    } catch (error) {
        console.error("Error Sending Email:", error);
    }
}

module.exports = sendEmailWithAttachment;
