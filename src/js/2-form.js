const form = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

const storageKey = 'feedback-form-state';

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name != 'email' && name != 'message') {
    return;
  }
  formData[name] = value.trim();
  localStorage.setItem(storageKey, JSON.stringify(formData));
});

const savedData = localStorage.getItem(storageKey);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email ?? '';
    formData.message = parsedData.message ?? '';
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {}
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }
  localStorage.removeItem(storageKey);
  console.log(formData);
  form.reset();
  formData.email = '';
  formData.message = '';
});