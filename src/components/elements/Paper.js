import React from "react";
import styles from "./Paper.module.css";

function Paper(props) {
    const { elevation, variant, style, ...otherProps } = props;
    let className = styles.paper;
    if (elevation) {
        className += ` ${styles["elevation" + elevation]}`;
    }
    if (variant) {
        className += ` ${styles[variant]}`;
    }

    return (
        <div className={className} style={style} {...otherProps}>
            {props.children}
        </div>
    );
}

export default Paper;
