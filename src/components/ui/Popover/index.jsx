import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledPopover = styled.div`
  position: absolute;
  z-index: 1;
  ${(props) => css`
    top: ${props.top}px;
    left: ${props.left}px;
  `}
`;

const Popover = ({ anchorEl, open, onClose, children, anchorOrigin }) => {
  // Стайт для сохранения ширины контента(children)
  const [widthContent, setWidthContent] = useState(null);
  // Стайт для сохранения позиции popover-а по высоте
  const [offsetTop, setOffsetTop] = useState(null);
  // Стайт для сохранения позиции popover-а по ширине
  const [offsetLeft, setOffsetLeft] = useState(null);

  const ref = useRef(null);

  useLayoutEffect(() => {
    // Ширина контента(children)
    setWidthContent(ref.current?.offsetWidth);

    if (widthContent && anchorEl.current) {
      // Переменные для сохранения результата вычислений для позиционирования по высоте и ширине
      let calcOffsetTop;
      let calcOffsetLeft;

      // Высчитывание высоты для позиционирования по вертикали
      const positionVerticalTop = anchorEl.current.offsetTop - anchorEl.current.offsetHeight;
      const positionVerticalBottom = anchorEl.current.offsetTop + anchorEl.current.offsetHeight;

      // Высчитывание ширины для позиционирования по горизонтали
      const positionHorizontalLeft = anchorEl.current.offsetLeft;
      const positionHorizontalRight =
        anchorEl.current.offsetLeft + anchorEl.current.offsetWidth - widthContent;
      const positionHorizontalCenter =
        anchorEl.current.offsetLeft - (widthContent - anchorEl.current.offsetWidth) / 2;

      // Позиционирование popover относительно данных которые были получены с пропса anchorOrigin
      if (anchorOrigin.vertical === 'top') {
        if (anchorOrigin.horizontal === 'center') {
          calcOffsetTop = positionVerticalTop;
          calcOffsetLeft = positionHorizontalCenter;
        }
        if (anchorOrigin.horizontal === 'left') {
          calcOffsetTop = positionVerticalTop;
          calcOffsetLeft = positionHorizontalLeft;
        }
        if (anchorOrigin.horizontal === 'right') {
          calcOffsetTop = positionVerticalTop;
          calcOffsetLeft = positionHorizontalRight;
        }
      }

      if (anchorOrigin.vertical === 'bottom') {
        if (anchorOrigin.horizontal === 'center') {
          calcOffsetTop = positionVerticalBottom;
          calcOffsetLeft = positionHorizontalCenter;
        }
        if (anchorOrigin.horizontal === 'left') {
          calcOffsetTop = positionVerticalBottom;
          calcOffsetLeft = positionHorizontalLeft;
        }
        if (anchorOrigin.horizontal === 'right') {
          calcOffsetTop = positionVerticalBottom;
          calcOffsetLeft = positionHorizontalRight;
        }
      }

      setOffsetTop(calcOffsetTop);
      setOffsetLeft(calcOffsetLeft);
    }
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, widthContent]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !event.path.includes(ref.current) &&
        anchorEl.current &&
        !event.path.includes(anchorEl.current)
      ) {
        onClose(!open);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [anchorEl, open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <StyledPopover ref={ref} top={offsetTop} left={offsetLeft}>
      {children}
    </StyledPopover>
  );
};

Popover.propTypes = {
  anchorEl: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorOrigin: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Popover;
