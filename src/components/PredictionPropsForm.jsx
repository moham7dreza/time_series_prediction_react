import {useContext, useEffect} from "react";
import {useFetch} from "../customHooks/useFetch";
import {StockContext} from "../context/StockContext";
import {ErrorMessage, Field, Form, Formik} from "formik";
// import {PredictValidation} from "../validations/PredictValidation";
import Datepicker from "react-tailwindcss-datepicker";
import {Spinner} from "./Spinner";
import * as YUP from "yup";
import {Helmet} from "react-helmet-async";
import config from "../config/app";

export const PredictionPropsForm = () => {
    const {
        submitPredictions,
        date,
        handleDateChange,
        loading,
        models,
        setModels,
        datasets,
        setDatasets,
        series,
        setSeries,
        prices,
        setPrices,
        lastPredProps,
        setLastPredProps, metrics, setMetrics,
    } = useContext(StockContext)

    const [datasetNames] = useFetch(config.apiUrl + 'datasets-name')
    const [modelsNames] = useFetch(config.apiUrl + 'models-name')
    const [seriesNames] = useFetch(config.apiUrl + 'series-name')
    const [pricesNames] = useFetch(config.apiUrl + 'prices-name')
    const [metricsNames] = useFetch(config.apiUrl + 'metrics-name')
    const [lastPredictionProps] = useFetch(config.apiUrl + 'last-predict-props')

    useEffect(() => {
        if (datasetNames && datasetNames.status === 'OK') {
            // toast.success('Dataset names fetched')
            setDatasets(datasetNames.data)
        }
        if (modelsNames && modelsNames.status === 'OK') {
            // toast.info('models names fetched')
            setModels(modelsNames.data)
        }
        if (seriesNames && seriesNames.status === 'OK') {
            // toast.info('series names fetched')
            setSeries(seriesNames.data)
        }
        if (pricesNames && pricesNames.status === 'OK') {
            // toast.info('series names fetched')
            setPrices(pricesNames.data)
        }
        if (metricsNames && metricsNames.status === 'OK') {
            // toast.info('series names fetched')
            setMetrics(metricsNames.data)
        }
        if (lastPredictionProps && lastPredictionProps.status === 'OK') {
            // toast.info('series names fetched')
            setLastPredProps(lastPredictionProps.data)
        }
    }, [datasetNames, modelsNames, seriesNames, pricesNames, lastPredictionProps, metricsNames])

    const PredictValidation = YUP.object().shape({
        n_steps: YUP.number().required('Number of Time Steps is required'),
        n_top_models_to_ensemble: YUP.number().required('Number of top models is required'),
        apply_combinations: YUP.boolean().required('apply combinations is required'),
        // ...series.reduce((acc, serie) => {
        //     acc[`serie-${serie}`] = YUP.boolean().required(`${serie} is required`);
        //     return acc;
        // }, {}),
        // ...models.reduce((acc, model) => {
        //     acc[`model-${model}`] = YUP.boolean().required(`${model} is required`);
        //     return acc;
        // }, {}),
        // ...datasets.reduce((acc, dataset) => {
        //     acc[`dataset-${dataset}`] = YUP.boolean().required(`${dataset} is required`);
        //     return acc;
        // }, {}),
    })
    //     .test('atLeastOneChecked', 'At least one checkbox must be selected', values => {
    //     return (
    //         datasets.some(dataset => values[`dataset-${dataset}`]) &&
    //         series.some(serie => values[`serie-${serie}`]) &&
    //         models.some(model => values[`model-${model}`])
    //     );
    // });

    const initialValues = {
        n_steps: 3,
        test_size: 20,
        univariate_epochs: 100,
        multivariate_epochs: 500,
        batch_size: 32,
        dropout_rate: 20,
        n_predict_future_days: 120,
        n_top_models_to_ensemble: 0,
        apply_combinations: false,
        ...series.reduce((acc, serie) => {
            acc[`serie-${serie}`] = false;
            return acc;
        }, {}),
        ...models.reduce((acc, model) => {
            acc[`model-${model}`] = false;
            return acc;
        }, {}),
        ...datasets.reduce((acc, dataset) => {
            acc[`dataset-${dataset}`] = false;
            return acc;
        }, {}),
        ...prices.reduce((acc, price) => {
            acc[`price-${price}`] = false;
            return acc;
        }, {}),
        ...metrics.reduce((acc, metric) => {
            acc[`metric-${metric}`] = false;
            return acc;
        }, {}),
    };
    // console.log(lastPredProps)

    return (
        <>
            <Helmet>
                <title>Props</title>
            </Helmet>
            {loading ? <Spinner/> :
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto rounded-2xl shadow-2xl mt-5">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => submitPredictions(values)} validationSchema={PredictValidation}>
                        <Form>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-800 dark:text-gray-300 dark:hover:text-white">Prediction
                                        Properties</h2>
                                    {/*<p className="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about*/}
                                    {/*    important*/}
                                    {/*    changes, but you pick what else you want to hear about.</p>*/}

                                    <section className="flex space-x-20 space-y-12">
                                        <div className="mt-10 space-y-10">
                                            <fieldset>
                                                <legend
                                                    className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Choice
                                                    Series
                                                    ...
                                                </legend>
                                                <div className="mt-6 space-y-6">
                                                    {series.map((serie, index) => (
                                                        <div className="relative flex gap-x-3" key={index}>
                                                            <div className="flex h-6 items-center">
                                                                <Field name={`serie-${serie}`} id={`serie-${serie}`}
                                                                       type="checkbox"
                                                                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                            </div>
                                                            <div className="text-sm leading-6">
                                                                <label htmlFor={`serie-${serie}`}
                                                                       className="font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white">{serie}</label>
                                                                {/*<p className="text-gray-500">Get notified when someones posts a*/}
                                                                {/*    comment*/}
                                                                {/*    on a*/}
                                                                {/*    posting.</p>*/}
                                                                <ErrorMessage name={`serie-${serie}`}>
                                                                    {message => (<div
                                                                        className={'text-red-500 my-2'}>{message}</div>)}
                                                                </ErrorMessage>
                                                            </div>
                                                        </div>
                                                    ))}


                                                </div>
                                            </fieldset>
                                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                                <div className="sm:col-span-4">
                                                    <label htmlFor="univariate_epochs"
                                                           className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Number
                                                        of Epochs For Univariate Series</label>
                                                    <div className="mt-2">
                                                        <Field type="number" name="univariate_epochs"
                                                               autoComplete="3"
                                                            // className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-800 dark:text-gray-300 dark:hover:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                               className="block w-full rounded-md py-1.5 px-2 ps-3 bg-transparent dark:bg-slate-800 transition duration-300 ease-in-out border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <ErrorMessage name={'univariate_epochs'}>
                                                        {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                                    </ErrorMessage>
                                                </div>
                                                <div className="sm:col-span-4">
                                                    <label htmlFor="multivariate_epochs"
                                                           className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Number
                                                        of Epochs For Multivariate Series</label>
                                                    <div className="mt-2">
                                                        <Field type="number" name="multivariate_epochs"
                                                               autoComplete="3"
                                                            // className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-800 dark:text-gray-300 dark:hover:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                               className="block w-full rounded-md py-1.5 px-2 ps-3 bg-transparent dark:bg-slate-800 transition duration-300 ease-in-out border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <ErrorMessage name={'multivariate_epochs'}>
                                                        {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                                    </ErrorMessage>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-10 space-y-10">
                                            <fieldset>
                                                <legend
                                                    className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Choice
                                                    Datasets
                                                    ...
                                                </legend>
                                                <div className="mt-6 space-y-6">
                                                    {datasets.map((dataset, index) => (
                                                        <div className="relative flex gap-x-3" key={index}>
                                                            <div className="flex h-6 items-center">
                                                                <Field name={`dataset-${dataset}`}
                                                                       id={`dataset-${dataset}`}
                                                                       type="checkbox"
                                                                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                            </div>
                                                            <div className="text-sm leading-6">
                                                                <label htmlFor={`dataset-${dataset}`}
                                                                       className="font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white">{dataset}</label>
                                                                {/*<p className="text-gray-500">Get notified when someones posts a*/}
                                                                {/*    comment*/}
                                                                {/*    on a*/}
                                                                {/*    posting.</p>*/}
                                                                <ErrorMessage name={`dataset-${dataset}`}>
                                                                    {message => (<div
                                                                        className={'text-red-500 my-2'}>{message}</div>)}
                                                                </ErrorMessage>
                                                            </div>
                                                        </div>
                                                    ))}


                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="mt-10 space-y-10">
                                            <fieldset>
                                                <legend
                                                    className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Choice
                                                    Prices
                                                    ...
                                                </legend>
                                                <div className="mt-6 space-y-6">
                                                    {prices.map((price, index) => (
                                                        <div className="relative flex gap-x-3" key={index}>
                                                            <div className="flex h-6 items-center">
                                                                <Field name={`price-${price}`} id={`price-${price}`}
                                                                       type="checkbox"
                                                                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                            </div>
                                                            <div className="text-sm leading-6">
                                                                <label htmlFor={`price-${price}`}
                                                                       className="font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white">{price}</label>
                                                                {/*<p className="text-gray-500">Get notified when someones posts a*/}
                                                                {/*    comment*/}
                                                                {/*    on a*/}
                                                                {/*    posting.</p>*/}
                                                                <ErrorMessage name={`price-${price}`}>
                                                                    {message => (<div
                                                                        className={'text-red-500 my-2'}>{message}</div>)}
                                                                </ErrorMessage>
                                                            </div>
                                                        </div>
                                                    ))}


                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className={'mt-10 space-y-10'}>
                                            <fieldset className={'mt-0'}>
                                                <legend
                                                    className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Choice
                                                    Models
                                                    ...
                                                </legend>
                                                <div className="mt-6 space-y-6">
                                                    {models.map((model, index) => (
                                                        <div className="relative flex gap-x-3" key={index}>
                                                            <div className="flex h-6 items-center">
                                                                <Field name={`model-${model}`} id={`model-${model}`}
                                                                       type="checkbox"
                                                                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                            </div>
                                                            <div className="text-sm leading-6">
                                                                <label htmlFor={`model-${model}`}
                                                                       className="font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white">{model}</label>
                                                                {/*<p className="text-gray-500">Get notified when someones posts a*/}
                                                                {/*    comment*/}
                                                                {/*    on a*/}
                                                                {/*    posting.</p>*/}
                                                                <ErrorMessage name={`model-${model}`}>
                                                                    {message => (<div
                                                                        className={'text-red-500 my-2'}>{message}</div>)}
                                                                </ErrorMessage>
                                                            </div>
                                                        </div>
                                                    ))}


                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className={'mt-10 space-y-10'}>
                                            <fieldset className={'mt-0'}>
                                                <legend
                                                    className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Choice
                                                    Metrics
                                                    ...
                                                </legend>
                                                <div className="mt-6 space-y-6">
                                                    {metrics.map((metric, index) => (
                                                        <div className="relative flex gap-x-3" key={index}>
                                                            <div className="flex h-6 items-center">
                                                                <Field name={`metric-${metric}`} id={`metric-${metric}`}
                                                                       type="checkbox"
                                                                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                            </div>
                                                            <div className="text-sm leading-6">
                                                                <label htmlFor={`metric-${metric}`}
                                                                       className="font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white">{metric}</label>
                                                                <ErrorMessage name={`metric-${metric}`}>
                                                                    {message => (<div
                                                                        className={'text-red-500 my-2'}>{message}</div>)}
                                                                </ErrorMessage>
                                                            </div>
                                                        </div>
                                                    ))}


                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-6">
                                                <label
                                                    className="font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white">
                                                    Choice Date Range to Predict
                                                </label>
                                                <div className={'mt-5 border bg-slate-400 rounded'}>
                                                    <Datepicker
                                                        value={date}
                                                        onChange={handleDateChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="n_steps"
                                                       className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Number
                                                    of Time Steps</label>
                                                <div className="mt-2">
                                                    <Field type="number" name="n_steps"
                                                           autoComplete="3"
                                                        // className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-800 dark:text-gray-300 dark:hover:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                           className="block w-full rounded-md py-1.5 px-2 ps-3 bg-transparent dark:bg-slate-800 transition duration-300 ease-in-out border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <ErrorMessage name={'n_steps'}>
                                                    {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="batch_size"
                                                       className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">
                                                    Batch Size
                                                </label>
                                                <div className="mt-2">
                                                    <Field type="number" name="batch_size"
                                                           autoComplete="3"
                                                        // className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-800 dark:text-gray-300 dark:hover:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                           className="block w-full rounded-md py-1.5 px-2 ps-3 bg-transparent dark:bg-slate-800 transition duration-300 ease-in-out border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <ErrorMessage name={'batch_size'}>
                                                    {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="test_size"
                                                       className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Test
                                                    Data Percentage</label>
                                                <div className="mt-2">
                                                    <Field type="number" name="test_size"
                                                           autoComplete="3"
                                                        // className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-800 dark:text-gray-300 dark:hover:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                           className="block w-full rounded-md py-1.5 px-2 ps-3 bg-transparent dark:bg-slate-800 transition duration-300 ease-in-out border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <ErrorMessage name={'test_size'}>
                                                    {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="dropout_rate"
                                                       className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Model
                                                    Dropout Rate Percentage</label>
                                                <div className="mt-2">
                                                    <Field type="number" name="dropout_rate"
                                                           autoComplete="3"
                                                        // className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-800 dark:text-gray-300 dark:hover:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                           className="block w-full rounded-md py-1.5 px-2 ps-3 bg-transparent dark:bg-slate-800 transition duration-300 ease-in-out border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <ErrorMessage name={'dropout_rate'}>
                                                    {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="n_predict_future_days"
                                                       className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">
                                                    Number of future days to predict
                                                </label>
                                                <div className="mt-2">
                                                    <Field type="number" name="n_predict_future_days"
                                                           autoComplete="3"
                                                        // className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-800 dark:text-gray-300 dark:hover:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                           className="block w-full rounded-md py-1.5 px-2 ps-3 bg-transparent dark:bg-slate-800 transition duration-300 ease-in-out border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <ErrorMessage name={'n_predict_future_days'}>
                                                    {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="n_top_models_to_ensemble"
                                                       className="block text-sm font-medium leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Number
                                                    of Top Models To Ensemble</label>
                                                <div className="mt-2">
                                                    <Field type="number" name="n_top_models_to_ensemble"
                                                           autoComplete="3"
                                                        // className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-800 dark:text-gray-300 dark:hover:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                           className="block w-full rounded-md py-1.5 px-2 ps-3 bg-transparent dark:bg-slate-800 transition duration-300 ease-in-out border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <ErrorMessage name={'n_top_models_to_ensemble'}>
                                                    {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <div className="relative flex gap-x-3">
                                                    <div className="flex h-6 items-center">
                                                        <Field name={`apply_combinations`} id={`apply_combinations`}
                                                               type="checkbox"
                                                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                    </div>
                                                    <div className="text-sm leading-6">
                                                        <label htmlFor={`apply_combinations`}
                                                               className="font-medium text-gray-800 dark:text-gray-300 dark:hover:text-white">
                                                            Apply Combinations to Top Models
                                                        </label>
                                                        <ErrorMessage name={'apply_combinations'}>
                                                            {message => (
                                                                <div className={'text-red-500 my-2'}>{message}</div>)}
                                                        </ErrorMessage>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                {/*<button type="button" className="text-sm font-semibold leading-6 text-gray-800 dark:text-gray-300 dark:hover:text-white">Cancel</button>*/}
                                <button type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Predict
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>}
        </>
    )
        ;
};