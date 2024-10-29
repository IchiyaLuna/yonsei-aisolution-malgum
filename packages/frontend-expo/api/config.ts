export const Networks: {
  protocol: 'http' | 'https';
  hostname: string;
  port: number;
} = {
  protocol: 'http',
  // hostname: '172.26.130.57',
  hostname: '192.168.219.102',
  port: 3000,
};

export const API_URL = `${Networks.protocol}://${Networks.hostname}:${Networks.port}`;
