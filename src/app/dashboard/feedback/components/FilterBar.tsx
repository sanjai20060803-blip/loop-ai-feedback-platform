export default function FilterBar() {
  return (
    <div className="flex gap-4 flex-wrap">
      <select className="border rounded-lg px-3 py-2">
        <option>All Status</option>
        <option>NEW</option>
        <option>IN REVIEW</option>
        <option>RESOLVED</option>
        <option>ARCHIVED</option>
      </select>

      <select className="border rounded-lg px-3 py-2">
        <option>All Channels</option>
        <option>Email</option>
        <option>Support Ticket</option>
        <option>App Store</option>
        <option>CSV</option>
      </select>
    </div>
  );
}