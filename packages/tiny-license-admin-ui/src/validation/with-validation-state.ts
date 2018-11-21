import { Component } from "react";
import * as React from "react";
import { validate, ValidationResultMap, ValidationRuleMap, isValidationEmpty } from "../validation";
/** */
export interface WithValidationState<T> {
    validation: ValidationResultMap<T>;
    isValidationEmpty: boolean;
}
/** */
export type WithValidationProps<T> = {
    item: T;
    rules: ValidationRuleMap<T>;
    render(x: WithValidationState<T> & {
        validate(data: T): Promise<WithValidationState<T>>
    }): React.ReactNode;
}
/** */
export default class WithValidation<T> extends Component<WithValidationProps<T>, WithValidationState<T>> {
    state = {
        validation: {} as ValidationResultMap<T>,
        isValidationEmpty: true
    }
    _validate = validate(this.props.rules);
    validate = (formData: T) => {
        return this._validate(formData).then(validation => {
            const state = { validation, isValidationEmpty: isValidationEmpty(validation) }
            this.setState(state);
            return state;
        });
    }
    componentDidMount() {
        this.validate(this.props.item);
    }
    /** */
    render() {
        const { validation, isValidationEmpty } = this.state;
        const { validate, } = this;
        return this.props.render({ validation, validate, isValidationEmpty });
    }
}