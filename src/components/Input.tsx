interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input: React.FunctionComponent<InputProps> = (props) => {
  return (
    <input
      style={{
        display: "block",
        padding: "16px",
        width: "100%",
        borderRadius: "16px",
      }}
      {...props}
    />
  );
};
