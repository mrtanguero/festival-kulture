import * as yup from 'yup';

export const registerValidation = yup.object().shape({
    username: yup.string()
        .required('Ovo polje je obavezno'),
    email: yup.string()
        .email("Email mora biti ispravan")
        .required("Ovo polje je obavezno"),
    password: yup.string()
        .required("Ovo polje je obavezno")
        .min(8, "Šifra mora imati između 8 i 16 znakova")
        .max(16, "Šifra mora imati manje od 16 znakova"),
    confirmPassword: yup.string()
        .required("Ovo polje je obavezno")
        .oneOf([yup.ref('password')], 'Šifre se moraju podudarati')

})