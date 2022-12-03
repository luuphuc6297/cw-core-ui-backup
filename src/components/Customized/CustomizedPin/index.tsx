import { styled } from '@mui/system';
import React, { useImperativeHandle } from 'react';

const PIN_LENGTH = 6;

const PinLayout = styled('div')({
    display: 'flex',
    justifyContent: 'center',
});

const InputPin = styled('div')({
    width: 62,
    height: 62,
    borderColor: `rgb(118, 118, 118)`,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif, Arial',
});

export const CustomizedPin = React.forwardRef(({ value, onChange, disabled }: any, ref): any => {
    const isInputSecure = false;
    const [isFocus, setIsFocus] = React.useState<boolean>();
    const inputRef: any = React.useRef();

    useImperativeHandle(ref, () => ({
        el: inputRef.current,
        focus: () => {
            inputRef.current.focus();
        },
    }));

    const handleInputFocus = () => {
        inputRef?.current?.focus?.();
    };

    const handleInputChange = (e: any) => {
        const input = e.target.value?.trim?.();
        const rg = /^[ A-Za-z0-9_@./#&+-]*$/;
        if (!rg.test(input)) return;
        if (input.length <= 6) {
            onChange?.(input);
        }
    };

    return (
        <>
            <input
                autoFocus
                autoComplete="false"
                ref={inputRef}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={handleInputChange}
            />
            <PinLayout>
                {Array(PIN_LENGTH)
                    .fill('')
                    .map((v, i) => {
                        const num = value[i] || '';
                        const focus = value.length === i && isFocus;
                        return (
                            <InputPin onClick={handleInputFocus} key={i}>
                                {num && isInputSecure ? <div /> : num}
                            </InputPin>
                        );
                    })}
            </PinLayout>
        </>
    );
});
