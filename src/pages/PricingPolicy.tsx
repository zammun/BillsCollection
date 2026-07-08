const PricingPolicyPage = () => {
    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 max-w-5xl mx-auto text-slate-800 leading-relaxed text-sm">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">Pricing Policy</h1>
            
            <p className="mb-6">
                <strong>Last Updated: July 8, 2026</strong>
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">1. Pricing Accuracy</h2>
            <p className="mb-6">
                We make every reasonable effort to ensure that the pricing displayed on our website is accurate and current. However, despite our best efforts, errors may occur. In the event a product is listed at an incorrect price due to a typographical error or an error in pricing information received from our suppliers, Bills Collection reserves the right to refuse or cancel any orders placed for products listed at the incorrect price.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">2. Price Changes</h2>
            <p className="mb-6">
                Prices and availability of products are subject to change at any time without notice. We reserve the right to modify, discontinue, or update our product offerings and their associated costs at our sole discretion.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">3. Taxes and Fees</h2>
            <p className="mb-6">
                Prices displayed on our website are exclusive of applicable sales tax, value-added tax (VAT), or other government duties. You are responsible for any taxes or duties applicable to your purchase, which will be calculated and added to your order total at checkout based on your shipping address.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">4. Promotional Pricing</h2>
            <p className="mb-6">
                From time to time, we may offer promotional pricing, discount codes, or special sales. These offers are valid only for the time period specified and cannot be combined with other offers unless explicitly stated. We reserve the right to revoke or modify any promotional pricing or discount at any time without prior notification.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">5. Currency</h2>
            <p className="mb-6">
                All prices listed on our website are denominated in United States Dollars (USD). If you are purchasing from outside the United States, your bank or payment processor may apply its own exchange rate and international transaction fees.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">6. Third-Party Payments</h2>
            <p className="mb-6">
                All transactions are processed through our third-party payment provider, [e.g., Stripe]. Your agreement with that payment provider governs your use of their service, and you are subject to their terms and conditions. We do not store your full payment information on our servers.
            </p>

            <h2 className="text-lg font-bold mb-2 text-slate-900">Contact Us</h2>
            <p className="mb-6">
    If you have questions regarding our pricing, taxes, or a discrepancy with an order, please contact our support team at:
    <br />
    <strong>Email:</strong> <a href="mailto:contact@billscollection.co" className="text-indigo-600 hover:underline">contact@billscollection.co</a>
</p>
        </div>
    );
};

export default PricingPolicyPage;