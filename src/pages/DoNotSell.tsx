const DoNotSellPage = () => {
    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 max-w-5xl mx-auto text-slate-800 leading-relaxed text-sm">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">Do Not Sell or Share My Personal Information</h1>
            
            <section className="mb-8 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                <h2 className="text-lg font-bold mb-3 text-indigo-900">Your Privacy Choices</h2>
                <p className="mb-4">
                    You have the right to opt out of the sale or sharing of your Personal Information, including 
                    Interest-Based/Targeted Advertising and Retargeting. While Bills Collection does not sell your 
                    personal information for monetary consideration, we do share information for purposes that may 
                    be deemed a "sale" or "sharing" under certain privacy legislation.
                </p>
                <div className="flex gap-4">
                    <a 
                        href="/privacypolicy" 
                        className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-colors"
                    >
                        View Privacy Policy
                    </a>
                </div>
            </section>

            <h2 className="text-2xl font-bold mb-6 text-slate-900">Your California Privacy Rights</h2>
            <p className="mb-6">
                Under the California Privacy Rights Act (CPRA), California residents have specific rights regarding 
                their Personal Information.
            </p>

            <div className="space-y-6 mb-12">
                {[
                    { title: "Right to Deletion", desc: "You may request the deletion of Personal Information we have collected about you. Upon verification, we will also notify our third-party partners to delete your information." },
                    { title: "Right to Correct", desc: "You have the right to correct inaccurate Personal Information we have collected. You can do this in your account profile or by contacting us." },
                    { title: "Right to Know / Access", desc: "You have the right to know what Personal Information we have collected about you in the past 12 months, including the categories of sources, the purpose of collection, and third parties with whom we share it." },
                    { title: "Right to Limit Use of Sensitive Information", desc: "You have the right to opt out of the disclosure of Sensitive Personal Information to a third party if we use that information for purposes beyond the designated operational necessity." },
                    { title: "Right to No Retaliation", desc: "Bills Collection will never discriminate nor retaliate against you if you choose to exercise any of these privacy rights." }
                ].map((item, idx) => (
                    <div key={idx} className="border-b border-slate-100 pb-4">
                        <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-slate-600">{item.desc}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-bold mb-4 text-slate-900">How to Exercise Your Rights</h2>
            <p className="mb-4">You may submit a request through any of the following methods:</p>
            <ul className="list-disc pl-5 mb-6 space-y-2">
                <li><strong>Privacy Policy & Requests:</strong> <a href="/privacypolicy" className="text-indigo-600 hover:underline">View Privacy Policy</a></li>
                <li><strong>By Phone:</strong> +1 (347) 327-6851 (TTY: 711)</li>
            </ul>

            <h3 className="font-bold text-slate-900 mb-2">Authorized Agents</h3>
            <p className="mb-6">
                If you would like to enter a request on behalf of a California resident, please submit the request via our 
                Privacy Policy page. Upon submission, you will be required to upload documentation showing proof of written 
                permission from the customer. We reserve the right to verify the identity of the customer.
            </p>

            <h3 className="font-bold text-slate-900 mb-2">California Shine the Light</h3>
            <p className="mb-6">
                California residents have the right to ask us once each year if we have shared personal information with 
                third parties for their direct marketing purposes. To request your "California Shine the Light Notice," 
                please write to: 365 Carteret Avenue, Carteret, New Jersey, USA. Please allow 30 days for a response.
            </p>
        </div>
    );
};

export default DoNotSellPage;