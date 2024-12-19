const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOrderConfirmationEmail(to, order) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Order Confirmation",
    text: `Hello, ${order.name}. Thank you for your order! Your order is being processed.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h3 style="color: #333;">Hello, ${order.name}</h3>
        <p style="color: #555;">Thank you for your order! Your order is being processed and we will update you once it’s shipped.</p>
        <p style="font-weight: bold; color: #333;">Order Details:</p>
        <ul style="list-style: none; padding: 0;">
          ${order.items
            .map(
              (item) => `
              <li style="margin-bottom: 10px; color: #555;">
                <span style="font-weight: bold;">${item.quantity} x ${
                item.name
              }</span>
                <span style="float: right;">Ksh ${(
                  item.priceCents / 100
                ).toFixed(2)}</span>
              </li>`
            )
            .join("")}
        </ul>
        <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
        <p style="font-size: 18px; font-weight: bold; color: #333;">Total: Ksh ${(
          order.totalCents / 100
        ).toFixed(2)}</p>
        <p style="color: #555;">If you have any questions, feel free to contact us.</p>
        <p style="color: #333; font-size: 14px;">Thank you for shopping with us!</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOrderConfirmationEmail;
