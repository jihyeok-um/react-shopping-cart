import { BaseLabel, BaseCheckBox } from './style';

const Checkbox = ({ label, ...rest }) => {
  return (
    <BaseLabel>
      <BaseCheckBox {...rest} type="checkbox" />
      {label}
    </BaseLabel>
  );
};

export default Checkbox;
