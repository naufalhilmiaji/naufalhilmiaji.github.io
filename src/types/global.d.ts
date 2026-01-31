export {};

declare global {
  interface Window {
    __PROJECTS__?: {
      slug: string;
      title: string;
    }[];
  }
}
