import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import find from 'lodash/find';
import capitalize from 'lodash/capitalize';
import assign from 'lodash/assign';
import classnames from 'classnames';
import { autoInitFrames } from '@newswire/frames';

import { Navigation, Select } from '@politico/interactive-style-sketch';
import * as Icons from './icons';

import styles from './styles.scss';

const PRESET_SIZES = [
  {
    size: '100%',
    Icon: Icons.Full,
  },
  {
    size: '1200px',
    Icon: Icons.Desktop,
  },
  {
    size: '720px',
    Icon: Icons.Tablet,
  },
  {
    size: '400px',
    Icon: Icons.Mobile,
  },
];

const getPageOptionsFromProps = (props) => {
  const { pages } = props;
  return pages.map(p => ({
    id: path.join('../', p, 'index.html'),
    label: p === '' ? 'index' : p.substring(0, p.length - 1),
  })).filter(p => p.label !== 'preview');
};

class EmbedPreview extends React.Component {
  constructor(props) {
    super(props);

    const firstPage = props.pages[0];
    this.state = {
      size: '400px',
      embed: firstPage.substring(0, firstPage.length - 1),
    };

    this.frame = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    state.options = getPageOptionsFromProps(props);
  }

  componentDidMount() {
    autoInitFrames();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.embed !== this.state.embed) {
      console.log('resetFrame');
      this.frame.current.innerHTML = '';
      this.frame.current.removeAttribute('data-frame-auto-initialized');
      autoInitFrames();
    }
  }

  eslintFix = () => {
    console.log(this.props.pages);
  }

  getDisplayOptions = () => {
    return this.state.options.map(opt => {
      const display = assign({}, opt);
      display.label = capitalize(display.label);
      return display;
    });
  }

  getPathFromName = name => {
    const option = find(this.state.options, opt => opt.label === name);
    if (option) { return option.id; }
    return null;
  }

  getNameFromPath = ePath => {
    const option = find(this.state.options, opt => opt.id === ePath);
    if (option) { return option.label; }
    return null;
  }

  onSelectEmbed = e => {
    const ePath = e.target.value;
    this.setState({ embed: this.getNameFromPath(ePath) });
  }

  onSizeInputChange = e => {
    this.setState({ size: e.target.value });
  }

  onSizeInputKeyDown = e => {
    const currentSize = this.state.size;
    let value = parseFloat(currentSize);
    const unit = currentSize.split(`${value}`)[1];
    if (e.shiftKey) {
      if (e.key === 'ArrowUp') {
        this.setState({ size: `${value + 10}${unit}` });
      } else if (e.key === 'ArrowDown') {
        this.setState({ size: `${value - 10}${unit}` });
      }
    } else {
      if (e.key === 'ArrowUp') {
        this.setState({ size: `${value + 1}${unit}` });
      } else if (e.key === 'ArrowDown') {
        this.setState({ size: `${value - 1}${unit}` });
      }
    }
  }

  render() {
    const embedName = this.state.embed;
    const embedPath = this.getPathFromName(embedName);
    const embedPublishPath = embedName === 'index' ? '' : `${embedName}/`;

    return (
      <div className={classnames('preview', 'container', styles.styles)}>
        <Navigation
          appLink={this.props.appLink}
          appName={this.props.appName}
          homeLink={this.props.homeLink}
        >
          {PRESET_SIZES.map(({ size, Icon }) =>
            <li
              key={size}
              className='nav-item'
              title={size}
            >
              <button
                onClick={() => { this.setState({ size }); }}
              >
                <Icon />
              </button>
            </li>
          )}
          <input
            value={this.state.size}
            onChange={this.onSizeInputChange}
            onKeyDown={this.onSizeInputKeyDown}
          />

        </Navigation>

        <div className='embed-preview-container'>
          <div style={{ width: this.state.size }} data-frame-src={embedPath} className='embed-preview' ref={this.frame} />
        </div>

        {this.state.options.length > 1 &&
          <div className='embed-select'>
            <Select
              label='Select an embed...'
              options={this.getDisplayOptions()}
              value={embedPath}
              placeholder='Choose an option'
              onChange={this.onSelectEmbed}
            />
          </div>
        }

        <div className='embed-code'>
          <h3 className='label'>Use this embed code...</h3>
          <textarea rows='10' cols='60' readOnly value={
            `<div id='test-embed' data-frame-src="https://www.${path.join('politico.com/', this.props.basePublishPath, embedPublishPath)}"/><script src="//unpkg.com/@newswire/frames/dist/index.umd.js"></script><script>window.newswireFrames.autoInitFrames()</script>`
          } />
        </div>
      </div>
    );
  }
}

EmbedPreview.defaultProps = {
  appLink: '../',
  appName: 'Preview',
  homeLink: '#',
  pages: [],
  default: 'index',
};

EmbedPreview.propTypes = {
  appLink: PropTypes.string,
  appName: PropTypes.string,
  homeLink: PropTypes.string,
  pages: PropTypes.array,
  default: PropTypes.string,
};

export default EmbedPreview;
