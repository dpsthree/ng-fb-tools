export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cypress?: any;
    dashboardModel: {
      clearItems: () => Promise<void>;
      addItem: (newItem: {
        label: string;
      }) => Promise<void>;
    };
  }
}
