import React from "react";
import Transition from 'react-transition-group/Transition';

const duration = 1000;

const defaultStyle = {
  transition: `background ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
  opacity: 0,
  padding: '10px'
};

const transitionStyles = error => (
  {
    entering: { opacity: 1, background: error ? 'pink' : 'lightgreen' },
    entered:  { opacity: 1 },
    exiting:  { opacity: 1 },
    exited:  { opacity: 0 },
  }
);

export default ({ in: inProp, notification, error}) => {
  return (
    <Transition in={inProp} timeout={duration}>
      { transitionState =>
        <span style={{...defaultStyle, ...transitionStyles(error)[transitionState]}}>
          {notification}
        </span>
      }
    </Transition>
  )
}
