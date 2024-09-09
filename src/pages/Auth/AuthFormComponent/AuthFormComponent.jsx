import React from 'react';
import './AuthFormComponent.scss';
import classNames from 'classnames';

const AuthFormComponent = ({ onSubmit, fields, buttonText, errors, footer, classNames: myClassNames  }) => {

    return (
            <form className={classNames('form', myClassNames)} onSubmit={onSubmit}>
                {fields.map((field, index) => (
                    <div key={index} className="form-group">
                        <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder={field.placeholder}
                            className={`form-input ${errors[field.name] ? 'error-input' : ''}`}
                        />
                        {errors[field.name] && <span className="error-text">{errors[field.name]}</span>}
                    </div>
                ))}
                <button type="submit" className="cta-button">
                    {buttonText}
                </button>
                            {footer && <div className="form-footer">{footer}</div>}

            </form>
        
    );
};

export default AuthFormComponent;
