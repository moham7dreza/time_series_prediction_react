import {useContext, useEffect} from "react";
import {useFetch} from "../customHooks/useFetch";
import {StockContext} from "../context/StockContext";
import {ErrorMessage, Field, Form, Formik} from "formik";
// import {PredictValidation} from "../validations/PredictValidation";
import Datepicker from "react-tailwindcss-datepicker";
import {Spinner} from "./Spinner";
import * as YUP from "yup";
import {Helmet} from "react-helmet";

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
        setLastPredProps
    } = useContext(StockContext)

    const [datasetNames] = useFetch('http://127.0.0.1:5000/datasets-name')
    const [modelsNames] = useFetch('http://127.0.0.1:5000/models-name')
    const [seriesNames] = useFetch('http://127.0.0.1:5000/series-name')
    const [pricesNames] = useFetch('http://127.0.0.1:5000/prices-name')
    const [lastPredictionProps] = useFetch('http://127.0.0.1:5000/last-predict-props')

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
        if (lastPredictionProps && lastPredictionProps.status === 'OK') {
            // toast.info('series names fetched')
            setLastPredProps(lastPredictionProps.data)
        }
    }, [datasetNames, modelsNames, seriesNames, pricesNames, lastPredictionProps])

    const PredictValidation = YUP.object().shape({
        n_steps: YUP.number().required('Number of Time Steps is required'),
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
        n_steps: '',
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
    };
    console.log(lastPredProps)

    return (
        <>
            <Helmet>
                <title>Props</title>
            </Helmet>
            {loading ? <Spinner/> : <div className="max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <Formik
                    initialValues={initialValues}
                    onSubmit={values => submitPredictions(values)} validationSchema={PredictValidation}>
                    <Form>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Prediction
                                    Properties</h2>
                                {/*<p className="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about*/}
                                {/*    important*/}
                                {/*    changes, but you pick what else you want to hear about.</p>*/}

                                <section className="flex space-x-20 space-y-12">
                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Choice
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
                                                                   className="font-medium text-gray-900">{serie}</label>
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
                                    </div>
                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Choice
                                                Datasets
                                                ...
                                            </legend>
                                            <div className="mt-6 space-y-6">
                                                {datasets.map((dataset, index) => (
                                                    <div className="relative flex gap-x-3" key={index}>
                                                        <div className="flex h-6 items-center">
                                                            <Field name={`dataset-${dataset}`} id={`dataset-${dataset}`}
                                                                   type="checkbox"
                                                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                                        </div>
                                                        <div className="text-sm leading-6">
                                                            <label htmlFor={`dataset-${dataset}`}
                                                                   className="font-medium text-gray-900">{dataset}</label>
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
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Choice
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
                                                                   className="font-medium text-gray-900">{price}</label>
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
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Choice
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
                                                                   className="font-medium text-gray-900">{model}</label>
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
                                        {/*<fieldset>*/}
                                        {/*    <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications*/}
                                        {/*    </legend>*/}
                                        {/*    <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to*/}
                                        {/*        your*/}
                                        {/*        mobile phone.</p>*/}
                                        {/*    <div className="mt-6 space-y-6">*/}
                                        {/*        <div className="flex items-center gap-x-3">*/}
                                        {/*            <input id="push-everything" name="push-notifications" type="radio"*/}
                                        {/*                   className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>*/}
                                        {/*            <label htmlFor="push-everything"*/}
                                        {/*                   className="block text-sm font-medium leading-6 text-gray-900">Everything</label>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="flex items-center gap-x-3">*/}
                                        {/*            <input id="push-email" name="push-notifications" type="radio"*/}
                                        {/*                   className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>*/}
                                        {/*            <label htmlFor="push-email"*/}
                                        {/*                   className="block text-sm font-medium leading-6 text-gray-900">Same as*/}
                                        {/*                email</label>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="flex items-center gap-x-3">*/}
                                        {/*            <input id="push-nothing" name="push-notifications" type="radio"*/}
                                        {/*                   className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>*/}
                                        {/*            <label htmlFor="push-nothing"*/}
                                        {/*                   className="block text-sm font-medium leading-6 text-gray-900">No push*/}
                                        {/*                notifications</label>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</fieldset>*/}
                                    </div>
                                    <div className="mt-10 border-b border-gray-900/10 pb-12">
                                        <legend className="text-sm font-semibold leading-6 text-gray-900">Enter props
                                            ...
                                        </legend>
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-4">
                                                <label htmlFor="n_steps"
                                                       className="block text-sm font-medium leading-6 text-gray-900">Number
                                                    of Time Steps</label>
                                                <div className="mt-2">
                                                    <Field type="text" name="n_steps"
                                                           autoComplete="3"
                                                           className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                                </div>
                                                <ErrorMessage name={'n_steps'}>
                                                    {message => (<div className={'text-red-500 my-2'}>{message}</div>)}
                                                </ErrorMessage>
                                            </div>
                                            <div className="sm:col-span-6">
                                                <Datepicker
                                                    value={date}
                                                    onChange={handleDateChange}
                                                />
                                            </div>
                                            {/*<div className="sm:col-span-3">*/}
                                            {/*    <label htmlFor="last-name"*/}
                                            {/*           className="block text-sm font-medium leading-6 text-gray-900">Last*/}
                                            {/*        name</label>*/}
                                            {/*    <div className="mt-2">*/}
                                            {/*        <input type="text" name="last-name" id="last-name"*/}
                                            {/*               autoComplete="family-name"*/}
                                            {/*               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            {/*<div className="sm:col-span-4">*/}
                                            {/*    <label htmlFor="email"*/}
                                            {/*           className="block text-sm font-medium leading-6 text-gray-900">Email*/}
                                            {/*        address</label>*/}
                                            {/*    <div className="mt-2">*/}
                                            {/*        <input id="email" name="email" type="email" autoComplete="email"*/}
                                            {/*               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            {/*<div className="sm:col-span-3">*/}
                                            {/*    <label htmlFor="country"*/}
                                            {/*           className="block text-sm font-medium leading-6 text-gray-900">Country</label>*/}
                                            {/*    <div className="mt-2">*/}
                                            {/*        <select id="country" name="country" autoComplete="country-name"*/}
                                            {/*                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">*/}
                                            {/*            <option>United States</option>*/}
                                            {/*            <option>Canada</option>*/}
                                            {/*            <option>Mexico</option>*/}
                                            {/*        </select>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            {/*<div className="col-span-full">*/}
                                            {/*    <label htmlFor="street-address"*/}
                                            {/*           className="block text-sm font-medium leading-6 text-gray-900">Street*/}
                                            {/*        address</label>*/}
                                            {/*    <div className="mt-2">*/}
                                            {/*        <input type="text" name="street-address" id="street-address"*/}
                                            {/*               autoComplete="street-address"*/}
                                            {/*               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            {/*<div className="sm:col-span-2 sm:col-start-1">*/}
                                            {/*    <label htmlFor="city"*/}
                                            {/*           className="block text-sm font-medium leading-6 text-gray-900">City</label>*/}
                                            {/*    <div className="mt-2">*/}
                                            {/*        <input type="text" name="city" id="city"*/}
                                            {/*               autoComplete="address-level2"*/}
                                            {/*               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            {/*<div className="sm:col-span-2">*/}
                                            {/*    <label htmlFor="region"*/}
                                            {/*           className="block text-sm font-medium leading-6 text-gray-900">State*/}
                                            {/*        / Province</label>*/}
                                            {/*    <div className="mt-2">*/}
                                            {/*        <input type="text" name="region" id="region"*/}
                                            {/*               autoComplete="address-level1"*/}
                                            {/*               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}

                                            {/*<div className="sm:col-span-2">*/}
                                            {/*    <label htmlFor="postal-code"*/}
                                            {/*           className="block text-sm font-medium leading-6 text-gray-900">ZIP*/}
                                            {/*        / Postal code</label>*/}
                                            {/*    <div className="mt-2">*/}
                                            {/*        <input type="text" name="postal-code" id="postal-code"*/}
                                            {/*               autoComplete="postal-code"*/}
                                            {/*               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            {/*<button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>*/}
                            <button type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>}
        </>
    )
        ;
};