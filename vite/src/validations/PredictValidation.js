import * as YUP from 'yup';

export const PredictValidation = YUP.object().shape({
    n_steps: YUP.number().required(),
    models: YUP.bool().nullable()
})