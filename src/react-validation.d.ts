declare module 'react-validation/build/form' {
    import { Component, FormEvent } from 'react';

    export interface FormProps {
        onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
        ref?: React.Ref<Form>;
    }

    export class Form extends Component<FormProps> {
        validateAll: () => void;
    }
}

declare module 'react-validation/build/input' {
    import { Component, ChangeEvent } from 'react';

    export interface InputProps {
        type: string;
        className: string;
        name: string;
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        validations?: ((value: string) => JSX.Element | null)[];
    }

    export class Input extends Component<InputProps> {}
}

declare module 'react-validation/build/button' {
    import { Component } from 'react';

    export interface CheckButtonProps {
        style?: React.CSSProperties;
        ref?: React.Ref<CheckButton>;
    }

    export class CheckButton extends Component<CheckButtonProps> {
        context: {
            _errors: any[];
        };
    }
}
