const LegalNotice = () => {
    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-16 max-w-5xl mx-auto text-slate-800 leading-relaxed text-sm">
            <h1 className="text-3xl font-bold mb-6 text-slate-900">Legal Notice</h1>
            
            <p className="mb-4">©2026 Bills Collection, LLC. ALL RIGHTS RESERVED. Please refer to the legal notice below for Terms of Use.</p>
            
            <p className="mb-4">
                This website is operated by Bills Collection, LLC. The website address for Bills Collection, LLC is 
                <a href="https://yourwebsite.com" className="text-indigo-600 hover:underline"> https://yourwebsite.com</a>. 
                The mailing address for Bills Collection, LLC is [Insert Mailing Address, City, State, Zip].
            </p>

            <p className="mb-6">
                All users of this website agree that their access to and use of this website are subject to the terms and conditions set forth in this legal notice and all applicable laws and that any such access or use is undertaken at the user's own risk. Bills Collection is not intended for children under the age of 18. These terms and conditions are subject to change at any time without prior notice. Any changes will be reflected on the Legal Notice page of the Bills Collection website.
            </p>

            <h2 className="text-xl font-bold mb-3 text-slate-900">Privacy & Transactions</h2>
            <p className="mb-6">
                By making a purchase from Bills Collection, you understand and agree that Bills Collection may share information about you and your transaction with other companies for the purpose of processing your transaction, including fraud prevention, credit card authorization, and shipping.
            </p>

            <h2 className="text-xl font-bold mb-3 text-slate-900">Intellectual Property</h2>
            <p className="mb-6">
                All images, graphics, code, software, and other content used on or incorporated into this website are subject to intellectual property rights held by or licensed to Bills Collection, LLC or its affiliates. Subject to your compliance with these terms of use, Bills Collection grants you a limited, non-exclusive, non-transferable, non-sub-licensable license to access and make personal and non-commercial use of this website. 
            </p>

            <h2 className="text-xl font-bold mb-3 text-slate-900">Disclaimer of Warranties</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6 font-bold uppercase text-xs tracking-tight">
                THE BILLS COLLECTION WEBSITE AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS, SERVICES AND USER CONTENT INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE WEBSITE (COLLECTIVELY, THE "SITE CONTENTS") ARE PROVIDED BY BILLS COLLECTION ON AN "AS IS," "AS AVAILABLE" BASIS, WITHOUT REPRESENTATIONS OR WARRANTIES OF ANY KIND. BILLS COLLECTION MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE WEBSITE, THE ACCURACY OR COMPLETENESS OF THE SITE CONTENTS, OR THAT THE WEBSITE OR EMAILS SENT FROM BILLS COLLECTION ARE FREE OF MALWARE OR OTHER HARMFUL COMPONENTS. YOU EXPRESSLY AGREE THAT YOUR USE OF THE BILLS COLLECTION WEBSITE IS AT YOUR SOLE RISK.
            </div>

            <h2 className="text-xl font-bold mb-3 text-slate-900">Limitation of Liability</h2>
            <p className="mb-6">
                To the fullest extent allowed by applicable laws, neither Bills Collection nor its corporate affiliates, nor the directors, officers, employees, agents, contractors, successors or assigns of each, shall be liable for any damages whatsoever arising out of or related to the use of this website.
            </p>

            <h2 className="text-xl font-bold mb-3 text-slate-900">Digital Millennium Copyright Act</h2>
            <p className="mb-6">
                The Digital Millennium Copyright Act of 1998 (the "DMCA") provides recourse for copyright owners who believe that material appearing on the Internet infringes their rights under U.S. copyright law. If you believe in good faith that materials available on the website infringe your copyright, please contact us at [Insert Copyright Email Address].
            </p>

            <h2 className="text-xl font-bold mb-3 text-slate-900">Customer Care</h2>
            <p className="mb-6">
                For more information on Bills Collection Care Policies or to resolve a complaint regarding service, call [Insert Phone Number] during business hours.
            </p>

            <h2 className="text-xl font-bold mb-3 text-slate-900">California Residents</h2>
            <p className="mb-6">
                Notice for California Residents pursuant to CA Civil Code section 1789.3: California residents may reach the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by mail at 1625 North Market Blvd., Sacramento, CA 95834, or by telephone at 1-916-445-1254 (TTY: 711) or 1-800-952-5210 (TTY: 711).
            </p>
        </div>
    );
};

export default LegalNotice;