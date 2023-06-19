import { createElement, useEffect, useState } from "react";

import "./ui/IndiuMXDecimalTextBox.css";

export function IndiuMXDecimalTextBox(props) {
    const [dec, setDec] = useState("0.00");
    const [placeholder, setPlaceholder] = useState("");

    const handleFocus = (event) => event.target.select();

    const handleChange = e => {
        let inputVal = e.target.value;
        let idx = inputVal.indexOf(".");
        let isValid = true;
        let afterDecimal = 0;
        let substring = inputVal.substring(0, idx);
        if(idx != -1) {
            afterDecimal = inputVal.substring(idx + 1, inputVal.length);
        }
       
        if (substring.length == 0) {
            substring = inputVal;
        }
        if (substring.length > Number(props.maxLength)) {
            isValid = false;
            e.preventDefault();
        }
        if(afterDecimal.length > Number(props.decimalValue)) {
            isValid = false;
            e.preventDefault();
        }
        if(isValid == true) {
            setDec(e.target.value);
            props.inputValue.setValue(e.target.value);
            if (props.onChange && props.onChange.canExecute) {
                props.onChange.execute();
            }
        }
    };

    const handleBlur = e => {
        var num = parseFloat(e.target.value);
        let afterDecimal = '';
        let idx = e.target.value.indexOf(".");
        if(idx != -1) {
            afterDecimal = e.target.value.substring(idx + 1, e.target.value.length);
        }
      

        if(afterDecimal != '' && Number(afterDecimal) != 0 ) {
            setDec(e.target.value);
            props.inputValue.setValue(e.target.value);
        } else {
            var cleanNum = num.toFixed(Number(props.decimalValue));
            setDec(cleanNum);
            props.inputValue.setValue(cleanNum);
        }

        
    
        if (props.onBlurChange && props.onBlurChange.canExecute) {
            props.onBlurChange.execute();
        }
    };
    useEffect(() => {
        setDec(props.inputValue.value);
    }, [props.inputValue]);
    useEffect(() => {
        setPlaceholder(props.placeholder);
    }, [props.placeholder]);

    return (
        <div>
            <input
                type="number"
                value={dec}
                pattern={props.regEx ? props.regEx : ""}
                max={props.maxLength}
                placeholder={placeholder}
                onChange={e => {
                    handleChange(e);
                }}
                onBlur={e => {
                    handleBlur(e);
                }}
                onFocus={e => {
                    handleFocus(e);
                }}
                
                onKeyDown={(evt) => ["e", "E", "+", "-", "ArrowDown", "ArrowUp"].includes(evt.key) && evt.preventDefault()}
            />
        </div>
    );
}
