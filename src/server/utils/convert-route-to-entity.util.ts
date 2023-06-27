const mapping: Record<string, string> = {
  bookings: 'booking',
  'gaming-pcs': 'gaming_pc',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
