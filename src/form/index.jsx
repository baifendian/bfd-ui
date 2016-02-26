import Form from './Form.jsx';
import FormGroup from './FormGroup.jsx';

import createDOMForm from 'rc-form/lib/createDOMForm.js';

Form.create = (o={}) => {
  const options = {
    ...o,
    fieldNameProp: 'id',
    fieldMetaProp: '__meta',
  };
  return createDOMForm(options);
};

Form.Group = FormGroup;

Form.Form = Form;


export default Form;