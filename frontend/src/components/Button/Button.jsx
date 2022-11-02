import './button.css';
import { cloneElement } from 'react';
import { ReactComponent as ShareSvg } from '../../assets/icons/share.svg';
import { ReactComponent as RightArrowSvg } from '../../assets/icons/right.svg';
import { ReactComponent as DownArrowSvg } from '../../assets/icons/down.svg';

const Button = ({
  type = 'filled',
  state = 'default',
  isText = true,
  isIcon = false,
  innerText = 'Register',
  iconType = 'share',
  iconAltText = 'Share',
  desaturate = false,
  widthPx = 190,
  heightPx = 51,
  clickLink = '',
  clickHandler
}) => {
  const typeClasses = {
    filled: 'filled',
    outline: 'outline',
    text: 'text',
    invertedfill: 'invertedfill'
  };

  const stateClasses = {
    default: 'default',
    disabled: 'disabled'
  };

  const buttonStyle = {
    width: `${widthPx}px`,
    height: `${heightPx}px`
  };

  const iconComponent = {
    share: <ShareSvg />,
    rightarrow: <RightArrowSvg />,
    downarrow: <DownArrowSvg />
  };

  const iconStyle = {
    share: { fill: 'white', height: '40px', width: '40px' },
    rightarrow: { stroke: 'white', height: '18px', width: '18px' },
    downarrow: { stroke: 'white', height: '18px', width: '18px' }
  };

  let otherIconStyles = {};

  if (isIcon === true && type === 'outline') {
    otherIconStyles['fill'] = 'hsla(263, 73%, 43%, 1)';
    otherIconStyles['stroke'] = 'hsla(263, 73%, 43%, 1)';
  }

  if (isIcon === true && type === 'invertedfill') {
    otherIconStyles['fill'] = 'hsla(263, 73%, 43%, 1)';
    otherIconStyles['stroke'] = 'hsla(263, 73%, 43%, 1)';
  }

  if (isIcon === true && isText === false && desaturate === true) {
    buttonStyle['filter'] = 'grayscale(100%)';
  }

  if (state === 'disabled') {
    buttonStyle['pointer-events'] = 'none';
  }

  let iconElem = cloneElement(iconComponent[iconType], {
    className: iconType,
    alt: iconAltText,
    style: { ...iconStyle[iconType], ...otherIconStyles }
  });

  const handleClick = (e) => {
    e.preventDefault();
    clickHandler(e);
  };

  return (
    <div
      className={`button standardui-button type-${typeClasses[type]} button-${stateClasses[state]}`}
    >
      <a href={clickLink} style={buttonStyle} onClick={handleClick}>
        {isText ? <p>{innerText}</p> : <></>}
        {isIcon ? iconElem : <></>}
      </a>
    </div>
  );
};

export default Button;
