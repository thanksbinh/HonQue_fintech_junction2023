export function formatNumber(num_list_users) {
  if (!num_list_users) return "N/A"
  return num_list_users.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}