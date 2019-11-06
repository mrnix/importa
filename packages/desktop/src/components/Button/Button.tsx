import * as React from 'react';
import {Link} from '@reach/router';
import cx from 'classnames';
import styles from './Button.module.sass';

class Button extends React.PureComponent<any> {
  static defaultProps = {
    classes: {}
  };

  render() {
    const {
      className,
      children,
      icon,
      intent,
      fill,
      active,
      minimal,
      fat,
      cap,
      link,
      huge,
      large,
      small,
      tiny,
      rounded,
      elevated,
      to,
      disabled,
      classes,
      registerRef,
      ...rest
    } = this.props;

    const finalClassName = cx(styles.button, classes.root, className, {
      [styles[intent]]: intent && styles[intent],
      [styles.none]: !intent,
      [styles.rounded]: rounded,
      [styles.huge]: huge,
      [styles.large]: large,
      [styles.elevated]: elevated,
      [styles.minimal]: minimal,
      [styles.fill]: fill,
      [styles.fat]: fat,
      [styles.cap]: cap,
      [styles.active]: active,
      [styles.small]: small,
      [styles.tiny]: tiny,
      [styles.link]: link,
      [styles.disabled]: disabled
    });
    let Komponent;
    let props;

    if (rest.href) {
      Komponent = 'a';
      props = rest;
    } else if (to) {
      Komponent = Link;
      props = {...rest, to};
    } else {
      Komponent = 'button';
      props = {...rest, type: rest.type || 'button'};
    }

    return (
      // @ts-ignore
      <Komponent
        {...props}
        ref={registerRef}
        disabled={disabled}
        className={finalClassName}
      >
        {icon && <span className={cx(styles.icon, classes.icon)}>{icon}</span>}
        {children && (
          <span className={cx(styles.label, classes.label)}>{children}</span>
        )}
      </Komponent>
    );
  }
}

export default Button;
