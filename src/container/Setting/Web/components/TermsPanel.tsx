const termsSections = [
  {
    title: "1. Introduction",
    content: [
      "Welcome to OUTSHINE Store. By using this application, you agree to be bound by these Terms and Conditions.",
      "We reserve the right to change these Terms and Conditions at any time without prior notice. Continued use of the application after such changes is considered your acceptance of those changes.",
    ],
  },
  {
    title: "2. User Account",
    content: [
      "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.",
      "We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion.",
    ],
  },
  {
    title: "3. Orders and Payments",
    content: [
      "All orders are subject to product availability. We reserve the right to limit the quantity of products that can be ordered.",
      "Product prices may change at any time without notice. The price charged is the price in effect at the time of ordering.",
      "Payment must be made immediately after ordering. We accept various secure payment methods.",
    ],
  },
  {
    title: "4. Shipping and Returns",
    content: [
      "We will endeavor to deliver your order according to the estimated delivery time. However, we are not responsible for delays caused by third parties.",
      "Our return policy allows you to return products within 7 days of receipt, subject to certain terms and conditions.",
    ],
  },
  {
    title: "5. Intellectual Property Rights",
    content: [
      "All content within this application, such as text, graphics, logos, and images, is the property of OUTSHINE Store or its content providers and is protected by copyright law.",
    ],
  },
];

export default function TermsPanel() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
          Terms & Conditions
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Last updated: January 27, 2026
        </p>
      </div>

      <div className="space-y-6">
        {termsSections.map(({ title, content }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-6 border-2 border-slate-50 space-y-3"
          >
            <h3 className="font-black text-[#0F172A] text-base">{title}</h3>
            <div className="space-y-2">
              {content.map((p, i) => (
                <p key={i} className="text-sm text-slate-500 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
