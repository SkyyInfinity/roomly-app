import { TextInput as TNTextInput } from "react-native";

const TextInput = ({
    placeholder, 
    onChangeText, 
    value,
    className,
    ...otherProps
}) => {

    return (
        <TNTextInput
            className={`w-full bg-quaternary border border-transparent font-ralewayregular text-base py-4 px-8 rounded-lg focus:border-primary${className ? ` ${className}` : ''}`}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#888888"
            {...otherProps}
        />
    )
}

export default TextInput;
