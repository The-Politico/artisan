import * as icons24 from '@heroicons/react/24/solid';
import * as icons20 from '@heroicons/react/20/solid';

/**
 * Renders a hero icon of a given name. All names end in `Icon`.
 * {@link https://heroicons.com}
 * @param {Object} props
 * @param {'20' | '24'} [props.size] Icon size to render.
 * Style differs slightly between the two
 * @param {String} [props.className] Extra class names to pass to the
 * icon component
 * @param {String} props.iconName Name of icon. Must match icon component name.
 * @example
 *  "ArchiveBoxIcon"
 *  "DevicePhoneMobileIcon"
 *  "DocumentDuplicateIcon"
 * @returns {JSX.Element}
 */
export default function BaseIcon({ size = '20', iconName, className }) {
  const icons = [icons20, icons24];
  const IconComponent = icons[size === '20' ? 0 : 1][iconName];
  return <IconComponent className={className} />;
}
