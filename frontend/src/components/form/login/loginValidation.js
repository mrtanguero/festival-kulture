import * as yup from 'yup'

export const loginValidation = yup.object({
    username: yup.string().required('Ovo polje je obavezno'),
    password: yup.string()
        .min(8, "Šifra mora imati barem 8 karaktera")
        .max(16, "Šifra može imati najviše 16 karaktera")
        .required('Ovo polje je obavezno')
})

