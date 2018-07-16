import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../scss/CheckBox.scss';

/**
 * Styled checkbox courtesy from Andreas Storm
 * Source: https://codepen.io/andreasstorm/pen/yjLGGN
 */

const CheckBox = ({ disabled, id, label, onChange, selected, value, viewBox }) => (
    <div
        className={ classNames('orizzonte__checkbox', {
            'orizzonte__checkbox--disabled': disabled
        }) }
    >
        <input
            type="checkbox"
            disabled={ disabled }
            id={ id }
            className="orizzonte__checkbox-input"
            value={ value }
            checked={ selected }
            onChange={ (e) => {
                const { checked } = e.target;
                onChange(checked);
            }}
        />
        <label
            htmlFor={ id }
            className="orizzonte__checkbox-label"
        >
            <span
                className="orizzonte__checkbox-span orizzonte__checkbox-span--first"
            >
                <svg
                    className="orizzonte__checkbox-svg"
                    width="12px"
                    height="10px"
                    viewBox={ viewBox || [0, 0, 10, 10] }
                >
                    <polyline
                        points="1.5 6 3.5 9 8 3"
                    />
                </svg>
            </span>
            <span
                className="orizzonte__checkbox-span orizzonte__checkbox-span--last"
            >
                { label }
            </span>
        </label>
    </div>
);

CheckBox.propTypes = {
    /** If the checkbox should be disabled */
    disabled: PropTypes.bool,
    /** Internal ID for this checkbox */
    id: PropTypes.string.isRequired,
    /** Label for this checkbox */
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    onChange: PropTypes.func,
    /** If the checkbox should be checked */
    selected: PropTypes.bool,
    /** Value for this checkbox */
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    viewBox: PropTypes.array
};

CheckBox.defaultProps = {
    disabled: false,
    onChange: () => {},
    selected: false,
    viewBox: null
};

export default CheckBox;
