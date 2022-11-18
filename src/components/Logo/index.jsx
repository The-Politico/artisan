import cls from 'classnames';
import styles from './styles.module.css';

import {
  typography, margin, flex, layout, colors,
} from '../../theme';

export default function Logo() {
  const containerClass = cls(
    styles.container,
    flex.flex,
    flex.flexRow,
    layout.itemsCenter,
    margin.mb4,
  );

  const logoClass = cls(
    colors.textSlate800,
    typography.fontSemibold,
    margin.mx2,
    typography.text3Xl,
  );

  return (
    <div className={containerClass}>
      <svg width="30" height="30" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="146" height="146" rx="32" fill="url(#paint0_linear_86_965)" />
        <path d="M35.1023 108H19.2841L43.3864 38.1818H62.4091L86.4773 108H70.6591L53.1705 54.1364H52.625L35.1023 108ZM34.1136 80.5568H71.4773V92.0795H34.1136V80.5568ZM94.608 108V55.6364H108.688V64.7727H109.233C110.188 61.5227 111.79 59.0682 114.04 57.4091C116.29 55.7273 118.881 54.8864 121.812 54.8864C122.54 54.8864 123.324 54.9318 124.165 55.0227C125.006 55.1136 125.744 55.2386 126.381 55.3977V68.2841C125.699 68.0795 124.756 67.8977 123.551 67.7386C122.347 67.5795 121.244 67.5 120.244 67.5C118.108 67.5 116.199 67.9659 114.517 68.8977C112.858 69.8068 111.54 71.0795 110.562 72.7159C109.608 74.3523 109.131 76.2386 109.131 78.375V108H94.608Z" fill="white" fillOpacity="0.2" />
        <g style={{ mixBlendMode: 'overlay' }}>
          <path d="M35.1023 108H19.2841L43.3864 38.1818H62.4091L86.4773 108H70.6591L53.1705 54.1364H52.625L35.1023 108ZM34.1136 80.5568H71.4773V92.0795H34.1136V80.5568ZM94.608 108V55.6364H108.688V64.7727H109.233C110.188 61.5227 111.79 59.0682 114.04 57.4091C116.29 55.7273 118.881 54.8864 121.812 54.8864C122.54 54.8864 123.324 54.9318 124.165 55.0227C125.006 55.1136 125.744 55.2386 126.381 55.3977V68.2841C125.699 68.0795 124.756 67.8977 123.551 67.7386C122.347 67.5795 121.244 67.5 120.244 67.5C118.108 67.5 116.199 67.9659 114.517 68.8977C112.858 69.8068 111.54 71.0795 110.562 72.7159C109.608 74.3523 109.131 76.2386 109.131 78.375V108H94.608Z" fill="white" />
        </g>
        <defs>
          <linearGradient id="paint0_linear_86_965" x1="73" y1="0" x2="73" y2="146" gradientUnits="userSpaceOnUse">
            <stop stopColor="#007BC7" />
            <stop offset="1" stopColor="#013C60" />
          </linearGradient>
        </defs>
      </svg>
      <div>
        <span className={logoClass}>Artisan</span>
      </div>
    </div>
  );
}
