import * as yup from 'yup';

export const gamingPcValidationSchema = yup.object().shape({
  name: yup.string().required(),
  availability: yup.boolean().required(),
  organization_id: yup.string().nullable(),
});
