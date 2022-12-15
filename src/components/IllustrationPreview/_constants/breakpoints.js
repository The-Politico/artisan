export const NO_BREAKPOINT = {
  value: 'NO_BREAKPOINT',
  size: null,
  label: 'No Device',
  styles: {
    wrapper: {
      width: '80%',
    },
    inner: {
      left: 0,
      right: 0,
      top: 0,
      height: '100%',
    },
  },
};

export const DESKTOP = {
  value: 'DESKTOP',
  background: 'https://www.politico.com/interactives/uploads/image-service/2021/4/16/mockup-laptop.webp',
  size: 1280,
  label: 'Desktop (1280px)',
  styles: {
    wrapper: {
      width: '1707px',
    },
    mockup: {
      width: '1336px',
      top: '9px',
      left: '185px',
      boxShadow: '2px 2px 13px 11px rgba(100,100,100,0.5)',
      borderRadius: '41px',
    },
    inner: {
      left: '12.5%',
      right: '12.5%',
      top: '62px',
      height: '811px',
    },
  },
};

export const TABLET_LANDSCAPE = {
  value: 'TABLET_LANDSCAPE',
  background: 'https://www.politico.com/interactives/uploads/image-service/2021/4/16/mockup-tablet-two.webp',
  size: 1024,
  label: 'Tablet Landscape (1024px)',
  styles: {
    wrapper: {
      width: '1100px',
    },
    mockup: {
      width: '1087px',
      top: '21px',
      left: '140px',
      boxShadow: '2px 2px 13px 11px rgba(100,100,100,0.5)',
      borderRadius: '54px',
    },
    inner: {
      left: '12.5%',
      right: '12.5%',
      top: '52px',
      height: '775px',
    },
  },
};

export const TABLET_PORTRAIT = {
  value: 'TABLET_PORTRAIT',
  background: 'https://www.politico.com/interactives/uploads/image-service/2021/4/16/mockup-tablet-two.webp',
  size: 768,
  label: 'Tablet Portrait (768px)',
  styles: {
    wrapper: {
      minWidth: '954px',
    },
    mockup: {
      left: '50%',
      top: '147px',
      transform: 'rotate(90deg) translate(-50%, 0)',
      boxShadow: 'rgba(100, 100, 100, 0.5) 2px 2px 13px 11px',
      borderRadius: '43px',
      transformOrigin: '0% 50%',
    },
    inner: {

      left: '50%',
      top: '52px',
      height: '930px',
      transform: 'translate(-50%, 0%)',
      width: '725px',
    },
  },
};

export const MOBILE_LANDSCAPE = {
  value: 'MOBILE_LANDSCAPE',
  background: 'https://www.politico.com/interactives/uploads/image-service/2021/4/16/mockup-phone-two.webp?asdf',
  backgroundRotation: 90,
  size: 480,
  label: 'Mobile Landscape (480px)',
  styles: {
    wrapper: {
      width: '640px',
    },
    mockup: {
      width: '277px',
      top: '-104px',
      left: '164px',
      transform: 'rotate(-90deg)',
      boxShadow: '2px 2px 13px 11px rgba(100,100,100,0.5)',
      borderRadius: '44px',
    },
    inner: {
      left: '12.5%',
      right: '12.5%',
      top: '52px',
      height: '237px',
    },
  },
};

export const MOBILE_PORTRAIT = {
  value: 'MOBILE_PORTRAIT',
  background: 'https://www.politico.com/interactives/uploads/image-service/2021/4/16/mockup-phone-two.webp?aasd',
  size: 320,
  label: 'Mobile Portrait (320px)',
  styles: {
    wrapper: {
      width: '400px',
    },
    mockup: {
      width: '374px',
      top: '10px',
      left: '-5px',
      boxShadow: '2px 2px 13px 11px rgba(100,100,100,0.5)',
      borderRadius: '61px',
    },
    inner: {
      left: '2.5%',
      right: '7%',
      top: '82px',
      height: '644px',
    },
  },
};

export const ALL_BREAKPOINTS = {
  NO_BREAKPOINT,
  DESKTOP,
  TABLET_LANDSCAPE,
  TABLET_PORTRAIT,
  MOBILE_LANDSCAPE,
  MOBILE_PORTRAIT,
};

export const ALL_BREAKPOINT_LABELS = [
  NO_BREAKPOINT,
  DESKTOP,
  TABLET_LANDSCAPE,
  TABLET_PORTRAIT,
  MOBILE_LANDSCAPE,
  MOBILE_PORTRAIT,
];
