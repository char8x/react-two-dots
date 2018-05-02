import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'pepjs'; // Pointer Events Polyfill https://github.com/jquery/PEP
import Hammer from 'rc-hammerjs'; // http://hammerjs.github.io/api/
import Pointable from 'react-pointable'; // https://github.com/MilllerTime/react-pointable

import { bounce, vanish, zoomOut } from '../../utils/animate-keyframes';

const ACTIVE_TIME = 650;
const BOUNCE_TIME = 1000;
const CLEAR_TIME = 300;

const Dot = styled.div`
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  box-shadow: none;
  background-color: ${props => props.color};
  ${props => `height: ${props.diam}px;
    width: ${props.diam}px;`};
`;

Dot.propTypes = {
  color: PropTypes.string.isRequired,
  diam: PropTypes.number.isRequired
};

Dot.defaultProps = {
  color: '#000',
  diam: 20
};

const AnimateTopDot = Dot.extend`
  ${props =>
    props.bounce
      ? `animation-name: ${bounce};
  transform-origin: center bottom;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  `
      : ''};

  ${props =>
    props.clear
      ? `animation-name: ${zoomOut};
      transform-origin: center;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      opacity: 1;`
      : ''};
`;

const AnimateBottomDot = Dot.extend`
  position: relative;
  top: -20px;
  z-index: -1;
  opacity: 0;

  ${props =>
    props.active
      ? `animation-name: ${vanish};
         animation-duration: 0.65s;
         animation-fill-mode: forwards;
         opacity: 1;`
      : ''};
`;

const Wrapper = styled.div`
  height: 20px;
  margin: 10px;
`;

class AnimateDot extends PureComponent {
  static propTypes = {
    color: PropTypes.string.isRequired,
    diam: PropTypes.number.isRequired,
    idx: PropTypes.number,
    bounce: PropTypes.bool,
    active: PropTypes.bool,
    clear: PropTypes.bool,
    refreshBoard: PropTypes.func,
    linePanningEnd: PropTypes.func,
    onTap: PropTypes.func,
    onPanStart: PropTypes.func,
    onPan: PropTypes.func,
    onPanEnd: PropTypes.func,
    onPanCancel: PropTypes.func,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func
  };

  static defaultProps = {
    color: '#000',
    diam: 20,
    bounce: true, // bounce effect
    active: false, // click wave effect
    clear: false, // clear effect
    refreshBoard: () => {},
    linePanningEnd: () => {},
    onTap: () => {},
    onPanStart: () => {},
    onEnter: () => {},
    onLeave: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      bounce: true, // bounce effect
      active: false, // click wave effect
      clear: false // clear effect
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.bounce !== prevState.bounce && nextProps.bounce) {
      return {
        bounce: nextProps.bounce
      };
    } else if (nextProps.active !== prevState.active && nextProps.active) {
      return {
        active: nextProps.active
      };
    } else if (nextProps.clear !== prevState.clear && nextProps.clear) {
      return {
        clear: nextProps.clear
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.bounce && this.state.bounce) {
      this.setBounceTimer();
    } else if (prevProps.active && this.state.active) {
      this.setActiveTimer();
    } else if (prevProps.clear && this.state.clear) {
      this.setClearTimer();
    }
  }

  componentDidMount() {
    this.setBounceTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.activeTimer);
    clearTimeout(this.clearTimer);
    clearTimeout(this.bounceTimer);
    this.props.refreshBoard();
  }

  setActiveTimer = () => {
    this.activeTimer = setTimeout(() => {
      this.setState({ active: false });
    }, ACTIVE_TIME); // equal or more than animation-duration (0.65s)
  };

  setClearTimer = () => {
    const { linePanningEnd } = this.props;
    this.clearTimer = setTimeout(() => {
      this.setState({ clear: false });
      linePanningEnd();
    }, CLEAR_TIME); // equal or more than animation-duration (300ms)
  };

  setBounceTimer = () => {
    this.bounceTimer = setTimeout(() => {
      this.setState({ bounce: false });
    }, BOUNCE_TIME);
  };

  handleTap = () => {
    this.setState({ active: true });
    this.setActiveTimer();
  };

  render() {
    const {
      diam,
      color,
      idx,
      onTap,
      onPanStart,
      onPan,
      onPanEnd,
      onPanCancel,
      onEnter,
      onLeave
    } = this.props;
    const { bounce, active, clear } = this.state;
    return (
      <Wrapper>
        <Hammer
          onTap={e => {
            onTap(e);
            this.handleTap();
          }}
          onPanStart={e => {
            // follow Airbnb Style Guide - Events
            onPanStart(e, { idx });
            this.handleTap();
          }}
          onPan={onPan}
          onPanEnd={onPanEnd}
          onPanCancel={onPanCancel}
          direction="DIRECTION_ALL"
        >
          <Pointable
            onPointerEnter={e => {
              // follow Airbnb Style Guide - Events
              onEnter(e, { idx });
            }}
            onPointerLeave={e => {
              // follow Airbnb Style Guide - Events
              onLeave(e, { idx });
            }}
            touchAction="none"
          >
            <AnimateTopDot
              diam={diam}
              color={color}
              bounce={bounce}
              clear={clear}
            />
            <AnimateBottomDot diam={diam} color={color} active={active} />
          </Pointable>
        </Hammer>
      </Wrapper>
    );
  }
}

export { Dot };
export default AnimateDot;
