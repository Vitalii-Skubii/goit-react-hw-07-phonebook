import axios from 'axios';
import {
  addContactSuccess,
  addContactRequest,
  addContactError,
  contactRemoveRequest,
  contactRemoveSuccess,
  contactRemoveError,
  fetchContactSuccess,
  fetchContactRequest,
  fetchContactError,
} from './contacts-actions';
const baseURL = 'http://localhost:4040';
axios.defaults.baseURL = baseURL;

// const fetchContacts = () => dispatch => {
//   dispatch(fetchContactRequest());
//   axios
//     .get('/contacts')
//     .then(({ data }) => dispatch(fetchContactSuccess(data)))
//     .catch(error => dispatch(fetchContactError(error)));
// };
const fetchContacts = () => async dispatch => {
  dispatch(fetchContactRequest());
  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchContactSuccess(data));
  } catch (error) {
    dispatch(fetchContactError(error));
  }
};
const contactsAdd = (name, number) => dispatch => {
  const contact = { name, number };
  dispatch(addContactRequest());
  axios
    .post('/contacts', contact)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch(error => dispatch(addContactError(error)));
};

const contactRemove = contactId => dispatch => {
  dispatch(contactRemoveRequest());
  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(contactRemoveSuccess(contactId)))
    .catch(error => dispatch(contactRemoveError(error)));
};
export default { contactsAdd, contactRemove, fetchContacts };
