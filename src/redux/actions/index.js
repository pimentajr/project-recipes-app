export const SEND_DETAILS_TO_STORE = 'SEND_DETAILS_TO_STORE';

export function sendDetailsToStore(details) {
  return {
    type: 'SEND_DETAILS_TO_STORE',
    details,
  };
}
