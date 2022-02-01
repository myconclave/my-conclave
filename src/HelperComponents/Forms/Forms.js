import Select from "react-select";
import moment from "moment";

export const InputField = ({
  title,
  type,
  id,
  setInputValue,
  entity,
  placeholder,
}) => {
  const handleChange = (e) => {
    setInputValue(id, e.target.value);
  };
  return (
    <div className="input-fields">
      {title ? <label className="input-labels">{title}</label> : null}
      <input
        type={type}
        name={id}
        id={id}
        onChange={handleChange}
        value={entity}
        placeholder={placeholder || ""}
      />
    </div>
  );
};

export const InputDateField = ({ title, id, setInputValue, entity }) => {
  const handleChange = (e) => {
    setInputValue(id, e.target.value);
  };

  return (
    <div className="input-fields">
      {title ? <label className="input-labels">{title}</label> : null}
      <input
        type="date"
        name={id}
        id={id}
        onChange={handleChange}
        value={moment(entity).format("YYYY-MM-DD")}
      />
    </div>
  );
};

export const SelectField = ({
  options,
  id,
  setInputValue,
  entity,
  placeholder,
  title,
  canBeMulti,
}) => {
  const handleChange = (value) => {
    setInputValue(id, value);
  };
  return (
    <div className="input-fields">
      <label className="input-labels">{title}</label>
      <Select
        value={entity}
        closeMenuOnSelect={canBeMulti ? false : true}
        options={options}
        isMulti={canBeMulti}
        name={id}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export const InputRadio = ({ title, id, setInputValue, entity }) => {
  const handleChange = (e) => {
    // console.log(e.target.value);
    setInputValue(id, e.target.value);
  };
  return (
    <div className="input-radio">
      <input
        type="radio"
        name={id}
        id={id}
        onClick={handleChange}
        value={entity}
      />
      {title ? <label className="input-labels">{title}</label> : null}
    </div>
  );
};

export const InputCheckbox = ({ title, id, setInputValue, entity }) => {
  const handleChange = (e) => {
    setInputValue(id, e.target.checked);
  };

  return (
    <div className="checkbox-field">
      {title ? <label className="input-labels">{title}</label> : null}
      <input
        type="checkbox"
        defaultChecked={true}
        name={id}
        id={id}
        onClick={handleChange}
        value={entity}
      />
    </div>
  );
};
