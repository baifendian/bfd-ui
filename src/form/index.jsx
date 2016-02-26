import Form from './Form.jsx';
import FormItem from './FormItem.jsx';
import ValueMixin from './ValueMixin.jsx';
import Input from '../input/index.jsx';
import createDOMForm from 'rc-form/lib/createDOMForm.js';

Form.create = (o = {}) => {
  const options = {
    ...o,
    fieldNameProp: 'id',
    fieldMetaProp: '__meta',
  };

  return createDOMForm(options);
};
Form.Item = FormItem;


Form.ValueMixin = ValueMixin;


Form.Form = Form;
Form.Input = Input;

export default Form;
