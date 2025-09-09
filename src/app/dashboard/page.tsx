export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-6">
          <article className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-2">Campaigns</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Just Herbs</span>
                <span className="text-xs font-semibold text-green-700 bg-green-100 py-1 px-2 rounded">Active</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Juicy Chemistry</span>
                <span className="text-xs font-semibold text-green-700 bg-green-100 py-1 px-2 rounded">Active</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Hyugalife 2</span>
                <span className="text-xs font-semibold text-green-700 bg-green-100 py-1 px-2 rounded">Active</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Honeyveda</span>
                <span className="text-xs font-semibold text-green-700 bg-green-100 py-1 px-2 rounded">Active</span>
              </li>
              <li className="flex justify-between items-center">
                <span>HempStreet</span>
                <span className="text-xs font-semibold text-green-700 bg-green-100 py-1 px-2 rounded">Active</span>
              </li>
              <li className="flex justify-between items-center">
                <span>HealthyHey 2</span>
                <span className="text-xs font-semibold text-green-700 bg-green-100 py-1 px-2 rounded">Active</span>
              </li>
            </ul>
          </article>
          <article className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-2">LinkedIn Accounts</h2>
            <table className="w-full text-left text-gray-900 text-sm">
              <thead>
                <tr>
                  <th className="pb-2">Account</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Requests</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pulkit Garg<br/><span className="text-gray-500 text-xs">1999pulkitgarg@gmail.com</span></td>
                  <td>
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Connected</span>
                  </td>
                  <td><progress max={30} value={17} className="w-full h-2 rounded"></progress></td>
                </tr>
                <tr>
                  <td>Jivesh Lakhani<br/><span className="text-gray-500 text-xs">jivesh@gmail.com</span></td>
                  <td>
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Connected</span>
                  </td>
                  <td><progress max={30} value={19} className="w-full h-2 rounded"></progress></td>
                </tr>
                <tr>
                  <td>Indrajit Sahani<br/><span className="text-gray-500 text-xs">indrajit38min@gmail.com</span></td>
                  <td>
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Connected</span>
                  </td>
                  <td><progress max={30} value={18} className="w-full h-2 rounded"></progress></td>
                </tr>
                <tr>
                  <td>Bhavya Arora<br/><span className="text-gray-500 text-xs">bhavyaarora1994@gmail.com</span></td>
                  <td>
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Connected</span>
                  </td>
                  <td><progress max={30} value={18} className="w-full h-2 rounded"></progress></td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>
        <article className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">Recent Activity</h2>
            <button className="border rounded px-3 py-1 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100">
              Most Recent ▼
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs border-b">
                <th className="py-2 font-normal text-left">Lead</th>
                <th className="py-2 font-normal text-left">Campaign</th>
                <th className="py-2 font-normal text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 flex items-center gap-3">
                  <img src="/avatars/om_satyarthv.jpg" className="w-8 h-8 rounded-full" alt="Om Satyarthy" />
                  <div>
                    <div className="font-medium">Om Satyarthy</div>
                    <div className="text-xs text-gray-500">Regional Head</div>
                  </div>
                </td>
                <td className="py-3">Gynoveda</td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 font-medium text-xs px-3 py-1 rounded">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="inline"><circle cx="12" cy="12" r="10" fill="#a78bfa"></circle><text x="12" y="16" textAnchor="middle" fontSize="12" fontFamily="Arial" fill="#7c3aed">⏰</text></svg>
                    Pending Approval
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-bold">
                    DB
                  </div>
                  <div>
                    <div className="font-medium">Dr. Bhuvaneshwari</div>
                    <div className="text-xs text-gray-500">Fertility &amp; Women’s Health + A...</div>
                  </div>
                </td>
                <td className="py-3">Gynoveda</td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 font-medium text-xs px-3 py-1 rounded">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="inline"><circle cx="12" cy="12" r="10" fill="#facc15"></circle><text x="12" y="16" textAnchor="middle" fontSize="12" fontFamily="Arial" fill="#b45309">⏱</text></svg>
                    Sent 7 mins ago
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 flex items-center gap-3">
                  <img src="/avatars/surdeep_singh.jpg" className="w-8 h-8 rounded-full" alt="Surdeep Singh" />
                  <div>
                    <div className="font-medium">Surdeep Singh</div>
                    <div className="text-xs text-gray-500">Building Product-led SEO Growth ...</div>
                  </div>
                </td>
                <td className="py-3">Gynoveda</td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 font-medium text-xs px-3 py-1 rounded">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="inline"><circle cx="12" cy="12" r="10" fill="#facc15"></circle><text x="12" y="16" textAnchor="middle" fontSize="12" fontFamily="Arial" fill="#b45309">⏱</text></svg>
                    Sent 7 mins ago
                  </span>
                </td>
              </tr>
              {/* Add additional rows as needed for other leads */}
            </tbody>
          </table>
        </article>
      </section>
    </section>
  )
}
